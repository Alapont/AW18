"use strict";
const express = require("express"); //Ya estamos usando express
const path = require("path");


const app = express(); //Aquí se van a hacer todas las llamadas a express
app.set("view engine", "ejs"); //usamos ejs
app.set("views", path.join(__dirname, "public", "views")); //Motor de plantillas
/* ./public/views/ es la carpeta donde se guardarán las plantillas */

var usuarios = ["Neku la del anime", "Daster el limpito", "Yago el pastor de routers"];

//Lista de Middlewers 
function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} ` +
        `en ${request.url} de ${request.ip}`);
    // Saltar al siguiente middleware
    next();
}
let ipsCensuradas = ["147.96.81.244", "145.2.34.23"];

function blacklist(request, response, next) {
    // Comprobar si la IP de la petición está dentro de la
    // lista de IPs censuradas.
    if (ipsCensuradas.indexOf(request.ip) >= 0) {
        // Si está censurada, se devuelve el código 401 (Unauthorized
        response.status(401);
        response.end("No autorizado"); // TERMINA LA RESPUESTA
    } else {
        // En caso contrario, se pasa el control al siguiente middlew
        console.log("IP autorizada");
        next();
    }
};

function error(request, response, next) {
    response.status(404);
    response.render("error", {
        url: request.url
    });
};


app.use(logger);
app.use(blacklist);
app.use(error);

//app.use(middleware_1);
//app.use(middleware_2);
//app.use(middleware_3);


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor");
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});