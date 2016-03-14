<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pseudo-Paint: Single Element Generator v0.0.2</title>
<link rel="stylesheet" type="text/css" href="css/main.css"/>

<script type="text/javascript" src="js/jquery.min.js"></script>


<link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>


<script type="text/javascript" src="js/main.js"></script>




</head>
<body>
<paintDoc>
	<pallet>
    <span id='noDoc'>No Document</span>
    </pallet>
    
    <underpallet>
    </underpallet>

<colorWindow>
<swatch class='selected' r="0" g="0" b="0" a="100" ></swatch>
<swatch r="255" g="255" b="255" a="100" ></swatch>
<colorTools>

<pane id='slider'>
<name>R</name>
<slide><div id="red"></div></slide>
<value><input name="curRed" id="curRed" value="0" onChange=refreshSwatch("input");></value>
</pane>

<pane id='slider'>
<name>G</name>
<slide><div id="green"></div></slide>
<value><input name="curGreen" id="curGreen" value="0" onChange=refreshSwatch("input");></value>
</pane>

<pane id='slider'>
<name>B</name>
<slide><div id="blue"></div></slide>
<value><input name="curBlue" id="curBlue" value="0" onChange=refreshSwatch("input");></value>
</pane>

<pane id='slider'>
<name>A</name>
<slide><div id="alpha"></div></slide>
<value><input name="curAlpha" id="curAlpha" value="100" onChange=refreshSwatch("input");></value>
</pane>


</colorTools>
</colorWindow>

<toolWindow>
	<toolBar>
    <div id="pencil" name="pencil" class="tool selected"></div>
	<div id="erase" name="erase" class="tool"></div><BR />
	<div id="fill" name="fill" class="tool"></div>
	<div id="magicPencil" name="magicPencil" class="tool"></div><BR />
    <div id="drawLine" name="drawLine" class="tool"></div>
    </toolBar>
    <pane id='pencil'>
    <label for="pencil-blend">Blend Mode</label>
  		<select name="pencil-blend" id="pencil-blend">
        <option value="Absolute" >Absolute</option>
        <option value="Multiply" >Multiply</option>
        <option value="Color-Burn">Color Burn</option>
        <option value="Linear-Burn">Linear Burn</option>
        <option value="Screen">Screen</option>
        <option value="Color-Dodge">Color Dodge</option>
        <option value="Overlay">Overlay</option>
  		</select>
    </pane>
</toolWindow>

<menuWindow>
    <menu>
        <subMenu>
            <item><a>File</a>
            <subMenu>
                    <item><a onclick="showSubMenu('File-New');">New</a></item>
                    <item><a>Save</a></item>
                    <item><a>Export</a></item>
                </subMenu>
            </item>
            
            <item><a>Edit</a>
                <!-- First Tier Drop Down -->
                <subMenu>
                    <item><a>Clear Image</a></item>
                    <item><a>Image Settings</a></item>
                    <item><a>Place Holder</a>
                      <subMenu>
                    	<item><a>Auto Trace</a></item>
                    	<item><a>PlaceHolder</a></item>
                    	<item><a>PlaceHolder</a></item>
            		</subMenu>
                    </item>
                </subMenu>
            </item>
            <item><a>Tools</a>
            <subMenu>
                    <item><a>Macro Scripts</a>
                    <subMenu>
                    	<item><a onclick="showSubMenu('Macro-AutoTrace');">Auto Trace</a></item>
                    	<item><a>PlaceHolder</a></item>
                    	<item><a>PlaceHolder</a></item>
            		</subMenu>
                    </item>
                    <item><a>Adjustments</a></item>
            </subMenu>
            </item>
            <item><a>Windows</a></item>
            <item><a>Share</a></item>
            <item><a>About</a>
            <subMenu>
                    <item><a>Contact</a></item>
            </subMenu>
            </item>
        </subMenu>
    </menu>
	<pane id='File-New'>
    	<form id="size-form">
  		<label for="size-pick">Size</label>
  		<select name="size-pick" id="size-pick">
        <option value="8" >8 x 8</option>
        <option value="16" >16 x 16</option>
    	<option value="32" >32 x 32</option>
    	<option value="64">64 x 64</option>
    	<option value="128">128 x 128</option>
    	<option value="256">256 x 256</option>
        <option value="Custom">Custom </option>
  		</select>
        <label for="X-Size">X-Size:</label>
		<input name="X-Size" id="X-Size" value="0">&nbsp;
		<label for="Y-Size">Y-Size:</label>
		<input name="Y-Size" id="Y-Size" value="0" ><BR />
        <label for="Ratio-A">Ratio:</label>
		<input name="Ratio-A" id="Ratio-A" value="1" class="small" >/
       	<input name="Ratio-B" id="Ratio-B" value="1" class="small" >&nbsp;
		</form>
        <bottomPane>
        <a onclick="createNew();">Create New</a>
        </bottomPane>
    </pane>
    
    	<pane id='Macro-AutoTrace'>
        <input id="disp_tmp_path" style:"width:100%;"></input>
		<bottomPane>
        <span><a onclick="updateBGimage();">Load to Background</a></span>
         <span><a onclick="autoTrace();">Auto Trace</a></span>
        </bottomPane>
    </pane>
    
</menuWindow>
<tabWindow>
<tab id='swatch-history' class='swatch-lib'>
</tab>

</tabWindow>
<previewWindow>
</previewWindow>
<layers>
<layerBox>
<layer id="1" class="active"></layer>
</layerBox>
</layers>
<infoWindow>
	<topinfo>
<label for="curX">pxlX:</label>
<input name="curX" id="curX" value="0">&nbsp;
<label for="curY">pxlY:</label>
<input name="curY" id="curY" value="0" >&nbsp;
<label for="curID">pxlID:</label>
<input name="curID" id="curID" value="0" >&nbsp;
<label for="sizeX">sizeX:</label>
<input name="sizeX" id="sizeX" value="0" >&nbsp;
<label for="sizeY">sizeY:</label>
<input name="sizeY" id="sizeY" value="0" >&nbsp;
    </topinfo>
    <bottominfo>
    <label for="Script-Tick">Script-Tick:</label>
	<input name="Script-Tick" id="Script-Tick" value="0">&nbsp;
    <debug>
    </debug>
    </bottominfo>

</infoWindow>


</paintDoc>

</body>
</html>