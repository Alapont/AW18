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
const multerFactory = multer({
    storage: multer.memoryStorage()
});
//app.use(multerFactory.none());

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
        let err = typeof (request.session.err) != 'undefined' ? request.session.err : null;
        response.status(200);
        response.type("text/html")
        response.render("main", {
            errores: request.session.error,
            error: null,
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
                        //request.session.error = (err);
                        response.cookie("error", err);
                        response.status(500);
                        response.render("main", {
                            error: err,
                            errores: request.session.error,
                            config: {
                                pageName: "login"
                            }
                        });
                    } else {
                        if (data != null) {
                            DaoU.getUser(request.body.user, (err, data) => {
                                if (err) {
                                    request.session.error = (err);
                                    response.status(500);
                                    response.redirect("/login");
                                } else {
                                    response.status(300);
                                    request.session.userName = data.userName;
                                    request.session.email = data.email;
                                    if (data.img != null) {
                                        request.session.img = true;
                                    } else {
                                        request.session.img = false;
                                    }

                                    request.session.nacimiento = (data.nacimiento == "" ? 0 : calcularEdad(request.session.nacimiento));
                                    request.session.sexo = data.sexo;
                                    request.session.puntos = data.puntos;
                                    response.redirect("/login");
                                }
                            });
                        } else {
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
                request.session.solicitudes = data.filter(amigo => (amigo.estado == "solicitud" || amigo.estado == "solicitar"));
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
app.post("/busca", (request, response) => { //To-Do
    DaoU.findUser(request.body.busqueda, request.session.email, (err, data) => {
        if (err)
            response.redirect("/amigos");
        else {
            if (data.length == 0) {
                response.render("main", {
                    persona: {
                        userName: request.session.userName,
                        edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                        sexo: request.session.sexo,
                        puntos: request.session.puntos,
                        email: request.session.email
                    },
                    solicitudes: null,
                    amigoSolicitado: request.body.busqueda,
                    config: {
                        pageName: "busqueda"
                    }
                });
            } else {
                response.render("main", {
                    persona: {
                        userName: request.session.userName,
                        edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                        sexo: request.session.sexo,
                        puntos: request.session.puntos,
                        email: request.session.email
                    },
                    solicitudes: data.filter(a => a.estado != "amigo"),
                    amigoSolicitado: request.body.busqueda,
                    config: {
                        pageName: "busqueda"
                    }
                });
            }
        }
    });
});

app.get("/aceptar/:id", (request, response) => {

    DaoA.editAmistad(request.session.email, request.params.id, "amigo", (err, data) => {
        if (err) {
            response.status(500);
        } else {
            response.status(200);
            response.redirect("/amigos");
        }

    });
});
app.get("/solicitar/:id", (request, response) => {

    DaoA.setAmistad(request.session.email, request.params.id, "solicitar", (err, data) => {
        response.redirect("/amigos");
    })
});
app.get("/rechazar/:id", (request, response) => {

    DaoA.editAmistad(request.session.email, request.params.id, "rechazado", (err, data) => {
        response.redirect("/amigos");
    })
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
                    img: data.img == null ? true : false,
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
app.get("/preguntas", (request, response) => { //pull de preguntas
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
app.post("/respuesta", (request, response) => { //Un usuario responde a una pregunta
    if (request.body.respuesta == 0) {
        DaoP.addRespuesta(request.body.pregunta, request.body.nuevaRespuesta, (err, idRespuesta) => {
            if (err)
                response.redirect("/perfil");
            else
                DaoP.responder(request.body.pregunta, idRespuesta, request.session.email, (err, data) => {
                    if (err) {
                        response.redirect("/perfil");
                    } else {
                        response.redirect("/pregunta/" + request.body.pregunta);
                    }
                });
        })
    } else {
        DaoP.responder(request.body.pregunta, request.body.respuesta, request.session.email, (err, data) => {
            if (err) {
                response.redirect("/perfil");
            } else {
                response.redirect("/pregunta/" + request.body.pregunta);
            }
        })
    }
});
app.post("/preguntaEdit", (request, response) => { //Un usuario genera las opciones para su propia pregunta
    DaoP.addRespuesta(request.body.id, request.body.op1);
    DaoP.addRespuesta(request.body.id, request.body.op2);
    DaoP.addRespuesta(request.body.id, request.body.op3);
    DaoP.addRespuesta(request.body.id, request.body.op4, (err, data) => {
        response.redirect("/pregunta/" + request.body.id);
    });

});
app.post("/preguntar", (request, response) => { //Un usuario añade una nueva pregunta
    DaoP.addPregunta(request.body.text, (err, data) => {
        if (err)
            response.redirect("/perfil");
        else {
            response.status(200);
            response.type("text/html");
            response.render("main", {
                sesion: request.session,
                config: {
                    pageName: "preguntaEdit"
                },
                persona: {
                    userName: request.session.userName,
                    edad: calcularEdad(request.session.edad), //Aquí deberíamos calcularla :$
                    sexo: request.session.sexo,
                    puntos: request.session.puntos,
                    email: request.session.email,
                    edit: true
                },
                pregunta: {
                    texto: request.body.text,
                    id: data
                }

            })
        }
    });
});
app.get("/pregunta/:id", (request, response) => { //Un usuario ve los datos sobre una pregunta
    if (request.session.userName) { //Salimos si no está logueado
        DaoP.getRespuestas(request.params.id, request.session.email, (err, data) => {
            if (err) {
                response.status(300);
                console.log(err);
                response.redirect("/perfil");
            } else {
                response.status(200);
                response.type("text/html");
                response.render("main", {
                    sesion: request.session,
                    pregunta: {
                        texto: data.texto,
                        id: data.idPregunta
                    },
                    respuestas: data.respuestas,
                    respuestaUsuario: data.contestado,
                    config: {
                        pageName: "pregunta"
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
app.get("/respuesta/:id", (request, response) => { //Un usuario va a responder a una pregunta
    if (request.session.userName) { //Salimos si no está logueado
        DaoP.getRespuestas(request.params.id, request.session.email, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/perfil");
            } else {
                response.status(200);
                response.type("text/html");
                response.render("main", {
                    sesion: request.session,
                    pregunta: {
                        texto: data.texto,
                        id: data.idPregunta
                    },
                    respuestas: data.respuestas,
                    config: {
                        pageName: "respuesta"
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
            multerFactory.single("imagenPerfil"),
                function (request, response) {
                    let nombreFichero = null;
                    if (request.file) {
                        nombreFichero = request.file.filename;
                    }
                }
            DaoU.addUser(request.body.user, request.body.password,
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
            response.setFlash(result.array());
            response.redirect("/register");
        }
    });
});

function calcularEdad(nacimiento) {
    if (typeof (nacimiento) != "undefined") {
        nacimiento = nacimiento.toString()
        var today = new Date();
        return ((today.getFullYear() - Number(nacimiento.substring(0, 4))) +
            ((today.getMonth() >= Number(nacimiento.substring(4, 6)) &&
                today.getDay() >= Number(nacimiento.substring(6, 8))) ? 1 : 0));
    }
    return 0;
}
/////PERFIL
app.get("/perfil", (request, response) => {
    if (request.session.userName) {
        response.status(200);
        response.type("text/html");
        response.render("main", {
            persona: {
                userName: request.session.userName,
                edad: request.session.nacimiento == "" ? 0 : calcularEdad(request.session.nacimiento), //Aquí deberíamos calcularla :$
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
                    if (data == null) {
                        response.sendFile(path.join(__dirname, "public", "img", "usuario.jpg"));
                    } else {
                        response.end(data);
                    }
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
            persona: {
                userName: request.session.userName,
                edad: request.session.nacimiento == "" ? 0 : calcularEdad(request.session.nacimiento), //Aquí deberíamos calcularla :$
                sexo: request.session.sexo,
                puntos: request.session.puntos,
                email: request.session.email,
                edit: true
            },
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

app.post("/save", multerFactory.single("imagenPerfil"), (request, response) => {
    let nombreFichero;
    let boolean = false;
    if (request.file) {
        nombreFichero = request.file.buffer;
        boolean = true;
    }

    DaoU.updateUser(request.body.password, nombreFichero, request.body.userName,
        request.body.gender, request.body.fechaNac, request.session.email, (err, data) => {
            if (err) {
                response.status(300);
                response.redirect("/edit");
            } else {
                response.status(300);
                DaoU.getImagen(request.session.email, (err, data) => {
                    if (err) {
                        request.sendFile(path.join(__dirname, "public", "img", "usuario.jpg"));
                    } else {
                        if (boolean) {
                            request.session.img = true;
                        } else {
                            request.session.img = data.img;
                        }
                    }

                });
                if (request.body.userName) {
                    request.session.userName = request.body.userName;
                }

                if (request.body.nacimiento) {
                    request.session.nacimiento = "" ? 0 : calcularEdad(request.session.nacimiento);
                }
                if (request.body.sexo) {
                    request.session.sexo = request.body.sexo;
                }
                
                response.render("main", {
                    persona: {
                        userName: request.session.userName,
                        edad: request.session.nacimiento == "" ? 0 : calcularEdad(request.session.nacimiento), //Aquí deberíamos calcularla :$
                        sexo: request.session.sexo,
                        puntos: request.session.puntos,
                        email: request.session.email,
                        img:request.session.img,
                        edit: true
                    },
                    errores: null,
                    config: {
                        pageName: "perfil"
                    }
                });
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