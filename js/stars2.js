var centerX = 400, centerY = 200,
	radius = 192, length, debug = true,
	red = 'rgb(228, 10, 24)',
	mustard = 'rgb(253, 177, 43)',
	black = 'rgb(28, 25, 25)',
	blue = 'rgb(8, 74, 145)',
	bronze = 'rgb(168, 125, 26)',
	bronze10 = 'rgb(195, 145, 30)',
	bronze20 = 'rgb(221, 165, 36)',
	bronze30 = 'rgb(225, 176, 63)',
	bronze50 = 'rgb(234, 199, 118)',//'hsv(42, 84.5, 65.9)',//'rgb(168, 125, 26)',
	goldGreen = 'rgb(206, 195, 88)',
	gold = 'rgb(247, 203, 98)',
	darkBronze = 'rgb(152, 148, 44)',
	medBronze = 'rgb(158, 148, 54)',
	lightBronze = 'rgb(169, 172, 125)',
	space = 'rgb(30, 34, 65)',
//	context, contextBase, contextCenter,
	Draw, spinDir = true, laps = 0,
	lastTime = 0, interval = 500/*50*/, // ms
	changeDir = 9, // laps before posSpin
	bg, base, cs, tl, tr, bl, br, ts, ls, rs, bs,
	csAng = 0, tjAng = 0, sAng = 0,
	// csInterval = 1, // ms before re-draw
	// csDeg = 18; // degrees per interval
	// tjInterval = 2, // ms before re-draw
	// tjDeg = 18; // degrees per interval
	// sInterval = 3, // ms before re-draw
	// sDeg = 18, // degrees per interval
	bgStobeOffset = 0,
	baseBgColors = [mustard, 'yellow', 'green', 'blue', 'indigo', 'rgb(238, 130, 238)', red], baseBgIndex = 0;

if (window.addEventListener)
	window.addEventListener('load', load_stars2);
else if (window.attachEvent)
	window.attachEvent('onload', load_stars2);

function linGradient()
{
	const lingrad = ctx.createLinearGradient(0, -75, 0, 75);
	lingrad.addColorStop(0, "#232256");
	lingrad.addColorStop(1, "#143778");
}

function other()
{
	context.lineCap = 'round';
	Draw.createGrid();
//	colorMode(HSB, circles, 100, 100);
}

