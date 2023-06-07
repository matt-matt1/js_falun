function Star(config)
{
    var props = {
        points: 4
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

Star.prototype.init = function()
{
	with (this) {
    }
}

Star.prototype.clear = function()
{
	with (this) {
    }
}