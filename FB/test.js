"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan"); //Morgan te suelta por consola lo que va pasando
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession=require("express-mysql-session");
const multer = require("multer");
const expressValidator = require("express-validator");
const mySQLStore = mysqlSession(session);
const daoUser = require("./DAOUsers");
const daoAmistad = require("./DAOAmistad");
const sessionStore=new mySQLStore({
    host:"localhost",
    user: "root",
    password:"",
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


function tester(comment=null){
    //Esta función genera una función de callback para mostrar los datos del retorno de manera descriptiva
    return function test(err, data) {
        console.log("Test: "+comment);
        console.log((err) ? "\tError: " + err : "\tNo error");
        console.log("\tData: "+data);
    }
}


console.log("Test de DAO Users");
/*DaoU.getUser("pont@loco.es",tester("Test user mage"));
DaoU.isUserCorrect("pont","kaka",tester("Test: usuario incorrecto"));
DaoU.isUserCorrect("pont@loco.es","kaka",tester("Test, usuario correcto"));
//DaoU.addUser("Pont@ascii.es","a","pont","Hombre","19900215",null,tester("añadir usuario"))
DaoU.findUser("P",tester("Encontrar usuario"))
*/

console.log("DAO Amistad");
DaoA.getAmigos("pont@loco.es",tester("Get amigos"));/*
DaoA.getAmigos("pont@Muyloco.es",tester("get amigos de un usuario inexistente"));
DaoA.setAmistad("pont@loco.es","yago@ascii.com",tester("Añadir amistad"));
*/