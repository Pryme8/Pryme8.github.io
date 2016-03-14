

$(function() {
	memoryOutput();
	int();	
});


/*/  -- INTI -- /*/
function int(){
	memoryOutput();
//Color Bindings	
$( "#red, #green, #blue" ).slider({
      orientation: "vertical",
      range: "min",
      max: 255,
      value: 0,
      slide: function(){refreshSwatch('slide')},
      change: function(){refreshSwatch('slide')}
    });
	
$( "#alpha" ).slider({
      orientation: "vertical",
      range: "min",
      max: 100,
      value: 100,
      slide: function(){refreshSwatch('slide')},
      change: function(){refreshSwatch('slide')}
    });	
	
$('colorwindow swatch').click(function(e){
	swatchOptions(e.target);
});

$('tabWindow tab swatch').click(function(e){
	refreshSwatch("pick",e.target);
});

    
	
//Tool Bindings
$('.tool').click(function(e){
	$('toolWindow toolBar').find('.tool').removeClass('selected');	
	$(e.target).addClass('selected');
	activeTool = $(e.target).attr('name');
});

memoryOutput();
}

var lastTime = null, now;
function memoryOutput(){
now = new Date().getTime();
	if(lastTime == null){
	lasTime = new Date().getTime()
	return;
	}
  if(now != lastTime){
  	updateTimeTick(now-lastTime);
	lastTime = null;
	}
	
}

function updateTimeTick(tick){
	$('infoWindow bottomInfo #Script-Tick').val(tick);
	
}

/*/  -- NEW -- /*/

var pxl = "<pxl></pxl>"; // pxl Element
var size;
var ratio = 1;
function createNew(){
	memoryOutput();
		size = $( "#size-pick" ).val();
		$('pallet').html('');
		$('previewWindow').html('');
			var x, y;
			var pxlCount = 0;
			
			var pxlSize = $('pallet').innerWidth()/size;
			
			for(y = 0; y<size;y++){
				for(x = 0; x<size;x++){
					var newPxl = $(pxl);
					$('pallet').append(newPxl);
					newPxl.css({
					width:pxlSize,
					height:pxlSize	
					}).attr('id',pxlCount).attr('pos',x+","+y).
					attr('r','120').attr('b','120').attr('g','120').attr('a','100');
					pxlCount++;	
				}
				$('pallet').append("<br>");	
			}
			
			createPreview()
			bindings();
			memoryOutput();
}



var activeTool = "pencil";

/*/  -- MOUSE BINDINGS -- /*/

var mouseDown = false;
function bindings(){
//Pallet Bindings		
$('pallet').mousedown(function(e){
		e.preventDefault();
		mouseDown = true;
		if($(e.target).is('pxl')){
			paintPxl(e.target,e.pageX,e.pageY);
		}
		updateInfo(e.target);
});
$('pallet').mousemove(function(e){
	e.preventDefault();
		if(mouseDown){
		if($(e.target).is('pxl')){
			paintPxl(e.target,e.pageX,e.pageY);
			updateInfo(e.target);
		}
		}
});
$('pallet').mouseup(function(e){
		e.preventDefault();
		mouseDown = false;
		historicPxl = null;
		updateInfo(e.target);			
});
$('pallet').mouseleave(function(e){
	e.preventDefault();
		mouseDown = false;
		historicPxl = null;
		updateInfo(e.target);			
});


}


/*/  -- PIXLE MODIFICATION SYSTEM -- /*/

function paintCurPxl(pxl,s){
	
	var activeSwatch = $('colorwindow').find('swatch.selected');		
	colorString = getBlendString(activeSwatch.attr('r'),activeSwatch.attr('g'),activeSwatch.attr('b'),activeSwatch.attr('a'),s,pxl);
	
	newCSsplit = colorString.substring(5,colorString.length-1);
	setTimeout(function(){debugLog("ATTR ASSGINED -" + newCSsplit);},0);
	
	newCSsplit = newCSsplit.split(',');
	
	
	$(pxl).attr('r',newCSsplit[0]).attr('g',newCSsplit[1]).attr('b',newCSsplit[2]).attr('a',parseInt(newCSsplit[3]));	
	setTimeout(function(){debugLog("(Paint Pxl) String - rgba("+newCSsplit[0]+","+newCSsplit[1]+","+newCSsplit[2]+","+newCSsplit[3]/100+")");},0);
	$(pxl).css('background', "rgba("+newCSsplit[0]+","+newCSsplit[1]+","+newCSsplit[2]+","+newCSsplit[3]/100+")");
	memoryOutput();
	
}

