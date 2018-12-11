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
const cookieParser = require("cookie-parser");
const mySQLStore = mysqlSession(session);
const daoUser = require("./DAOUsers");
const daoAmistad = require("./DAOAmistad");
const daoPreguntas = require("./DAOPreguntas");
const sessionStore = new mySQLStore({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    port: config.mysqlConfig.port,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});
const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});
const DaoU = new daoUser(pool);
const DaoA = new daoAmistad(pool);
const DaoP = new daoPreguntas(pool);
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
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});


function flashMiddleware(request, response, next) {
    //añades el atributo setFlash al objeto response
    response.setFlash = function (msg) {
        //función que añade el objeto flashMsg con valor msg a session
        request.session.flashMsg = msg;
    };
    //el objeto locals es un objeto que, nada más crear la aplicación, se le añade a app.
    //puedes acceder desde cualquier plantilla a este objeto
    response.locals.getAndClearFlash = function () {
        //coge el mensaje guardado en la sesión, lo borra de la sesión (son mensajes que solo valen 1 vez), y devuleve el mensaje
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };
    next();
};
app.use(middlewareSession);
app.use(cookieParser());
app.use(expressValidator());
app.use(flashMiddleware);
//////LOGIN//////

//  Si no está logueado
//      Login
app.get(/login(.html)?/, (request, response) => {
    if (request.session.userName) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        let err = [];
        response.status(200);
        response.type("text/html")
        response.render("main", {
            errores: err,
            persona: {
                user: (request.session != undefined) ? request.session.userName : null
            },
            config: {
                pageName: "login"
            }

        });

    }
});
//          login action
app.post("/login", (request, response) => {
    if (request.session.userName) { //Salimos si está logueado
        response.status(300);
        response.redirect("/login");
    } else {
        response.status(200);
        response.type("text/html");
        request.checkBody("user", "Nombre de usuario vacío").notEmpty();
        request.checkBody("password", "La contraseña no es válida").notEmpty();
        request.getValidationResult().then(function (result) {
            if (result.isEmpty()) {
                DaoU.isUserCorrect(request.body.user, request.body.password, (err, data) => {
                    if (err) {
                        request.session.error = (err);
                        response.cookie("error", err);
                        response.status(500);
                        response.redirect("/login");
                    } else {
                        if (data != null)
                            DaoU.getUser(request.body.user, (err, data) => {
                                if (err) {
                                    request.session.error = (err);
                                    response.status(500);
                                    response.redirect("/login");
                                } else {
                                    response.status(300);
                                    request.session.userName = data.userName;
                                    request.session.email = data.email;
                                    request.session.img = data.img;
                                    request.session.nacimiento = data.nacimiento;
                                    request.session.sexo = data.sexo;
                                    request.session.puntos = data.puntos;
                                    response.redirect("/login");
                                }
                            });
                        else {
                            request.session.error = ("Error de búsqueda de usuario");
                            response.redirect("/login");
                        }
                    }
                });
            } else {
                response.setFlash(result.array());
                response.redirect("/login");
            }
        });
    }
});

////// Amigos //////
app.get("/amigos", (request, response) => {
    if (request.session.userName) { //Salimos si no está logueado
        response.status(200);
        response.type("text/html");
        DaoA.getAmigos(request.session.email, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/perfil");
            } else {
                //nos quedamos con los amigos
                request.session.amigos = data.filter(amigo => amigo.estado == "amigo");
                request.session.solicitudes = data.filter(amigo => amigo.estado == "solicitud");
                response.render("main", {
                    persona: {
                        userName: request.session.userName,
                        edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                        sexo: request.session.sexo,
                        puntos: request.session.puntos,
                        email: request.session.email
                    },
                    solicitudes: request.session.solicitudes,
                    amigos: request.session.amigos,
                    config: {
                        pageName: "amigos"
                    }
                });
            }
        });
    } else {
        response.redirect("/login");
    }
});

app.post("/busca", (request, response) => {

});

///Perfil amigo
app.get("/perfil/:email", (request, response) => {
    if (request.session.userName) {
        response.status(200);
        response.type("text/html");
        DaoU.getUser(request.params.email, (error, data) => {
            response.render("main", {
                persona: {
                    userName: data.userName,
                    edad: calcularEdad(data.edad), //Aquí deberíamos calcularla :$
                    sexo: data.sexo,
                    puntos: data.puntos,
                    email: data.email,
                    edit: false
                },
                config: {
                    pageName: "perfil/"
                }
            });
        });
    } else {
        response.redirect("/perfil");
    }
});

