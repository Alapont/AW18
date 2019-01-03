"use strict"

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
const DAO = require("./ej1_dao");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "examen_julio"
});

const PORT = 3000;

const dao = new DAO(pool);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "clave secreta del examen",
    resave: false,
    saveUninitialized: false
}));

// ------------------------------------------
// Realiza aquí el ejercicio 1.(b)
// ------------------------------------------
app.get("/", (request, response) => {
    response.end();
});

// ------------------------------------------
// Realiza aquí el ejercicio 1.(d)
// ------------------------------------------
app.post("/reservar", (request, response) => {
    response.end();
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("No se pudo iniciar el servidor");
        console.error(err);
    } else {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    }
});