function getBlendString(r,g,b,a,s,pxl){
		
	if(s=='Absolute'){
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Multiply'){
		
		var mixPxl = pxl;
		
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
	
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
			
		r = ((parseFloat(r)*parseFloat(a)) * (parseFloat(r2)*parseFloat(a2)))/2;
		g = ((parseFloat(g)*parseFloat(a)) * (parseFloat(g2)*parseFloat(a2)))/2;
		b = ((parseFloat(b)*parseFloat(a)) * (parseFloat(b2)*parseFloat(a2)))/2;
		a = (parseFloat(a) + parseFloat(a2))/2;
			
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);				
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Color-Burn'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
	
		r = 1 - (1 - (parseFloat(r)*parseFloat(a)))/(parseFloat(r2)*parseFloat(a));
		g = 1 - (1 - (parseFloat(g)*parseFloat(a)))/(parseFloat(g2)*parseFloat(a));
		b = 1 - (1 - (parseFloat(b)*parseFloat(a)))/(parseFloat(b2)*parseFloat(a));
		
		if(r<0){r=0}
		if(g<0){g=0}
		if(b<0){b=0}
		
		a = (parseFloat(a) + parseFloat(a2))/2;
		
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Linear-Burn'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
					
		
			
		r = (parseFloat(r)*parseFloat(a))+(parseFloat(r2)*parseFloat(a2)) - 0.5;
		r = (parseFloat(g)*parseFloat(a))+(parseFloat(g2)*parseFloat(a2)) - 0.5;
		r = (parseFloat(b)*parseFloat(a))+(parseFloat(b2)*parseFloat(a2)) - 0.5;
		
		if(r<0){r=0}
		if(g<0){g=0}
		if(b<0){b=0}
		
		a = (parseFloat(a) + parseFloat(a2))/2;
		
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);		
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Screen'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
							
		r = (1 - (1 - parseFloat(r2)) * (1 - parseFloat(r)));
		g = (1 - (1 - parseFloat(g2)) * (1 - parseFloat(g)));
		b = (1 - (1 - parseFloat(b2)) * (1 - parseFloat(b)));

		if(r<0){r=0}
		if(g<0){g=0}
		if(b<0){b=0}
		
		a = (parseFloat(a) + parseFloat(a2))/2;
		
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Color-Dodge'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
			
		r = parseFloat(r) / (1 - parseFloat(r2));
		g = parseFloat(g) / (1 - parseFloat(g2));
		b = parseFloat(b) / (1 - parseFloat(b2));

		if(r>255){r=255}
		if(g>255){g=255}
		if(b>255){b=255}
		
		a = (parseFloat(a) + parseFloat(a2))/2;
		
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);		
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Overlay'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
			
		if(r < 0.5){
			r = parseFloat(r2) * parseFloat(r) * 2;
		}else{
			r = 1 - (1 - parseFloat(r2)) * (1 -parseFloat(r)) * 2;
		}
		if(g < 0.5){
			g = parseFloat(g2) * parseFloat(g) * 2;
		}else{
			g = 1 - (1 - parseFloat(g2)) * (1 -parseFloat(g)) * 2;
		}
		if(b < 0.5){
			b = parseFloat(b2) * parseFloat(b) * 2;
		}else{
			r = 1 - (1 - parseFloat(b2)) * (1 -parseFloat(b)) * 2;
		}

		a = (parseFloat(a) + parseFloat(a2))/2;
		
		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);		
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
	if(s=='Subtract'){
		var mixPxl = pxl;
		var r2 = normalize(parseInt($(mixPxl).attr('r')));
		var g2 = normalize(parseInt($(mixPxl).attr('g')));
		var b2 = normalize(parseInt($(mixPxl).attr('b')));
		var a2 = normalize2(parseInt($(mixPxl).attr('a')));
				
		r = normalize(r);
		g = normalize(g);
		b = normalize(b);
		a = normalize2(a);
		
		r = parseFloat(r2) - (parseFloat(r));
		g = parseFloat(g2) - (parseFloat(g));
		b = parseFloat(b2) - (parseFloat(b));

		a = (parseFloat(a) + parseFloat(a2))/2;
		
		if(r<0){r=255}
		if(g<0){g=255}
		if(b<0){b=255}

		r = unNormalize(r);
		g = unNormalize(g);
		b = unNormalize(b);
		a = unNormalize2(a);
	return "rgba("+r+","+g+","+b+","+a+")";
	}
	
}

