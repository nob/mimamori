$(document).ready(function() {
	
	$("#watchTabBt1 a").click(function () {
		$('#watchTab1').css("display",'block');
		$('#watchTab2').css("display",'none');
		return false;
	});
	$("#watchTabBt2 a").click(function () {
		$('#watchTab2').css("display",'block');
		$('#watchTab1').css("display",'none');
		return false;
	});

	
	
	
	
});