function load_stars2()
{
	var canvasBg = document.querySelector('canvas');
	canvasBg.width = document.body.clientWidth;
	canvasBg.height = document.body.clientHeight;
	canvasBg.style.position = 'absolute';
	canvasBg.style.top = '0';
	canvasBg.style.left = '0';
	context = canvasBg.getContext('2d', { /*alpha: false*/ });
	var canvasBase = document.createElement('canvas');
	canvasBase.id = 'canvasBase';
	canvasBase.width = document.body.clientWidth;
	canvasBase.height = document.body.clientHeight;
	canvasBase.style.position = 'absolute';
	canvasBase.style.top = '0';
	canvasBase.style.left = '0';
	document.body.appendChild(canvasBase);
	// contextBase = canvasBase.getContext('2d', { /*alpha: false*/ });
	var canvasCenter = document.createElement('canvas');
	canvasCenter.id = 'canvasCenter';
	canvasCenter.width = document.body.clientWidth;
	canvasCenter.height = document.body.clientHeight;
	canvasCenter.style.position = 'absolute';
	canvasCenter.style.top = '0';
	canvasCenter.style.left = '0';
	document.body.appendChild(canvasCenter);
	// contextCenter = canvasCenter.getContext('2d', { / *alpha: false* / });

	Draw = new Drawing(canvasBg);
	length = Draw.getLargestSquareSideInCircle(radius);

	bg = new FalunBg({
		canvas: canvasBg,//document.querySelector('canvas'),
//		context: context,
		radius: /*Math.floor(*/radius/*2)*/,//95*radius/200,//4,
		centerX: centerX,
		centerY: centerY,
		spokes: 100,
//		rangeStart: 0,
//		rangeEnd: 360,//1000,
//		rangeStep: 10,//25,
		innerRadius: Math.floor(radius + radius / 100 * 2),
		outerRadius: Math.floor(radius+65),
		dashArray: [30, 50],
		numStars: 123,
//		start: 0,//135,
//		end: 360,//1000,//405,
//		guageStart: 0,
//		guageEnd: 360,//1000,//270,
		color: "lightgray",
//		boldColor: "black",
//		boldStep: 0,//250,
		/*shorterLine=12,*/
		linewidth: 0.5,//2,
//		angle: Math.PI * .5,
		backgroundColor: [black, space],//'gold'],
//		shadowColor: 'yellow',
//		shadowBlur: radius / 30,
//		shadowOffsetX: 0,
//		shadowOffsetY: 0,
//		rotationsPerSecond: 0.2,
	});

	base = new FalunBase({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: radius,//4,
//		corner: 4,
		centerX: centerX,
		centerY: centerY,
//		spokes: 0,
		shadowBlur: Math.floor(radius / 15),
		shadowColor: 'purple',
//		shadowOffsetX: 0,
//		shadowOffsetY: 0,
//		backgroundColor: ['black'],
//		rangeStart: 0,
//		rangeEnd: 1000,
//		rangeStep: 25,
//		innerRadius: 50,
//		outerRadius: 65,
		angle: 0,
//		start: 135,
//		end: 405,
//		guageStart: 0,
//		guageEnd: 270,
		backgroundColor: mustard,
//		length: 50,
//		boldColor: "black",
//		boldStep: 250,
//		boldLength: 65,
		/*shorterLine=12,*/
//		linewidth: 2,
//		positiveWidth: 0,
		// rotationsPerSecond: 0,//0.2,
		// animate: false//true
		// debug: true
	});
//	context.save();
//	var csGradient = context.createRadialGradient(0, 0, 1, 0, 0, radius/2);
//	csGradient.addColorStop(0, 'yellow');
//	csGradient.addColorStop(0, 'gold');
//	csGradient.addColorStop(0, bronze20);
/* */
	cs = new Swastika({
		canvas: canvasBase,
		// canvas: canvasCenter,//document.querySelector('canvas'),
		radius: Math.floor(radius/2),
		corner: Math.floor(5*radius/200),//9*radius/200,
//		armLength: 42*radius/100,//78,
		armWidth: Math.floor(16*radius/100),
		centerX: centerX,
		centerY: centerY,
		angle: 0,
		//angle: Math.PI * .25,
//		outlineColor: 'red',
//		outlineWidth: radius/100,//2,
		color: ['yellow', 'gold', bronze20],//csGradient,
		//color: ['rgb(0, 255, 255)', bronze],//'gold'],
		//color: ['yellow', 'yellow', bronze],
		//color: [lightBronze, medBronze, darkBronze],
		//color: ['yellow', mustard/ *, bronze* /],
		//color: ['yellow', gold, mustard,/ *bronze,* / goldGreen],
		backgroundColor: red,
//		negativeColor: 'white',
//		positiveInnerColor: 'red',
//		negativeInnerColor: 'red',
//		positiveInnerWidth: 2,
//		negativeInnerWidth: 2,
//		dividerWidth: 0,
//		dividerColor: []
//		bgShadowColor: 'yellow',//'blue',	// applies to circle
//		bgShadowBlur: radius / 60,//radius / 30,
//		bgShadowOffsetX: 0,
//		bgShadowOffsetY: 0,
		// rotationsPerSecond: 0.2,
	});
	taijis();
	curvedSwastikas();
	requestAnimationFrame(loop); // to start
}

