"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan"); //Morgan te suelta por consola lo que va pasando
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const multer = require("multer");
const expressValidator = require("express-validator");
const mySQLStore = mysqlSession(session);
const daoUser = require("./DAOUsers");
const daoAmistad = require("./DAOAmistad");
const sessionStore = new mySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: config.database
});
const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});
const DaoU = new daoUser(pool);
const DaoA = new daoAmistad(pool);
// Crear un servidor Express.js
const app = express();
app.set("view engine", "ejs"); //usamos ejs 
app.set("views", path.join(__dirname, "public", "views"));
app.use(bodyParser.urlencoded({
    extended: false
}));
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

//Lista de middlewares
app.use(morgan("dev")) //coso para depurar
app.use(express.static(path.join(__dirname, "public"))) //Coso para páginas estáticas

const middlewareSession = session({
    saveUnitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});


//////LOGIN//////

//  Si no está logueado
//      Login
app.get(/login(.html)?/, (request, response) => {
    if (middlewareSession.user) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: {
                user: (request.session != undefined) ? request.session.user : null
            },
            config: {
                pageName: "login"
            }
        });

    }
});
//          login action
app.post("/login", (request, response) => {
    if (middlewareSession.user) { //Salimos si está logueado
        response.status(300);
        response.redirect("/login");
    } else {
        response.status(200);
        response.type("text/html");
        //comprobamos si el usuario existe y es correcto
        DaoU.isUserCorrect(request.body.user, request.body.password, (err, data) => {
            if (err) {
                middlewareSession.error = (err);
                response.status(500);
                response.redirect("/login");
            } else {
                if (data != null) {
                  response.status(300);
                  middlewareSession.user= data.userName;
                  response.redirect("/login");
                     
                } else {
                    middlewareSession.error = ("Error de búsqueda de usuario");
                    response.redirect("/login");
                }

            }

        });
    }
});


//////REGISTRO////
//      Registro
app.get(/register(.html)?/, (request, response) => {
    if (middlewareSession.user) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: middlewareSession.sesion,
            config: {
                pageName: "register"
            }
        });

    }
});
//Default handler
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