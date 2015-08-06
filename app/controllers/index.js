var backend = require('backend');

backend.getProximosLancamentos(function(filmes){
	

	filmes.forEach(function(filme){
		filme.poster_path = "http://image.tmdb.org/t/p/w500" + filme.poster_path;
		filme.release_date = "Date: " + filme.release_date;
		filme.original_language = "Language: " + filme.original_language;
		filme.popularity = "Popularity: " + filme.popularity;
		return filme;
	});
	
	$.filmesTableView.data = filmes;
	
	
	Alloy.Collections.Filmes.reset(filmes); 
});

$.index.open();

function showDetails(e){
	
	var movie = Alloy.Collections.Filmes.get(e.rowData.rowid);
	var ctrl = Alloy.createController('MovieDetail', movie);
	ctrl.getView().open();
	
}


function openSettings(e){
	
	var ctrl = Alloy.createController('settings');
	ctrl.getView().open();
	
}
