"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fs = require("fs");
const morgan = require("morgan");


const head = `<!DOCTYPE html>
<html>
<head>
    <title>Lista de usuarios</title>
    <meta charset="utf-8">
</head>
<body><ul>`;
const end = `</ul></body></html>`

let usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
//  Utils
app.use(morgan("default"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//Contador
app.get("/reset", function (request, response) {
    response.status(200);
    response.cookie("contador", 0, {
        maxAge: 86400000
    });
    response.type("text/plain");
    response.end("Has reiniciado el contador");
});
app.get("/increment", function (request, response) {
    if (request.cookies.contador === undefined) {
        response.redirect("/reset.html");
    } else {
        let contador = Number(request.cookies.contador) + 1;
        response.cookie("contador", contador);
        response.status(200);
        response.type("text/plain");
        response.end(`El valor actual del contador es ${contador}`);
    }
});



app.get('/users', function (request, response, next) {
    response.write(head)
    usuarios.forEach((user, index) => {
        response.write(`<li><form action="borrarUsuario" method="POST">
            <input type="hidden" name="index" value=${index}>
            <input type="submit" value="Borrar">
        </form></li>`); //Enlace de borrar
        response.write(user)
    });
    response.write(end)
})
app.post('/borrarUsuario', function (request, response, next) {
    usuarios.splice(request.body.index, 1)
    response.redirect("/users");
})

app.use(function (error, request, response, next) {
    // Código 500: Internal server error
    response.status(500);
    response.render("error", {
        mensaje: error.message,
        pila: error.stack
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