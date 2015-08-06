var movie = arguments[0] || {};

$.poster_path.image = movie.get("poster_path");
$.title_movie.text = movie.get("title");
$.release_date.text = movie.get("release_date");
$.original_language.text = movie.get("original_language");
$.popularity.text = movie.get("popularity");
$.overview.text = movie.get("overview");
