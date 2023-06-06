function FalunBase(config) {
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
//			backgroundColor: ['black'],
//			rangeStart: 0,
//		rangeEnd: 1000,
//		rangeStep: 25,
//			innerRadius: 50,
//			outerRadius: 65,
		angle: 0,
//		start: 135,
//		end: 405,
//			guageStart: 0,
//			guageEnd: 270,
		backgroundColor: "lightgray",
//			length: 50,
//			boldColor: "black",
//			boldStep: 250,
//		boldLength: 65,
		/*shorterLine=12,*/
		outlineWidth: 0,
		outlineColor: 'rgba(0, 0, 0, 0)',
//		positiveWidth: 0,
		rotationsPerSecond: 0,//0.2,
		animate: false//true
	};
	for (var p in props) {		// merge given config with default properties
		this[p] = (typeof config === "undefined" || typeof config[p] === undefined || typeof config[p] === "undefined") ? props[p] : config[p];
	}
	for (var p in this) {
		if (p && typeof(this[p]) === 'string'  && this[p].indexOf('%') == this[p].length-1) {
			var pc = this[p].split('%');
			if (!isNaN(pc[0]))
				this[p] = this.radius / 100 * pc[0];
		}
	}
	this.init();		// initialise the transformation
	context.save();
	this.clear();
	context.restore();
}

FalunBase.prototype.init = function()
{
	// if (typeof config === "object") {
	// }
	with (this) {
/*		if (typeof start === 'undefined')
			start = 0;
		if (typeof end === 'undefined')
			end = 360;
		startRadians = / *(typeof start === 'undefined') ? 0 :* / start * Math.PI/180;
		endRadians = / *(typeof end === 'undefined') ? 360 :* / end * Math.PI/180;
		if (typeof spokes !== 'undefined' && spokes && typeof rangeEnd === 'undefined') {
			if (typeof start === 'undefined' && typeof end === 'undefined') {
				rangeStep = 360 / spokes;
				rangeEnd = 360;
			} else {
				rangeStep = (end - start) / spokes;
				rangeEnd = end;
			}
			guageEnd = rangeEnd;
		}*/
		this.context = canvas.getContext('2d'/*, { alpha: false }*/);
	}
/*	this.clear();
	this.currentOffset = 0;
	this.draw();
	window.setInterval(this.draw(), 500);*/
}

FalunBase.prototype.clear = function()
{
	with (this) {
/*		if (typeof backgroundColor === 'object' && typeof backgroundColor[1] !== 'undefined') {
			const gradient = context.createRadialGradient(centerX, centerY, radius, centerX, centerY, context.canvas.width + context.canvas.height);
			gradient.addColorStop(0, space);
			gradient.addColorStop(0.999, black);
			context.fillStyle = gradient;
		} else {
			context.fillStyle = color;
		}*/
		// context.beginPath();
		context.fillStyle = backgroundColor;
		let region = new Path2D();
		region.arc(centerX, centerY, radius, 0, Math.PI * 2);
		region.arc(centerX, centerY, radius / 2, 0, Math.PI * 2);
		context.clip(region, "evenodd");
		context.fill(region, "evenodd");
/*		context.arc(centerX, centerY, radius, 0, Math.PI * 2);
		context.clip();
		context.fill();*/
//		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
//		context.translate(centerX, centerY);		// make all drawing start at the center
/*		context.beginPath();
		context.arc(0, 0, radius, 0, Math.PI * 2, false);		// mask all except the falun
		context.clip();*/
	}
}

FalunBase.prototype.draw = function()
{
	with (this) {
/*		context.fillStyle = 'white';
		for (var value=rangeStart; value<=rangeEnd; value+=rangeStep) {
	        var scaledValue = (rangeEnd == guageEnd) ? value : scaleIntoRange(rangeStart, rangeEnd, guageStart, guageEnd, value);
	        var degrees = scaledValue + start;*/
/*			if (!shorterLine)
				var shorterLine = (outerRadius - innerRadius) / 2;*/
/*			if (typeof boldColor !== 'undefined' && boldColor && typeof boldLength === 'undefined')
				boldLength = 3 * length / 2;
	        if (value % boldStep == 0) {
//	            radiantLine(innerRadius, outerRadius, degrees, boldColor);
	            radiantLine(radius, radius + boldLength, degrees, boldColor);
	        } else {
//	            radiantLine(innerRadius, outerRadius - shorterLine, degrees, markColor);
	            radiantLine(radius, radius + length, degrees, color);
	        }*/
/*		}

		currentOffset += 10;
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

FalunBase.prototype.revolve = function(ang)
{
	with (this) {
		//console.log(`Swastika revolve by ${Draw.degrees(ang)}`);
/*		if (typeof radius === "undefined") {
			init();
		}*/
		context.save();
		clear();
		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
		draw(ang);
		context.restore();
	}
}

FalunBase.prototype.setBackgroundColor = function(color)
{
	with (this) {
		//console.log(`Swastika revolve by ${Draw.degrees(ang)}`);
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		context.save();
		backgroundColor = color;
		clear();
//		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
//		draw(ang);
		context.restore();
	}
}