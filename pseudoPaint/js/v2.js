$(function() {
	checkWindowSize();
	int();	
	
});


/*/  -- INTI -- /*/
var mouseDown = false;
var activePxl = {};
activePxl.x = null;
activePxl.y = null;
activePxl.id = null;



function int(){	
$('toggle').click(function(e){
	$(e.target).parent().toggleClass('inUse');
});

$('swatch').click(function(e){
	var colorValues = {};
	$('swatch').each(function() {
        $(this).removeClass('selected');
    });
	colorValues = getColorValues(e.target);
	documentData.activeColor = "rgba("+colorValues.r+","+colorValues.g+","+colorValues.b+","+colorValues.a+")";
	 $(this).addClass('selected');

});

$('toolshape').click(function(e){
	$('toolshape').each(function() {
        $(this).removeClass('selected');
    });
	 $(this).addClass('selected');
		toolData.activeShape = $('window#Tool-Shapes toolshape.selected img').attr('src');
});

$('window#color-picker canvas').click(function(e){
	colorPickGo(e.clientX - $(this).offset().left, e.clientY - $(this).offset().top);
});



$(window).resize(function(e){
	checkWindowSize();
});

$(window).keypress(function(e) {
	if(!documentData.newDocumentTrigger){
		
 		e.preventDefault();
		
 		var key = e.key;
		
		if(offSet.trigger == false){
		offSet.trigger = true;
		//NAVIGATION
		if( key == "=" ){ //Plus
			navigation(0.1,0,0);
		}else if( key == "-" ){  //Minus
			navigation(-0.1,0,0);
		}
		
		
		
		if ( key == "ArrowUp" ){
			navigation(0,0,10);
		}else if ( key == "ArrowDown" ){
			navigation(0,0,-10);
		}
		
		if ( key == "ArrowLeft" ){
			navigation(0,10,0);
		}else if ( key == "ArrowRight" ){
			navigation(0,-10,0);
		}
		}
		
		if ( key == "[" ){
			toolData.size-=1;
		}else if ( key == "]" ){
			toolData.size+=1;
		}
		
		
		
	}
	

});

$('SUDOpaint').mousedown(function(e){
		if($(e.target).is('canvas#canvasOutline')){
			mouseDown = true;
		}
});

$('SUDOpaint').on("mouseup",function(e){
			mouseDown = false;
});

$('SUDOpaint').mousemove(function(e){
		if($(e.target).is('canvas#canvasOutline')){
			activePxl.x = (e.offsetX);
			activePxl.y = (e.offsetY);
		}
});

buildColorPicker();

$( "slider #slide-r, slider #slide-g, slider #slide-b" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 0,
	  step: 1,
      slide: function(){changeColorInfo($(this),'rgb-slide')},
      });
	
$( "slider #slide-a" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      value: 100,
	  step: 1,
      slide: function(){changeColorInfo($(this),'a-slide')},
     });
	
$( "slider #slide-h" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 360,
      value: 0,
	  step: 1,
      slide: function(){changeColorInfo($(this),'h-slide')},
     });

$( "slider #slide-s, slider #slide-l" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      value: 0,
	  step: 1,
      slide: function(){changeColorInfo($(this),'sl-slide')},
     });
	 
$( "window#blendmodes div#slide-Flow" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      value: 100,
	  step: 0.1,
      slide: function(){changeColorInfo($(this),'flow-slide')},
     });

}

function checkWindowSize(){
 if(screen.availWidth > window.innerWidth|| screen.availHeight > window.outerHeight){
		if($('window#Warning').css('display') == 'none'){
			$('window#Warning').html("<span>ERROR! Please Maxamize your Window...</span>").fadeIn(300);
		}
 }else{
	 if($('window#Warning').css('display') != 'none'){
			$('window#Warning').html('').fadeOut(300);
		}	 
 }
}


	var documentData = {}
	documentData.documentName = null;
	documentData.documentXsize = null;
	documentData.documentYsize = null;
	documentData.pageXsize = null;
	documentData.pageYsize = null;
	
	
	
	documentData.activeColor = "rgba(0,0,0,1)";
	documentData.activeAlpha = 1;
	
	documentData.newDocumentTrigger = true;
	
	var canvasObject = $('<canvas></canvas>');

