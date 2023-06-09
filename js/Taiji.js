/**
 * Draw a Taiji (Yin-Yang Symbol)
 * any numerical parameter can be expressed an a percentage of the whole radius
 */
function Taiji(config)
{
	var props = {									// default propertie
		canvas: document.querySelector('canvas'),	// if not set the first canvas is used
		radius: 50,									// size of Taiji from center to perimeter in pixels
		centerX: 200,								// x co-ordinate of center
		centerY: 200,								// y co-ordinate of center
		angle: 0,									// initial angle in radians eg. Math.PI * .5 - optional
		outlineColor: 'transparent',				// color of the outmost shell - optional
		outlineWidth: false,						// thickness of the outmost shell - optional
		positiveColor: 'black',						// primary color(s)
		negativeColor: 'white',						// secondary color(s)
		positiveInnerRadius: '20%',					// radius of dot within positive area - default is 20% of the whole radius
		negativeInnerRadius: '20%',					// radius of dot within negative area - default is 20% of the whole radius
		positiveInnerColor: 'white',				// color(s) of positive dot - optional
		negativeInnerColor: 'black',				// color(s) of negative dot - optional
		positiveInnerOutlineColor: 'transparent',	// color(s) of perimeter around positive dot - optional
		negativeInnerOutlineColor: 'transparent',	// color(s) of perimeter around negative dot - optional
		positiveInnerOulineWidth: 0,				// thickness of perimeter around the positive dot - optional
		negativeInnerOulineWidth: 0,				// thickness of perimeter around the negative dot - optional
		shadowBlur: 0,								// amount of pixels for shadow width
		shadowColor: 'rgba(0, 0, 0, 0)',			// color of shadow
		shadowOffsetX: 0,							// amount of horizontal pixels for shadow gap
		shadowOffsetY: 0,							// amount of vertical pixels for shadow gap
//		dividerWidth: false,
//		dividerColor: [],
		// rotationsPerSecond: 0,//0.2,					// number of times a full circle is made for each second - optional
		interval: 1,
		rotationDegree: 18,
		// animate: false//true
	};
	for (var p in props) {		// merge given config with default properties
		this[p] = (typeof config === "undefined" || typeof config[p] === undefined || typeof config[p] === "undefined") ? props[p] : config[p];
	}
	if (!this.canvas)
		throw new Error('canvas failed for Taiji');
	for (var p in this) {
		if (p && typeof(this[p]) === 'string' && this[p].indexOf('%') == this[p].length-1) {
			var pc = this[p].split('%');
//			if (Number.isInteger(pc[0]))
//			if (typeof pc[0] === 'number')
			if (!isNaN(pc[0]))
				this[p] = this.radius / 100 * pc[0];
		}
	}
	this.context = this.canvas.getContext('2d'/*, { alpha: false }*/);
	// context.save();
	// this.init();		// initialise the transformation
	this.revolve();
	// context.restore();
}

Taiji.prototype.init = function()
{
	// if (typeof config === "object") {
	// }
	with (this) {
		this.context.save();
		this.context.shadowBlur = this.shadowBlur;
		this.context.shadowColor = this.shadowColor;
		this.context.shadowOffsetX = this.shadowOffsetX;
		this.context.shadowOffsetY = this.shadowOffsetY;
	}
}

Taiji.prototype.clear = function()
{
	// with (this) {
		this.context.beginPath();
		if (typeof this.positiveColor !== 'undefined') {
			if (typeof this.positiveColor === 'object' && typeof pthis.ositiveColor[1] === 'string') {
				var total = this.positiveColor.length, i=0;
				var gradient = this.context.createRadialGradient(this.centerX, this.centerY, 1,	this.centerX, this.centerY, this.radius);
				while (typeof positiveColor[i] === 'string') {
					gradient.addColorStop(i/total, this.positiveColor[i++]);
				}
				this.context.fillStyle = gradient;
			} else /*if (typeof fillColor === 'string')*/ {
				this.context.fillStyle = this.positiveColor;
			}
		}
		if (this.outlineWidth)
			this.context.lineWidth = this.outlineWidth;
		this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
		// this.context.clip();		// only draw in this area
		this.context.fill();
	//	if (!outlineColor)
	//		outlineColor = transparent;
/*		if (outlineColor) {
			if (typeof outlineColor === 'object' && typeof outlineColor[1] !== 'undefined') {
				outlineColor = outlineColor[0];
			}
			context.strokeStyle = outlineColor;
			context.stroke();
			if (typeof fillColor === 'undefined')
				context.closePath();
			context.stroke();
		}*/
	// }
}

