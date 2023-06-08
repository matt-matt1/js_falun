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
		debug: false
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

CurvedSwastika.prototype.init = function()
{
	// if (typeof config === "object") {
	// }
	// with (this) {
		this.context = this.canvas.getContext('2d'/*, { alpha: false }*/);
		this.context.save();
/*		context = canvas.getContext('2d');
		context.save();
		clear();		// paint background
		context.setTransform(1, 0, 0, 1, 0, 0);		// reset drawing matrix
		context.translate(centerX, centerY);		// all drawings use 0, 0 as center
*/		//this.length = (2 * Math.sqrt(/*(*/radius * radius/*)*/ / 2)) /*- corner*/;
		this.length = Draw.getLargestSquareSideInCircle(this.radius);
/*		context.shadowBlur = shadowBlur;
		context.shadowColor = shadowColor;
		context.shadowOffsetX = shadowOffsetX;
		context.shadowOffsetY = shadowOffsetY;*/
/*		draw(angle);
//		context.translate(-centerX, -centerY);
		//context.setTransform(1, 0, 0, 1, 0, 0);
		context.restore();*/
	// }
}

CurvedSwastika.prototype.clear = function()
{
	// with (this) {
		this.context.shadowBlur = 0;
		this.context.shadowColor = 'transparent';
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		// context.outlineColor = 'transparent';
		// context.outlineWidth = 0;
		this.context.beginPath();
		this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
		// this.context.clip();		// only draw in this area
		if (typeof this.backgroundColor === 'object' && typeof this.backgroundColor[1] === 'string') {
			var total = this.backgroundColor.length, i=0;
			var gradient = this.context.createRadialGradient(x, y, 1, x, y, this.radius);
			while (typeof this.backgroundColor[i] === 'string') {
				gradient.addColorStop(i/total, this.backgroundColor[i++]);
			}
			this.context.fillStyle = gradient;
		} else /*if (typeof fillColor === 'string')*/ {
			this.context.fillStyle = this.backgroundColor;
		}
		if (base.backgroundColor) {
			this.context.fillStyle = base.backgroundColor;
		}
		this.context.fill();
		if (typeof this.debug !== 'undefined' && this.debug) {
			this.context.moveTo(this.centerX, this.centerY - this.radius);
			this.context.lineTo(this.centerX, this.centerY + this.radius);
			this.context.moveTo(this.centerX - this.radius,	this.centerY);
			this.context.lineTo(this.centerX + this.radius,	this.centerY);
			this.context.stokeStyle = 'black';
			this.context.stroke();
			this.context.closePath();
		}
		// context.restore();
	// }
}


/***** |||| unused |||| ******/

CurvedSwastika.prototype.pathArm = function()
{
	// with (this) {
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
	// }
}
CurvedSwastika.prototype.drawArms = function(angle)
{
	// with (this) {
		this.context.beginPath();
		var step = 90 * (Math.PI / 180);
		this.context.setTransform(1, 0, 0, 1, this.centerX, this.centerY);
		this.context.rotate(angle);		// revolve the coordinate matrix to the specific angle
/*		if (typeof color !== 'undefined' && typeof color !== 'string' && typeof color[1] !== 'undefined') {
			var total = color.length, i=0;
			var gradient = context.createRadialGradient(0, 0, 1, 0, 0, radius);
			while (typeof color[i] === 'string') {
				gradient.addColorStop(i/total, color[i++]);
			}
			context.fillStyle = gradient;
		} else / *if (typeof fillColor === 'string')* / {*/
			this.context.fillStyle = this.color;
/*		}*/
		for (var i=0; i<4; i++) {	// rotate shape for other 3 faces
			this.context.fill(pathArm());
			this.context.rotate(step);
		}
		if (outlineWidth) {
			this.context.lineWidth = outlineWidth;
			if (this.outlineColor && this.outlineColor != "transparent")
				this.context.strokeStyle = this.outlineColor
			this.context.stroke();
			this.context.closePath();
		}
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		console.log(`CurvedSwastika at ${this.centerX},${this.centerY} of ${this.radius} size in ${this.context.fillStyle}:${this.context.getTransform()}`);
	// }
}

/***** ^^^^ unused ^^^ ******/


CurvedSwastika.prototype.pathWhole = function()
{
	// with (this) {		// NOTE: A vector {x,y} can be rotated 90 deg clockwise {-y,x} or anti clockwise {y,-x}
		const path = new Path2D();
		path.moveTo(
			0 - (this.armWidth/2),				0 - (this.armWidth/2));		// draw from bottom-left corner, clockwise
		path.lineTo(
			0 - (this.armWidth/2),				0 - (this.length/2) + this.armWidth);	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			0 - (this.armWidth/2),				0 - (this.length/2) - (this.armWidth/2),
			0 - (this.length/2) /*- (armWidth/2)*/,		0 - (this.length/2) + (this.armWidth/2),
			0 - (this.length/2) - (this.armWidth/3),	0 - (this.length/2) + this.armWidth);		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			0 - (this.length/2) + (this.armWidth/2),	0 - (this.length/2) - this.armWidth*1.3,
		 this.armWidth*1.3,					0 - (this.length/2) - this.armWidth,
			(this.armWidth/2),					0 - (this.length/2) + 2.3*this.armWidth		// top-left curved corner
		);

		path.lineTo(
			(this.armWidth/2),					0 - (this.length/2) + this.armWidth);
		path.lineTo(		// complete open segement with vertical line
			(this.armWidth/2),					0 - (this.armWidth/2));

