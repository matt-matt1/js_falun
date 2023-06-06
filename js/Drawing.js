/**
 * Drawing tools
 */
function Drawing(canvas)
{
	if (!canvas)
		canvas = document.querySelector('canvas')
/*	if (canvas) {*/
		this.canvas = canvas
		this.context = canvas.getContext('2d');
/*	}*/
/*	var props = {								// default propertie
		canvas: document.querySelector('canvas'),
		radius: 50,
		//centerX: canvas.width / 2,
		centerX: 200,
		//centerY: canvas.height / 2,
		centerY: 200,
		angle: Math.PI * .5,
		outlineColor: 'red',
		outlineWidth: false,
		positiveColor: ['black'],
		negativeColor: ['white'],
		positiveWidth: false,
		negativeWidth: false,
		positiveInnerRadius: '20%',//5,
		negativeInnerRadius: '20%',//5,
		positiveInnerColor: ['red'],
		negativeInnerColor: ['red'],
		positiveInnerWidth: 2,
		negativeInnerWidth: 2,
		dividerWidth: false,
		dividerColor: [],
		animate: false//true
	};
	for (var p in props) {		// merge given config with default properties
		this[p] = (typeof config === "undefined" || typeof config[p] === undefined || typeof config[p] === "undefined") ? props[p] : config[p];
	}
	if (!this.canvas)
		throw new Error('canvas failed for Taiji');
	if (!this.positiveColor[0] && this.positiveColor)
		this.positiveColor = [this.positiveColor];
	if (!this.negativeColor[0] && this.negativeColor)
		this.negativeColor = [this.negativeColor];
	if (!this.positiveInnerColor[0] && this.positiveInnerColor)
		this.positiveInnerColor = [this.positiveInnerColor];
	if (!this.negativeInnerColor[0] && this.negativeInnerColor)
		this.negativeInnerColor = [this.negativeInnerColor];
	for (var p in this) {
		if (p && typeof(this[p]) === 'string'  && this[p].indexOf('%') == this[p].length-1) {
			var pc = this[p].split('%');
//			if (Number.isInteger(pc[0]))
//			if (typeof pc[0] === 'number')
			if (!isNaN(pc[0]))
				this[p] = this.radius / 100 * pc[0];
		}
	}*/
/*	if (positiveInnerRadius && positiveInnerRadius.indexOf(%) === positiveInnerRadius.length-2) {
//		var pc = positiveInnerRadius.substring(0, positiveInnerRadius.length-2);
		var parts = positiveInnerRadius.split('%');
		var pc = parts[0];
		positiveInnerRadius = radius / 100 * pc;
	}
	if (negativeInnerRadius && negativeInnerRadius.indexOf('%') === negativeInnerRadius.length-2) {
		var pc = negativeInnerRadius.split('%');
		negativeInnerRadius = radius / 100 * pc[0];
	}*/
/*	if (!this.centerX)
		this.centerX = this.canvas.width / 2;
	if (!this.centerY)
		this.centerY = this.canvas.height / 2;*/
}

Number.prototype.radians = function(deg)
{
	return deg * (Math.PI / 180);
}
Drawing.prototype.radians = function(deg)
{
	return deg * (Math.PI / 180);
}
/*	with (this) {
		ctx = canvas.getContext('2d');
		positiveCenterX = 0;
		positiveCenterY = -radius / 2;
		negativeCenterX = 0;
		negativeCenterY = radius / 2;*/
/*		if (angle && angle != Math.PI && angle != -Math.PI) {
			positiveCenterX = positiveCenterX + positiveCenterX * Math.cos(angle * (Math.PI/180));
			positiveCenterY = positiveCenterY - positiveCenterY * Math.sin(angle * (Math.PI/180));
			negativeCenterX = negativeCenterX + negativeCenterX * Math.cos(angle * (Math.PI/180));
			negativeCenterY = negativeCenterX - negativeCenterY * Math.sin(angle * (Math.PI/180));
		}*/
/*		draw();
		if (animate)
			window.requestAnimationFrame(doAnimate);
	}
//	if (this.animate)
//		window.requestAnimationFrame(this.animate);
}*/

Drawing.prototype.degrees = function(rad)
{
	return rad / (Math.PI / 180);
}
Number.prototype.degrees = function(rad)
{
	return rad / (Math.PI / 180);
}

Drawing.prototype.getLargestSquareSideInCircle = function(radius)
{
	return side = 2 * Math.sqrt(radius * radius / 2)
}

