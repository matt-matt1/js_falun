/*var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo){
	CP.dashedLine = function(x,y,x2,y2,dashArray,startOffset){
		if (!dashArray) dashArray=[10,5];
		if (dashLength==0) dashLength = 0.001; // Hack for Safari
		// var dashCount = dashArray.length;
		var dashSize = 0;
		for (i = 0; i < dashArray.length; i++) dashSize += parseInt(dashArray[i]);
		var dx = (x2-x), dy = (y2-y);
		var slopex = (dy < dx);
		// var slope = dy/dx;
		var slope = (slopex) ? dy / dx : dx / dy;
		var dashOffSet = dashSize * (1 - (startOffset / 100))
		if (slopex) {
			var xOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
			x -= xOffsetStep;
			dx += xOffsetStep;
			y -= slope * xOffsetStep;
			dy += slope * xOffsetStep;
		} else {
			var yOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
			y -= yOffsetStep;
			dy += yOffsetStep;
			x -= slope * yOffsetStep;
			dx += slope * yOffsetStep;
		}
		this.moveTo(x, y);
		var distRemaining = Math.sqrt( dx*dx + dy*dy );
		var dashIndex=0, draw=true;
		while (distRemaining>=0.1){
			var dashLength = dashArray[dashIndex++%dashArray.length];
			if (dashLength > distRemaining) dashLength = distRemaining;
			// var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
			// if (dx<0) xStep = -xStep;
			// x += xStep
			// y += slope*xStep;
			if (slopex) {
				var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
				x += xStep
				y += slope * xStep;
			} else {
				var yStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
				y += yStep
				x += slope * yStep;
			}
			// this[draw ? 'lineTo' : 'moveTo'](x,y);
			if (dashOffSet > 0) {
				dashOffSet -= dashLength;
				this.moveTo(x, y);
			} else {
				this[draw ? 'lineTo' : 'moveTo'](x, y);
			}
			distRemaining -= dashLength;
			draw = !draw;
		}
		// Ensure that the last segment is closed for proper stroking
		// this.moveTo(0, 0);
	}
}
*/
var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo){
	CP.dashedLine = function(x,y,x2,y2,dashArray,startOffset)
	{
		if (!dashArray) dashArray = [10, 5];
		// var dashCount = dashArray.length;
		var dashSize = 0;
		for (i = 0; i < dashArray.length/*dashCount*/; i++) dashSize += parseInt(dashArray[i]);
		var dx = (x2 - x),
			dy = (y2 - y);
		var slopex = (dy < dx);
		var slope = (slopex) ? dy / dx : dx / dy;
		var dashOffSet = dashSize * (1 - (startOffset / 100))
		if (slopex) {
			var xOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
			x -= xOffsetStep;
			dx += xOffsetStep;
			y -= slope * xOffsetStep;
			dy += slope * xOffsetStep;
		} else {
			var yOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
			y -= yOffsetStep;
			dy += yOffsetStep;
			x -= slope * yOffsetStep;
			dx += slope * yOffsetStep;
		}
		// if (x2 < 0 || y2 < 0) {
		// 	console.log(`neg,neg-quadrant : dx=${dx}, dy=${dy}, slopex=${slopex}, slope=${slope}, dashOffset=${dashOffset}`)
		// }
		this.moveTo(x, y);
		var distRemaining = Math.sqrt(dx * dx + dy * dy);
		var dashIndex = 0, draw = true;
		while (distRemaining >= 0.1 /*&& dashIndex < 10000*/) {
			var dashLength = dashArray[dashIndex++ % dashArray.length/*dashCount*/];
			if (dashLength > distRemaining) dashLength = distRemaining;
			if (slopex) {
				var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
				x += xStep;
				y += slope * xStep;
			} else {
				var yStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
				y += yStep;
				x += slope * yStep;
			}
			if (dashOffSet > 0) {
				dashOffSet -= dashLength;
				this.moveTo(x, y);
			} else {
				this[draw ? 'lineTo' : 'moveTo'](x, y);
			}
			distRemaining -= dashLength;
			draw = !draw;
		}
		// Ensure that the last segment is closed for proper stroking
		this.moveTo(0, 0);
	}
}