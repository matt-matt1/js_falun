/**
 * Draw a Taiji (Yin-Yang Symbol)
 */
function Swastika(config)
{
	var props = {									// default propertie
		canvas: document.querySelector('canvas'),	// if not supplied, uses the first canvas
		armWidth: 10,								// width of each section
		radius: 100,//4,							// size of circle that contains it
		corner: 4,									// amount of pixels to round end corners
		centerX: 350,								// center of symbol
		centerY: 350,
		angle: 0,									// initial angle to rotate
		backgroundColor: 'transparent',				// color behide symbol
		bgShadowBlur: 0,							// amount of pixels for shadow width
		bgShadowColor: 'rgba(0, 0, 0, 0)',			// color of shadow
		bgShadowOffsetX: 0,							// amount of horizontal pixels for shadow gap
		bgShadowOffsetY: 0,							// amount of vertical pixels for shadow gap
		color: 'black',								// fill color for symbol
		outlineColor: 'transparent',				// stroke color of symbol
		outlineWidth: 0,							// stroke width around symbol
		// rotationsPerSecond: 0,//0.2,				// number of revolution each second
		interval: 1,//1000/60,
		rotationDegree: 18,
		// animate: false//true
	};
	for (var p in props) {		// merge given config with default properties
		this[p] = (typeof config === "undefined" || typeof config[p] === undefined || typeof config[p] === "undefined") ? props[p] : config[p];
	}
	if (!this.canvas)
		throw new Error('canvas failed for Taiji');
/*	if (!this.color[0] && this.color)
		this.color = [this.color];*/
	for (var p in this) {
		if (p && typeof(this[p]) === 'string'  && this[p].indexOf('%') == this[p].length-1) {
			var pc = this[p].split('%');
			if (!isNaN(pc[0]))
				this[p] = this.radius / 100 * pc[0];
		}
	}
	// this.init();		// initialise the transformation
	// context.save();
	this.revolve();
	// context.restore();
}

Swastika.prototype.init = function()
{
	// if (typeof config === "object") {
	// }
	with (this) {
		this.context = canvas.getContext('2d');
//		this.context = canvas.getContext('2d', { /*alpha: false*/ });
		//this.length = (2 * Math.sqrt(/*(*/radius * radius/*)*/ / 2)) /*- corner*/;
		context.save();
		this.length = Draw.getLargestSquareSideInCircle(radius);
		context.shadowBlur = bgShadowBlur;
		context.shadowColor = bgShadowColor;
		context.shadowOffsetX = bgShadowOffsetX;
		context.shadowOffsetY = bgShadowOffsetY;
		//colorMode(HSB,circles,100,100);//change the color mode to HSB (hue,saturation,brightness) - makes it easy to color rainbows, just change the hue
/*		context.save();
		clear();		// paint background
		context.setTransform(1, 0, 0, 1, 0, 0);		// reset drawing matrix
		context.translate(centerX, centerY);		// all drawings use 0, 0 as center
		draw(angle);
		context.translate(-centerX, -centerY);
		//context.setTransform(1, 0, 0, 1, 0, 0);
		if (rotationsPerSecond || animate)
			//window.requestAnimationFrame(doAnimate.bind(this));
			window.requestAnimationFrame(doAnimate(this));
			//var interval = 1000/60;
//			window.setInterval(doAnimate(this), interval);
		context.restore();*/
	}
}

Swastika.prototype.clear = function()
{
	with (this) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
		// context.clip();		// only draw in this area
		if (typeof backgroundColor === 'object' && typeof backgroundColor[1] === 'string') {
			var total = backgroundColor.length, i=0;
			var gradient = context.createRadialGradient(x, y, 1, x, y, radius);
			while (typeof backgroundColor[i] === 'string') {
				gradient.addColorStop(i/total, backgroundColor[i++]);
			}
			context.fillStyle = gradient;
		} else /*if (typeof fillColor === 'string')*/ {
			context.fillStyle = backgroundColor;
		}
//		context.stokeStyle = 'black';
//		context.stroke();
		context.fill();
	}
}

