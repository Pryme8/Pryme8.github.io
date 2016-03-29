$(document).ready(function(){
  $('.logoBlock').animate({
                width: "320px",
                height: "320px",
                margin: "-160px 0 0 -160px",
                opacity: '1'
                
                }, 100, "linear", function () {
                //Complete Animation
                    $('.logoBlock').animate({
                        margin: "0 0 0 -160px",
                        top:"3px"                    
                    }, 100, "linear", function () {
                            $('.mainBody').animate({
                        opacity: "1"                  
                    }, 100, "linear", function () {

                    
                    });          
                    
                    });                
            });
    
});

function openBanner(t){
            
                
            
                   $('#'+t).parent().toggleClass('ribbonTuck');    
                   $('html, body').animate({
                    scrollTop: $('#'+t).parent().offset().top
                    }, 'slow');
 
}


