"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan");

//text
const head = `<!DOCTYPE html>
<html>
<head>
    <title>Lista de usuarios</title>
    <meta charset="utf-8">
</head>
<body>`;
const end = `</body></html>`
const age=86400000;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
//  Utils
app.use(morgan("default"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Sumador
app.get("/suma", function (request, response,next) {
    response.status(200);
    response.cookie("sumando1",0,{maxAge:age});
    response.cookie("sumando2",0,{maxAge:age});
    response.type("text/html");
    response.write(`<form action="sumando1" method="POST">
        <input type="number" name="op1">
        <input type="submit" value="op2">
    </form>`)
    response.write(end);
    //response.end("primer sumando")
});
app.post("/sumando1",(request,response,next)=>{
    response.status(300);
    response.cookie("sumando1",request.body.op1,{maxAge:age});
    response.redirect("suma2");
});

app.get("/suma2", function (request, response) {
    response.status(200);
    response.type("text/html");
    response.write(`<form action="calcular" method="post">
        <input type="number" name="op2">
        <input type="submit" value="result">
    </form>`)
    response.write(end);
});
app.post("/calcular",(request,response,status)=>{
    response.status(200);
    response.type("text/html");
    response.write(`<h1> ${request.cookies.sumando1} + ${request.body.op2} = ${Number(request.cookies.sumando1) + Number(request.body.op2)} </h1>`)
});



app.get('/resultado', function (request, response, next) {
    response.write(head)
    usuarios.forEach((user, index) => {
        response.write(`<li><form action="borrarUsuario" method="POST">
            <input type="hidden" name="index" value=${index}>
            <input type="submit" value="Borrar">
        </form></li>`); //Enlace de borrar
        response.write(user)
        response.write(end)
    })
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