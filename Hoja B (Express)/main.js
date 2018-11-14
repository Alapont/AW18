"use strict";
const express = require("express"); //Ya estamos usando express
const path = require("path");


const app = express(); //Aquí se van a hacer todas las llamadas a express
app.set("view engine", "ejs"); //usamos ejs
app.set("views", path.join(__dirname, "public", "views")); //Motor de plantillas
/* ./public/views/ es la carpeta donde se guardarán las plantillas */

var usuarios = ["Neku la del anime", "Daster el limpito", "Yago el pastor de routers"];
app.get("/users.html", function (request, response) {
    response.status(200);
    response.render("users", {
        users: usuarios
    });
    // Busca la plantilla "views/users.ejs"
    // La variable 'users' que hay dentro de esta plantilla tomará
    // el valor del array 'usuarios'.
});


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});