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
    dao.obtenerTodasMesas((err, mesas) => {
        if(err) {
            response.status(500);
            response.end(err.message);
        } else {
            response.render("ej1", { mesas: mesas, reservada: request.session.mesaReservada });
        }
    });
});

// ------------------------------------------
// Realiza aquí el ejercicio 1.(d)
// ------------------------------------------
app.post("/reservar", (request, response) => {
    let nombre = request.body.nombre.trim();
    let numComensales = Number(request.body.num_comensales.trim());

    if (nombre === "" || isNaN(numComensales) || numComensales <= 0) {
        response.redirect("/ej1_error.html");
    } else {
        dao.buscarYReservarMesa(nombre, numComensales, (err, mesaReservada) => {
            if (mesaReservada === null) {
                response.redirect("/ej1_no_place.html");
            } else {
                request.session.mesaReservada = mesaReservada;
                response.redirect("/");
            }
        });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("No se pudo iniciar el servidor");
        console.error(err);
    } else {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    }
});