function normalize(n){
	n = parseInt(n)/255;
	return n.toFixed(2);
}

function unNormalize(n){//ForAlpha
	n = n*255;
	n = Math.floor(n);
	if( n>255 ){n=255}
	if( n<0 ){n=0}
	return n;	
}

function normalize2(n){
	n = parseInt(n)/100;
	return n.toFixed(2);
}

function unNormalize2(n){//forAlpha
	n = n.toFixed(2);
	if( n>1 ){n=1}
	if( n<0 ){n=0}
	return n*100;		
}


var historicPxl = null;
	
function paintPxl(pxl,eX,eY){
	memoryOutput();
	if(historicPxl != pxl){
	var idArray = $(pxl).attr('id').split(',');
	var arrayCount = parseInt(idArray[1]*64)+parseInt(idArray[0]);
	var activeSwatch = $('colorwindow').find('swatch.selected');
	var colorString;
	
	
	if(activeTool == 'pencil'){
	paintCurPxl(pxl,$('toolWindow pane#pencil #pencil-blend').val());
	}
	
	if(activeTool == 'erase'){
		var newAlpha = ($(pxl).attr('a')*$('#curAlpha').val()).toFixed(4);;
		if(newAlpha < 0){
			newAlpha = 0;
		}
	colorString = "rgba("+$(pxl).attr('r')+","+$(pxl).attr('g')+","+$(pxl).attr('b')+","+newAlpha+")";
	$(pxl).attr('a', newAlpha);
	$(pxl).css('background',colorString);
	}
	
	
	//WORK ON FILL
	if(activeTool == 'fill'){
		colorString = getBlendString(activeSwatch.attr('r'),activeSwatch.attr('g'),activeSwatch.attr('b'),activeSwatch.attr('a'),"Absolute",pxl);
		var firstPxl = $(pxl).attr('id');
		var checkArray = [];
		checkArray[0] = firstPxl;
		var colorStart = $(pxl).css('background-color');
		checkTouchingPxls(checkArray,colorString,colorStart);
				
	}
	
	if(activeTool == 'magicPencil'){
		
		var parentOffset = $(pxl).parent().offset(); 
   		//or $(this).offset(); if you really just want the current element's offset
   		var relX = eX - parentOffset.left;
   		var relY = eY - parentOffset.top;
   
		var cvas = $('underpallet').find('canvas')[0];
        var context = cvas.getContext('2d');
		
		var canvasColor = context.getImageData(relX, relY, 1, 1).data; // rgba e [0,255]
    	var r = canvasColor[0];
    	var g = canvasColor[1];
    	var b = canvasColor[2];
		colorString = "rgba("+r+","+g+","+b+",1)";
		$(pxl).attr('r',r).attr('g',g).attr('b',b).attr('a','100');
		$(pxl).css('background',colorString);		
	}
	
	createPreview();
	addSwatchHistory();
	}
	historicPxl = pxl;
}


var doneArray = [];
function checkTouchingPxls(checkArray,cs,initialColor){
	var newArray = [];
	var xOffsetValue = 1;
	var yOffsetValue = size;
	
	if(!checkArray.length){
		doneArray=[];
	}
	
	
	checkArray.forEach(function(entry) {
		var curPxl = $("#"+entry);
		var curPxlPos = curPxl.attr('pos').split(',');
		var curPxlID = curPxl.attr('id');
		if($.inArray(curPxlID,doneArray)=="-1"){
			
		doneArray[doneArray.length] = curPxlID;
		paintCurPxl(curPxl,"Absolute");
		
		
		//North
		var tempPxl = parseInt(entry) - parseInt(yOffsetValue);
		var spider = pxlSpider(tempPxl,curPxlPos,entry, yOffsetValue, xOffsetValue,cs,initialColor);
			if(spider){
				newArray.push(spider);
			}
		//South
		tempPxl = parseInt(entry) + parseInt(yOffsetValue);
		spider = pxlSpider(tempPxl,curPxlPos,entry, yOffsetValue, xOffsetValue,cs,initialColor);
			if(spider){
				newArray.push(spider);
			}
			
		//East
		tempPxl = parseInt(entry) + parseInt(xOffsetValue);
		spider = pxlSpider(tempPxl,curPxlPos,entry, yOffsetValue, xOffsetValue,cs,initialColor);
			if(spider){
				newArray.push(spider);
			}			
		//West
		tempPxl = parseInt(entry) - parseInt(xOffsetValue);
		spider = pxlSpider(tempPxl,curPxlPos,entry, yOffsetValue, xOffsetValue,cs,initialColor);
			if(spider){
				newArray.push(spider);
			}
	
		
		}		
		});
	
	if(newArray.length){
	setTimeout(function(){
	checkTouchingPxls(newArray,cs,initialColor);
	},0);
	}else{
	createPreview();
	doneArray = [];	
	}	
}

