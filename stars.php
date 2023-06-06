<html lang="en" itemscope="" itemtype="http://schema.org/Blog"><head>
<meta charset="utf-8">
<!--<link rel="home" title="Home" href="/index.php">
<link rel="help" title="Help" href="/about.php">
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="The New Code Search">
<link rel="alternate" href="/feed.php" title="The New Code RSS feed" type="application/rss+xml">
<link rel="license" href="https://creativecommons.org/licenses/by-nc-sa/2.5/ca">
<link rel="dns-prefetch" href="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/">
<link rel="dns-prefetch" href="//google-analytics.com/">
<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAHlBMVEUAAAAvi8344QDzZRhco9j1fCOlvWL2pQDn0QZrpJl8PKG7AAAAAXRSTlMAQObYZgAAANNJREFUeNrtzlsKwzAMBdHKcR7d/4YrSssFR84Y+afQzK8513rc/UPLskxyb9Z7Wa7SXmW9ynKV9irNVdarST+/UJgXr+9LYd9f2N9v4D/t0fffiMdHrEVdebWev1dXXJ29Aq8jxGmihJHnCefgaYG9sm2QW8d7Y96LuTfGvY732AcT1WxsYTNTzfdqg+9Vw+mIw05poIm+54UKXnzwiCP2sIDnw4ImgNMRBp6OIK6qBT3B4xHg29JcsafIc8g58hxyjjxHniPOVfIceQ45Z+7vfr4XiuAL491dvdAAAAAASUVORK5CYII=">-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--<title>the new code – Make A Starfield Background with HTML5 Canvas</title>
<meta name="author" content="Dudley Storey">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@dudleystorey">
<meta property="og:type" content="article">
<meta property="og:site_name" content="the new code">
<meta property="fb:app_id" content="682862781844144">
<meta property="og:title" content="Make A Starfield Background with HTML5 Canvas">
<meta property="fb:admins" content="dudley.storey">
<meta property="og:url" content="http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas">
<meta property="og:description" content="Because it works on a pixel-by-pixel basis, canvas is perfectly suited to making extremely detailed images algorithmically. A good example is a starfield background; a very simple one can be built based by merely deciding if a canvas random pixel is white or not.
">
<meta name="twitter:description" content="A random star field suitable for web page backgrounds">
<meta property="og:locale" content="en_US">
<meta property="article:author" content="https://www.facebook.com/dudley.storey">
<meta property="article:publisher" content="https://www.facebook.com/dudley.storey">
<meta property="og:image" content="http://thenewcode.com/assets/images/final-starfield.png">
-->
<link rel="stylesheet" href="css/stars.css<?='?'. filemtime("css/stars.css")?>">
<!--<script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/js?id=G-HZ7GJS580K&amp;cx=c&amp;_slc=1"></script><script async="" src="https://google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="//demosthenes-demo.disqus.com/embed.js"></script>-->
</head>
<body>
<!--<header role="banner" class="flex apart">
<a href="/" id="logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.1 50" style="width:40px;height:40px;display:inline-block;vertical-align:middle;margin-right:.7rem"><polygon fill="#2F8BCA" points="0,28.7 29.5,49.9 59.1,28.6 29.3,8.3"></polygon><polygon fill="#F4E302" points="5.5,18.4 29.3,35.3 53.4,18.4 29.1,1.8"></polygon><polygon fill="#F06823" points="29.3,20.9 44.6,10.1 29.3,0 14.4,10.1"></polygon></svg><h1>the new code</h1>
</a>
<nav>
	<a title="search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" width="65" height="65"><path d="M38.1,11.9C29.8,11.9,23,18.6,23,27c0,2.9,0.8,5.7,2.3,8L10.1,48.6c-1.2,1.1-1.3,3-0.2,4.2c1.1,1.2,3,1.3,4.2,0.2l15.2-13.8