function taijis()
{
	var radiusTaiji = Math.floor(radius / 4);
	tl = new Taiji({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: radiusTaiji,
		centerX: centerX - (length/2) + Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		centerY: centerY - (length/2) + Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		angle: Draw.radians(-45),
//		outlineColor: 'red',
//		outlineWidth: 0,
		positiveColor: black,//'black'],
		negativeColor: red,//'red'],
		positiveInnerColor: 'white',//,'red'],
		negativeInnerColor: 'white',//'black'],
		positiveInnerRadius: '10%',
		negativeInnerRadius: '10%',
//		dividerWidth: 0,
//		dividerColor: []
//		rotationsPerSecond: 0.2,
	});
	tr = new Taiji({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: radiusTaiji,
		centerX: centerX + (length/2) - Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		centerY: centerY - (length/2) + Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		angle: (Math.PI/180) * 45,
//		outlineColor: 'red',
//		outlineWidth: 0,
		positiveColor: red,
		negativeColor: blue,
		positiveInnerColor: 'white',
		negativeInnerColor: 'white',
		positiveInnerRadius: '10%',
		negativeInnerRadius: '10%',
//		rotationsPerSecond: 0.2,
	});
	bl = new Taiji({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: radiusTaiji,
		centerX: centerX - (length/2) + Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		centerY: centerY + (length/2) - Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		angle: (Math.PI/180) * 45,
		positiveColor: red,
		negativeColor: blue,
		positiveInnerColor: 'white',
		negativeInnerColor: 'white',
		positiveInnerRadius: '10%',
		negativeInnerRadius: '10%',
//		rotationsPerSecond: 0.2,
	});
	br = new Taiji({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: radiusTaiji,
		centerX: centerX + (length/2) - Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		centerY: centerY + (length/2) - Draw.getLargestSquareSideInCircle(radiusTaiji / 2),
		angle: Draw.radians(-45),
//		outlineColor: 'red',
//		outlineWidth: 0,
		positiveColor: black,
		negativeColor: red,
		positiveInnerColor: 'white',
		negativeInnerColor: 'white',
		positiveInnerRadius: '10%',
		negativeInnerRadius: '10%',
//		rotationsPerSecond: 0.2,
	});
}

function curvedSwastikas()
{
	var myRadius = Math.floor(radius / 4);
	//	var sGradient = context.createRadialGradient(0, 0, 1, 0, 0, radius/2);
	//	sGradient.addColorStop(0, 'gold');
	//	sGradient.addColorStop(0, bronze20);
	//	sGradient.addColorStop(0, bronze);
	ts = new CurvedSwastika({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: myRadius,//radius/15,
		armWidth: radius/12,
		centerX: centerX,
		centerY: centerY - radius + myRadius,//centerY - (length/2),//6*centerY/20,
		angle: 0,//Math.PI * .25,
		shadowColor: red,
		shadowBlur: 3,
		outlineColor: red,
		outerWidth: 1,
		backgroundColor: mustard,
		color: ['gold', bronze20, bronze],//sGradient,//'gold'],
	//		rotationsPerSecond: 0.2,
	});
	ls = new CurvedSwastika({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: myRadius,
		armWidth: radius/12,
		centerX: centerX - radius + myRadius,
		centerY: centerY,
		angle: Math.PI * .25,
		backgroundColor: mustard,
		color: ['yellow', 'gold'],//sGradient,
	//		rotationsPerSecond: 0.2,
	});
	rs = new CurvedSwastika({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: myRadius,
		armWidth: radius/12,
		centerX: centerX + radius - myRadius,
		centerY: centerY,
	//		angle: Math.PI * .5,
		backgroundColor: mustard,
		color: ['yellow', 'gold'],//sGradient,
	//		rotationsPerSecond: 0.2,
	});
	bs = new CurvedSwastika({
		canvas: canvasBase,//document.querySelector('canvas'),
		radius: myRadius,
		armWidth: radius/12,
		centerX: centerX,
		centerY: centerY + radius - myRadius,
	//		angle: Math.PI * .5,
		backgroundColor: mustard,
		color: [bronze30, bronze],//sGradient,
	//		rotationsPerSecond: 0.2,
	});
}