function pxlSpider(tempPxl,curPxlPos , entry, yOffsetValue, xOffsetValue, cs, initialColor){
		
	if(tempPxl>=0 && tempPxl<=((size*size)-1)){
		tempPxl = $('#'+tempPxl);
		var tempPos = tempPxl.attr('pos');
		
		tempPos = tempPos.split(',');
				
		var tempColor = tempPxl.css('background-color');
		
		if(tempPos[1]==(parseInt(curPxlPos[1])-1)){
			tempPxl = parseInt(entry) - parseInt(yOffsetValue);
		}
			
		if(tempPos[1]==(parseInt(curPxlPos[1])+1)){
			tempPxl = parseInt(entry) + parseInt(yOffsetValue);
		}
		
		if(tempPos[0]==(parseInt(curPxlPos[0])+1)){
			tempPxl = parseInt(entry) + parseInt(xOffsetValue);
		}
		
		if(tempPos[0]==(parseInt(curPxlPos[0])-1)){
			tempPxl = parseInt(entry) - parseInt(xOffsetValue);
		}
		
				
		if(tempColor != cs && tempColor == initialColor){
			if($.inArray(tempPxl, doneArray)=="-1"){
				doneArray.unshift(tempPxl);
				return tempPxl;
			}
		}
		
		
	}
	return false;
}


/*/  -- UPDATE INFO PANE -- /*/

function updateInfo(pxl){
	var idArray = $(pxl).attr('pos').split(',');
	var x = idArray[0], y = idArray[1];
	var id = $(pxl).attr('id')
	$('#curX').val(x);
	$('#curY').val(y);
	$('#curID').val(id);
}

