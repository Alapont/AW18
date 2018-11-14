"use strict";
// app.js
const config = require("./config");
const DAOTasks = require("./DAOTasks");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

// Crear un servidor Express.js
const app = express();
app.set("view engine", "ejs"); //usamos ejs  agromenaguer y candemor

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

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

const ficherosEstaticos = path.join(__dirname, "public");

//Lista de middlewares
app.use(logger);
app.use(express.static(ficherosEstaticos));




app.use(error);
// Arrancar el servidor
app.listen(config.port, function(err) {
   if (err) {
       console.log("ERROR al iniciar el servidor");
   }
   else {
       console.log(`Servidor arrancado en el puerto ${config.port}`);
   }
});
