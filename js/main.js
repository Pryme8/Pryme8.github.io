// JavaScript Document

var display = $('.wrapFix');

var system = {};

system.items = {};

var block = "<div class=block></div>";

var params = {};

//MODULES
var pageLoader = 'pageLoaderBlock.php',
bgTextEffect = 'bgScrollText.php',
scrollBars = 'scrollBars.php',
loginForm = 'loginForm.php';

//Site Object
var page = { };
var pageState = "init";
var activeModule = null;
var bgScrollState = 0;
var z_index_reset = 1000000;

var postData;



var scrollBarToggle = true;
//Run Updates on Screen if needed for animation
page.draw = function(){
		
	
};

//Do Calculations and update Page
page.update = function(){
	
		
	if(pageState == 'idle'){
		$('.win').draggable({ cancel: ".windowContent", containment: "parent" });
		 $( ".win" ).resizable({containment: "parent"});
	
			//UPDATE ACTIVE MODULES INFO	
		try{
			if(activeModule){
				activeModuleTransformBars(activeModule);
			}
		}catch(err){
		errorPop(err);	
		}
	}
	
	
	
	if($('.intiText').length){
		animateInitText();
	}
	
	if(pageState == 'intro'){
	setTimeout(function() { changeLoaderText('parseData();'); }, 2000);
	pageState = 'post';
	$.post( 'index.html' , function( data ) {
	typeText(data);
	pageState = 'intro1';
	});
	}
		
	if(pageState == 'intro1'){
		setTimeout(function() { changeLoaderText('buildDataCache();'); }, 4000);
		pageState = 'animation';
		scrollBgGo('intro2', 4000);
		
	}
	
	if(pageState == 'intro2'){
	pageState = 'post';
	$.post( './css/main.css' , function( data ) {
	typeText(data);
	pageState = 'intro3';
	});
	}
	
	if(pageState == 'intro3'){
		setTimeout(function() { changeLoaderText('errorDefaults();'); }, 7000);
		pageState = 'animation';
		scrollBgGo('intro4', 8000);
		
	}
	
	if(pageState == 'intro4'){
		setTimeout(function() { changeLoaderText('systemRun();'); }, 200);
		setTimeout(function() {
			
			$('.wrapFix').children("*").each(function(index, element) {
                $(element).fadeOut(1300,function(){
				$(element).remove();});
            });
		}, 1000);
		
		pageState = 'homeBuild';
		
	}
	
	if(pageState == 'homeBuild'){
		
		
		
		pageState = 'homebuildPause';
		
		setTimeout(function() {  	
		
		$('.wrapFix').append('<div class="bgSkull"></div>').hide().fadeIn(1300);	
		params.id = 'gui-nav';
					params.width = '10vh';
					params.height = '84vh';
					params.x = 'calc(100vw - 11vh)';
					params.y = 'calc(1vh)';
					params.z = 1;
					params.fadeIn = '1300';
					loadModule('.wrapFix', scrollBars, params);	
					paramClear();	
		
		params.id = 'login-form';
					params.width = '40vw';
					params.height = '40vh';
					params.x = 'calc(30vw)';
					params.y = 'calc(30vh)';
					params.z = z_index_reset;
					params.fadeIn = '1300';
					params.addClass = {};
					params.addClass.Class1 = 'active';
					//params.addClass.Class2 = 'ui-widget-content';
					loadModule('.wrapFix', loginForm, params);
					activeModule = '#login-form';
					paramClear();	
					pageState = 'idle';	
			}, 2000);
	}
	
	
			
	

	
	
	
};

page.fps = 50;  			//Set Game FPS