Taiji.prototype.draw = function(ang)
{
	// with (this) {
/*		if (typeof negativeColor !== 'undefined' && typeof negativeColor !== 'string' && typeof negativeColor[1] !== 'undefined') {
			var total = negativeColor.length, i=0;
			var gradient = context.createRadialGradient(centerX, centerY, 1, centerX, centerY, radius);
			while (typeof negativeColor[i] !== 'undefined') {
				gradient.addColorStop(i/total, negativeColor[i++]);
			}
			context.fillStyle = gradient;
		} else {*/
			this.context.fillStyle = this.negativeColor;
/*		}*/
		this.context.setTransform(1, 0, 0, 1, this.centerX, this.centerY);
		if (typeof ang !== 'undefined') {
			this.context.rotate(ang);		// revolve the coordinate matrix to the specific angle
		}
		this.context.beginPath();
		this.context.arc(0, 0, this.radius, -Math.PI * .5, Math.PI * .5);		// draw semi-circle
		this.context.fill();
//		Draw.circle(0, 0 - radius / 2, radius / 2, positiveColor);
		this.context.beginPath();
		this.context.arc(0, 0 - this.radius / 2, this.radius / 2, 0, Math.PI * 2);		// draw semi-circle
		this.context.fillStyle = this.positiveColor;
		this.context.fill();
//		Draw.circle(0, 0 + radius / 2, radius / 2, negativeColor);
		this.context.beginPath();
		this.context.arc(0, 0 + this.radius / 2, this.radius / 2, 0, Math.PI * 2);		// draw semi-circle
		this.context.fillStyle = this.negativeColor;
		this.context.fill();
//		Draw.circle(0, 0 - radius / 2, positiveInnerRadius, positiveInnerColor, positiveInnerOutlineColor, positiveInnerOulineWidth);
		this.context.beginPath();
		this.context.arc(0, 0 - this.radius / 2, this.positiveInnerRadius, 0, Math.PI * 2);		// draw semi-circle
		this.context.fillStyle = this.positiveInnerColor;
		if (this.positiveInnerOutlineColor && this.positiveInnerOulineWidth) {
			this.context.strokeStyle = this.positiveInnerOutlineColor;
			this.context.lineWidth = this.positiveInnerOulineWidth;
			this.context.stroke();
		}
		this.context.fill();
//		Draw.circle(0, 0 + radius / 2, negativeInnerRadius, negativeInnerColor, negativeInnerOutlineColor, negativeInnerOulineWidth);
		this.context.beginPath();
		this.context.arc(0, 0 + this.radius / 2, this.negativeInnerRadius, 0, Math.PI * 2);		// draw semi-circle
		this.context.fillStyle = this.negativeInnerColor;
		if (this.negativeInnerOutlineColor && this.negativeInnerOulineWidth) {
			this.context.strokeStyle = this.negativeInnerOutlineColor;
			this.context.lineWidth = this.negativeInnerOulineWidth;
			this.context.stroke();
		}
		this.context.fill();
		if (this.outlineColor && this.outlineColor != "transparent" && this.outlineWidth) {
//			Draw.circle(context, 0, 0, radius, 'transparent', outlineColor, outlineWidth);
			this.context.beginPath();
			this.context.arc(0, 0, this.radius, 0, Math.PI * 2);		// draw semi-circle
			this.context.fillStyle = 'transparent';
			this.context.strokeStyle = this.outlineColor;
			this.context.lineWidth = this.outlineWidth;
			this.context.stroke();
			this.context.closePath();
		}
		// context.setTransform(1, 0, 0, 1, 0, 0);
//		console.log(`Taiji at ${centerX},${centerY} of ${radius} size in ${context.fillStyle}:${context.getTransform()}`);
	// }
}

Taiji.prototype.revolve = function(ang)
{
	// with (this) {
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		this.init();
		// context.save();
		this.clear();
//		context.setTransform(1, 0, 0, 1, centerX, centerY);		// reset drawing matrix
		this.draw(ang);
		this.context.restore();
	// }
}

Taiji.prototype.rotateMe = function(ang, aroundX, aroundY)
{
	// with (this) {
/*		if (typeof radius === "undefined") {
			this.init();
		}*/
		this.init();
		// context.save();
		this.clear();
		this.centerX = aroundX;
		this.centerY = aroundY;
		this.context.setTransform(1, 0, 0, 1, aroundX, aroundY);		// reset drawing matrix
		this.draw(ang);
		this.context.restore();
	// }
}