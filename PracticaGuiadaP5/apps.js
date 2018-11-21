"use strict";
// app.js
const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan"); //Morgan te suelta por consola lo que va pasando
const bodyParser = require("body-parser");
//const ejsLint = require("ejs-lint");
const daoTask = require("./DAOTasks");

// Crear un servidor Express.js
const app = express();
app.set("view engine", "ejs"); //usamos ejs  agromenaguer y candemor
app.set("views", path.join(__dirname, "public", "views"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
const daoT = new daoTask(pool); // Crear una instancia de DAOTasks
const sesion = {
    usuario: "usuario@ucm.es",
    pic: "img/usuario.jpg"
};
//const usuario = "pont@loco.es"



//Utils
function goHome(err, target = "/tasks.html") { //to be done
    response.status((err) ? 500 : 200);
    response.redirect(target);
}

function error(request, response, next) {
    response.status(404);
    response.render("error", {
        url: request.url,
        config: {
            pageName: "Error 404"
        }

    });
};

function createTask(texto) { //tarea @tag @tag'
    let getTag = /\@[\w\d]+/g;
    let tags = texto.match(getTag)
    if(tags)
        tags=tags.map(t => t.slice(1));
    let text = texto.replace(getTag, '');
    text = text.replace('  ', ' ').replace(/(^ )|( $)/, '');
    return ({
        text: text,
        done: 0,
        tags: ((tags)?tags:[])
    });
}

//Lista de middlewares
app.use(morgan("dev")) //coso para depurar
app.use(express.static(path.join(__dirname, "public"))) //Coso para páginas estáticas

app.get("/", function (request, response) {
    response.redirect("/tasks.html");
});
app.get(/\/[Tt]ask(s)?(.html)?/, function (request, response) {
    //var lint=ejsLint("tasks");
    daoT.getAllTasks(sesion.usuario, (err, data) => {
        if (err) {
            response.status(500);
            response.render("error");
        } else {
            response.status(200);
            response.type("text/html");
            response.render("tasks", {
                taskList: data,
                sesion: sesion,
                config: {
                    pageName: "Tareas"
                }
            });
            //ejsLint("tasks",{taskList:data});
        }

    })
});
app.post("/addTask", (request, response) => {
    daoT.insertTask(sesion.usuario, createTask(request.body.text), (err, data) => {
        response.status((err) ? 500 : 300);
        response.redirect("/tasks.html")
    });
});
app.get("/fin/:taskid", (request, response) => {
    daoT.markTaskDone(request.params.taskid.replace(/^:/, ''), (err, data) => {
        if (err) {
            response.status(500);
            response.error("Error de base de datos");
        } else {
            response.status(200);
            response.redirect("/tasks.html");
        }
    });
});
app.get("/deleteCompleted", (request, response) => {
    daoT.deleteCompleted(sesion.usuario, (err, data) => {
        response.status((err) ? 500 : 300);
        response.redirect("/tasks.html")
    });
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