function createNewDocument(){
	if(documentData.newDocumentTrigger){
		
		$('window#File-New').fadeOut(300);
		documentData.documentName = $('window#File-New input#Document-Name').val();
		documentData.documentXsize = $('window#File-New input#Document-X-Size').val();
		documentData.documentYsize = $('window#File-New input#Document-Y-Size').val();
		documentData.pageXsize = $('window#File-New input#Canvas-X-Size').val();
		documentData.pageYsize = $('window#File-New input#Canvas-Y-Size').val();
		documentData.newDocumentTrigger = false;
		
		var newCanvasOutline = $(canvasObject);
		$('window#workspace').append(newCanvasOutline);
		newCanvasOutline.attr('id','canvasOutline')
		
		var canvas = $('window#workspace').find('canvas#canvasOutline')[0];
		canvas.width = documentData.documentXsize;
		canvas.height = documentData.documentYsize;
        
		
		var context = canvas.getContext('2d');
		var middlePoint_Width = (documentData.documentXsize*0.5)-(documentData.pageXsize*0.5);
		var middlePoint_Height = (documentData.documentYsize*0.5)-(documentData.pageYsize*0.5);
		context.strokeStyle = "rgba(126,126,126,0.5)";
		context.strokeRect(middlePoint_Width,middlePoint_Height,documentData.pageXsize,documentData.pageYsize);
		
		
		$("window#workspace background").css({
		width:documentData.documentXsize,
		height:documentData.documentYsize
		});	
		
		addNewLayer();
		addToolPreview();
	}
}

var activeLayer = null;
function addNewLayer(){
		
		var newLayer = $("<canvas></canvas>");
		$(newLayer).insertBefore('window#workspace canvas#canvasOutline');
		newLayer.addClass('Layer')
		var newID = $('window#workspace').children('.Layer').length;
		newLayer.attr('id', newID);
		activeLayer = newID;
		
		var canvas = $('window#workspace').find('canvas#'+newID)[0];
		
		canvas.width = documentData.documentXsize;
		canvas.height = documentData.documentYsize;
	
}




function addToolPreview(){
		
		
		if(toolData.activeShape == null){
		toolData.activeShape = $('window#Tool-Shapes toolshape.selected img').attr('src');	
		}
		
		if(toolData.lastShape != toolData.activeShape){
			
		}
		
	
		var toolPreview = $("<canvas></canvas>");
		$(toolPreview).insertBefore('window#workspace canvas#canvasOutline');
		toolPreview.attr('id', 'toolPreview');
			
		var canvas = $('window#workspace').find('canvas#toolPreview')[0];
		
		var img = new Image();
		img.src = toolData.activeShape;
		
		canvas.width =  img.width * toolData.size;
		canvas.height =  img.height * toolData.size;
		
		var context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width, canvas.height);
		context.drawImage(img, 0, 0, canvas.width, canvas.height);
		img.style.display = 'none';
  		var imageData = context.getImageData(0,0,canvas.width, canvas.height);
		var data = imageData.data;
		
		if(toolData.lastShape != toolData.activeShape){
			toolData.shapeData = data;
			toolData.lastShape == toolData.activeShape;
		}
		
		for (var i = 0; i < data.length; i += 4) {
      		data[i]     = 126;     // red
     		data[i + 1] = 126 - data[i + 1]; // green
      		data[i + 2] = 126 - data[i + 2]; // blue
	  		data[i + 3] = data[i + 3]*0.5; // alpha
    	}
    		context.putImageData(imageData, 0, 0);
			
			
		
		$("window#workspace canvas#toolPreview").css({
		left:parseFloat(($("window#workspace").innerWidth()*0.5)-(documentData.documentXsize*0.5)+activePxl.x),
		top:parseFloat((($("window#workspace").innerHeight()*0.5)-(documentData.documentYsize*0.5)+activePxl.y)+0.5)
		});
			
	
}


var offSet = {};
offSet.zoom = 1;
offSet.x = 0;
offSet.y = 0
offSet.trigger = false;
function navigation(zoom, xOff, yOff){
	if(offSet.zoom < 0.1){offSet.zoom += zoom*0.1; if(offSet.zoom < 0.01){offSet.zoom = 0.01}}else{
	offSet.zoom += zoom;	
	};
	offSet.x += xOff;
	offSet.y += yOff;
	reDrawWorkspace();

}

function reDrawWorkspace(){
	
		$('window#workspace').css({transform : 'scale('+offSet.zoom+') translate('+offSet.x+"px,"+offSet.y+'px)'});
		setTimeout(function(){offSet.trigger = false},3);
		
		
		
}

/* --- ASYNC STUFF --- */

//SUDOpaint Object
var SUDO = { };
var toolData =  { };

toolData.activeTool = "pencil";
toolData.lastTool = null;

