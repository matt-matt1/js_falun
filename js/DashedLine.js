function DashedLine(config)
{
    var props = {
        startX: 0,
		startY: 0,
		endX: 200,
		endY: 100,
		dashArray: [10, 5],
		offset: 20
    }
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
    this.init();
}

DashedLine.prototype.init = function()
{
	// with (this) {
		this.posX = (this.endX - this.startX) ? true : false;
		this.posY = (this.endY - this.startY) ? true : false;
		this.dx = (posX) ? this.endX - this.startX : this.startX - this.endX;
		this.dy = (posY) ? this.endY - this.startY : this.startY - this.endY;
		this.dist = Math.sqrt(dx * dx + dy * dy);
		this.draw = false;
		this.x = this.startX;
		this.y = this.startY;
		this.segment = 0;
		this.index = 0;
/*		if (!offset) {
			offset = 0;
		}
		if (!dashArray) dashArray = [10, 5];*/
    // }
}

DashedLine.prototype.clear = function()
{
	// with (this) {
    // }
}

DashedLine.prototype.draw = function()
{
	// with (this) {
		this.context.beginPath();
		this.context.moveTo(this.startX, this.startY);
		// segment = dashArray.shift();
		while (((posX) ? this.dist < this.endX : this.dist > this.endX) && ((posY) ? this.dist < this.endY : this.dist > this.endY)) {
			x = (posX) ? i + 1 : i - 1;
			y = (posY) ? i + 1 : i - 1;
			// if (dashArray.length-1 == index)
			this.penDown = this.dist < (this.dashArray[0] + this.offset);
			if (draw) {
				this.context.lineTo(x, y);
			} else {
				this.context.moveTo(x, y);
			}
			i++;
			this.dist--;
			this.index++;
		}
    // }
}

DashedLine.prototype.fallback = function()
{
	// with (this) {
		this.context.moveTo(this.startX, this.startY);
		this.context.lineTo(this.endX, this.endY);
		this.context.setLineDash(this.dashArray);
	// }
}