//////Preguntas/////
app.get("/preguntas", (request, response) => {
    if (request.session.userName) { //Salimos si no está logueado
        DaoP.getPreguntas(5, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/perfil");
            } else {
                response.status(200);
                response.type("text/html");
                response.render("main", {
                    sesion: request.session,
                    config: {
                        pageName: "preguntas"
                    },
                    persona: {
                        userName: request.session.userName,
                        edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                        sexo: request.session.sexo,
                        puntos: request.session.puntos,
                        email: request.session.email,
                        edit: true
                    },
                    preguntas: data
                })
            }

        })
    } else {
        response.redirect("/login");
    }
});

//////REGISTRO/////
//      Registro
app.get(/register(.html)?/, (request, response) => {
    if (request.session.userName) { //Salimos si está logueado
        response.status(300);
        response.redirect("/perfil");
    } else {
        response.status(200);
        let err = [];
        response.type("text/html")
        response.render("main", {
            sesion: request.session.sesion,
            errores: err,
            config: {
                pageName: "register"
            }
        });

    }
});

app.post(/register(.html)?/, (request, response) => {

    request.checkBody("user", "El email no puede estar vacío").notEmpty();
    request.checkBody("password", "La contraseña no puede estar vacía").notEmpty();
    request.checkBody("userName", "El nombre de usuario no puede estar vacío").notEmpty();
    request.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            DaoU.addUser(request.body.user, request.body.password,
                request.body.imagenPerfil, request.body.userName,
                request.body.gender, request.body.fechaNac, (err, data) => {
                    if (err) {
                        response.status(300);
                        response.redirect("/register");
                    } else {
                        response.redirect("/login");
                    }
                });
        } else {
            response.setFlash(result.array());
            response.redirect("/register");
        }
    });
});

function calcularEdad(nacimiento) {
    //To do
    return 30
}
/////PERFIL
app.get("/perfil", (request, response) => {
    if (request.session.userName) {
        response.status(200);
        response.type("text/html");
        response.render("main", {
            persona: {
                userName: request.session.userName,
                edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                sexo: request.session.sexo,
                puntos: request.session.puntos,
                email: request.session.email,
                edit: true
            },
            config: {
                pageName: "perfil"
            }
        });
    } else {
        response.redirect("/login");
    }
});

app.get("/imagen/:email", (request, response) => {
    if (request.session) {
        DaoU.getImagen(request.params.email, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/perfil");
            } else {
                response.status(200);
                response.end(data[0]);
            }
        });

    }
});

////MODIFICAR PERFIL
app.get("/edit", (request, response) => {
    if (request.session.userName) {
        response.status(200);
        let err = [];
        response.type("text/html")
        response.render("main", {
            sesion: request.session.sesion,

            errores: err,
            config: {
                pageName: "edit"
            }
        });

    } else {
        response.status(300);
        response.redirect("/login");
    }
});

app.post("/save", (request, response) => {
    request.checkBody("password", "La contraseña no puede estar vacía").notEmpty();
    request.checkBody("userName", "El nombre de usuario no puede estar vacío").notEmpty();
    request.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            DaoU.updateUser(request.body.password,
                request.body.imagenPerfil, request.body.userName,
                request.body.gender, request.body.fechaNac, request.session.email, (err, data) => {
                    if (err) {
                        response.status(300);
                        response.redirect("/edit");
                    } else {
                        response.status(300);
                        //asegurar de no pasar nulos
                        request.session.userName = request.body.userName;
                        request.session.img = request.body.img;
                        request.session.nacimiento = request.body.nacimiento;
                        request.session.sexo = request.body.sexo;
                        request.session.puntos = request.body.puntos;
                        response.redirect("/perfil");
                    }
                });
        } else {
            response.setFlash(result.array());
            response.redirect("/edit");
        }
    });
});

/////////LOGOUT////////
app.get("/desconectar", (request, response) => {
    response.clearCookie("connect.sid", {
        path: '/'
    });
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