//2
		path.lineTo(
			(this.length/2) - this.armWidth,			0 - (this.armWidth/2));	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			(this.length/2) + (this.armWidth/2),		0 - (this.armWidth/2),
			(this.length/2) - (this.armWidth/2),		0 - (this.length/2) /*- (armWidth/2)*/,
			(this.length/2) - this.armWidth,			0 - (this.length/2) - (this.armWidth/3));		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			(this.length/2) + this.armWidth*1.3,		0 - (this.length/2) + (this.armWidth/2),
			(this.length/2) + this.armWidth,		 this.armWidth*1.3,
			(this.length/2) - 2.3*this.armWidth,		(this.armWidth/2)						// top-left curved corner
		);

		path.lineTo(
			(this.length/2) - this.armWidth,			(this.armWidth/2));
		path.lineTo(		// complete open segement with vertical line
			(this.armWidth/2),					(this.armWidth/2));

//3
		path.lineTo(
			(this.armWidth/2),					(this.length/2) - this.armWidth);	// vertical inner off-center

		//under-arm
		path.bezierCurveTo(
			(this.armWidth/2),					(this.length/2) + (this.armWidth/2),
			(this.length/2) /*+ (this.armWidth/2)*/,		(this.length/2) - (this.armWidth/2),
			(this.length/2) + (this.armWidth/3),		(this.length/2) - this.armWidth);		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			(this.length/2) - (this.armWidth/2),		(this.length/2) + this.armWidth*1.3,
			0 - this.armWidth*1.3,				(this.length/2) + this.armWidth,
			0 - (this.armWidth/2),				(this.length/2) - 2.3*this.armWidth		// top-left curved corner
		);

		path.lineTo(		// complete open segement with vertical line
			0 - (this.armWidth/2),			(this.length/2) - this.armWidth);
		path.lineTo(		// complete open segement with vertical line
			0 - (this.armWidth/2),			(this.armWidth/2));

//4
		path.lineTo(
			0 - (this.length/2) + this.armWidth,				(this.armWidth/2));	// vertical inner off-center

			//under-arm
		path.bezierCurveTo(
			0 - (this.length/2) - (this.armWidth/2),	(this.armWidth/2),
			0 - (this.length/2) + (this.armWidth/2),		(this.length/2) /*+ (armWidth/2)*/,
			0 - (this.length/2) + this.armWidth,		(this.length/2) + (this.armWidth/3));		// draw from top-left corner, before the corner-radius -clockwise

		// top
		path.bezierCurveTo(
			0 - (this.length/2) - this.armWidth*1.3,	(this.length/2) - (this.armWidth/2),
			0 - (this.length/2) - this.armWidth,		0 - this.armWidth*1.3,
			0 - (this.length/2) + 2.3*this.armWidth,	0 - (this.armWidth/2)		// top-left curved corner
		);
/**/
		path.lineTo(		// complete open segement with vertical line
		0 - (this.length/2) + this.armWidth,			0 - (this.armWidth/2));

/*		path.lineTo(		// complete open segement with vertical line
			0 - (length/2) + (armWidth/2),			0 - (armWidth/2));
*/		path.closePath();
		return path;
	// }
}

CurvedSwastika.prototype.draw = function(ang)
{
	// with (this) {
//		context.beginPath();
		if (typeof ang !== 'undefined') {
			this.context.rotate(ang);
		}
		if (typeof this.color === 'object' && typeof this.color[1] === 'string') {
			var total = this.color.length, i=0;
			var gradient = this.context.createRadialGradient(0, 0, 1, 0, 0, radius);
			while (typeof this.color[i] === 'string') {
				gradient.addColorStop(i/total, this.color[i++]);
			}
			this.context.fillStyle = gradient;
		} else /*if (typeof fillColor === 'string')*/ {
			this.context.fillStyle = this.color;
		}
		this.context.fill(this.pathWhole());
//		console.log(`CurvedSwastika at ${centerX},${centerY}:(${Draw.degrees(ang)}) radius:${radius} in ${context.fillStyle}:${context.getTransform()}`);
	// }
}

CurvedSwastika.prototype.revolve = function(ang)
{
	// with (this) {
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		this.init();
		// context.save();
		this.clear();
		this.context.setTransform(1, 0, 0, 1, this.centerX, this.centerY);		// reset drawing matrix
		this.draw(ang);
		this.context.restore();
	// }
}