//ACTUAL GAME RUNNING
	page.run = (function(){ 
	
	
	//Init stuff
	if(pageState == "init"){
		
		
		/*
		//DOCUMENT BINDINGS!
		$(document).on('mousedown click', function(e){
			e.preventDefault();
			clickOn = true;
			if($(e.target).is(".scrollBar")){
			dragEl = e.target;
			}
			
		});
		
		$(document).on('mousemove', function(e){
			e.preventDefault();
			if(dragEl){
				dragGo(dragEl, e.pageX, e.pageY);				
			}									
		});	
		
		$(document).on('mouseup, mouseleave', function(e){
			e.preventDefault();
			clickOn = false;
			dragEl = null;
						
		});	
		
		*/	
		
		
	pageState = "intro"; //CHANGE THIS VALUE IF NEED DEBUG
	params.id = 'mainLoad';
	params.width = '25vh';
	params.height = '16vh';
	params.x = '20px';
	params.y = 'calc(100% - 16vh - 20px)';
	params.z = z_index_reset;
	params.fadeIn = '1300';
	loadModule('.wrapFix', pageLoader, params);
	paramClear();
	loadModule('.wrapFix', bgTextEffect, params);
	
		
	}
	
	var pageLoop = 0, skipTicks = 1000/ page.fps, maxFrameSkip = 10, nextPageTick =(new Date).getTime(); 
		
		return function(){
			pageLoop = 0;	
			
			while((new Date).getTime() > nextPageTick && pageLoop < maxFrameSkip){
				page.update(); //Update Positions do Calculations
				nextPageTick += skipTicks;
				pageLoop ++;
				
			}
			
			
			if (!pageLoop) {
      		page.draw();//Draw scene on screen...
    		}
			
			
		};	
	
		})();
	
//Run Site
page._intervalId = setInterval(page.run, 0);  



//MOUSE STUFF AND TOUCH EVENTS



//t = Target, m = Module, p = Parameters;
// Parameters X,Y,Z; Width, Height; id; background;
function loadModule(t,m,param){
$.post( "./modules/" +  m , function( data ) {
	
	if(!param.id){
		param.id = guidGenerator();
	}
	
var newObject = $(data).attr('id',param.id);

$(t).append(newObject);

if(param.fadeIn){
	$('#' + param.id).hide().fadeIn(param.fadeIn);
	
}

if(param.x){
	$('#' + param.id).css('left',param.x);
}

if(param.y){
	$('#' + param.id).css('top',param.y);
}

if(param.z){
	$('#' + param.id).css('z-index',param.z);
}

if(param.width){
	$('#' + param.id).css('width',param.width);
}

if(param.height){
	$('#' + param.id).css('height',param.height);
}

if(param.background){
	$('#' + param.id).css('background',param.background);
}

if(param.addClass){
	
for (var key in param.addClass) {

$('#' + param.id).addClass(param.addClass[key]);

	
	}
}
  

  
});
	
}



function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}





function typeText(string){
	
	
$('#bgText').html(htmlForTextWithEmbeddedNewlines(String(string)));
}


var textTick = 0, textTickMax = 6, textCount = 0;
function animateInitText(){
	if(textTick <= textTickMax){
		textTick++;
	}else{
	if(textCount == 0){
		$('.intiText').html("initializing.&nbsp;&nbsp;");
		textCount = 1;
		}else if(textCount == 1){
		$('.intiText').html("initializing..&nbsp;");
		textCount = 2;
		}else if(textCount == 2){
		$('.intiText').html("initializing...");
		textCount = 3;
		}else if(textCount == 3){
		$('.intiText').html("initializing&nbsp;&nbsp;&nbsp;");
		textCount = 0;
		}	
		textTick = 0;
	}
}

function scrollBgGo(nextState, speed){
	
	var sH = $( "#bgText" ).height();
	
	$( "#bgText" ).animate({
    top: -sH,
    }, speed, "linear", function() {
	pageState = nextState;
	$( "#bgText" ).css('top','100%');
	
  });

}


function changeLoaderText(t){
 $('#loadTextBox').text(t);	
}


function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    var tmpDiv = $(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}

function paramClear(){
params = {};	
}


var maxX, maxY, maxZ, maxH, maxW;
var sbX_height, sbY_height, sbZ_height, sbH_height, sbW_height;

