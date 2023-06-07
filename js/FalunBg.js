function FalunBg(config) {
	var props = {								// default propertie
		canvas: document.querySelector('canvas'),
		radius: 100,//4,
//		corner: 4,
		centerX: 350,
		centerY: 350,
		spokes: 0,
		shadowBlur: 0,
		shadowColor: 'rgba(0, 0, 0, 0)',
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		backgroundColor: ['black'],
		rangeStart: 0,
//		rangeEnd: 1000,
//		rangeStep: 25,
		innerRadius: 50,
		outerRadius: 65,
//		start: 135,
//		end: 405,
		guageStart: 0,
		guageEnd: 270,
		dashArray: [10, 100],
		numStars: 150,
		color: "orange",
		length: 50,
		boldColor: "black",
		boldStep: 250,
//		boldLength: 65,
		/*shorterLine=12,*/
		linewidth: 2,
//		positiveWidth: 0,
		rotationsPerSecond: 0,//0.2,
		animate: false//true
	};
	for (var p in props) {		// merge given config with default properties
		this[p] = (typeof config === "undefined" || typeof config[p] === undefined || typeof config[p] === "undefined") ? props[p] : config[p];
	}
	if (!this.canvas)
		throw new Error('canvas failed for FalunBase');
	if (!this.backgroundColor[0] && this.backgroundColor)
		this.backgroundColor = [this.backgroundColor];
	for (var p in this) {
		if (p && typeof(this[p]) === 'string'  && this[p].indexOf('%') == this[p].length-1) {
			var pc = this[p].split('%');
			if (!isNaN(pc[0]))
				this[p] = this.radius / 100 * pc[0];
		}
	}
	this.init();
}

FalunBg.prototype.init = function()
{
	with (this) {
		this.context = canvas.getContext('2d', { /*alpha: false*/ });
		context.lineCap = 'round';
		context.lineJoin = 'round';
		if (typeof start === 'undefined')
			start = 0;
		if (typeof end === 'undefined')
			end = 360;
		startRadians = /*(typeof start === 'undefined') ? 0 :*/ start * Math.PI/180;
		endRadians = /*(typeof end === 'undefined') ? 360 :*/ end * Math.PI/180;
		if (typeof spokes !== 'undefined' && spokes && typeof rangeEnd === 'undefined') {
/*			if (typeof start === 'undefined' && typeof end === 'undefined') {
				rangeStep = 360 / spokes;
				rangeEnd = 360;
			} else {*/
				rangeStep = (end - start) / spokes;
				rangeEnd = end;
/*			}*/
			guageEnd = rangeEnd;
		}
		// this.star = {x, y}
		this.stars = [];
		for (var i=0; i<numStars; i++) {
			var x = Math.floor(Math.random() * canvas.width);
			var y = Math.floor(Math.random() * canvas.height);
			stars.push({x: x, y: y/*, z: i*/});
		}
	}
	this.clear();
	this.currentOffset = 0;
	this.draw();
//	window.setInterval(this.draw(), 500);
}

FalunBg.prototype.toBorder = function(x1, y1, x2, y2/*, left, top, right, bottom*/) {
    var dx, dy, py, vx, vy,
	left = 0, top = 0, right = this.canvas.width, bottom = this.canvas.height;
    vx = x2 - x1;
    vy = y2 - y1;
    dx = vx < 0 ? left : right;
    dy = py = vy < 0 ? top : bottom;
    if(vx === 0){
        dx = x1;
    }else if(vy === 0){
        dy = y1;
    }else{
        dy = y1 + (vy / vx) * (dx - x1);
        if(dy < top || dy > bottom){
            dx = x1 + (vx / vy) * (py - y1);
            dy = py;
        }
    }
    return {x : dx, y : dy}
}

