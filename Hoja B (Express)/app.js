"use strict";

// app.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const miRouter = require("./miRouter")


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));



app.use(morgan("default"));
//app.use("/usuarios",miRouter);
app.get("/usuarios", function (request, response, next) {
    fs.readFile("noexiste.txt", function (err, contenido) {
        if (err) {
            next(err);
        } else {
            request.contenido = contenido;
        }
    });
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