function activeModuleTransformBars(am){
	
	var x = Math.floor(stripChar($(am).position().left));
	var y = Math.floor(stripChar($(am).position().top));
	var z = $(am).css('z-index')-z_index_reset;
	var h = Math.floor($(am).outerHeight());
	var w = Math.floor($(am).outerWidth());
	
	
	sbX_height = $('.scrollBars#X_SB .scrollBar').height();
	maxX = $('.wrapFix').outerWidth()-(w);	
	
	sbY_height = $('.scrollBars#Y_SB .scrollBar').height();	
	maxY = $('.wrapFix').outerHeight()-(h);	
	
	
	
	
	var percent = (x)/(maxX);
	var pH = $('.scrollBars#X_SB').outerHeight()-(sbX_height);
	var newTop = pH*(percent);
	$('.scrollBars#X_SB .scrollBar').css('top',newTop+'px');
				
	
	percent = (y)/(maxY);
	pH = $('.scrollBars#Y_SB').outerHeight()-(sbY_height);
	newTop = pH*(percent);
	$('.scrollBars#Y_SB .scrollBar').css('top',newTop+'px');
				

	

	$('#scrollInfoText span#xV').text(x+';');
	$('#scrollInfoText span#yV').text(y+';');
	$('#scrollInfoText span#zV').text(z+';');
	$('#scrollInfoText span#hV').text(h+';');
	$('#scrollInfoText span#wV').text(w+';');
	
}

function stripChar(string){
	var s = String(string).replace(/[^-\d\.]/g, '');
	return s;
	
}

var errPop = "<div class='errPopup'></div>";
function errorPop(err){
		var newPop = $(errPop).attr('id',$('.errPopup').length).text(err);
		$('.wrapFix').append(newPop);
		newPop.fadeOut(1300);
}

function maxGo(target){
	changeActiveModule($(target).parent().parent().parent());
	
	
	var attrString = $(activeModule).css('top')+","+$(activeModule).css('left')+","+$(activeModule).css('width')+","+$(activeModule).css('height');
	
	var attr = $(activeModule).attr('storedPos');

	// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
	if (attr) {
		attr = attr.split(',');
		$(activeModule).css({
		top:attr[0],
		left:attr[1],
		width: attr[2],
		height: attr[3]
		});
		$(activeModule).removeAttr('storedPos');
	  
	}else{
		$(activeModule).attr('storedPos',attrString);
		$(activeModule).css({
		top:'0.5em',
		left:'0.5em',
		width: "calc("+($('.wrapFix').outerWidth()-$('.scrollBox').outerWidth())+"px - 1.5em)",
		height: "calc("+$('.wrapFix').outerHeight()+"px - 1.5em)"
		});
	}
	
	
	
	
	
				
}

function changeActiveModule(newAm){
	activeModule = "#"+newAm.attr('id');
	$('.win').each(function(){
		$(this).removeClass('active');
		});
	$(activeModule).addClass('active');
		
}

function minGo(target){
	changeActiveModule($(target).parent().parent().parent());
	var attrString = $(activeModule).css('top')+","+$(activeModule).css('left')+","+$(activeModule).css('width')+","+$(activeModule).css('height');
	var attr = $(activeModule).attr('restorePos');
	
	if (attr) {
		attr = attr.split(',');
		$(activeModule).css({
		top:attr[0],
		left:attr[1],
		width: attr[2],
		height: attr[3]
		});
		$(activeModule).removeAttr('restorePos').removeClass('mimed');
	  
	}else{
		$(activeModule).attr('restorePos',attrString);
				
		var hiddenChar = $('<div>O</div>').attr('id','hiddenChar').hide();
		$(activeModule).append(hiddenChar);
		var icons = $(activeModule).find('.icon');
		var minWidth;
		
		if(!icons){
			minWidth = (hiddenChar.outerWidth()*$(activeModule).attr('id').length)+(30);
		}else{
			minWidth = (hiddenChar.outerWidth()*$(activeModule).attr('id').length)+((icons.outerWidth()*2)*(icons.length+1));
			
		}
		var minHeight = hiddenChar.outerHeight()+12;
		hiddenChar.remove();
		
		var newTop = $(activeModule).parent().outerHeight()-minHeight;
		var newLeft = 0;
		
		$('.win.mimed').each(function() {
            newLeft += $(this).outerWidth();
	    });
				
		$(activeModule).animate({
			top: newTop,
			left: newLeft,
			width: minWidth,
			height: '3vh'
			},1300,'swing',function(){
			
		}).addClass('mimed');
		
	}
	
}