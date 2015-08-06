var backend = require('backend');
var args = arguments[0] || {};

var config = Ti.App.Properties.getInt('search_for',0);

$.dialog.selectedIndex = config;

if (config == 0) {
	$.value_search.text = "Movies Playing";
} else{
	$.value_search.text = "Upcoming";
};

function showOptions(){
    $.dialog.show();
};

function clickOption(e){
  var index = e.index;
  	
  	Ti.App.Properties.setString('search_for', index);
  	
  	if (index == 0) {
		$.value_search.text = "Movies Playing";
	} else{
		$.value_search.text = "Upcoming";
	}
	

	backend.getProximosLancamentos(function(filmes){
	

	filmes.forEach(function(filme){
		filme.poster_path = "http://image.tmdb.org/t/p/w500" + filme.poster_path;
		filme.release_date = "Date: " + filme.release_date;
		filme.original_language = "Language: " + filme.original_language;
		filme.popularity = "Popularity: " + filme.popularity;
		return filme;
	});
	
	
	Alloy.Collections.Filmes.reset(filmes); 
});
	
};