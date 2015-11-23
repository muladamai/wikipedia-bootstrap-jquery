$ = jQuery;
	$(document).ready(function(){
	$('p[destinations]').each(function() {
	var text = $(this).attr('destinations');
	console.log(text)		
	$('#Destinationinline').append("<p>"+text+"</p>");});
	//$('a[hreflang]').each(function() {
	$('#langselect').each(function(){
	var lang = $(this).attr('hreflang');
	console.log(lang)});
});
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  $(this).parents('.btn-group').find('.dropdown-toggle').attr("hreflang", selText);
});
