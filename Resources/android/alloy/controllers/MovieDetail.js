function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MovieDetail";
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
    $.__views.MovieDetail = Ti.UI.createWindow({
        title: "Details",
        layout: "horizontal",
        backgroundColor: "white",
        id: "MovieDetail"
    });
    $.__views.MovieDetail && $.addTopLevelView($.__views.MovieDetail);
    $.__views.poster_path = Ti.UI.createImageView({
        left: 5,
        top: 5,
        width: 210,
        height: 300,
        id: "poster_path"
    });
    $.__views.MovieDetail.add($.__views.poster_path);
    $.__views.view_001 = Ti.UI.createView({
        layout: "vertical",
        left: 5,
        width: Titanium.UI.FILL,
        height: 300,
        id: "view_001"
    });
    $.__views.MovieDetail.add($.__views.view_001);
    $.__views.title_movie = Ti.UI.createLabel({
        left: 5,
        color: "red",
        right: 5,
        top: 10,
        font: {
            fontSize: 26
        },
        id: "title_movie"
    });
    $.__views.view_001.add($.__views.title_movie);
    $.__views.release_date = Ti.UI.createLabel({
        left: 5,
        color: "#000",
        id: "release_date"
    });
    $.__views.view_001.add($.__views.release_date);
    $.__views.original_language = Ti.UI.createLabel({
        left: 5,
        color: "#000",
        id: "original_language"
    });
    $.__views.view_001.add($.__views.original_language);
    $.__views.popularity = Ti.UI.createLabel({
        left: 5,
        color: "#000",
        id: "popularity"
    });
    $.__views.view_001.add($.__views.popularity);
    $.__views.overview = Ti.UI.createLabel({
        left: 5,
        color: "#000",
        top: 10,
        right: 5,
        id: "overview"
    });
    $.__views.MovieDetail.add($.__views.overview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var movie = arguments[0] || {};
    $.poster_path.image = movie.get("poster_path");
    $.title_movie.text = movie.get("title");
    $.release_date.text = movie.get("release_date");
    $.original_language.text = movie.get("original_language");
    $.popularity.text = movie.get("popularity");
    $.overview.text = movie.get("overview");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;