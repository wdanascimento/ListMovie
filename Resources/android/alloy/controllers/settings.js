function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showOptions() {
        $.dialog.show();
    }
    function clickOption(e) {
        var index = e.index;
        Ti.App.Properties.setString("search_for", index);
        $.value_search.text = 0 == index ? "Movies Playing" : "Upcoming";
        backend.getProximosLancamentos(function(filmes) {
            filmes.forEach(function(filme) {
                filme.poster_path = "http://image.tmdb.org/t/p/w500" + filme.poster_path;
                filme.release_date = "Date: " + filme.release_date;
                filme.original_language = "Language: " + filme.original_language;
                filme.popularity = "Popularity: " + filme.popularity;
                return filme;
            });
            Alloy.Collections.Filmes.reset(filmes);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.__views.win = Ti.UI.createWindow({
        id: "win",
        title: "Settings",
        backgroundColor: "white",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        left: "5",
        color: "#000",
        text: "Search for:",
        top: "10",
        id: "__alloyId14"
    });
    $.__views.win.add($.__views.__alloyId14);
    $.__views.value_search = Ti.UI.createLabel({
        left: "5",
        color: "#000",
        text: "Movies Playing",
        id: "value_search"
    });
    $.__views.win.add($.__views.value_search);
    showOptions ? $.__views.value_search.addEventListener("click", showOptions) : __defers["$.__views.value_search!click!showOptions"] = true;
    var __alloyId16 = [];
    __alloyId16.push("Movies Playing");
    __alloyId16.push("Upcoming");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId16,
        id: "dialog",
        title: "Search for:"
    });
    clickOption ? $.__views.dialog.addEventListener("click", clickOption) : __defers["$.__views.dialog!click!clickOption"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var backend = require("backend");
    arguments[0] || {};
    var config = Ti.App.Properties.getInt("search_for", 0);
    $.dialog.selectedIndex = config;
    $.value_search.text = 0 == config ? "Movies Playing" : "Upcoming";
    __defers["$.__views.value_search!click!showOptions"] && $.__views.value_search.addEventListener("click", showOptions);
    __defers["$.__views.dialog!click!clickOption"] && $.__views.dialog.addEventListener("click", clickOption);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;