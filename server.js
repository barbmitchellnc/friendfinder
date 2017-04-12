var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();


var PORT = process.env.PORT || 8080;

var friends = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// Static directory
app.use(express.static(__dirname + '/public'));

// Routes
// =============================================================
require("./routing/apiRoutes.js")(app, friends, fs);
require("./routing/htmlRoutes.js")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    fs.stat("./data/friends.js", function (err, stats) {
        if (err) throw err;
        if (stats.isFile()) {
            fs.readFile("data/friends.js", "utf8", function (err, data) {
                var all = JSON.parse(data);              
                for (i = 0; i < all.length; i++) {
                    console.log("adding friend: "+ all[i].name)
                    friends.push(all[i])
                }
            });
        }
    });
});