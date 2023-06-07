<?php
//define( 'INCLUDE_DIR', dirname( __FILE__ ) . '/inc/' );
define( 'INCLUDE_DIR', dirname( __FILE__ ) . '/' );
$_GET		= filter_input_array(INPUT_GET, FILTER_SANITIZE_SPECIAL_CHARS);//, FILTER_SANITIZE_STRING);
$_POST		= filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);//, FILTER_SANITIZE_STRING);
function getServerValue( $variable_name, $filter=FILTER_DEFAULT, $options=0, $defaultValue=null ) {
//	$try = filter_input( INPUT_SERVER, $variable_name );
//	if( !isset($try) ) {
	if( isset( $_SERVER[$variable_name] ) ) {
		$val = filter_var( $_SERVER[$variable_name], $filter, $options );
		return ($val) ? $val : $defaultValue;
	}
//	return $try;
}
$rules = array(
/*	'picture'   => "/picture/(?'text'[^/]+)/(?'id'\d+)",    // '/picture/some-text/51'
	'album'     => "/album/(?'album'[\w\-]+)",              // '/album/album-slug'
	'category'  => "/category/(?'category'[\w\-]+)",        // '/category/category-slug'
	'page'      => "/page/(?'page'about|contact)",          // '/page/about', '/page/contact'
	'post'      => "/(?'post'[\w\-]+)",                     // '/post-slug'
	'home'      => "/"                                      // '/'
*/
);
//$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = rtrim( dirname(getServerValue("SCRIPT_NAME")), '/' );
//$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = '/' . trim( str_replace( $uri, '', getServerValue('REQUEST_URI') ), '/' );
$uri = urldecode( $uri );
foreach ( $rules as $action => $rule ) {
	if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
		/* now you know the action and parameters so you can
		 * include appropriate template file ( or proceed in some other way )
		 */
		include( INCLUDE_DIR . $action . '.php' );
		exit();
	}
}

//$path = ltrim($_SERVER['REQUEST_URI'], '/');    // Trim leading slash(es)
$path = ltrim(getServerValue('REQUEST_URI'), '/');    // Trim leading slash(es)
$elements = explode('/', $path);                // Split path on slashes
/*
if(empty($elements[0])) {                       // No path elements means home
	ShowHomepage();
} else switch(array_shift($elements))             // Pop off first item and switch
{
	case 'Some-text-goes-here':
		ShowPicture($elements); // passes rest of parameters to internal function
		break;
	case 'more':
		...
	default:
		header('HTTP/1.1 404 Not Found');
		Show404Error();
}
 */
//print print_r($elements, true);
$page = isset($_GET['page']) ? $_GET['page'] : 'stars';
if (file_exists($new. '.php')){
	//header("Location: {$page}.php");
}else{
	//header("Location: {$page}.html");
//	$new = $_GET['page']. '.html';
}
/**
 * Search recusively for files in a base directory matching a glob pattern.
 * The `GLOB_NOCHECK` flag has no effect.
 * https://gist.github.com/UziTech/3b65b2543cee57cd6d2ecfcccf846f20
 *
 * @param  string $base Directory to search
 * @param  string $pattern Glob pattern to match files
 * @param  int $flags Glob flags from https://www.php.net/manual/function.glob.php
 * @return string[] Array of files matching the pattern
 */
function glob_recursive($base, $pattern, $flags = 0) {
	$glob_nocheck = $flags & GLOB_NOCHECK;
	$flags = $flags & ~GLOB_NOCHECK;

	if (!function_exists('check_folder')) {
		function check_folder($base, $pattern, $flags) {
			if (substr($base, -1) !== DIRECTORY_SEPARATOR) {
			//if (do_mbstr('substr', $base, -1) !== DIRECTORY_SEPARATOR) {
				$base .= DIRECTORY_SEPARATOR;
			}
	
			$files = glob($base.$pattern, $flags);
			if (!is_array($files)) {
				$files = [];
			}
	
			$dirs = glob($base.'*', GLOB_ONLYDIR|GLOB_NOSORT|GLOB_MARK);
			if (!is_array($dirs)) {
				return $files;
			}
	
			foreach ($dirs as $dir) {
				$dirFiles = check_folder($dir, $pattern, $flags);
				$files = array_merge($files, $dirFiles);
			}
			
			return $files;
		}
	}
	$files = check_folder($base, $pattern, $flags);

	if ($glob_nocheck && count($files) === 0) {
		return [$pattern];
	}
	
	return $files;
}
$htm = <<<EO1
<html lang="en" itemscope="" itemtype="http://schema.org/Blog">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
EO1;
foreach ( glob_recursive( /*__DIR__. '/'.*/ "stylesheets/", "*.css") as $filename ) {
	$htm .= '<link rel="stylesheet" href="'. $filename. '?'. filemtime($filename). '">';
//	include_once($filename);
}
//if (directory_exists('stylesheets/'. $page. '.css'))
//	$htm .= '<link rel="stylesheet" href="css/'. $page. '.css?'. filemtime('css/'. $page. '.css'). '">';
if (file_exists('css/'. $page. '.css'))
	$htm .= '<link rel="stylesheet" href="css/'. $page. '.css?'. filemtime('css/'. $page. '.css'). '">';
$htm .= <<<EO2
</head>
<body>
EO2;
if ($page == 'stars1')
	$htm .= '<div class="stars"></div>';
//else
	$htm .= '<canvas id="'. $page. '"></canvas>';
$htm .= '<script type="text/javascript">const page = "'. $page. '";</script>';
foreach ( glob_recursive( "js/", "*.js") as $filename ) {
	$htm .= '<script type="text/javascript" src="'. $filename. '?'. filemtime($filename). '"></script>';
}
//$htm .= '<script type="text/javascript" src="js/'. $page. '.js?'. filemtime('js/'. $page. '.js'). '"></script>';
/*if (file_exists('js/Taiji.js'))
	$htm .= '<script type="text/javascript" src="js/Taiji.js?'. filemtime('js/Taiji.js'). '"></script>';*/
$htm .= <<<EO3
</body>
</html>
EO3;
print $htm;
