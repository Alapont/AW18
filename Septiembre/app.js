"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const multer = require("multer");

const DAOUser = require("./DAOUsers");

const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    port: config.mysqlConfig.port,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});



const DUser = new DAOUser(pool);

// Crear un servidor Express.js
const app = express();
const {
    check,
    validationResult
} = require('express-validator/check');

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
const externalUrl=["/login","/register"];
//AQUI VAN LOS MIDDLEWARE
//app.use...

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false
});

app.use(middlewareSession);

app.use((request,response,next)=>{
    response.locals={};
    next();
});

function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} ` +
        `en ${request.url} de ${request.ip}`);

    next();
}
app.use(logger);

app.use( function  checkSession(request, response, next){
    console.log("checking session");
    if (!externalUrl.includes(request.url)) {
        console.log("getting data");
        //si ya hay un usuario logueado, cojo sus datos
        DUser.getUser(request.session.idUser,(err, data)=>{
            response.locals.usuario=null;
            if(!err){
                let usuario={
                    idUser:data.ID,
                    userName:data.UserName,
                    email:data.email,
                    points:data.points,
                    activo:data.activo==1,
                    gender:data.gender,
                    birth:data.birth,
                    age:Math.floor((Date.now()-data.birth)/(1000*60*60*24*365.25))
                }
                response.locals.usuario=usuario;
            }else{
                response.redirect("/login");
            }
            console.log(`checked session with data ${response.locals.usuario}`);
            next();
        });
        // next();
    }
    else{
        console.log(`external url: ${request.url}`);
        next();}
});

const multerFactory = multer({
    storage: multer.memoryStorage()
});

//AQUI VAN LOS HANDLER


app.get("/imagen/:email", (request, response) => {
    if (request.session) {
        DUser.getImagen(response.locals.usuario.email, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/perfil");
            } else {
                response.status(200);
                if (data == null) {
                    response.sendFile(path.join(__dirname, "public", "img", "usuario.jpg"));
                } else {
                    response.end(data);
                }
            }
        });
    }
});

//LOGIN AZUL
app.get(/login(.html)?$/, (request, response) => {

    response.status(200);
    response.type("text/html")
    response.locals.config={
        pageName: "login"
    };
    response.render("main",response.locals);


});

app.post("/login",[
    check('user').isEmail(),
    check('password').isLength({
        min: 1
    })
], 
(request, response) => {
    console.log("post loging")
    request.getValidationResult().then(function (result) {
        if(request.body!=undefined){
            DUser.isUserCorrect(request.body.user, request.body.password, (err, data) => {
                if (err || data == null) {
                    response.cookie("error", err);
                    response.status(500);
                } else {
                    request.session.idUser=data[0].ID;
                    //fucsia hacer el getUser con id en vez con email
                    response.redirect("./perfil");
                }
            });
        }else{
            //Lo que hacemos si no ha puesto un correo o una contraseña
        }

    });

});

//REGISTRO AZUL
app.get(/register(.html)?$/, (request, response) => {
    response.status(200);
    response.type("text/html")
    response.render("main", {
        config: {
            pageName: "register"
        }
    });

});

app.post(/register(.html)?/, (request, response) => {

    request.checkBody("user", "El email no puede estar vacío").notEmpty();
    request.checkBody("password", "La contraseña no puede estar vacía").notEmpty();
    request.checkBody("userName", "El nombre de usuario no puede estar vacío").notEmpty();

    request.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            let nombreFichero =null;
            multerFactory.single("imagenPerfil"),
                function (request, response) {
                    if (request.file) {
                        nombreFichero = request.file.filename;
                    }
                }
            DUser.addUser(request.body.user, request.body.password,
                nombreFichero, request.body.userName,
                request.body.gender, request.body.fechaNac, (err, data) => {
                    if (err) {
                        response.status(300);
                        response.redirect("/register");
                    } else {
                        response.redirect("/login");
                    }
                });
        } else {
            //response.setFlash(result.array());
            response.redirect("/register");
        }
    });
});

//PERFIL AZUL
app.get("/perfil", (request, response) => {
    console.log("get perfil");
    response.status(200);
    //response.type("text/html");
    response.locals.config={
        pageName: "perfil"
    };
    if(response.locals.usuario==undefined) console.log("usuario no definido");
    response.render("main", response.locals);
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
