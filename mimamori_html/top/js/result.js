$(document).ready(function() {
	
	$(".watchTabBt1 a").click(function () {
		$('#watchTab1').css("display",'block');
		$('#watchTab2').css("display",'none');
		$('#watchTab3').css("display",'none');
		return false;
	});
	$(".watchTabBt2 a").click(function () {
		$('#watchTab1').css("display",'none');
		$('#watchTab2').css("display",'block');
		$('#watchTab3').css("display",'none');
		return false;
	});
	$(".watchTabBt3 a").click(function () {
		$('#watchTab1').css("display",'none');
		$('#watchTab2').css("display",'none');
		$('#watchTab3').css("display",'block');
		return false;
	});
	
});
