﻿$(document).ready( function() {
	$(".touchActive").on("touchend",function(e){});

	var aTags = $('a');
	aTags.each(function(){
		var url = $(this).attr('href');
		$(this).removeAttr('href');
		$(this).click(function(){
			location.href = url;
		});
	});


	$("label").click(function() {});

});