"use strict";
const express = require("express"); //Ya estamos usando express
const app = express(); //Aquí se van a hacer todas las llamadas a express
const path = require("path");

const _app = null;
/*Añadimos un manejador para la ruta "/" 
    y un callback que va a atender ese servicio. 
    request y response son los mísmos objetos que en el http pero con esteroides
*/
/*_app.get("/", function (request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>Esta es la página raíz</h1>");
    response.end();
});*/
//Equivalente a la anterior se puede hacer así
app.get("/old", function (request, response) {
    response.status(200);
    response.type("text/plain; charset=utf-8");
    response.end("Esta es la página raíz");
});

app.get("/old/users.html", function (request, response) {
    response.status(200);
    response.type("text/plain; charset=utf-8");
    response.end("Aquí se mostrará la página de usuarios");
});

var usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];
app.get("/users.html", function (request, response) {
    response.status(200);
    response.type("text/html");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Lista de usuarios</title>");
    response.write('<meta charset="utf-8">')
    response.write("</head>");
    response.write("<body><ul>");
    usuarios.forEach((usuario) => {
        response.write(`<li>${usuario}</li>`);
    });
    response.write("</ul></body>");
    response.end("</html>");
});

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "public/views", "bienvenido.html"));
});


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});