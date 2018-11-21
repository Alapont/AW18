"use strict";
// app.js
const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan");//Morgan te suelta por consola lo que va pasando
const bodyParser = require("body-parser");
//const ejsLint = require("ejs-lint");

const daoTask = require("./DAOTasks");

// Crear un servidor Express.js
const app = express();
app.set("view engine", "ejs"); //usamos ejs  agromenaguer y candemor
app.set("views", path.join(__dirname, "public", "views"));

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new daoTask(pool);

//Middlewares

//Definición de middlewares
function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} ` +
        `en ${request.url} de ${request.ip}`);
    // Saltar al siguiente middleware
    next();
}
function error(request, response, next) {
    response.status(404);
    response.render("error", {
        url: request.url
    });
};

app.get("/", function (request, response) {
    response.redirect("/tasks.html");
});
app.get("/tasks.html", function (request, response){
    //var lint=ejsLint("tasks");
    daoT.getAllTasks("usuario@ucm.es",(err,data)=>{
        if (err){
            response.status(500);
            response.render("error");
        }else{
            response.status(200);
            response.type("text/html");
            response.render("tasks",{taskList: data});
            //ejsLint("tasks",{taskList:data});
        }

    })
});
//Lista de middlewares
app.use(morgan("dev"))//coso para depurar
app.use(express.static(path.join(__dirname, "public")))//Coso para páginas estáticas



app.use(error);
// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});