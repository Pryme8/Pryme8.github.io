// JavaScript Document

function bindInputAnimations(){
	$('input').on('focus', function(e){
			$(this).parent().parent().children('.input-tag, .input-text, .input-password').addClass('focusOn');
			$(this).parent().parent().children('.input-text, .input-password').addClass('thinking');
			
						
		});
		
		$('input').on('focusout', function(e){
			$(this).parent().parent().children('.input-tag, .input-text, .input-password').removeClass('focusOn');
						
		});
	
}

function inputChange(t){
	if($(t).attr('id')=='userName'){
	if($(t).val()=='Guest'){
		$(t).closest('.input-text').removeClass('thinking').addClass('valid');
		
	}
	}
	
	if($(t).attr('id')=='userPass'){
	if($(t).val()=='Pass' && $('#userName').val() =='Guest'){
		$(t).closest('.input-password').removeClass('thinking').addClass('valid');
	}
	}
}