toolData.activeBlend = $('window#blendmodes #blend-select').val();

function changeBlend(v){
	tooData.activeBlend = v
}

toolData.activeShape = null;
toolData.lastShape = null;

toolData.shapeData = null;

toolData.size = 1;
toolData.activeFlow = 100;
toolData.nextFlow = (new Date).getTime() + ((toolData.activeFlow - (100 - toolData.activeFlow)));

toolData.r = 0, toolData.g = 0, toolData.b = 0, toolData.a = 0;


activePxl.lastX = null;
activePxl.lastY = null;
activePxl.lastID = null;

//Run Updates on Screen
SUDO.draw = function(){
	var tempTime = (new Date).getTime();
	if(!documentData.newDocumentTrigger){
		setTimeout(function(){reDrawTool();},0);
	}
	setTimeout(function(){updateInfo();},0); //UPDATE SCREEN INFO FOR MOUSE STUFF ASNYC	
	
	
	if(mouseDown){
	
		setTimeout(function(){paintPxl();},0);
	
	}
};
//DRAW FUNCTIONS
function updateInfo(){
	
	
	if(activePxl.x != activePxl.lastX){
	activePxl.lastX = activePxl.x;
	}
	if(activePxl.y != activePxl.lastY){
	activePxl.lastY = activePxl.y;
	}
	$('window#topBar span#mouseInfo span#xDisp').text(activePxl.x);
	$('window#topBar span#mouseInfo span#yDisp').text(activePxl.y);
}

activePxl.lastPainted_X = null;
activePxl.lastPainted_Y = null;

function paintPxl(x,y,size){
	
	if(activePxl.x != activePxl.lastPainted_X || activePxl.y != activePxl.lastPainted_Y){
		activePxl.lastPainted_X = activePxl.x, activePxl.lastPainted_Y = activePxl.y;
		
		
	
	
			var canvas = $('window#workspace').find('canvas#'+activeLayer)[0];
			var context = canvas.getContext('2d');

	
	
	
		if(toolData.activeTool == "pencil"){
			pencilTool(canvas, context);
		}
		
		}
	
	
return
}

function pencilTool(canvas, context){
	if($('window#blendmodes select').val() == "Natural"){
		
		var img = new Image();
		img.src = toolData.activeShape;
		
		
		var sourceData = context.getImageData((activePxl.x),(activePxl.y),(img.width * toolData.size),(img.height * toolData.size));
		var data = sourceData.data;
		
   		context.drawImage(img, (activePxl.x),(activePxl.y),(img.width * toolData.size),(img.height * toolData.size));
	
	
		return	
	}
	if($('window#blendmodes select').val() == "Absolute"){
		context.clearRect((activePxl.x),(activePxl.y),(toolData.size),(toolData.size));
		context.fillStyle = documentData.activeColor;
		context.fillRect((activePxl.x),(activePxl.y),(toolData.size),(toolData.size));
		return	
	}
}




function reDrawTool(){
		$("window#workspace canvas#toolPreview").remove();		
		addToolPreview();		
		
}



//Do Calculations
SUDO.update = function(){
	if(mouseDown){
		
	}
};


SUDO.fps = 60;  			//Set FPS



//ACTUAL GAME RUNNING
	SUDO.run = (function(){ 
		var sudoLoop = 0, skipTicks = 1000/ SUDO.fps, maxFrameSkip = 10, nextSudoTick =(new Date).getTime(); 
		return function(){
			sudoLoop = 0;	
			while((new Date).getTime() > nextSudoTick && sudoLoop < maxFrameSkip){
				SUDO.update(); //Update - Do Calculations
				nextSudoTick += skipTicks;
				sudoLoop ++;
			}
			
			if (!sudoLoop) {
      		SUDO.draw();//Draw scene on screen...
    		}
		};	
})();
	
	



//Run Game
SUDO._intervalId = setInterval(SUDO.run, 0);  