Swastika.prototype.pathArm = function()
{
	with (this) {
		const path = new Path2D();
		// start at bottom-left, go clockwise
		path.moveTo(
			0 - (armWidth/2),
			0 - (armWidth/2));		// draw from top-left corner, before the corner-radius -clockwise
		path.lineTo(
			0 - (armWidth/2),
			0 - (length/2) + armWidth);	// vertical inner off-center

		path.arcTo(		// draw horizontal line then curve up
			0 - (length/2),
			0 - (length/2) + armWidth,
			0 - (length/2),
			0 - (length/2) + corner,
			corner);	// top-left inner corner
		path.arcTo(		// comoplete going up then curve over top
			0 - (length/2),
			0 - (length/2),
			0 - (length/2) + corner,
			0 - (length/2),
			corner);		// top-left curved corner
		path.arcTo(		// complete horizontal line then curve down
			(armWidth/2),
			0 - (length/2),
			(armWidth/2),
			0 - (length/2) + (armWidth/2) + corner,
			corner);	// outer top-off-center corner
		path.lineTo(		// complete open segement with vertical line
			(armWidth/2),
			0 - (armWidth/2));
		return path;
	}
}

Swastika.prototype.drawParts = function(angle)
{
	with (this) {
		context.beginPath();
//		context.setTransform(1, 0, 0, 1, centerX, centerY);
		var step = 90 * (Math.PI / 180), m = new DOMMatrix(), path = new Path2D(pathArm());
		console.log(path);
		m.a = 1;//m11
		m.b = 0;//m12
		m.c = 0;//m21
		m.d = 1;//m22
		m.e = centerX;//m41
		m.f = centerY;//m42
//		context.rotate(angle);		// revolve the coordinate matrix to the specific angle
/*		if (typeof color !== 'undefined' && typeof color !== 'string' && typeof color[1] !== 'undefined') {
			var total = color.length, i=0;
			var gradient = context.createRadialGradient(0, 0, 1, 0, 0, radius);
			while (typeof color[i] === 'string') {
				gradient.addColorStop(i/total, color[i++]);
			}
			context.fillStyle = gradient;
		} else / *if (typeof fillColor === 'string')* / {*/
			context.fillStyle = color;
/*		}*/
		m = m.rotateSelf(angle);
		for (var i=3; i<4; i++) {	// rotate shape for other arms
//		for (var i=0; i<4; i++) {	// rotate shape for other arms
//			context.fill(pathArm());
			path.addPath(path, m);
			m = m.rotateSelf(angle);
//			context.rotate(step);
		}
//		context.setTransform(1, 0, 0, 1, 0, 0);
		context.fill(path);
		console.log(`Swastika at ${centerX},${centerY} of ${radius} size ${length} in ${context.fillStyle}: ${context.getTransform()}`);
	}
}

