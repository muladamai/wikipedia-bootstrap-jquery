$ = jQuery;
	$(document).ready(function(){
	$('p[destinations]').each(function() {
	var text = $(this).attr('destinations');
	console.log(text)						
	//$('#Destinationinline').val(text);
	$('#Destinationinline').append("<h1>"+text+"</h1>");
	});			
});
