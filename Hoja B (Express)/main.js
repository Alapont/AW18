"use strict";
const express = require("express");
const path = require("path");
const app = express(); //Aquí se van a hacer todas las llamadas a express
app.set("view engine", "ejs"); //usamos ejs
app.set("views", path.join(__dirname, "public", "views")); //Motor de plantillas
// La variable ficherosEstaticos guarda el
// nombre del directorio donde se encuentran
// los ficheros estáticos:
// <directorioProyecto>/public
const ficherosEstaticos =
    path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

app.get("/procesar_get.html", function (request, response) {
    let sexoStr = "No especificado";
    switch (request.query.sexo) {
        case "H":
            sexoStr = "Hombre";
            break;
        case "M":
            sexoStr = "Mujer";
            break;
    }
    response.render("infoForm", {
        nombre: request.query.nombre,
        edad: request.query.edad,
        sexo: sexoStr,
        fumador: (request.query.fumador === "ON" ? "Sí" : "No")
    });
});


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});