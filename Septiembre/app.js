"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: config.mysqlConfig.hostº,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const multer = require("multer");

const DAOUser = require("./DAOUsers");
const DAOAmistad = require("./DAOAmistad");

const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    port: config.mysqlConfig.port,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});



const DUser = new DAOUser(pool);
const DAmistad = new DAOAmistad(pool);

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
const externalUrl = ["/login", "/register"];
//AQUI VAN LOS MIDDLEWARE
//app.use...

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

app.use((request, response, next) => {
    response.locals = {};
    next();
});

function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} ` +
        `en ${request.url} de ${request.ip}`);

    next();
}
app.use(logger);

app.use(function checkSession(request, response, next) {
    if (!externalUrl.includes(request.url)) {
        //si ya hay un usuario logueado, cojo sus datos
        DUser.getUser(request.session.idUser, (err, data) => {
            response.locals.usuario = null;
            if (!err) {
                let usuario = {
                    idUser: data.ID,
                    userName: data.UserName,
                    email: data.email,
                    points: data.points,
                    activo: data.activo == 1,
                    gender: data.gender,
                    birth: data.birth,
                    img: data.img == null ? config.defaultImg : data.img,
                    age: Math.floor((Date.now() - data.birth) / (1000 * 60 * 60 * 24 * 365.242190402)) //año trópico
                }
                response.locals.usuario = usuario;
            } else {
                response.redirect("/login");
            }
            // console.log(`checked session with data ${response.locals.usuario}`);
            next();
        });
        // next();
    } else {
        if (request.session.idUser != null)
            response.redirect("/perfil");
        console.log(`external url: ${request.url}`);
        next();
    }
});

const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));


const multerFactory = multer({
    storage: multer.memoryStorage()
});

//AQUI VAN LOS HANDLER


app.get("/imagen/:email", (request, response) => {
    if (request.session) {
        DUser.getImagen(response.locals.usuario.idUser, (err, data) => {
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
    response.locals.config = {
        pageName: "login"
    };
    response.render("main", response.locals);


});

app.post("/login", [
        check('user').isEmail(),
        check('password').isLength({
            min: 1
        })
    ],
    (request, response) => {
        console.log("post loging")
        request.getValidationResult().then(function (result) {
            if (request.body != undefined) {
                DUser.isUserCorrect(request.body.user, request.body.password, (err, data) => {
                    if (err || data == null) {
                        response.cookie("error", err);
                        response.status(500);
                    } else {
                        request.session.idUser = data[0].ID;
                        //fucsia hacer el getUser con id en vez con email
                        response.redirect("./perfil");
                    }
                });
            } else {
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
            let nombreFichero = null;
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
    response.status(200);
    //response.type("text/html");
    response.locals.config = {
        pageName: "perfil"
    };
    if (response.locals.usuario == undefined) console.log("usuario no definido");
    response.locals.perfil=response.locals.usuario;
    response.locals.perfil.edit=true;
    response.render("main", response.locals);
});
app.get("/perfil/:id", (request, response) => {
    if (response.locals.usuario == undefined) console.log("usuario no definido");
    DUser.getUser(request.params.id,(err,data)=>{
        if(err){
            response.status(300);
            response.redirect("/perfil");
        }
        else{
            response.status(200);
            //response.type("text/html");
            response.locals.config = {
                pageName: "perfil"
            };
            response.locals.perfil = {
                idUser: data.ID,
                userName: data.UserName,
                email: data.email,
                points: data.points,
                activo: data.activo == 1,
                gender: data.gender,
                birth: data.birth,
                img: data.img == null ? config.defaultImg : data.img,
                age: Math.floor((Date.now() - data.birth) / (1000 * 60 * 60 * 24 * 365.242190402)), //año trópico,
                edit:false
            }
            response.render("main", response.locals);
        }
    });
});
//Busqueda azul
app.post("/busca",(request,response)=>{
    DUser.findUser(request.body.busqueda,response.locals.usuario.idUser,
        (err,data)=>{
            if(err)
                response.redirect("/amigos");
            else{
                response.locals.query=request.body.busqueda;
                response.locals.busqueda=data;
                response.status(200);
                response.locals.config = {
                    pageName: "busqueda"
                };
                response.render("main",response.locals);
            }
        });
})
app.get('/busca',(request,response)=>{
    response.status(200);
    response.locals.config = {
        pageName: "busqueda"
    };
    response.render("main",response.locals);
});
//Editar perfil Azul
app.get('/editPerfil', (request, response) => {
    response.status(200);
    response.locals.config = {
        pageName: "editPerfil"
    };
    response.render("main", response.locals);
});

app.post('/editPerfil',
    [check('email').isEmail()],
    (request, response) => {
        request.getValidationResult().then(function (result) {
            if (result.isEmpty()) {
                let nombreFichero = null;
                multerFactory.single("imagenPerfil"),
                    function (request, response) {
                        if (request.file) {
                            nombreFichero = request.file.filename;
                        }
                    }
                DUser.updateUser(
                    request.body.password,
                    request.body.img,
                    request.body.userName,
                    request.body.gender,
                    request.body.fechaNac,
                    request.body.email,
                    request.session.idUser,
                    (err, data) => {
                        if (err) {
                            response.status(300);
                            response.redirect("/editPerfil");
                        } else {
                            response.status(300);
                            response.redirect("/perfil");
                        }
                    });
            } else {
                //response.setFlash(result.array());
                response.status(300);
                response.redirect("/editPerfil");
            }
        });
    });

//Amigos azul
app.get('/amigos', (request, response) => {
    DAmistad.getAmistades(request.session.idUser,
        (err, amigos) => {
            if (err) {
                response.status(300);
                response.redirect()
            } else {
                DAmistad.getSolicitudes(request.session.idUser,
                    (err,solicitudes)=>{
                        if (err) {
                            response.status(300);
                            response.redirect()
                        } else {
                            response.status(200);
                            response.locals.config = {
                                pageName: "amigos"
                            };
                            response.locals.amigos = amigos;
                            response.locals.solicitudes=solicitudes;
                            response.render("main", response.locals);
                        }
                    });
            }
        }
    );
});
app.get('/amigos/solicitar/:id',(request,response)=>{
    request.params.id;
    DAmistad.solicitarAmistad(response.locals.usuario.idUser,request.params.id,
        (err,data)=>{
            response.redirect("/amigos");
        });
});
//Desconectar azul
app.get('/desconectar', (request, response) => {
    request.session.idUser = null;
    response.status(300);
    response.redirect("/login");
});


//Error y default azul
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