FalunBg.prototype.drawStar = function(x, y, radius, /*width, curve,*/ fillColor, strokeColor, strokeWidth, gravityX, gravityY)
{
	if (!x) {
		x = Math.floor(Math.random() * this.canvas.width);
	}
	if (!y) {
		y = Math.floor(Math.random() * this.canvas.height);
	}
	// if (!radius) {
	// 	radius = Math.floor(Math.random() * 10);
	// }
	radius = Math.floor(radius / 16);
	// var dist = Math.sqrt(x * x + Y * Y);
	var path = new Path2D();
	path.moveTo(x + radius, y);
	path.bezierCurveTo(x, y, x, y, x, y - radius);
	path.bezierCurveTo(x, y, x, y, x - radius, y);
	path.bezierCurveTo(x, y, x, y, x, y + radius);
	path.bezierCurveTo(x, y, x, y, x + radius, y);
	if (strokeColor) {
		this.context.strokeStyle = strokeColor;
		if (strokeWidth) {
			this.context.lineWidth = Math.floor(radius / 20);//strokeWidth;
			this.context.stroke(path);
			context.closePath();
		}
	}
	if (fillColor) {
		var gradient = context.createRadialGradient(x, y, 1, x, y, radius);
		gradient.addColorStop(0, 'white');
		gradient.addColorStop(1, fillColor/*'transparent'*/);
		this.context.fillStyle = gradient;//fillColor;
		this.context.fill(path);
	}
}

FalunBg.prototype.drawDashedLine = function(startX, startY, endX, endY, dashArray, offset)
{
	var posX = (endX - startX) ? true : false,
		posY = (endY - startY) ? true : false,
		dx = (posX) ? endX - startX : startX - endX,
		dy = (posY) ? endY - startY : startY - endY,
		dist = Math.sqrt(dx * dx + dy * dy),
		draw, x, y, segment, index;
	if (!offset) {
		offset = 0;
	}
	if (!dashArray) dashArray = [10, 5];
	this.context.beginPath();
	this.context.moveTo(startX, startY);
	// segment = dashArray.shift();
	while (((posX) ? dist < endX : dist > endX) && ((posY) ? dist < endY : dist > endY)) {
		x = (posX) ? i + 1 : i - 1;
		y = (posY) ? i + 1 : i - 1;
		// if (dashArray.length-1 == index)
		draw = dist < (dashArray[0] + offset);
		if (draw) {
			this.context.lineTo(x, y);
		} else {
			this.context.moveTo(x, y);
		}
		i++;
		dist--;
		index++;
	}
	// for (var i=0; i<dist; i++) {
	// }
/*	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.setLineDash(array);*/
}

FalunBg.prototype.radiantLine = function(innerRadius, outerRadius, degrees, color, dashs)
{
	with (this) {
		var radians = degrees * Math.PI / 180;
		var innerX = centerX + innerRadius * Math.cos(radians);
		var innerY = centerY + innerRadius * Math.sin(radians);
		var outerX = centerX + outerRadius * Math.cos(radians);
		var outerY = centerY + outerRadius * Math.sin(radians);
		
		context.beginPath();
		var dest = toBorder(innerX, innerY, outerX, outerY);
		//context.moveTo(innerX, innerY);
		// context.moveTo(innerX, innerY);
		//context.lineTo(outerX, outerY);
//		context.lineTo(centerX, outerY);
		drawDashedLine(innerX, innerY, dest.x, dest.y, dashs, offset);
		// context.lineTo(dest.x, dest.y);
		// dashs[0] = (dashs[0] * Math.sin(radians)) ? dashs[0] * Math.sin(radians) : dashs[0] * Math.cos(radians);
		// dashs[0] *= Math.sin(radians) + Math.cos(radians);
		// for (var i=0; i<canvas.width+canvas.height; i++) {
		// 	dashs.push(dashs[0] + i);
		// 	dashs.push(dashs[1] + i);
		// }
		// context.setLineDash(dashs);
/*		context.dashedLine(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians),
			centerX, outerY,
//			context.canvas.width * Math.cos(radians), context.canvas.height * Math.sin(radians),
			[100, 150], currentOffset);*/
/*		context.dashedLine(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians),
			dest.x, dest.y,
//			context.canvas.width * Math.cos(radians), context.canvas.height * Math.sin(radians),
			[100, 150], currentOffset);*/
		context.strokeStyle = color;
		context.lineWidth = linewidth;
		context.stroke();
		context.closePath();
	}
}