//Input and Sliders not just Colors now!
function changeColorInfo(slider, state){
	if(state == 'rgb-slide')	{
		$(slider).prev('input').val($(slider).slider('value'));	
		var newHSL = rgbToHsl($('window#color-sliders slider#r input').val(), $('window#color-sliders slider#g input').val(), $('window#color-sliders slider#b input').val());	
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
		$('window#color-sliders slider#h input').val(newHSL[0]);
		$('window#color-sliders slider#s input').val(newHSL[1]);
		$('window#color-sliders slider#l input').val(newHSL[2]);
		$('window#color-sliders slider#h div#slide-h').slider('value',newHSL[0]);
		$('window#color-sliders slider#s div#slide-s').slider('value',newHSL[1]*100);
		$('window#color-sliders slider#l div#slide-l').slider('value',newHSL[2]*100);
	}
	
	if(state == 'sl-slide')	{
		$(slider).prev('input').val($(slider).slider('value')/100);
		var newRGB = hslToRgb($('window#color-sliders slider#h input').val(), $('window#color-sliders slider#s input').val(), $('window#color-sliders slider#l input').val());
		$('window#color-sliders slider#r input').val(newRGB[0]);
		$('window#color-sliders slider#g input').val(newRGB[1]);
		$('window#color-sliders slider#b input').val(newRGB[2]);
		$('window#color-sliders slider#r div#slide-r').slider('value',newRGB[0]);
		$('window#color-sliders slider#g div#slide-g').slider('value',newRGB[1]);
		$('window#color-sliders slider#b div#slide-b').slider('value',newRGB[2]);
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
	}
	
	if(state == 'h-slide')	{
		$(slider).prev('input').val($(slider).slider('value'));
		var newRGB = hslToRgb($('window#color-sliders slider#h input').val(), $('window#color-sliders slider#s input').val(), $('window#color-sliders slider#l input').val());
		$('window#color-sliders slider#r input').val(newRGB[0]);
		$('window#color-sliders slider#g input').val(newRGB[1]);
		$('window#color-sliders slider#b input').val(newRGB[2]);
		$('window#color-sliders slider#r div#slide-r').slider('value',newRGB[0]);
		$('window#color-sliders slider#g div#slide-g').slider('value',newRGB[1]);
		$('window#color-sliders slider#b div#slide-b').slider('value',newRGB[2]);
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
	}
	
	if(state == 'flow-slide')	{
		$(slider).prev('input').val($(slider).slider('value'));
		documentData.activeFlow = $(slider).prev('input').val();
		
	}
	if(state == 'flow-input')	{
		if($(slider).val()>100){$(slider).val(100)}else if($(slider).val()<0.1){$(slider).val(0.1)}
		$(slider).next('div').slider('value', $(slider).val());
		documentData.activeFlow = $(slider).val();
	}
	
	
	if(state == 'a-slide')	{
		$(slider).prev('input').val($(slider).slider('value')/100);
		setAlpha($(slider).prev('input').val());
	}
	
	if(state == 'a-input')	{
		if($(slider).val()>1){$(slider).val(1)}else if($(slider).val()<0){$(slider).val(0)}
		$(slider).next('div').slider('value', $(slider).val()*100);
		setAlpha($(slider).val());
	}
	
	if(state== 'rgb-input'){
		if($(slider).val()>255){$(slider).val(255)}else if($(slider).val()<0){$(slider).val(0)}
		$(slider).next('div').slider('value', $(slider).val());
		var newHSL = rgbToHsl($('window#color-sliders slider#r input').val(), $('window#color-sliders slider#g input').val(), $('window#color-sliders slider#b input').val());	
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
		$('window#color-sliders slider#h input').val(newHSL[0]);
		$('window#color-sliders slider#s input').val(newHSL[1]);
		$('window#color-sliders slider#l input').val(newHSL[2]);
		$('window#color-sliders slider#h div#slide-h').slider('value',newHSL[0]);
		$('window#color-sliders slider#s div#slide-s').slider('value',newHSL[1]*100);
		$('window#color-sliders slider#l div#slide-l').slider('value',newHSL[2]*100);
	}
	if(state== 'sl-input'){
		if($(slider).val()>1){$(slider).val(1)}else if($(slider).val()<0){$(slider).val(0)}
		$(slider).next('div').slider('value', $(slider).val()*100);
		var newRGB = hslToRgb($('window#color-sliders slider#h input').val(), $('window#color-sliders slider#s input').val(), $('window#color-sliders slider#l input').val());
		$('window#color-sliders slider#r input').val(newRGB[0]);
		$('window#color-sliders slider#g input').val(newRGB[1]);
		$('window#color-sliders slider#b input').val(newRGB[2]);
		$('window#color-sliders slider#r div#slide-r').slider('value',newRGB[0]);
		$('window#color-sliders slider#g div#slide-g').slider('value',newRGB[1]);
		$('window#color-sliders slider#b div#slide-b').slider('value',newRGB[2]);
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
	
	}
	if(state== 'h-input'){
		if($(slider).val()>360){$(slider).val(1)}else if($(slider).val()<0){$(slider).val(0)}
		$(slider).next('div').slider('value', $(slider).val());
		var newRGB = hslToRgb($('window#color-sliders slider#h input').val(), $('window#color-sliders slider#s input').val(), $('window#color-sliders slider#l input').val());
		$('window#color-sliders slider#r input').val(newRGB[0]);
		$('window#color-sliders slider#g input').val(newRGB[1]);
		$('window#color-sliders slider#b input').val(newRGB[2]);
		$('window#color-sliders slider#r div#slide-r').slider('value',newRGB[0]);
		$('window#color-sliders slider#g div#slide-g').slider('value',newRGB[1]);
		$('window#color-sliders slider#b div#slide-b').slider('value',newRGB[2]);
		setNewColor($('window#color-sliders slider#r input').val(),$('window#color-sliders slider#g input').val(),$('window#color-sliders slider#b input').val());
	
	}
	
}