/*/  -- COLOR PICKER FUNCTIONS -- /*/

  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  
 /*/  -- refresh swatchs -- /*/  
 
 function updateSwatch(r,g,b,a){
	 	var string = "rgba("+r+","+g+","+b+","+a/100+")";
		var swatch = $('colorwindow').find('swatch.selected');
		swatch.css('background-color', string);
		swatch.attr('r',r).attr('g',g).attr('b',b).attr('a',a);
		
 }
 
 
 var swatchHistory = [];
 
 function addSwatchHistory(){
	 	var newSwatch = $('<swatch></swatch>');
		var swatch = $('colorwindow').find('swatch.selected');
				
		if (typeof swatchHistory !== 'undefined' && swatchHistory.length > 0) {
			var checkString = swatch.attr('r')+","+swatch.attr('g')+","+swatch.attr('b')+","+swatch.attr('a');
			var arrayCheck = $.inArray(checkString, swatchHistory);	
						
			if(arrayCheck == -1){
			$('tabWindow tab#swatch-history').prepend(newSwatch);
			newSwatch.click(function(e){
			refreshSwatch("pick",e.target);
			});
			newSwatch.css('background','rgba('+swatch.attr('r')+","+swatch.attr('g')+","+swatch.attr('b')+","+parseInt(swatch.attr('a'))/100+")");	
			swatchHistory.unshift(swatch.attr('r')+","+swatch.attr('g')+","+swatch.attr('b')+","+swatch.attr('a'));
			newSwatch.attr('r', swatch.attr('r')).attr('g', swatch.attr('g')).attr('b', swatch.attr('b')).attr('a', swatch.attr('a'));	
			}
			
		}else{
			
			$('tabWindow tab#swatch-history').prepend(newSwatch);
			newSwatch.click(function(e){
			refreshSwatch("pick",e.target);
			});
			newSwatch.css('background','rgba('+swatch.attr('r')+","+swatch.attr('g')+","+swatch.attr('b')+","+parseInt(swatch.attr('a'))/100+")");	
			swatchHistory.unshift(swatch.attr('r')+","+swatch.attr('g')+","+swatch.attr('b')+","+swatch.attr('a'));
			newSwatch.attr('r', swatch.attr('r')).attr('g', swatch.attr('g')).attr('b', swatch.attr('b')).attr('a', swatch.attr('a'));
			
		}
		
	
		
}
 
 function swatchOptions(target){
	 
	 if(!$(target).is('.selected')){
		$('colorTools').css('display','none');
		$('colorwindow swatch').each(function(index, element) {
        	$(this).removeClass('selected')
				if(index == $('colorwindow swatch').length-1){
					$(target).addClass('selected')
				}
   		});
		
		if($('colorTools').css('display')== 'none'){
		$('colorTools').css('display','block');
		refreshSwatch('swatch',target);
		
		}
	 }else{
		if($('colorTools').css('display')== 'none'){
		$('colorTools').css('display','block');
		refreshSwatch('swatch',target);
		}else{
		$('colorTools').css('display','none');	
		}
		 
	 }
		 
	 
	 	 
	
	
 }


  function refreshSwatch(s,target) {
	  
		  var red, green, blue, alpha;
		  if(s=='slide'){
			   red = $('#red').slider('value');
			   green = $('#green').slider('value');
			   blue = $('#blue').slider('value');
			   alpha = $('#alpha').slider('value');
			   
			   	if(red != $('#curRed').val()){
				$('#curRed').val(red);
				}
				if(green != $('#curGreen').val()){
				$('#curGreen').val(green);
				}
				if(blue != $('#curBlue').val()){
				$('#curBlue').val(blue);
				}
				if(alpha != $('#curAlpha').val()){
				$('#curAlpha').val(alpha);
				}
			}
			
			if(s=='input'){
				red = $('#curRed').val();
			  	green = $('#curGreen').val();
			   	blue = $('#curBlue').val();
				alpha = $('#curAlpha').val();
				
				if(red != $('#red').slider('value')){
				$('#red').slider('value', red);
				}
				if(green != $('#green').slider('value')){
				$('#green').slider('value', green);
				}
				if(blue != $('#blue').slider('value')){
				$('#blue').slider('value', blue);
				}
				if(alpha != $('#alpha').slider('value')){
				$('#alpha').slider('value', alpha);
				}
				
			}
			
			if(s=='swatch' || s=='pick'){
				red = $(target).attr('r');
				green = $(target).attr('g');
				blue = $(target).attr('b');
				alpha = parseInt($(target).attr('a'));
				
				if(red != $('#red').slider('value')){
				$('#red').slider('value', red);
				}
				if(green != $('#green').slider('value')){
				$('#green').slider('value', green);
				}
				if(blue != $('#blue').slider('value')){
				$('#blue').slider('value', blue);
				}
				if(alpha != $('#alpha').slider('value')){
				$('#alpha').slider('value', alpha);
				}
				
				if(red != $('#curRed').val()){
				$('#curRed').val(red);
				}
				if(green != $('#curGreen').val()){
				$('#curGreen').val(green);
				}
				if(blue != $('#curBlue').val()){
				$('#curBlue').val(blue);
				}
				if(alpha != $('#curAlpha').val()){
				$('#curAlpha').val(alpha);
				}
				
				
				
				
			}
			
						
			updateSwatch(red,green,blue,alpha);	

 }

var pLayer = "<pLayer></pLayer>";
var preview = "<preview><preview>"; 
var pxSize;

function createPreview(){
	if($('previewWindow').children('preview').length){
		var newShadowString = '';
			$('pxl').each(function(index, element) {
				var tempPos = $(element).attr('pos').split(','); 
				var tempColor =  $(element).css('background-color');
				var alphaCheck =  $(element).attr('a');
				
				alphaCheck/=100;
				
				
				if(alphaCheck != 0 && tempColor != 'transparent'){
					var colorString = "rgba("+$(element).attr('r')+","+$(element).attr('g')+","+$(element).attr('b')+","+alphaCheck+")";
					newShadowString += String((parseInt(tempPos[0])*ratio))+".5px "+String((parseInt(tempPos[1])*ratio))+".5px 0px 0.5px "+colorString+",";
				}
				             
            });
			
			if(newShadowString.length){
			newShadowString = newShadowString.substring(0, newShadowString.length-1);
			}
			
			$('previewWindow').children('preview').children('pLayer').css('box-shadow', newShadowString);
		
	}else{	
		var newPreview = $(preview);
		$('previewWindow').append(newPreview);
		newPreview.css({
		position:'absolute',
		display: 'block',
		width: size,
		height: size,
		left:'50%',
		top:'50%',
		transform:'translate(-50%,-50%)'		
		});
		var newPlayer = $(pLayer);;
		newPreview.append(newPlayer);
		newPlayer.css({
		position:'absolute',
		display: 'block',
		top: '0',
		left: '0',
		width:'0px',
		height:'0px'		
		});
		
		pxSize = newPreview.width()/size;
	}
 }
 

 
 
 /* -- MENU ACTIONS -- */
 