function loop(time) {	// microsecond timer 1/1,000,000 accuracy in ms 1/1000th
	var elapsed = Math.abs(time - lastTime);
	if (!lastTime || elapsed >= interval) {
		bgStobeOffset = (spinDir) ? bgStobeOffset+1 : bgStobeOffset-1;
		bg.march((spinDir) ? centerX : -centerX, (spinDir) ? centerY : -centerY);
	if (laps >= changeDir) {
//			console.log(`change direction : laps: ${laps}`)
			spinDir = !spinDir;
			laps = 0;
			if (baseBgIndex*45 >= 360/*baseBgColors.length-1*/) {
				// baseBgIndex = -1;
				baseBgIndex = 0;
			}
			var newColor = 'hsl('+ baseBgIndex++*45+ ', 90%, 50%)';
			// console.log(`base is changing from ${baseBgIndex}:${baseBgColors[baseBgIndex]} to ${baseBgIndex+1}:${baseBgColors[baseBgIndex+1]}`);
			if (typeof debug !== 'undefined' && debug) {
				// console.log(`base is changing to ${baseBgIndex+1}:${baseBgColors[baseBgIndex+1]}`);
				console.log(`base is changing to ${newColor}`);
			}
			// base.setBackgroundColor(baseBgColors[++baseBgIndex]);
			// base.context.globalCompositeOperation = "color";//"hue";
			base.setBackgroundColor(newColor);
			// base.setBackgroundColor('hsl(180, 50%, 50%)');
//			baseBgIndex++;
/*			base.clear();
			base.context.translate(centerX, centerY);
			base.context.rotate(baseBgIndex*45);
			base.context.translate(-centerX, -centerY);*/
		}
		if (elapsed >= cs.interval) {
			csAng = (spinDir) ? csAng + Draw.radians(/*csDeg*/cs.rotationDegree) : csAng - Draw.radians(/*csDeg*/cs.rotationDegree);
			if (Math.abs(csAng) >= (Math.PI*2)) {
//				console.log(`lapped : laps: ${laps+1}`)
				csAng = 0;
				laps++;
			}
			// cs.revolve(csAng);
/* */			base.clear();
			base.context.translate(centerX, centerY);
			base.context.rotate((spinDir) ? Math.PI/10 : -Math.PI/10);
			// base.context.rotate(/*Math.floor(*/csAng/*Math.PI)*/);
			base.context.translate(-centerX, -centerY);/* */
			// tl.clear();
/*			tl.context.translate(centerX, centerY);
			tl.context.rotate((spinDir) ? Math.PI/10 : -Math.PI/10);
			// base.context.rotate(/ *Math.floor(* /csAng/ *Math.PI)* /);
			tl.context.translate(-centerX, -centerY);*/
			// base.revolve(csAng);
			// tl.rotateMe(csAng, cs.centerX, cs.centerY);
//			console.log(`angle: ${Draw.degrees(csAng)}deg (${Draw.degrees(csAng)/360})`);
		}
		if (elapsed >= tl.interval) {
			tjAng = (spinDir) ? tjAng + Draw.radians(/*tjDeg*/tl.rotationDegree) : tjAng - Draw.radians(/*tjDeg*/tl.rotationDegree);
			if (Math.abs(tjAng) >= (Math.PI*2)) {
				tjAng = 0;
			}
			tl.revolve(tjAng);
			tr.revolve(tjAng);
			bl.revolve(tjAng);
			br.revolve(tjAng);
		}
		if (elapsed >= ts.interval) {
			sAng = (spinDir) ? sAng + Draw.radians(/*sDeg*/ts.rotationDegree) : sAng - Draw.radians(/*sDeg*/ts.rotationDegree);
			if (Math.abs(sAng) >= (Math.PI*2)) {
				sAng = 0;
			}
			ts.revolve(sAng);
			ls.revolve(sAng);
			rs.revolve(sAng);
			bs.revolve(sAng);
		}
		lastTime = time;
	}
	requestAnimationFrame(loop);
}
