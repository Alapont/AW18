
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

app.use(session({
    secret: 'clave de sesion',
    resave: false,
    saveUninitialized: true
}));


app.get("/", function(request, response) {
    response.redirect("/index.html");
});

/*
 * Manejador que muestra la página con la lista de tareas
 */
app.get("/index.html", function(request, response) {
    
    
});

/*
 * Manejador al que se llama cuando se añade una tarea
 */
app.post("/anyadirTarea", function(request, response) {
    
    // Añadir tarea
    
    response.redirect("/index.html");
});


/*
 * Manejador que marca una determinada tarea como finalizada
 */
app.get("/finalizarTarea", function(request, response) {
    
    // Finalizar tarea
    
    response.redirect("/index.html");
});

app.listen(3000, function(err) {
    if (err) {
        console.log("No se ha podido arrancar el servidor: " + err.message);
    } else {
        console.log("Servidor escuchando en puerto 3000");
    }
});