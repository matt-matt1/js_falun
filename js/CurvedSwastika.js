/**
 * Draw a Taiji (Yin-Yang Symbol)
 */
function CurvedSwastika(config)
{
	var props = {									// default propertie
		canvas: document.querySelector('canvas'),	// if not supplied, uses the first canvas
		armWidth: 10,								// width of each section
		radius: 4,									// size of circle that contains it
		centerX: 350,								// center of symbol
		centerY: 350,
		angle: 0,//Math.PI * .5,					// initial angle to rotate
		shadowBlur: 0,								// amount of pixels for shadow width
		shadowColor: 'rgba(0, 0, 0, 0)',			// color of shadow
		shadowOffsetX: 0,							// amount of horizontal pixels for shadow gap
		shadowOffsetY: 0,							// amount of vertical pixels for shadow gap
		color: 'black',								// fill color for symbol
		backgroundColor: 'transparent',				// color behide symbol
		outlineColor: 'transparent',				// stroke color of symbol
		outlineWidth: 0,							// stroke width around symbol
		// rotationsPerSecond: 0,//0.2,				// number of revolution each second
		interval: 1,
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
	this.init();		// initialise the transformation
	// context.save();
	this.revolve();
	// context.restore();
}

CurvedSwastika.prototype.init = function()
{
	// if (typeof config === "object") {
	// }
	with (this) {
		this.context = canvas.getContext('2d'/*, { alpha: false }*/);
		context.save();
/*		context = canvas.getContext('2d');
		context.save();
		clear();		// paint background
		context.setTransform(1, 0, 0, 1, 0, 0);		// reset drawing matrix
		context.translate(centerX, centerY);		// all drawings use 0, 0 as center
*/		//this.length = (2 * Math.sqrt(/*(*/radius * radius/*)*/ / 2)) /*- corner*/;
		this.length = Draw.getLargestSquareSideInCircle(radius);
/*		context.shadowBlur = shadowBlur;
		context.shadowColor = shadowColor;
		context.shadowOffsetX = shadowOffsetX;
		context.shadowOffsetY = shadowOffsetY;*/
/*		draw(angle);
//		context.translate(-centerX, -centerY);
		//context.setTransform(1, 0, 0, 1, 0, 0);
		context.restore();*/
	}
}

CurvedSwastika.prototype.clear = function()
{
	with (this) {
		context.shadowBlur = 0;
/*		context.shadowColor = 'transparent';
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.outlineColor = 'transparent';*/
		context.outlineWidth = 0;
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, Math.PI * 2);
		context.clip();		// only draw in this area
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
		if (base.backgroundColor) {
			context.fillStyle = base.backgroundColor;
		}
		context.fill();
/*		context.moveTo(centerX, centerY - radius);
		context.lineTo(centerX, centerY + radius);
		context.moveTo(centerX - radius, centerY);
		context.lineTo(centerX + radius, centerY);
		context.stokeStyle = 'black';
		context.stroke();*/
		// context.restore();
	}
}


/***** |||| unused |||| ******/

CurvedSwastika.prototype.pathArm = function()
{
	with (this) {
		const path = new Path2D();
		path.moveTo(
			0 - armLength + (armWidth/2),	0 - armLength + armWidth*2/*1.5*/);		// draw from top-left corner, before the corner-radius -clockwise
		// top
		/*path.bezierCurveTo(
			0 - armLength + 2*armWidth,
			0 - armLength,
			armWidth,
			0 - armLength + (armWidth/2),
			(armWidth/2),
			0 - armLength + 2.5*armWidth		// top-left curved corner
		);*/
		path.bezierCurveTo(
			0 - armLength + 2*armWidth,		0 - armLength - (armWidth/4),
			armWidth,						0 - armLength + (armWidth/4),
			(armWidth/2),					0 - armLength + 2.5*armWidth		// top-left curved corner
		);

		path.lineTo(
			(armWidth/2),
			0);
		path.lineTo(
			0 - (armWidth/2),
			0);
/*		path.lineTo(
			(armWidth/2),					0 - (armWidth/2));	// vertical outer towards center

		// base
		path.lineTo(0, 0);	// horizontal part bottom
		path.lineTo(
			0 - (armWidth/2),				0 - (armWidth/2));	// slant part bottom
*/
		path.lineTo(
			0 - (armWidth/2),				0 - armLength + (1.5*armWidth)/*+ radius*/);	// vertical inner off-center

		path.bezierCurveTo(
			0 - (armWidth/3),				0 - armLength + armWidth,
			0 - armLength + 1.5*armWidth,	0 - armLength + armWidth*1.5,
			0 - armLength + armWidth,		0 - armLength + armWidth*1.5/*(armWidth/2)*/);		// draw from top-left corner, before the corner-radius -clockwise
		return path;
	}
}
CurvedSwastika.prototype.drawArms = function(angle)
{
	with (this) {
		context.beginPath();
		var step = 90 * (Math.PI / 180);
		context.setTransform(1, 0, 0, 1, centerX, centerY);
		context.rotate(angle);		// revolve the coordinate matrix to the specific angle
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
		for (var i=0; i<4; i++) {	// rotate shape for other 3 faces
			context.fill(pathArm());
			context.rotate(step);
		}
		if (width) {
			context.lineWidth = width;
			if (outlineColor)
				context.strokeStyle = outlineColor
			context.stroke();
		}
		context.setTransform(1, 0, 0, 1, 0, 0);
		console.log(`CurvedSwastika at ${centerX},${centerY} of ${radius} size in ${context.fillStyle}:${context.getTransform()}`);
	}
}

