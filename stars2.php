<?php
//$uri = rtrim( rtrim( dirname(getServerValue("SCRIPT_NAME")), '/' ), '.');
$uri = getServerValue("SCRIPT_NAME");
print $uri;/*
?><html lang="en" itemscope="" itemtype="http://schema.org/Blog">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/<?='$uri'?>.css<?='?'. filemtime('css/. $uri. .css')?>">
</head>
<body>
	<canvas id="canvas"></canvas>
	<script type="text/javascript" src="js/stars2.js<?='?'. filemtime('js/. $uri. .js')?>"></script>
</body>
</html>*/?>
