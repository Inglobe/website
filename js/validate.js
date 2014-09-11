/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

	//Contact
	$('form.validateform').submit(function(){
                $("#butonready").addClass("hide");
		$("#cargando").removeClass("hide");
		var f = $(this).find('.field'), 
		ferror = false, 
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

		f.children('input').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;

			    case 'email':
				if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
				break;


			    case 'checked':
				if( !i.attr('checked') ){ ferror=ierror=true; }
				break;
				
			    case 'regexp':
				exp = new RegExp(exp);
				if( !exp.test(i.val()) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
                    $("#butonready").removeClass("hide");
	            $("#cargando").addClass("hide");
		});
		f.children('textarea').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
                    $("#butonready").removeClass("hide");
		    $("#cargando").addClass("hide");
		});
		if( ferror ) return false; 
			else var str = $(this).serialize();
		           $("#butonready").addClass("hide");
			   $("#cargando").removeClass("hide");
			   $.ajax({
			   type: "POST",
			   url: "http://inglobe.com.ar/contact/contact.php",
			   data: str,
			   success: function(msg){
			$("#sendmessage").addClass("show");
                        $("#cargando").addClass("hide");
			$("#butonready").removeClass("hide");
			$("#errormessage").ajaxComplete(function(event, request, settings){
		
			if(msg == 'OK')
			{
				$("#sendmessage").addClass("show");
                                $("#cargando").addClass("hide");
			        $("#butonready").removeClass("hide");
				
			}
			else
			{
				$("#sendmessage").removeClass("show");
                                $("#cargando").addClass("hide");
				$("#butonready").removeClass("hide");
				result = msg;
			}
		
			$(this).html(result);});}});
				return false;
	});

});				