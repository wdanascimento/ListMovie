function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId3() {
        $.__views.index.removeEventListener("open", __alloyId3);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId1 = {
                id: "settingsMenu",
                title: "Settings"
            };
            $.__views.settingsMenu = e.menu.add(_.pick(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.__views.settingsMenu.applyProperties(_.omit(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.settingsMenu = $.__views.settingsMenu;
            openSettings ? $.__views.settingsMenu.addEventListener("click", openSettings) : __defers["$.__views.settingsMenu!click!openSettings"] = true;
            var __alloyId2 = {
                id: "refreshMenu",
                title: "refresh"
            };
            $.__views.refreshMenu = e.menu.add(_.pick(__alloyId2, Alloy.Android.menuItemCreateArgs));
            $.__views.refreshMenu.applyProperties(_.omit(__alloyId2, Alloy.Android.menuItemCreateArgs));
            $.refreshMenu = $.__views.refreshMenu;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId13(e) {
        if (e && e.fromAdapter) return;
        __alloyId13.opts || {};
        var models = __alloyId12.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                height: 150,
                layout: "horizontal",
                backgroundColor: "white",
                rowid: "undefined" != typeof __alloyId4.__transform["id"] ? __alloyId4.__transform["id"] : __alloyId4.get("id")
            });
            rows.push(__alloyId5);
            var __alloyId6 = Ti.UI.createImageView({
                left: 5,
                top: 5,
                bottom: 5,
                width: 110,
                image: "undefined" != typeof __alloyId4.__transform["poster_path"] ? __alloyId4.__transform["poster_path"] : __alloyId4.get("poster_path")
            });
            __alloyId5.add(__alloyId6);
            var __alloyId7 = Ti.UI.createView({
                layout: "vertical",
                left: 5,
                width: Titanium.UI.FILL,
                height: 150
            });
            __alloyId5.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                left: 5,
                color: "red",
                right: 5,
                top: 10,
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId4.__transform["title"] ? __alloyId4.__transform["title"] : __alloyId4.get("title")
            });
            __alloyId7.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId4.__transform["release_date"] ? __alloyId4.__transform["release_date"] : __alloyId4.get("release_date")
            });
            __alloyId7.add(__alloyId9);
            var __alloyId10 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId4.__transform["original_language"] ? __alloyId4.__transform["original_language"] : __alloyId4.get("original_language")
            });
            __alloyId7.add(__alloyId10);
            var __alloyId11 = Ti.UI.createLabel({
                left: 5,
                color: "#000",
                text: "undefined" != typeof __alloyId4.__transform["popularity"] ? __alloyId4.__transform["popularity"] : __alloyId4.get("popularity")
            });
            __alloyId7.add(__alloyId11);
        }
        $.__views.filmesTableView.setData(rows);
    }
    function showDetails(e) {
        var movie = Alloy.Collections.Filmes.get(e.rowData.rowid);
        var ctrl = Alloy.createController("MovieDetail", movie);
        ctrl.getView().open();
    }
    function openSettings() {
        var ctrl = Alloy.createController("settings");
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
    $.__views.index.addEventListener("open", __alloyId3);
    $.__views.filmesTableView = Ti.UI.createTableView({
        id: "filmesTableView"
    });
    $.__views.index.add($.__views.filmesTableView);
    var __alloyId12 = Alloy.Collections["Filmes"] || Filmes;
    __alloyId12.on("fetch destroy change add remove reset", __alloyId13);
    showDetails ? $.__views.filmesTableView.addEventListener("click", showDetails) : __defers["$.__views.filmesTableView!click!showDetails"] = true;
    exports.destroy = function() {
        __alloyId12.off("fetch destroy change add remove reset", __alloyId13);
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
    __defers["$.__views.settingsMenu!click!openSettings"] && $.__views.settingsMenu.addEventListener("click", openSettings);
    __defers["$.__views.filmesTableView!click!showDetails"] && $.__views.filmesTableView.addEventListener("click", showDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;