Swastika.prototype.pathWhole = function()
{
	with (this) {
		const path = new Path2D();
		// start at bottom-left, go clockwise
		path.moveTo(
			0 - (armWidth/2),
			0 - (armWidth/2));		// draw from top-left corner, before the corner-radius -clockwise
		path.lineTo(
			0 - (armWidth/2),
			0 - (length/2) + armWidth);	// vertical inner off-center

		path.arcTo(		// draw horizontal line then curve up
			0 - (length/2),
			0 - (length/2) + armWidth,
			0 - (length/2),
			0 - (length/2) + corner,
			corner);	// top-left inner corner
		path.arcTo(		// comoplete going up then curve over top
			0 - (length/2),
			0 - (length/2),
			0 - (length/2) + corner,
			0 - (length/2),
			corner);		// top-left curved corner
		path.arcTo(		// complete horizontal line then curve down
			(armWidth/2),
			0 - (length/2),
			(armWidth/2),
			0 - (length/2) + (armWidth/2) + corner,
			corner);	// outer top-off-center corner
		path.lineTo(		// complete open segement with vertical line
			(armWidth/2),
			0 - (armWidth/2));
//2  x +  y +
		path.lineTo(
			(length/2) - armWidth,
			0 - (armWidth/2));	// vertical inner off-center

		path.arcTo(		// draw horizontal line then curve up
			(length/2) - armWidth,
			0 - (length/2),
			(length/2) - armWidth + corner,
			0 - (length/2),
			corner);	// top-left inner corner
		path.arcTo(		// comoplete going up then curve over top
			(length/2),
			0 - (length/2),
			(length/2),
			0 - (length/2) + corner,
			corner);		// top-left curved corner
		path.arcTo(		// complete horizontal line then curve down
			(length/2),
			(armWidth/2),
			(length/2) - corner,
			(armWidth/2),
			corner);	// outer top-off-center corner
		path.lineTo(		// complete open segement with vertical line
			(armWidth/2),
			(armWidth/2));
//3  x +  y -
		path.lineTo(
			(armWidth/2),
			(length/2) - armWidth);	// vertical inner off-center

		path.arcTo(		// draw horizontal line then curve up
			(length/2),
			(length/2) - armWidth,
			(length/2),
			(length/2) - armWidth + corner,
			corner);	// top-left inner corner
		path.arcTo(		// comoplete going up then curve over top
			(length/2),
			(length/2),
			(length/2) - corner,
			(length/2),
			corner);		// top-left curved corner
		path.arcTo(		// complete horizontal line then curve down
			0 - (armWidth/2),
			(length/2),
			0 - (armWidth/2),
			(length/2) - corner,
			corner);	// outer top-off-center corner
		path.lineTo(		// complete open segement with vertical line
			0 - (armWidth/2),
			(armWidth/2));
//4  x -  y -
		path.lineTo(
			0 - (length/2) + armWidth,
			(armWidth/2));	// vertical inner off-center

		path.arcTo(		// draw horizontal line then curve up
			0 - (length/2) + armWidth,
			(length/2),
			0 - (length/2) + armWidth - corner,
			(length/2),
			corner);	// top-left inner corner
		path.arcTo(		// comoplete going up then curve over top
			0 - (length/2),
			(length/2),
			0 - (length/2),
			(length/2) - corner,
			corner);		// top-left curved corner
		path.arcTo(		// complete horizontal line then curve down
			0 - (length/2),
			0 - (armWidth/2),
			0 - (length/2) + corner,
			0 - (armWidth/2),
			corner);	// outer top-off-center corner
		path.lineTo(		// complete open segement with vertical line
			0 - (armWidth/2),
			0 - (armWidth/2));

//		path.closePath();
		return path;
	}
}

Swastika.prototype.draw = function(ang)
{
	with (this) {
		context.beginPath();
		if (typeof ang !== 'undefined') {
			context.rotate(ang);
		}
		if (typeof color === 'object' && typeof color[1] === 'string') {
			var total = color.length, i=0;
			var gradient = context.createRadialGradient(0, 0, 1, 0, 0, radius);
			while (typeof color[i] === 'string') {
				gradient.addColorStop(i/total, color[i++]);
			}
			context.fillStyle = gradient;
		} else /*if (typeof fillColor === 'string')*/ {
			context.fillStyle = color;
		}
		if (outlineColor && outlineColor != "transparent") {
			context.strokeStyle = outlineColor;
			if (outlineWidth)
				context.lineWidth = outlineWidth
			context.stroke();
			context.closePath();
		}
		context.fill(pathWhole());
//		console.log(`Swastika at ${centerX},${centerY}(${Draw.degrees(ang)}) radius: ${radius} : ${length} in ${context.fillStyle}: ${context.getTransform()}`);
	}
}

Swastika.prototype.doAnimate = function(that)
{
//	with (this) {
	with (that) {
//	with (Swastika) {
		console.log(`animate Swastika`);
		clear();
		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
//		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

//		time = frame++ * (1000 / 60);   // Assumes 60 fps
//		var ang = ((time * Math.PI * 2) / 1000) * rotationsPerSecond;
		//console.log(`animate Swastika at ${time} is ${ang}`);
		draw(rotationsPerSecond * 50);
//		element.style.transform = `translateX(${count}px)`;

//		requestAnimationFrame(doAnimate(that));  // request next frame
		window.setInterval(that.doAnimate(that), 1500);
	}
}

Swastika.prototype.revolve = function(ang)
{
	//var canvas = document.getElementById('canvasCenter');
	//var context = canvas.getContext('2d')
	with (this) {
		//console.log(`Swastika revolve by ${Draw.degrees(ang)}`);
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		this.init();
		clear();
		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
		draw(ang);
		context.restore();
	}
}