function showSubMenu(s){
	
	$('menuWindow pane').each(function(index, element) {
        $(this).fadeOut(300,function(){
			if(index == $('menuWindow pane').length-1){
				$('menuWindow pane#'+s).fadeIn(600);
			}
		});
    });
}
 
function debugLog(string){
	$('infoWindow bottomInfo debug').prepend(("<span>"+new Date().getTime())+":"+string+"</span><BR />");
}



/*-- MACROS --*/
 var canvas = "<canvas></canvas>";
 function updateBGimage(){
	 	var img = new Image();
		img.src = $("pane#Macro-AutoTrace #disp_tmp_path").val();
		setTimeout(function(){debugLog(img.src);}, 0);
		if(img){
		var newCanvas = $(canvas);
		$('underpallet').append(newCanvas);
		var cvas = $('underpallet').find('canvas')[0];
		cvas.width = $('underpallet').width();
		cvas.height = $('underpallet').height();
        var context = cvas.getContext('2d');	

		
		context.drawImage(img,0,0, img.width, img.height,0,0, cvas.width, cvas.height);
		}else{
		setTimeout(function(){debugLog("Tracer Macro Error!");},0);	
		}
     
 }
 
 function autoTrace(){
	pxlCount = $('pallet').children("pxl").length;
	
	if(pxlCount>0){
		var img = new Image();
		img.src = $("pane#Macro-AutoTrace #disp_tmp_path").val();
		setTimeout(function(){debugLog(img.src);},0);
		setTimeout(function(){debugLog(img.width*img.height);},0);
		if(pxlCount == img.width *img.height){
			
			var newCanvas = $(canvas);
			$('underpallet').append(newCanvas);
			newCanvas.attr('id','AutoTraceCanvas');
			var cvas = document.getElementById('AutoTraceCanvas');
			
			
			cvas.width = img.width;
			cvas.height = img.height;
        	var context = cvas.getContext('2d');
			context.drawImage(img,0,0);
						
			setTimeout(function(){tracePxlGo(context, 0, 0, img.height, img.width, 0, newCanvas,0,4);},0);
			setTimeout(function(){tracePxlGo(context, 1, 0, img.height, img.width, 0, newCanvas,1,4);},0);
			setTimeout(function(){tracePxlGo(context, 2, 0, img.height, img.width, 0, newCanvas,2,4);},0);
			setTimeout(function(){tracePxlGo(context, 3, 0, img.height, img.width, 0, newCanvas,3,4);},0);
			
					
		}else{
			setTimeout(function(){debugLog("Error! Image must be same size as Document!");},0);
		}
	
	}else{
	setTimeout(function(){debugLog("Error! Start New Document!");},0);	
	}
	 
	 
 }
 
 function tracePxlGo(context, x, y, height, width, pxlCount, canvasObject, initialPxl, pxlOffset){
	 memoryOutput();
	 if(y<height){
		if(x<width){
		var tempPxl = context.getImageData(x, y, 1, 1);
		$("pallet pxl#"+pxlCount).attr('r',tempPxl.data[0]).attr('g',tempPxl.data[1]).attr('b',tempPxl.data[2]).attr('a',(parseInt(tempPxl.data[3])/255).toFixed(2)*100);	
		$("pallet pxl#"+pxlCount).css('background', "rgba("+tempPxl.data[0]+","+tempPxl.data[1]+","+tempPxl.data[2]+","+(parseInt(tempPxl.data[3])/255).toFixed(2)+")");
				
		setTimeout(function(){debugLog("(Paint Pxl #"+pxlCount+") X:"+x+" Y:"+y+" String - rgba("+tempPxl.data[0]+","+tempPxl.data[1]+","+tempPxl.data[2]+","+(parseInt(tempPxl.data[3])/255).toFixed(2)+")");},0);
		pxlCount+=pxlOffset;
		
		x+=pxlOffset;
		
		setTimeout(function(){
			tracePxlGo(context, x, y, height, width, pxlCount, canvasObject, initialPxl, pxlOffset);
		},0);
	
		}else{
			x = initialPxl;
			y+=pxlOffset;
			setTimeout(function(){
			tracePxlGo(context, x, y, height, width, pxlCount, canvasObject, initialPxl,pxlOffset);
		},0);
		}
	 }else{
		//Done
		
					createPreview();
					newCanvas.remove(); 
	 }
	 memoryOutput();
	 				
						
	
	 
	 
 }


 