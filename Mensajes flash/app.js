"use strict";

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const path = require("path");


// Crear un servidor Express.js
const app = express();

// Configuramos el motor de plantillas
app.set("view engine", "ejs");

// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));

// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

const middlewareSession = session({
    saveUnitialized:false,
    secret: "foobar34",
    resave:false
});
app.use(middlewareSession);
//MENSAJES FLASH (esto es lo que yo he hecho)
//los mensajes flash permiten guardan contenido de una petición a otra petición
function flashMiddleware(request, response, next) {
    //añades el atributo setFlash al objeto response
    response.setFlash = function (msg) {
        //función que añade el objeto flashMsg con valor msg a session
        request.session.flashMsg = msg;
    };
    //el objeto locals es un objeto que, nada más crear la aplicación, se le añade a app.
    //puedes acceder desde cualquier plantilla a este objeto
    response.locals.getAndClearFlash = function () {
        //coge el mensaje guardado en la sesión, lo borra de la sesión (son mensajes que solo valen 1 vez), y devuleve el mensaje
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };
    next();
};
app.use(flashMiddleware);

// Se incluye el middleware body-parser en la cadena de middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Se incluye el validador de formularios
app.use(expressValidator());

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

// Manejador para raiz
app.get("/", function (request, response) {
    response.status(200);
    let err = [];
    response.render("index", {
        errores: err
    });
});

app.post("/procesar_formulario", function (request, response) {
    request.checkBody("login", "Nombre de usuario vacío").notEmpty();
    request.checkBody("login", "Nombre de usuario no válido").matches(/^[A-Z0-9]+$/i);
    request.checkBody("pass", "La contraseña no es válida").isLength({
        min: 6,
        max: 10
    });
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    request.checkBody("fechaNacimiento", "Fecha de nacimiento no válida").isBefore();

    request.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            response.redirect("correcto.html");
        } else {
            // response.render("index", {
            //     errores: result.array()
            // });
            response.setFlash(result.array());
            response.redirect("/");
        }
    });
});

//todo esto lo ha hecho victor, que me lo ha pasado cuando yo llegué de EDA


