"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.redirect("/ej4.html");
});


const VALID_PASSWORD = "5665";

/**
 * Manejador de ruta para comprobar la contraseña.
 * 
 * Devuelve  { "valid": true } al cliente si la contraseña es válida,
 * o { "valid": false } en caso contrario.
 */
app.get("/checkPassword", (request, response) => {
    response.json({
        valid: request.query.password === VALID_PASSWORD
    });
});


app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Servidor iniciado en el puerto 3000.");
    }
});