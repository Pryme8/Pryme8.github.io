// JavaScript Document


var startPop = "<div class='menuPop'><a onclick='makeNew(32);'>Create New</a></div>";

var stage;
var sX, sY;
$(function() {
stage = $('.wrapFix');
sX = stage.outerWidth(); sY = stage.outerHeight();
stage.append(startPop); 
});

var stageStr = 
"<div class='workspace'>"+
"<div id='paintarea' class='bgTransparent'></div>"+
"<div id='menuOptions'>"+
"<input id='background-color' type='radio' value='Transparent' checked='checked' />"+
"<input id='background-color' type='radio' value='White' />"+
"<input id='background-color' type='radio' value='Black' />"+
"<input id='r' type='text' value='255' />"+
"<input id='g' type='text' value='255' />"+
"<input id='b' type='text' value='255' />"+
"<input id='a' type='text' value='1' />"+

"</div></div>";


function makeNew(wH){
	$('.menuPop').remove();
	stage.append(stageStr);
	var pxlW = $('#paintarea').innerWidth()/wH;
	var pxlH = pxlW;
	
	
	for(var x = 0; x < wH; x++){
		for(var y = 0; y < wH; y++){
			var newPxl = $('<div class="pxl"></div>');	
			$('#paintarea').append(newPxl);
			newPxl.attr('id',x+","+y).css({
				width:pxlW,
				height:pxlH
				});		
		}	
		$('#paintarea').html($('#paintarea').html()+"</br>");
	}
	
	$('.wrapFix').append('<div id="sixtyfour"><div id="layer1"></div></div>')
	
	
	
	
}

var mouseDown = false;
$(document).mousedown(function(e){
		mouseDown = true;
		if($(e.target).is('.pxl')){
			paintPxl(e.target);
		}
		
});
$(document).mousemove(function(e){
		if(mouseDown){
		if($(e.target).is('.pxl')){
			paintPxl(e.target);
		}
		}	
});
$(document).mouseup(function(e){
		mouseDown = false;			
});


var boxArray = [63];


function paintPxl(pxl){
	
	var idArray = $(pxl).attr('id').split(',');
	var arrayCount = parseInt(idArray[1]*64)+parseInt(idArray[0]);
	var colorString = "rgba("+$('#r').val()+","+$('#g').val()+","+$('#b').val()+","+$('#a').val()+")";
	
	$(pxl).css('background',colorString);
	
	boxArray[arrayCount]=idArray[1]+"px "+idArray[0]+"px 0px 1px "+colorString;
	
	var newString = '';
	
	boxArray.forEach(function(entry) {
   			 newString+=entry+",";
		});
	
	
	newString = newString.substring(3, newString.length - 1);
		
	$('#sixtyfour #layer1').css('box-shadow', newString);
	
}

