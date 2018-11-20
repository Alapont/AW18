"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const fs = require("fs");
const morgan = require("morgan");


const head =`<!DOCTYPE html>
<html>
<head>
    <title>Lista de usuarios</title>
    <meta charset="utf-8">
    <ul>
</head>
<body>`;
const end=`</ul></body></html>`

let usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
app.use(morgan("default"));


app.get('/users',function (request,response, next){
    response.write(head)
    usuarios.forEach((user,index)=>{
        response.write(`<li><form action="borrarUsuario" method="POST">
            <input type="hidden" name="index" value=${index}>
            <input type="submit" value="Borrar">
        </form></li>`);//Enlace de borrar
        response.write(user)
    response.write(end)
    })
})
app.use(bodyParser.urlencoded({
    extended:false
}));

app.post('/borrarUsuario',function(request,response,next){
    usuarios.splice(request.body.index,1)
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