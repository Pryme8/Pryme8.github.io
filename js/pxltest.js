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
"<input name='background-color' type='radio' value='Transparent' checked='checked' />"+
"<input name='background-color' type='radio' value='White' />"+
"<input name='background-color' type='radio' value='Black' />"+
'<input style="display: none;" name="showAlpha" id="showAlpha" type="text">'+
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
		
	$("#showAlpha").spectrum({
    showAlpha: true
	});
}