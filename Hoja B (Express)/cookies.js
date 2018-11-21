"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fs = require("fs");
const morgan = require("morgan");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "tareas"
});


const head = `<!DOCTYPE html>
<html>
<head>
    <title>Lista de usuarios</title>
    <meta charset="utf-8">
</head>
<body><ul>`;
const end = `</ul></body></html>`

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
//  Utils
app.use(morgan("default"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);


//Handlers
app.get("/reset", function (request, response) {
    response.status(200);
    request.session.contador = 0;
    response.type("text/plain");
    response.end("Has reiniciado el contador");
});
app.get("/increment", function (request, response) {
    if (request.session.contador === undefined) {
        response.redirect("/reset");
    } else {
        let contador = Number(request.session.contador) + 1;
        request.session.contador++;
        response.status(200);
        response.type("text/plain");
        response.end(`El valor actual del contador es ${contador}`);
    }
});


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