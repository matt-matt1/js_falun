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

FalunBg.prototype.radiantLine = function(innerRadius, outerRadius, degrees, color, dashArray)
{
	with (this) {
		var radians = degrees * Math.PI / 180;
		//var innerX = centerX + innerRadius * Math.cos(radians);
		//var innerY = centerY + innerRadius * Math.sin(radians);
		//var outerX = centerX + outerRadius * Math.cos(radians);
		//var outerY = centerY + outerRadius * Math.sin(radians);
		
		context.beginPath();
		var dest = toBorder(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians), centerX + outerRadius * Math.cos(radians), centerY + outerRadius * Math.sin(radians));
		//context.moveTo(innerX, innerY);
		context.moveTo(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians));
		//context.lineTo(outerX, outerY);
//		context.lineTo(centerX + outerRadius * Math.cos(radians), centerY + outerRadius * Math.sin(radians));
		context.lineTo(dest.x, dest.y);
		// dashArray[0] = (dashArray[0] * Math.sin(radians)) ? dashArray[0] * Math.sin(radians) : dashArray[0] * Math.cos(radians);
		// dashArray[0] *= Math.sin(radians) + Math.cos(radians);
		// for (var i=0; i<canvas.width+canvas.height; i++) {
		// 	dashArray.push(dashArray[0] + i);
		// 	dashArray.push(dashArray[1] + i);
		// }
		context.setLineDash(dashArray/*[50, 10]*/);
/*		context.dashedLine(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians),
			centerX + outerRadius * Math.cos(radians), centerY + outerRadius * Math.sin(radians),
//			context.canvas.width * Math.cos(radians), context.canvas.height * Math.sin(radians),
			[100, 150], currentOffset);*/
/*		context.dashedLine(centerX + innerRadius * Math.cos(radians), centerY + innerRadius * Math.sin(radians),
			dest.x, dest.y,
//			context.canvas.width * Math.cos(radians), context.canvas.height * Math.sin(radians),
			[100, 150], currentOffset);*/
		context.strokeStyle = color;
		context.lineWidth = linewidth;
		context.stroke();
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
	            radiantLine(radius, radius + boldLength, degrees, boldColor, [50, 10]);
	        } else {
//	            radiantLine(innerRadius, outerRadius - shorterLine, degrees, markColor);
/*				if (value % 2 == 0) {*/
	            	radiantLine(radius, radius + length, degrees, color, [50, 10]);
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

FalunBg.prototype.march = function()
{
	with (this) {
		// init();
		clear();
		context.lineDashOffset = -bgStobeOffset;
		draw();
	}
}
