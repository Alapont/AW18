"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const DAOUser = require("./DAOUsers");

const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});

const DUser = new DAOUser(pool);

// Crear un servidor Express.js
const app = express();
const { check, validationResult } = require('express-validator/check');
app.set("view engine", "ejs"); //usamos ejs 
app.set("views", path.join(__dirname, "public", "views"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, "public")));
//funcion error
function error(request, response, next) {
    response.status(404);
    response.render("error", {
        url: request.url,
        config: {
            pageName: "Error 404"
        }
    });
};

//AQUI VAN LOS MIDDLEWARE
//app.use...
function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} ` +
        `en ${request.url} de ${request.ip}`);

    // Saltar al siguiente middleware   
    next();
}

app.use(logger);

//AQUI VAN LOS HANDLER

//LOGIN
app.get(/login(.html)?/, (request, response) => {

    response.status(200);
    response.type("text/html")
    response.render("main", {
        config: {
            pageName: "login"
        }
    });


});
//          login action
app.post("/login",[
    check('user').isEmail(),
    check('password').isLength({min:1})
], (request, response) => {

    response.status(200);
    response.type("text/html");

    request.getValidationResult().then(function (result) {

        DUser.isUserCorrect(request.body.user, request.body.password, (err, data) => {
            if (err) {
                response.cookie("error", err);
                response.status(500);
                response.render("main", {
                    config: {
                        pageName: "login"
                    }
                });
            } else {
                if (data != null) {
                    DUser.getUser(request.body.user, (err, data) => {
                        //GUARDAR USER
                        response.redirect("/login");
                    });
                } else {
                    // request.session.error = ("Error de búsqueda de usuario");
                    response.redirect("/login");
                }
            }
        });

    });

});

app.get('/', (request, response) => {
    response.status(300);
    response.redirect("/login");
});

app.use(error);
// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});