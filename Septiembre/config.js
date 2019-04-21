// config.js
"use strict";
module.exports = {
        mysqlConfig: {
                host: "localhost", // Ordenador que ejecuta el SGBD
                user: "root", // Usuario que accede a la BD
                port: 3306,
                password: "", // Contraseña con la que se accede a la BD
                database: "facebluff" // Nombre de la base de datos
        },
        port: 3000, // Puerto en el que escucha el servidor
}