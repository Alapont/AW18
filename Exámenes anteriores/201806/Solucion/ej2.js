"use strict";

let lenguajes = {
    "C++": 25,
    "Java": 20,
    "Javascript": 21
};

const path = require("path");
const express = require("express");

const app = express();


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.redirect("/ej2.html");
});

app.get("/ranking", (request, response) => {
     response.json(lenguajes);
});


// ---------------------------------
// Implementa aquí el apartado 2.(b)
// ---------------------------------

app.put("/ranking/:nombre", (request, response) => {
    let nombre = request.params.nombre;
    if (lenguajes[nombre] !== undefined) {
        lenguajes[nombre]++;
    } else {
        lenguajes[nombre] = 1;
    }
    response.status(200);
});


app.listen(3000, function(err) {
    if (err) {
        console.log("Error al abrir el puerto 3000: " + err);
    } else {
        console.log("Servidor escuchando en el puerto 3000");
    }
});