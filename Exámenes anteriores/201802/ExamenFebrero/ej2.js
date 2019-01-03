const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

let app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'frase secreta',
    resave: false,
    saveUninitialized: true,
}));

/*
 * Al acceder a la ruta raíz, debemos mostrar la plantilla con el resultado vacío.
 */
app.get("/", (request, response) => {    
    
    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------
    
});

/*
 * Manejador de ruta GET para realizar operaciones.
 */
app.get("/calc", (request, response) => {
    
    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------

});

/*
 * Manejador POST para borrar la ruta del hostiral. Recibe un parámetro
 * `index` con el índice de la entrada del historial a borrar. 
 */
app.post("/deleteHistory", (request, response) => {
    
    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------

});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});