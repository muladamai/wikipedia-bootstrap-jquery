$ = jQuery;
	$(document).ready(function(){
	$('p[destinations]').each(function() {
	var text = $(this).attr('destinations');
	console.log(text)		
	$('#Destinationinline').append("<p>"+text+"</p>");});
	$('a[hreflang]').each(function() {
	lang = $(this).attr('hreflang');});
});