function hslToRgb(h, s, l){
    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s))
    l = Math.max(0, Math.min(1, l))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return [r,g,b];

}
   




function rgbToHsl(r, g, b){
    r /= 255,
	 g /= 255,
	  b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) :
		d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
	
	h = h * 360;
	if(h>360){h=360}else{h = Math.round(h)};
	

    return [h, s.toFixed(2), l.toFixed(2)];
}

function getColorValues(target){
	var colorValues = {}
		colorValues.r = $(target).attr('r');
		colorValues.g = $(target).attr('g');
		colorValues.b = $(target).attr('b');
		colorValues.a = $(target).attr('a');
		return colorValues;
}


function colorPickGo(x,y){
	var canvas = document.getElementById('canvas_pick').getContext('2d');
	var imgData = canvas.getImageData(x, y, 1, 1).data;
	var r = imgData[0];
	var g = imgData[1];
	var b = imgData[2];

	setNewColor(r,g,b);
		
		var newHSL = rgbToHsl(r, g, b);	
		$('window#color-sliders slider#h input').val(newHSL[0]);
		$('window#color-sliders slider#s input').val(newHSL[1]);
		$('window#color-sliders slider#l input').val(newHSL[2]);
		$('window#color-sliders slider#h div#slide-h').slider('value',newHSL[0]);
		$('window#color-sliders slider#s div#slide-s').slider('value',newHSL[1]*100);
		$('window#color-sliders slider#l div#slide-l').slider('value',newHSL[2]*100);
		$('window#color-sliders slider#r input').val(r);
		$('window#color-sliders slider#g input').val(g);
		$('window#color-sliders slider#b input').val(b);
		$('window#color-sliders slider#r div#slide-r').slider('value',r);
		$('window#color-sliders slider#g div#slide-g').slider('value',g);
		$('window#color-sliders slider#b div#slide-b').slider('value',b);


}

function setNewColor(r,g,b){
	$('#pallet').find('swatch.selected').css('background-color', "rgba("+r+","+g+","+b+","+documentData.activeAlpha+")");
	documentData.activeColor = "rgba("+r+","+g+","+b+","+documentData.activeAlpha+")";
	toolData.r = r, toolData.g = g, toolData.b = b, toolData.a = documentData.activeAlpha;
}
function setAlpha(a){
	documentData.activeAlpha = a;
	setNewColor($('window#color-sliders slider#r input').val(),
		$('window#color-sliders slider#g input').val(),
		$('window#color-sliders slider#b input').val());
	
	
}
function buildColorPicker(){	
var canvas = document.getElementById('canvas_pick');
var ctx = canvas.getContext("2d");           
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);  
gradient.addColorStop(0, 'red');  
gradient.addColorStop(1 / 6, 'orange');  
gradient.addColorStop(2 / 6, 'yellow');  
gradient.addColorStop(3 / 6, 'green');  
gradient.addColorStop(4 / 6, 'blue');  
gradient.addColorStop(5 / 6, 'indigo');  
gradient.addColorStop(1, 'violet');  
ctx.fillStyle = gradient;  
ctx.fillRect(0, 0, canvas.width, canvas.height); 
gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); 
gradient.addColorStop(0, 'rgba(255,255,255,1)');  
gradient.addColorStop(1 / 2, 'rgba(255,255,255,0)'); 
gradient.addColorStop(1 / 2, 'rgba(0,0,0,0)'); 
gradient.addColorStop(1, 'rgba(0,0,0,1)'); 
ctx.fillStyle = gradient;  
ctx.fillRect(0, 0, canvas.width, canvas.height); 
}

function blendReturn(){
	
}


	