FalunBg.prototype.scaleIntoRange = function(minActual, maxActual, minRange, maxRange, value){
	return (maxRange - minRange) * (value - minRange) / (maxActual - minActual) + minRange;
}

FalunBg.prototype.clear = function()
{
	with (this) {
		if (typeof backgroundColor === 'object' && typeof backgroundColor[1] !== 'undefined') {
			var total = color.length, i=0;
			var gradient = context.createRadialGradient(0, 0, 1, 0, 0, radius);
			while (typeof backgroundColor[i] === 'string') {
				gradient.addColorStop(i/total, backgroundColor[i++]);
			}
/*			const gradient = context.createRadialGradient(centerX, centerY, radius, centerX, centerY, context.canvas.width + context.canvas.height);
			gradient.addColorStop(0, space);
			gradient.addColorStop(0.999, black);*/
			context.fillStyle = gradient;
		} else {
			context.fillStyle = backgroundColor;
		}
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
//		context.translate(centerX, centerY);		// make all drawing start at the center
/*		context.beginPath();
		context.arc(0, 0, radius, 0, Math.PI * 2, false);		// mask all except the falun
		context.clip();*/
	}
}

FalunBg.prototype.moveStars = function(gravityX, gravityY)
{
	with (this) {
		for (var i=0; i<numStars; i++) {
			drawStar(stars[i].x, stars[i].y, i, /*10, 10, 5,*/ 'yellow', 1, 'white', gravityX, gravityY);
		}
	}
}

FalunBg.prototype.draw = function()
{
	with (this) {
		context.fillStyle = 'white';
		if (typeof boldColor !== 'undefined' && boldColor && typeof boldLength === 'undefined') {
			boldLength = 3 * length / 2;
		}
		for (var value=rangeStart; value<=rangeEnd; value+=rangeStep) {
	        var scaledValue = (rangeEnd == guageEnd) ? value : scaleIntoRange(rangeStart, rangeEnd, guageStart, guageEnd, value);
	        var degrees = scaledValue + start;
/*			if (!shorterLine)
				var shorterLine = (outerRadius - innerRadius) / 2;*/
	        if (value % boldStep == 0) {
//	            radiantLine(innerRadius, outerRadius, degrees, boldColor);
	            radiantLine(radius, radius + boldLength, degrees, boldColor, dashArray);
	        } else {
//	            radiantLine(innerRadius, outerRadius - shorterLine, degrees, markColor);
/*				if (value % 2 == 0) {*/
	            	radiantLine(radius, radius + length, degrees, color, dashArray);
/*				} else {
	            	radiantLine(radius, radius + length, degrees, color, [20, 60]);
				}*/
	        }
		}
/*		currentOffset += 10;
		if (currentOffset >= 200)
			currentOffset = 0;*/
/*
		for (var i=0; i<360; i+=5) {
			var start = radius + i, rad = Draw.radians(i);
			if (i%10) {
	//			console.log(i+': 10x');
	//			context.quadCurveTo();
			} else {
				//at 0, 10, 20...
	//			console.log(i+': not');
				//			positiveCenterX + positiveCenterX * Math.cos(angle * (Math.PI/180))
				for (var j=0; j<(context.canvas.width + context.canvas.height); j+=50) {
					var x = centerX + start * Math.cos(rad * j),
						y = centerY + start * Math.sin(rad * j);
					context.beginPath();
					context.moveTo(x, y);
					context.lineTo(x + 50, y + 50);
					context.fill();
				}
			}
		}*/
	}
}

FalunBg.prototype.march = function(gravityX, gravityY)
{
	with (this) {
		// init();
		clear();
		context.lineDashOffset = -bgStobeOffset;
		moveStars(gravityX, gravityY);
		draw();
	}
}