c2.5,1.8,5.5,2.9,8.9,2.9c8.4,0,15.1-6.8,15.1-15.1C53.2,18.6,46.5,11.9,38.1,11.9z M38,37.9c-6,0-10.8-4.9-10.8-10.8 c0-6,4.9-10.8,10.8-10.8S48.8,21.1,48.8,27C48.8,33,44,37.9,38,37.9z"></path></svg></a><form style="display:inline-block" action="/"><input type="search" name="search" id="search" minlength="3" maxlength="24" pattern="^[a-zA-Z][a-zA-Z0-9-_\.\ ]{2,24}$" title="Search term must be at least three characters in length" value=""><input type="submit" style="display:none"></form>
	<a href="https://twitter.com/dudleystorey" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="65" height="65" style="display:inline-block">
<path fill="#35AADF" d="M882.8,267.6c-27.7,12.3-58.5,21.5-90.8,24.6c32.3-20,56.9-50.8,69.2-87.7c-30.8,18.5-64.6,30.8-100,38.5
c-29.2-30.8-69.2-49.2-115.4-49.2c-86.2,0-156.9,70.8-156.9,156.9c0,12.3,1.5,24.6,4.6,35.4c-130.8-6.2-246.2-69.2-324.6-164.6
c-13.8,23.1-21.5,50.8-21.5,78.5c0,53.8,27.7,103.1,69.2,130.8c-26.2-1.5-50.8-7.7-70.8-20v1.5c0,76.9,53.8,140,126.2,153.8
c-13.8,3.1-27.7,6.2-41.5,6.2c-10.8,0-20-1.5-29.2-3.1c20,63.1,78.5,107.7,146.2,109.2C293.5,719.9,225.8,746,152,746
c-12.3,0-24.6,0-36.9-1.5c69.2,44.6,152.3,70.8,241.5,70.8c289.2,0,447.7-240,447.7-447.7c0-6.2,0-13.8,0-20 C835.1,326,861.2,298.3,882.8,267.6L882.8,267.6z"></path>
</svg></a>
	<a href="/archive.php" title="archive"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" width="65" height="65"><path d="M18.5,16.5h-6.2v-3.6c0-1.7,1.3-3,3-3h0.5c1.5,0,2.8,1.2,2.8,2.8V16.5z" fill="#666"></path><path d="M49.5,16.4h-6.2v-3.4c0-1.7,1.3-3,3-3h0.4c1.5,0,2.8,1.2,2.8,2.8V16.4z" fill="#666"></path><path d="M53.4,17H9.6c-1.1,0-2,0.9-2,2v32.3c0,1.1,0.9,2,2,2h43.8c1.1,0,2-0.9,2-2V19C55.4,17.9,54.5,17,53.4,17z M50.4,47.1 c0,0.6-0.4,1-1,1H12.9c-0.6,0-1-0.4-1-1V25c0-0.6,0.4-1,1-1h36.4c0.6,0,1,0.4,1,1V47.1z" fill="#666"></path><path fill="#ED1C24" d="M41.9,41.7h-6c-0.6,0-1-0.4-1-1v-6c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v6C42.9,41.3,42.5,41.7,41.9,41.7z"></path></svg>
	</a>
	<a href="/feed.php" title="RSS"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" width="65" height="65"><path fill="#898989" d="M34.2,53.2c1.5,0,3-0.8,3-3.7c0-13.4-10.3-20.3-20.1-20.3c-3,0-3.6,1.6-3.6,3.1c0,2,1.4,2.6,3.6,2.6
c6.9,0,14.3,6.8,14.3,14.6C31.3,53.5,34.2,53.2,34.2,53.2z"></path><path fill="#F26722" d="M47,53.4c1.5,0,2.8-0.6,2.8-3.5c0-20.6-12-33.8-34.2-33.8c-2.6,0-3.4,1-3.5,2.9c-0.1,2,1.3,2.8,3.5,2.8 C34.3,21.5,44.1,36.1,44,50.2C44.1,53.2,47,53.4,47,53.4z"></path><circle cx="17.5" cy="49" r="5"></circle></svg></a>
	<a href="/about.html" title="about"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="65" height="65"><circle fill="#F26722" cx="250" cy="250" r="175"></circle><text transform="matrix(1 0 0 1 179 375)" fill="#FFF" font-family="'Libertad'" font-size="350">?</text></svg></a>
