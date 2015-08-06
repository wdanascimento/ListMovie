function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId9(e) {
        if (e && e.fromAdapter) return;
        __alloyId9.opts || {};
        var models = __alloyId8.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId0 = models[i];
            __alloyId0.__transform = {};
            var __alloyId1 = Ti.UI.createTableViewRow({
                height: 150,
                layout: "horizontal",
                backgroundColor: "white",
                rowid: "undefined" != typeof __alloyId0.__transform["id"] ? __alloyId0.__transform["id"] : __alloyId0.get("id")
            });
            rows.push(__alloyId1);
            var __alloyId2 = Ti.UI.createImageView({
                left: 5,
                top: 5,
                bottom: 5,
                width: 110,
                image: "undefined" != typeof __alloyId0.__transform["poster_path"] ? __alloyId0.__transform["poster_path"] : __alloyId0.get("poster_path")
            });
            __alloyId1.add(__alloyId2);
            var __alloyId3 = Ti.UI.createView({
                layout: "vertical",
                left: 5,
                width: Titanium.UI.FILL,
                height: 150
            });
            __alloyId1.add(__alloyId3);
            var __alloyId4 = Ti.UI.createLabel({
                left: 5,
                color: "red",
                right: 5,
                top: 10,
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId0.__transform["title"] ? __alloyId0.__transform["title"] : __alloyId0.get("title")
            });
            __alloyId3.add(__alloyId4);
            var __alloyId5 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId0.__transform["release_date"] ? __alloyId0.__transform["release_date"] : __alloyId0.get("release_date")
            });
            __alloyId3.add(__alloyId5);
            var __alloyId6 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId0.__transform["original_language"] ? __alloyId0.__transform["original_language"] : __alloyId0.get("original_language")
            });
            __alloyId3.add(__alloyId6);
            var __alloyId7 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId0.__transform["popularity"] ? __alloyId0.__transform["popularity"] : __alloyId0.get("popularity")
            });
            __alloyId3.add(__alloyId7);
        }
        $.__views.filmesTableView.setData(rows);
    }
    function showDetails(e) {
        var movie = Alloy.Collections.Filmes.get(e.rowData.rowid);
        var ctrl = Alloy.createController("MovieDetail", movie);
        ctrl.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        title: "Movies",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.filmesTableView = Ti.UI.createTableView({
        id: "filmesTableView"
    });
    $.__views.index.add($.__views.filmesTableView);
    var __alloyId8 = Alloy.Collections["Filmes"] || Filmes;
    __alloyId8.on("fetch destroy change add remove reset", __alloyId9);
    showDetails ? $.__views.filmesTableView.addEventListener("click", showDetails) : __defers["$.__views.filmesTableView!click!showDetails"] = true;
    exports.destroy = function() {
        __alloyId8.off("fetch destroy change add remove reset", __alloyId9);
    };
    _.extend($, $.__views);
    var backend = require("backend");
    backend.getProximosLancamentos(function(filmes) {
        filmes.forEach(function(filme) {
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
    __defers["$.__views.filmesTableView!click!showDetails"] && $.__views.filmesTableView.addEventListener("click", showDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;