/***** ^^^^ unused ^^^ ******/


CurvedSwastika.prototype.pathWhole = function()
{
	with (this) {		// NOTE: A vector {x,y} can be rotated 90 deg clockwise {-y,x} or anti clockwise {y,-x}
		const path = new Path2D();
		path.moveTo(
			0 - (armWidth/2),				0 - (armWidth/2));		// draw from bottom-left corner, clockwise
		path.lineTo(
			0 - (armWidth/2),				0 - (length/2) + armWidth);	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			0 - (armWidth/2),				0 - (length/2) - (armWidth/2),
			0 - (length/2) /*- (armWidth/2)*/,		0 - (length/2) + (armWidth/2),
			0 - (length/2) - (armWidth/3),	0 - (length/2) + armWidth);		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			0 - (length/2) + (armWidth/2),	0 - (length/2) - armWidth*1.3,
			armWidth*1.3,					0 - (length/2) - armWidth,
			(armWidth/2),					0 - (length/2) + 2.3*armWidth		// top-left curved corner
		);

		path.lineTo(
			(armWidth/2),					0 - (length/2) + armWidth);
		path.lineTo(		// complete open segement with vertical line
			(armWidth/2),					0 - (armWidth/2));

//2
		path.lineTo(
			(length/2) - armWidth,			0 - (armWidth/2));	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			(length/2) + (armWidth/2),		0 - (armWidth/2),
			(length/2) - (armWidth/2),		0 - (length/2) /*- (armWidth/2)*/,
			(length/2) - armWidth,			0 - (length/2) - (armWidth/3));		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			(length/2) + armWidth*1.3,		0 - (length/2) + (armWidth/2),
			(length/2) + armWidth,			armWidth*1.3,
			(length/2) - 2.3*armWidth,		(armWidth/2)						// top-left curved corner
		);

		path.lineTo(
			(length/2) - armWidth,			(armWidth/2));
		path.lineTo(		// complete open segement with vertical line
			(armWidth/2),					(armWidth/2));

//3
		path.lineTo(
			(armWidth/2),					(length/2) - armWidth);	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			(armWidth/2),					(length/2) + (armWidth/2),
			(length/2) /*+ (armWidth/2)*/,		(length/2) - (armWidth/2),
			(length/2) + (armWidth/3),		(length/2) - armWidth);		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			(length/2) - (armWidth/2),		(length/2) + armWidth*1.3,
			0 - armWidth*1.3,				(length/2) + armWidth,
			0 - (armWidth/2),				(length/2) - 2.3*armWidth		// top-left curved corner
		);

		path.lineTo(		// complete open segement with vertical line
			0 - (armWidth/2),			(length/2) - armWidth);
		path.lineTo(		// complete open segement with vertical line
			0 - (armWidth/2),			(armWidth/2));

//4
		path.lineTo(
			0 - (length/2) + armWidth,				(armWidth/2));	// vertical inner off-center

			//under-arm
		path.bezierCurveTo(
			0 - (length/2) - (armWidth/2),	(armWidth/2),
			0 - (length/2) + (armWidth/2),		(length/2) /*+ (armWidth/2)*/,
			0 - (length/2) + armWidth,		(length/2) + (armWidth/3));		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			0 - (length/2) - armWidth*1.3,	(length/2) - (armWidth/2),
			0 - (length/2) - armWidth,		0 - armWidth*1.3,
			0 - (length/2) + 2.3*armWidth,	0 - (armWidth/2)		// top-left curved corner
		);
/**/
		path.lineTo(		// complete open segement with vertical line
		0 - (length/2) + armWidth,			0 - (armWidth/2));

/*		path.lineTo(		// complete open segement with vertical line
			0 - (length/2) + (armWidth/2),			0 - (armWidth/2));
*/		path.closePath();
		return path;
	}
}

CurvedSwastika.prototype.draw = function(ang)
{
	with (this) {
//		context.beginPath();
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
		context.fill(pathWhole());
//		console.log(`CurvedSwastika at ${centerX},${centerY}:(${Draw.degrees(ang)}) radius:${radius} in ${context.fillStyle}:${context.getTransform()}`);
	}
}

CurvedSwastika.prototype.revolve = function(ang)
{
	with (this) {
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		this.init();
		// context.save();
		clear();
		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
		draw(ang);
		context.restore();
	}
}