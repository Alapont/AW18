"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks
function test(err,data){
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`data: ${data}`);
}
//pruebas
/*
console.log('isUserCorrect');
daoUser.isUserCorrect("pont@loco.es", "kaka", test);
daoUser.isUserCorrect("pont@locdjhskjco.es", "kaka", test);
daoUser.isUserCorrect("pont@loco.es", "kajhka", test);
*/
/*
console.log('getUserImage');
daoUser.getUserImageName("pont@loco.es",test);
daoUser.getUserImageName("pont@locjnsdjkso.es",test);
*/


