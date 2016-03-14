<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SUDOpaint v0.2.0</title>
<link href="./css/beta.css" rel="stylesheet" type="text/css" />
<link href="./css/sudo.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/jquery.min.js"></script>


<link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>

<script type="text/javascript" src="js/v2.js"></script>


</head>



<body>
<SUDOpaint>

<window id="workspace">

<background></background>
</window>
<pane id="left">
<window id="tools">
    <sudo id="pencil" class="tool selected" ></sudo>
	<sudo id="erase" class="tool"></sudo><BR />
	<sudo id="paint" class="tool"></sudo>
    <sudo id="gridSnap" class="tool"></sudo><BR />
    <sudo id="drawLine" class="tool"></sudo>
    <sudo id="shape" class="tool"></sudo><BR />
    <sudo id="fill" class="tool"></sudo>	
    
<toggle name="&darr; Tools &darr;" alt-name="&uarr; Tools &uarr;" />
</window>
</pane>

<window id="pallet">
	<swatch class="selected" r="0" g="0" b="0" a="1"> </swatch>
    <swatch r="255" g="255" b="255" a="1"> </swatch>
</window>

<window id="color-picker">
<canvas width="200" height="200" id="canvas_pick"></canvas>
</window>

<window id='color-sliders'>
<slider id='r'>
<label for="input-r">R&nbsp;</label>
<input name="input-r" id="input-r" value="0" onchange="changeColorInfo($(this),'rgb-input');">
<div id="slide-r"></div>
</slider>
<slider id='g'>
<label for="input-g">G&nbsp;</label>
<input name="input-g" id="input-g" value="0" onchange="changeColorInfo($(this),'rgb-input');">
<div id="slide-g"></div>
</slider>
<slider id='b'>
<label for="input-b">B&nbsp;</label>
<input name="input-b" id="input-b" value="0" onchange="changeColorInfo($(this),'rgb-input');">
<div id="slide-b"></div>
</slider>
<slider id='a'>
<label for="input-a">A&nbsp;</label>
<input name="input-a" id="input-a" value="100" onchange="changeColorInfo($(this),'a-input');">
<div id="slide-a"></div>
</slider>
<slider id='h'>
<label for="input-h">H&nbsp;</label>
<input name="input-h" id="input-h" value="0" onchange="changeColorInfo($(this),'h-input');">
<div id="slide-h"></div>
</slider>
<slider id='s'>
<label for="input-s">S&nbsp;</label>
<input name="input-s" id="input-s" value="0" onchange="changeColorInfo($(this),'sl-input');">
<div id="slide-s"></div>
</slider>
<slider id='l'>
<label for="input-l">L&nbsp;</label>
<input name="input-l" id="input-l" value="0" onchange="changeColorInfo($(this),'sl-input');">
<div id="slide-l"></div>
</slider>
</window>
<window id='blendmodes'><center>
    <label for="blend-select">Blend Mode</label>
  		<select name="blend-select" id="blend-select" onchange="changeBlend(this.value)">
        <option value="Natural" >Natural</option>
        <option value="Absolute" >Absolute</option>
        <option value="Multiply" >Multiply</option>
        <option value="Screen">Screen</option>
        <option value="Color-Burn">Color Burn</option>
        <option value="Linear-Burn">Linear Burn</option>        
        <option value="Color-Dodge">Color Dodge</option>
        <option value="Overlay">Overlay</option>
  		</select> </center>
        <label for="Tool-Flow">Flow</label>
<input name="Tool-Flow" id="Tool-Flow" value="100" onchange="changeColorInfo($(this),'flow-input');">
<div id="slide-Flow"></div>
</window>
<window id='Tool-Shapes'>
	<?PHP
	$files = glob('./Tool-Shapes/pencil/*.{jpg,png,gif}', GLOB_BRACE);
	$i = 0;
foreach($files as $file) {
	if($i==0){
	 echo "<toolshape class='selected'><span><img src='".$file."' /><span></toolshape>";
	 $i++;
	}else{
  	echo "<toolshape><span><img src='".$file."' /><span></toolshape>";
	}
}
	?>
</window>

<window id="File-New">
<label for="Document-Name">Name:</label>
<input name="Document-Name" id="Document-Name" value="New Document"><BR />
<label for="Document-X-Size">Document-Width:</label>
<input name="Document-X-Size" id="Document-X-Size" value="300">&nbsp;
<label for="Document-Y-Size">Document-Height:</label>
<input name="Document-Y-Size" id="Document-Y-Size" value="300"><BR />
<label for="Canvas-X-Size">Page-Width:</label>
<input name="Canvas-X-Size" id="Canvas-X-Size" value="256">&nbsp;
<label for="Canvas-Y-Size">Page-Height:</label>
<input name="Canvas-Y-Size" id="Canvas-Y-Size" value="256"><BR /><BR />
<button onclick="createNewDocument();">Create New Document</button>
</window>

<window id='topBar'><span id="mouseInfo"><span id="xDisp"></span>:<span id="yDisp"></span></span></window>

<window id="Warning">
</window>



</SUDOpaint>
</body>
</html>