var xhr = Ti.Network.createHTTPClient();

exports.getProximosLancamentos = function(callback) {
    xhr.open("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key=af3bff5a423ea3c8c99372180498a51e&page=1");
    xhr.onload = function() {
        var data = JSON.parse(this.responseText).results;
        callback(data);
    };
    xhr.onerror = function(e) {
        alert(e);
    };
    xhr.send();
};