</nav>
</header>
<div id="container">
<aside>
<p>I’m <a href="http://dudleystorey.com">Dudley Storey</a>, author of <a href="http://shop.oreilly.com/product/0636920037972.do"><cite>Using SVG with CSS3 and HTML5</cite></a>, <cite>Smashing Magazine</cite> contributing editor, teacher and speaker. I write about <a href="/1182/A-Complete-Web-Developer-Reading-List">all aspects of web development</a>, including:
</p><ul class="guide">
<li><a href="/865/A-Complete-Web-Development-Reading-List-for-HTML">HTML</a>
</li><li><a href="/919/A-Complete-Reading-List-For-CSS">CSS</a>
</li><li><a href="/1135/Web-Developer-Reading-List-JavaScript">JavaScript</a>
</li><li><a href="/1173/Web-Developer-Reading-List-SVG">SVG</a>
</li><li><a href="/925/Web-Developer-Reading-List-Responsive-Design">Responsive Design</a>
</li><li><a href="/986/Web-Developer-Reading-List-Galleries">Galleries</a>
</li><li><a href="/1180/Web-Developer-Reading-List-PHP">PHP</a>
</li><li><a href="/1030/Web-Developer-Reading-List-Introduction-to-MySQL">MySQL</a>
</li><li><a href="/861/Web-Developer-Reading-List-Search-Engine-Optimization">SEO</a>
</li><li><a href="/858/Web-Development-Reading-List-Accessibility">Accessibility</a>
</li><li><a href="/1004/Web-Developer-Reading-List-Servers-Domain-Names-and-Hosting">Servers &amp; Hosting</a>
</li><li><a href="/973/Web-Developer-Reading-List-Clients-Contracts-and-Portfolios">Business</a>
</li><li><a href="/1044/Web-Developer-Reading-List-Exercises-and-Quizzes">Exercises &amp; Quizzes</a>
</li></ul>
<p>To receive more information, including news, updates, and tips, <a href="https://twitter.com/dudleystorey">follow me on Twitter</a> or <a href="https://plus.google.com/+DudleyStorey/" rel="author">add me on Google+</a>.
</p><p class="patreon"><a href="https://www.patreon.com/dudleystorey">Become a Patron</a>
</p><p>This site helps millions of visitors while remaining ad-free. For <a href="https://www.patreon.com/dudleystorey">less than the price of a cup of coffee</a>, you can help pay for bandwidth and server costs while encouraging further articles.
</p><h2>projects</h2>
<p><a href="https://dudleystorey.github.io/thenewdefaults">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLBAMAAADKYGfZAAAAGFBMVEXy69P9/PUTEhJRUE799t6op6HRz8h+fnqYVNPtAAACT0lEQVR4Xu3TP3ObMBQAcCum7soDJFYTDFoNupoV5ZRkNSRyVv7EzhqJuv76FVe7cQY1HXIden6HHhp+93SPhybwN+F+PruwCyPNHZoR3szIZIfsTLOY9jHS1I8ZtbPEjzROwcsgBm1naz/7giPwM6CwtbMR4HQyNdWm6gMWM60g1x+xNDA5Dj9iizFTuEV/YBHg+a9Ou9bONIWHGOkkjBkDO2tmMJvxZmem8Pw/34UvLcj1diubjclYIgubJlDPOzqketlTHNuYe41CFUaQemPOwMLwEI0MN34UUmxnihqWDICjpyFU75h4C6zqrQrjGCDdX/nVO3YWWPnUHPoCvHj1D+IsyveMX1emBQm1CmlgY/cr1FXTdEehq0hiY6gvyrAaGFsF90isrNUcd4JKx3VAcCGMsjExJsc5Cgt70/+CcYCJAwBmmU1pXhwAAgEw7oIjc7ZyD3dSSrP2k7tnR0oid3ItXqRcu4fqxHo6zEle6CYv8taPuE5Ivrt+dWNdJFcFDY6HkgXkqEO+qrlfXc2FV/En0AHJvGrP4HBiOBWeIRtUwwZJGnhqZFCiG4VycMVv5npZfVjw+hCJ78ORBQJuFO8SOGO+YXNeDwuyrNsT4zdKkDx9O7Q01eAVzMJUqyPjIwNyfWJkDnXbIaxqUfqPYeRlUIAGvzW9/ICOH9nX5CVx9abP9KOonzHF8dPSzTe6rZcQz04fxHlgRXvLGNuxFWGqZ+0DazFjBWHfoGfqbFjuOKhyvGglAgEQcAAQ44MC++jP7kHweT/ShV3YT1iOWJm1uF1vAAAAAElFTkSuQmCC" alt="The New Defaults">A Sass color keyword system for designers</a>. Replaces CSS defaults with improved hues and more memorable, relevant color names.
</p><p><a href="https://dudleystorey.github.io/CSSslidy"><img src="data:image/jpg;base64,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" alt="CSSslidy">An auto-generated #RWD image slider</a>. 3.8K of JS, no JQuery. Drop in images, add a line of CSS. Done.
</p><p><a href="http://massiveheadcanon.com"><img src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABENDQ0ODRMODhMbEg8SGyAYExMYICIXFxgXFyIjHB8eHh8cIyMpLC4sKSM4ODw8ODhBQUFBQUFBQUFBQUFBQUH/2wBDARMSEhQWFBkVFRkYFBcUGB4YGhoYHiweHiEeHiw5KSMjIyMpOTI2Li4uNjI+Pjk5Pj5BQUFBQUFBQUFBQUFBQUH/wAARCABLAEsDASIAAhEBAxEB/8QAGgABAQEBAAMAAAAAAAAAAAAAAgEAAwQFBv/EAC4QAAIBAQMMAgMAAwAAAAAAAAABAhEDEiIEITEyQUJSYnGCkaJRwhNhgTOh4f/EABkBAQEAAwEAAAAAAAAAAAAAAAABAgMFBP/EABsRAQEBAAMBAQAAAAAAAAAAAAABAgMRIQQx/9oADAMBAAIRAxEAPwD5SUpXniel7TXp8T8mlrPqzJFRb0+J+S3p8T8koWgGvT4n5NenxPyWhqAG9Pifkl6fE/IqBaAjlPifkt6V3S9HzzEaLu9v2AstZ9WZIstZ9WVAZIVDIVYwVXFzlRuNnGurHTKTWiK/2FGhqHSxtraUM08ms092dlV/2V2dPJzsrVWypKH451pGUf8AHKT3aPVfxsZO4txqe2I0FobCysQZd3t+xmXd7fsBpaz6sqJLWfVlQCOMrSaymaTw5otbHGKWZ/o7IFpk1paRllFlidkl+WC17i0WiW1bJfH9Jrvrxs47JuXX48uxslKxtJKaj8wq1WrpmW09dlGZUjmX685yxynDRPMKysJ5SpW0sOT2evN5qvZCPzJ/9eY0YxqattdH6ebh1xSZk7d272J6Wk31aqFib2vSws9Dlgxbvb9gsW72/YIMtZ9WVBlrPqypgNMSbTTTaa0NOjX9RzTFUDpfrphZyb3pWcJS80JKUpUvNumj4XRLMgVNUKzZGaoWwiMW72/YDFu9v2AMnifVmTE7t56ul6bxsPL7ASpalw8vsXDy+wEqSosPL7Gw8vsAahbHh5fYmHl9gA2KuHt+xnd5fYuG7s0c3EB//9k=" alt="Massive Head Canon">Massive Head Canon</a>. Intelligent discussion of movies, books, games, and technology.
</p><h2>books</h2>
<p><a href="https://www.amazon.com/gp/product/1430247223/ref=as_li_tl?ie=UTF8&amp;camp=1789&amp;creative=390957&amp;creativeASIN=1430247223&amp;linkCode=as2&amp;tag=wwwdemosthene-20&amp;linkId=OGRUMFWRQPVB7YKI">
<img src="/assets/images/pro-css3-animation-cover.jpg" style="height:auto" alt="">Pro CSS Animation</a> (Apress, 2013)
</p></aside>

