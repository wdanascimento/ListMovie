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
        Ti.App.Properties.setString("foo", "Paul");
        $.value_search.text = 0 == index ? "Movies Playing" : "Upcoming";
        var foo = Ti.App.Properties.getString("foo");
        Ti.API.info(foo);
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
    $.__views.__alloyId10 = Ti.UI.createLabel({
        left: "5",
        color: "#000",
        text: "Search for:",
        top: "10",
        id: "__alloyId10"
    });
    $.__views.win.add($.__views.__alloyId10);
    $.__views.value_search = Ti.UI.createLabel({
        left: "5",
        color: "#000",
        text: "Movies Playing",
        id: "value_search"
    });
    $.__views.win.add($.__views.value_search);
    showOptions ? $.__views.value_search.addEventListener("click", showOptions) : __defers["$.__views.value_search!click!showOptions"] = true;
    var __alloyId12 = [];
    __alloyId12.push("Movies Playing");
    __alloyId12.push("Upcoming");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId12,
        id: "dialog",
        title: "Search for:"
    });
    clickOption ? $.__views.dialog.addEventListener("click", clickOption) : __defers["$.__views.dialog!click!clickOption"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var config = Ti.App.Properties.getInt("search_for", 0);
    var foo = Ti.App.Properties.getString("foo");
    Ti.API.info(foo);
    $.dialog.selectedIndex = config;
    $.value_search.text = 0 == config ? "Movies Playing" : "Upcoming";
    __defers["$.__views.value_search!click!showOptions"] && $.__views.value_search.addEventListener("click", showOptions);
    __defers["$.__views.dialog!click!clickOption"] && $.__views.dialog.addEventListener("click", clickOption);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;