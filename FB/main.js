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


/*
console.log("Test de DAO Users");
DaoU.isUserCorrect("pont","kaka");
DaoU.isUserCorrect("pont@loco.es","kaka");
DaoU.getUserImageName("pont@loco.es");
*/

console.log("DAO Amistad");
//DaoA.getAmigos("pont@loco.es");
//DaoA.getAmigos("pont@Muyloco.es");
DaoA.setAmistad("pont@loco.es","yago@ascii.com");
