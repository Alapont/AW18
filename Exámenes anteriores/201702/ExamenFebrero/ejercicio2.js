
/* global __dirname */

var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");

var app = express();

var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

var viewsPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
    response.redirect("/index.html");
});


/*
 * Al teclear la URL /index.html
 */
app.get("/index.html", function(request, response) {
    
});

/*
 * Al teclear la URL /calcular.html
 */
app.get("/calcular.html", function(request, response) {
    
});


app.listen(3000, function(err) {
    if (err) {
        console.log("No se ha podido arrancar el servidor: " + err.message);
    } else {
        console.log("Servidor escuchando en puerto 3000");
    }
});