<div id="content">
	
<div id="featured-articles">
<figure><a href="/841/Create-a-Sequential-Image-Fade-In-With-JavaScript-and-CSS"><img src="/assets/images/thumbnails/black-teardrop-coupe.jpg" alt="" srcset="/assets/images/thumbnails/black-teardrop-coupe.jpg 1x, /assets/images/thumbnails/black-teardrop-coupe-2x.jpg 2x"><figcaption>Sequential Image Fade-In</figcaption></a></figure>
<figure><a href="/285/Understanding-JavaScript-Comparison-Operators-Equality"><img src="/assets/images/thumbnails/black-white-coffee-comparison.jpg" alt="" srcset="/assets/images/thumbnails/black-white-coffee-comparison.jpg 1x, /assets/images/thumbnails/black-white-coffee-comparison-2x.jpg 2x"><figcaption> JS Equality Comparison Operators</figcaption></a></figure>
<figure><a href="/337/Understanding-JavaScript-Relational-Operators"><img src="/assets/images/thumbnails/baby-foot-in-cupped-hands.jpg" alt="" srcset="/assets/images/thumbnails/baby-foot-in-cupped-hands.jpg 1x, /assets/images/thumbnails/baby-foot-in-cupped-hands-2x.jpg 2x"><figcaption>JavaScript Relational Operators</figcaption></a></figure>
</div>
<main>
	<article itemscope="" itemtype="http://schema.org/BlogPosting">
	<header>
		<canvas id="starfield" width="750" height="500"></canvas><div class="flex contacts apart">			<a href="https://codepen.io/dudleystorey/pen/QjaXKJ" title="Codepen demo"></a>
			<a class="reading-list-tab" href="/1128/Web-Developer-Reading-List-The-Canvas-API"><img src="/assets/images/icons/man-in-frame.jpg" alt="" srcset="/assets/images/icons/man-in-frame.jpg 1x, /assets/images/icons/man-in-frame-2x.jpg 2x"><span>Part of <span class="filling">the </span>The Canvas API Reading List</span></a></div><meter min="0" max="10" value="4" title="Somewhat challenging intermediate-level material"></meter>	</header>
	    <meta itemprop="image" content="http://thenewcode.com/assets/images/final-starfield.png">
		<h1 class="entry-title" itemprop="headline"><a href="http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas" itemprop="url" rel="bookmark">Make A Starfield Background with HTML5 Canvas</a></h1>
		<div class="flex apart times">
	<time class="modDate" title="Originally posted 2015-10-22 00:00:00" datetime="2016-09-05 02:01:41">Updated 6 years ago</time>
	<meta itemprop="datePublished" content="2015-10-22 00:00:00">
	<meta itemprop="dateModified" content="2016-09-05 02:01:41">
	<meta itemprop="description" content="A random star field suitable for web page backgrounds">
	</div>	
		<p class="sharebuttons"><span>Share on</span><a class="twittershare" href="https://twitter.com/intent/tweet?text=Make+A+Starfield+Background+with+HTML5+Canvas&amp;url=http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas&amp;via=dudleystorey">Twitter</a><a class="facebookshare" href="https://www.facebook.com/sharer/sharer.php?u=http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas">Facebook</a><a class="googleplusshare" href="https://plus.google.com/share?url=http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas">Google+</a>