Drawing.prototype.circle = function(x, y, radius, fillColor, outlineColor, outlineWidth)
{
	this.context.beginPath();
	if (typeof fillColor !== 'undefined') {
		if (typeof fillColor !== 'string' && typeof fillColor[1] !== 'undefined') {
			var total = fillColor.length, i=0;
			var gradient = this.context.createRadialGradient(x, y, 1, x, y, radius);
			while (typeof fillColor[i] === 'string') {
				gradient.addColorStop(i/total, fillColor[i++]);
			}
			this.context.fillStyle = gradient;
		} else /*if (typeof fillColor === 'string')*/ {
			this.context.fillStyle = fillColor;
		}
	}
	if (outlineWidth)
		this.context.lineWidth = outlineWidth;
	this.context.arc(x, y, radius, 0, Math.PI * 2, false);
	this.context.fill();
//	if (!outline)
//		outline = transparent;
	if (outlineColor) {
		if (typeof outlineColor === 'object' && typeof outlineColor[1] !== 'undefined') {
			outlineColor = outlineColor[0];
		}
		this.context.strokeStyle = outlineColor;
		this.context.stroke();
		if (typeof fillColor === 'undefined')
			this.context.closePath();
	}
//	console.log(`circle at ${x},${y} of ${radius} size in ${fillColor}:${this.context.getTransform()}`);
}
/*
Drawing.prototype.draw = function()
{
	with (this) {
//		context.moveTo(this.centerX, this.centerY);
		circle(ctx, centerX, centerY, radius, positiveColor[0]);//, outlineColor, outlineWidth);
//		console.log(`drew circle at ${centerX},${centerY} radius:${radius}`);
		ctx.fillStyle = negativeColor[0];
		ctx.beginPath();
//		ctx.strokeStyle = "red";//"black";
//		context.moveTo(this.x, this.y);
//		context.lineTo(this.origX, this.origY);
//		context.arcTo(this.x, this.y, this.origX, this.origY, 2 * Math.PI/ *this.radius* /);
		ctx.arc(centerX, centerY, radius, -Math.PI * .5, Math.PI * .5, false);		// draw semi-circle
		ctx.fill();
//		ctx.stroke();
		circle(ctx, centerX + positiveCenterX, centerY + positiveCenterY, radius / 2, positiveColor[0], positiveColor[0], positiveWidth);
		circle(ctx, centerX + negativeCenterX, centerY + negativeCenterY, radius / 2, negativeColor[0], negativeColor[0], negativeWidth);
		circle(ctx, centerX - negativeCenterX, centerY - negativeCenterY, radius / 8, negativeColor[0], negativeInnerColor[0], negativeInnerWidth);
		circle(ctx, centerX - positiveCenterX, centerY - positiveCenterY, radius / 8, positiveColor[0], positiveInnerColor[0], positiveInnerWidth);
		circle(ctx, centerX, centerY, radius, 'transparent', outlineColor, outlineWidth);
	}
}

Drawing.prototype.doAnimate = function()
{
	with (this) {
		var counter = 0;
		let x1 = ctx.canvas.width/2 + 80*Math.sin(counter/Math.PI/4);
		let y1 = ctx.canvas.height/2 + 80*Math.cos(counter/Math.PI/4);
		let x2 = ctx.canvas.width/2 + 80*Math.sin(counter/Math.PI/4+Math.PI);
		let y2 = ctx.canvas.height/2 + 80*Math.cos(counter/Math.PI/4+Math.PI);
		circle(ctx, x1, y1, 80, 'rgb(0,0,255)');
		circle(ctx, x2, y2, 80, 'rgb(255,0,0)');
		circle(ctx, x1, y1, 10, 'rgb(255,0,0)');
		circle(ctx, x2, y2, 10, 'rgb(0,0,255)');
		counter++;
		window.requestAnimationFrame(doAnimate);
	}
}*/
/*CanvasRenderingContext2D.prototype.vLineTo = function (pointY)
{
	return this.lineTo(this.currentX, pointY);
}
CanvasRenderingContext2D.prototype.hLineTo = function (pointX)
{
	return this.lineTo(pointX, this.currentY);
}*/
// draw a line every *step* pixels
Drawing.prototype.createGrid = function(param/*{step, pointSize}*/)
{
	if (!param)
		param = {}
	// our end points
//	const width = this.canvas.width
//	const height = this.canvas.height
	var ctx = this.context;
	// set our styles
	ctx.save()
	ctx.strokeStyle = 'gray' // line colors
	ctx.fillStyle = 'black' // text color
	ctx.font = '14px Monospace'
	if (!param.pointSize)
		//param.pointSize = 0.35
		param.pointSize = 0.9
		//ctx.lineWidth = 0.35
//		ctx.lineWidth = 1
//	else
		ctx.lineWidth = param.pointSize
	if (!param.pointSizeFient)
		param.pointSizeFient = 0.6
	if (!param.step)
		param.step = 50
	if (!param.pointSizeOffsetX)
		param.pointSizeOffsetX = 100
	if (!param.pointSizeOffsetY)
		param.pointSizeOffsetY = 100

	// draw vertical from X to Height
	for (let x = 0; x < this.canvas.width; x += param.step) {
		// draw vertical line
		ctx.beginPath()
		ctx.moveTo(x, 0)
		ctx.lineTo(x, this.canvas.height)
		ctx.lineWidth = !(x % param.pointSizeOffsetX)? param.pointSize : param.pointSizeFient
		ctx.stroke()

		// draw text
		ctx.fillText(x, x, 12)
	}

	// draw horizontal from Y to Width
	for (let y = 0; y < this.canvas.height; y += param.step) {
		// draw horizontal line
		ctx.beginPath()
		ctx.moveTo(0, y)
		ctx.lineTo(this.canvas.width, y)
		ctx.lineWidth = !(y % param.pointSizeOffsetY)? param.pointSize : param.pointSizeFient
		ctx.stroke()

		// draw text
		ctx.fillText(y, 0, y)
	}

	// restore the styles from before this function was called
	ctx.restore()
}
