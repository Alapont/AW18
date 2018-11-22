"use strict";
// app.js
const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan"); //Morgan te suelta por consola lo que va pasando
const bodyParser = require("body-parser");

// Crear un servidor Express.js
const app = express();
app.set("view engine", "ejs"); //usamos ejs  agromenaguer y candemor
app.set("views", path.join(__dirname, "public", "views"));
app.use(bodyParser.urlencoded({
    extended: false
}));
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
//util
let test = config.testData; //Datos de testeo antes de hacer DAO y tal
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


//Handlers
//  Si no está logueado
//      Login
app.get(/login(.html)?/, (request, response) => {
    if (test.sesion.user) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: test.sesion,
            config: {
                pageName: "login"
            }
        });

    }
});
//          login action
app.post("/login", (request, response) => {
if (test.sesion.user) { //Salimos si está logueado
    response.status(300);
    response.redirect("/perfil");
} else {
    response.status(200);
    response.type("text/html"); 
    test.sesion.user="pont";
    response.render("main", {
        sesion: test.sesion,
        config: {
            pageName: "perfil"
        }
    });

}
});

//      Registro
app.get(/register(.html)?/, (request, response) => {
    if (test.sesion.user) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: test.sesion,
            config: {
                pageName: "register"
            }
        });

    }
});

//  Si está logueado
//      Perfil
app.get(/perfil(.html)?/, (request, response) => {
    if (!test.sesion.user) { //Salimos si no está logueado
        response.status(300);
        response.redirect("/login");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: test.sesion,
            config: {
                pageName: "perfil"
            }
        });

    }
});
//      Edit
app.get(/edit(.html)?/, (request, response) => {
    if (!test.sesion.user) { //Salimos si no está logueado
        response.status(300);
        response.redirect("/login");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: test.sesion,
            config: {
                pageName: "edit"
            }
        });

    }
});
//      Amigos
app.get(/amigos(.html)?/, (request, response) => {
    if (!test.sesion.user) { //Salimos si no está logueado
        response.status(300);
        response.redirect("/login");
    } else {
        response.status(200);
        response.type("text/html")
        response.render("main", {
            sesion: test.sesion,
            config: {
                pageName: "amigos"
            }
        });

    }
});
//          Solicitar amistad
app.get("/solicitar/:taskid", (request, response) => {

});
//          Aceptar amistadº
app.get("/aceptar/:taskid", (request, response) => {

});
//          Rechazar amistad
app.get("/rechazar/:taskid", (request, response) => {

});
//          Buscar amistad
app.post("/busca", (request, response) => {
    let busqueda = request.body.busqueda;
});
//      Preguntas
//      Desconectar
app.get(/desconectar(.html)?/, (request, response) => {
    response.status(300);
    test.sesion.user = null;
    response.redirect("/login");
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