</p><div itemprop="articleBody" class="entry-content">
	<p>Because it works on a pixel-by-pixel basis, <code>canvas</code> is perfectly suited to making extremely detailed images algorithmically. A good example is a starfield background; a very simple one can be built based by merely deciding if a canvas random pixel is white or not.
<script>
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}			
	var canvas = document.getElementById('starfield'),
	context = canvas.getContext('2d'),
	stars = 500,
	colorrange = [0,60,240],
	satrange = [50,100];
	for (var i = 0; i < stars; i++) {
		var x = Math.random() * canvas.offsetWidth;
		y = Math.random() * canvas.offsetHeight,
		radius = Math.random() * 1.2,
		hue = colorrange[getRandom(0,colorrange.length - 1)],
		sat = getRandom(50,100);
		context.beginPath();
		context.arc(x, y, radius, 0, 360);
		context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
		context.fill();
	} 
</script></p><p>Unlike most other articles on The New Code, the goal of this piece is not to show a complete example, but to improve the code in incremental steps. This is in contrast to the approach of many of my students, who often seek a single, “perfect” solution rather than taking the time to build from something simple (but well-structured) into a more complex, nuanced production.

</p><h2>In The Beginning</h2>

<p>Let’s say we have a 750 × 500 pixel <code>&lt;canvas&gt;</code> element with an <code>id</code>:

</p><pre class=" language-markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>starfield<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>750<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>500<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">&gt;</span></span></code></pre>

<aside>
<p>Unlike almost every other element, <code>&lt;canvas&gt;</code> should be sized using <a href="/html/attributes" rel="tag">attributes</a>, rather than <a href="/css">CSS</a>; sizing the elements with styles alone causes scaling issues, as the <code>&lt;canvas&gt;</code> element has its own default size that is distorted by using CSS <code>width</code> and <code>height</code> as its only dimension information.
</p></aside> 

<p>And some CSS to fill it with black:

</p><pre class=" language-css"><code class=" language-css"><span class="token selector">canvas </span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#111</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

<p>To start, we’ll identify the canvas, tell <a href="/1135/Web-Developer-Reading-List-JavaScript">JavaScript</a> what context we are drawing in, and determine the total number of stars:

</p><pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"starfield"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
context <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">"2d"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
stars <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span></code></pre>

<p>To create the stars themselves, we’ll create a simple <a href="/935/JavaScript-Loops-for">loop</a> that draws 1 pixel × 1 pixel squares randomly within the limits of the canvas:

</p><pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stars<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    x <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">;</span>
    y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">;</span>
   context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"white"</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">fillRect</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

<p>The result:

</p><figure class="w80">
<img src="/assets/images/simple-starfield.png" alt="">
<figcaption>A simple star field, with small square white stars</figcaption>
</figure>

<p>That’s not a bad start, but there are a few problems: the stars are fairly obviously square when viewed closely, all the same brightness, and quite small. Let’s address all of those issues at the same time by drawing circles for the stars; each circle will have a random radius.

</p><pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stars<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">;</span>
    y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">,</span>
    radius <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.2</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">beginPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">arc</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> radius<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">360</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"hsla(200,100%,50%,0.8)"</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

<aside>
<p>Somewhat oddly, canvas does not have a <code>fillCirc</code> method; rather, it draws <em>arcs</em>. Drawing a circle is therefore a task of determining the center and radius of the circle, the starting angle (0) and the ending angle (360).
</p></aside>

<p>The starfield now looks like this:

</p><figure class="w80">
<img src="/assets/images/improved-starfield.png" alt="">
<figcaption>An improved star field, with small blue circles for stars</figcaption>
</figure>

<p>That’s better, but all our stars are blue-shifted due to the hsla color. We want a <em>range</em> of color.

</p><aside>
<h1>Distribution of color in the galaxy</h1>
<img src="/assets/images/pleiades.jpg" alt="Photograph of the bright blue stars of the Pleiades cluster">
<p>The perceived color of a star depends on its mass and temperature, both of which are functions of its age. Young stars in new galaxies gulp in gas, and shine a bright blue; an older galaxy will be darker, with aged stars appearing as red embers. The color distribution of main sequence stars in our galaxy is fairly typical: three-quarters of them are red and 20% yellow or orange, with the remainder scattered between white and blue.
</p><p>Our <em>perception</em> of star color distribution is skewed by the fact that cool red stars are much harder to see against the black background of space. For similar reasons, humans do not see green stars: any star emitting green light will also emit red and blue, making it look white.
</p></aside>

