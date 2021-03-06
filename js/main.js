$ = jQuery;
	$(document).ready(function(){
		
});
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  var hrefText = $(this).attr('hreflang');
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  $(this).parents('.btn-group').find('.dropdown-toggle').attr("hreflang", hrefText);
  console.log(hrefText);
	$('p[destinations]').each(function() {
	var locationwiki = $(this).attr('destinations');
	//console.log(text)		
	$('#Destinationinline').append("<p>"+locationwiki+"</p>");
	//$('a[hreflang]').each(function() {
	//$('#langselect a').each(function(){
	var lang = $('#langselect a').attr('hreflang');
	console.log(lang)
	var locationwiki = $('p[destinations]').attr('destinations');

	$.ajax({
	type: "GET",							
	url: "http://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllang=id&lllimit=100&titles="+locationwiki+"&callback=?",
	//url: "http://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+locationwiki+"&callback=?",
	//https://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=semarang&callback=?
	contentType: "application/json; charset=utf-8",
	async: true,
	dataType: "json",
	success: function (data, textStatus, jqXHR) {
		for (var i in data.query.pages) break;
		if (lang=="id") locationwiki=data.query.pages[i].langlinks[0]['*'];
		else locationwiki=data.query.pages[i].title;
		console.log(locationwiki);
		//return;
		$.ajax({
			type: "GET",	
			url: "http://"+(lang=="id"?"id":"en")+".wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+locationwiki+"&callback=?",
			url2: "http://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllang=id&lllimit=100&titles=Yogyakarta",								
			//url: "http://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+locationwiki+"&callback=?",
			//https://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=semarang&callback=?
			contentType: "application/json; charset=utf-8",
			async: true,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				console.log(data);
				//console.log(locationwiki);
				var markup = data.parse.text["*"];
				var blurb = $('<div></div>').html(markup);
				//console.log('url:'+url)
				// remove links as they will not work
				blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
				
				// remove any references
				blurb.find('sup').remove();
				
				// remove cite error
				blurb.find('.mw-ext-cite-error').remove();
				$('#wiki').html($(blurb).find('p'));
				
			},
			error: function (errorMessage) {
			}
		});
		
		$.ajax({
			type: "GET",	
			url: "https://"+(lang=="id"?"id":"en")+".wikipedia.org/w/api.php?action=query&prop=extracts&titles="+locationwiki+"&format=json&prop=pageimages&pithumbsize=220&callback=?",
			//url: "http://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+locationwiki+"&callback=?",
			//https://id.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=semarang&callback=?
			contentType: "application/json; charset=utf-8",
			async: true,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				//console.log(data);
				
				for (var i in data.query.pages) break;											
				var imgurl = data.query.pages[i].thumbnail.source;
				//console.log('imgurl:'+imgurl)
				$ ("#wikiimg").attr("src", imgurl)
				
				
			},
			error: function (errorMessage) {
			}
		});
	},
	error: function (errorMessage) {
	}
	});
	//});
	});
});