<p>If you’re familiar with <a href="/61/An-Easy-Guide-To-HSL-Color-In-CSS3">HSL color</a>, you should know that anything with a luminosity of 100% will appear white, no matter what the hue and saturation. So if we randomize hue and saturation but keep luminosity fairly high, we’ll get hints of color, but the stars will be predominantly white.

</p><p>Our JavaScript becomes:

</p><pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">getRandom</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>max <span class="token operator">-</span> min <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>           
<span class="token keyword">var</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"starfield"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
context <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">"2d"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
stars <span class="token operator">=</span> <span class="token number">500</span><span class="token punctuation">,</span>
colorrange <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">,</span><span class="token number">240</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stars<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">;</span>
    y <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> canvas<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">,</span>
    radius <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.2</span><span class="token punctuation">,</span>
    hue <span class="token operator">=</span> colorrange<span class="token punctuation">[</span><span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>colorrange<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    sat <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">beginPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">arc</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> radius<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">360</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"hsl("</span> <span class="token operator">+</span> hue <span class="token operator">+</span> <span class="token string">", "</span> <span class="token operator">+</span> sat <span class="token operator">+</span> <span class="token string">"%, 88%)"</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

<p>The <code>getRandom</code> function creates a random integer between two numbers (inclusive): with the <code>hue</code> variable, it randomly selects a value of 0, 60, or 240 (avoiding green), and for saturation, a number from 50 to 100.

</p><p>To quickly make the <code>&lt;canvas&gt;</code> responsive, add a percentage width in CSS: 

</p><pre class=" language-css"><code class=" language-css"><span class="token selector">canvas </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">100%</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#111</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

<h2>The Fine-Grained Nature of Reality</h2>
<p>The final result, shown at the top of this article, is pretty good, but does lack a few features:
</p><ul>
<li>dust obscures a significant portion of the night sky: in our own galaxy, the most visible aspect of this phenomenon is the Great Rift, spanning across the middle of the Milky Way. These “clouds” should be rendered as well; I’ll reserve that for a future article.
</li><li>it would be nice to generate dense clusters of stars, such as nebulae and the central bar of our own Milky Way. Again, I’ll leave that for a more advanced article.
</li><li>Finally, it would be good to have the script draw stars <em>appropriate</em> for the current viewport*: when the <code>&lt;canvas&gt;</code> is small, it tends to be overcrowded with 200 stars, while it looks a little large and scattered on larger screens. The <code>&lt;canvas&gt;</code> will be redrawn on viewport resize: that’s just its nature when it’s made responsive in this way - but it could still be improved.
</li></ul>
<p>As written, the starfield could make an excellent random background for a page: you’d just have to use <a href="/135/CSS-Positioning-absolute-the-overused">absolute positioning</a>, to ensure that it was always at the “back” of subsequent elements.
</p><p><small>Enjoy this piece? I invite you to follow me at <a href="https://twitter.com/dudleystorey">twitter.com/dudleystorey</a> to learn more.<br>Check out the CodePen demo for this article at <a href="https://codepen.io/dudleystorey/pen/QjaXKJ">https://codepen.io/dudleystorey/pen/QjaXKJ</a></small></p>	</div>
</article>
<div id="prevnext" class="flex apart">	<a class="prev-one flex" href="/19/Introduction-to-HTML5-canvas" rel="prev" accesskey=",">
		<span class="thumb"><img src="/assets/images/thumbnails/etchasketch.jpg" alt="" srcset="/assets/images/thumbnails/etchasketch.jpg 1x, /assets/images/thumbnails/etchasketch-2x.jpg 2x"></span>
		<span class="articlename">Introduction to HTML5 canvas</span>
	</a>
		<a class="next-one flex" href="/354/Introduction-to-Canvas-Animation" rel="next" accesskey=".">
		<span class="articlename">Introduction to Canvas Animation</span>
		<span class="thumb"><img src="/assets/svg/redsquare.svg" alt=""></span>
	</a>
	</div>
</main>
<link rel="stylesheet" href="/styles/print-min.css">
<div id="disqus_thread"><iframe id="dsq-app185" name="dsq-app185" allowtransparency="true" frameborder="0" scrolling="no" tabindex="0" title="Disqus" style="width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 874px !important;" width="100%" src="https://disqus.com/embed/comments/?base=default&amp;f=demosthenes-demo&amp;t_u=http%3A%2F%2Fthenewcode.com%2F81%2FMake-A-Starfield-Background-with-HTML5-Canvas&amp;t_d=Make%20A%20Starfield%20Background%20with%20HTML5%20Canvas&amp;t_t=Make%20A%20Starfield%20Background%20with%20HTML5%20Canvas&amp;s_o=default#version=0de049a9509db2ffb3bccb8a794510c2" horizontalscrolling="no" verticalscrolling="no"></iframe></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'demosthenes-demo';
    var disqus_url = 'http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas';
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the &lt;a href="https://disqus.com/?ref_noscript" rel="nofollow"&gt;comments powered by Disqus.&lt;/a&gt;</noscript>
</div>
</div>
<script>
!function(t,e){"object"==typeof module&&module.exports?module.exports=e(t):t.timeago=e(t)}("undefined"!=typeof window?window:this,function(){function t(t){return t instanceof Date?t:isNaN(t)?/^\d+$/.test(t)?new Date(e(t,10)):(t=(t||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/T/," ").replace(/Z/," UTC").replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(t)):new Date(e(t))}function e(t){return parseInt(t)}function n(t,n,r){n=d[n]?n:d[r]?r:"en";var i=0,o=t<0?1:0;for(t=Math.abs(t);t>=l[i]&&i<p;i++)t/=l[i];return t=e(t),i*=2,t>(0===i?9:1)&&(i+=1),d[n](t,i)[o].replace("%s",t)}function r(e,n){return n=n?t(n):new Date,(n-t(e))/1e3}function i(t){for(var e=1,n=0,r=Math.abs(t);t>=l[n]&&n<p;n++)t/=l[n],e*=l[n];return r%=e,r=r?e-r:e,Math.ceil(r)}function o(t){return t.getAttribute?t.getAttribute(h):t.attr?t.attr(h):void 0}function u(t,e){function u(o,c,f,s){var d=r(c,t);o.innerHTML=n(d,f,e),a["k"+s]=setTimeout(function(){u(o,c,f,s)},1e3*i(d))}var a={};return e||(e="en"),this.format=function(i,o){return n(r(i,t),o,e)},this.render=function(t,e){void 0===t.length&&(t=[t]);for(var n=0;n<t.length;n++)u(t[n],o(t[n]),e,++c)},this.cancel=function(){for(var t in a)clearTimeout(a[t]);a={}},this.setLocale=function(t){e=t},this}function a(t,e){return new u(t,e)}var c=0,f="second_minute_hour_day_week_month_year".split("_"),s="秒_分钟_小时_天_周_月_年".split("_"),d={en:function(t,e){if(0===e)return["Updated just now","Updated right now"];var n=f[parseInt(e/2)];return t>1&&(n+="s"),["Updated "+t+" "+n+" ago","in "+t+" "+n]},zh_CN:function(t,e){if(0===e)return["刚刚","片刻后"];var n=s[parseInt(e/2)];return[t+n+"前",t+n+"后"]}},l=[60,60,24,7,365/7/12,12],p=6,h="datetime";return a.register=function(t,e){d[t]=e},a});

function updateHeaders() {
	var meters = document.querySelectorAll("article header meter:not([title])"),
	difficulties = ["Basic introductory content","Intermediate introductory content", "Advanced introductory content", "Somewhat challenging intermediate-level material", "Challenging intermediate material", "Very challenging intermediate-level material"];
	for (var i=0; i<meters.length;i++) {
		meters[i].title = difficulties[meters[i].value - 1];
	}
	new timeago().render(document.querySelectorAll('.modDate'));
}

updateHeaders();

</script>-->
<!--
<iframe style="display: none;"></iframe>-->
	<canvas id="starfield" width="750" height="500"></canvas>
	<script type="text/javascript" async="" src="js/canvas.js<?='?'. filemtime("js/canvas.js")?>"></script>
</body>
</html>
