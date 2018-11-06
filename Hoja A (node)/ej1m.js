"use strict";

const fs = require("fs");
let fichero = "C:\\Users\\Pablo\\git\\AW18\\Hoja\ A\ (node)\\FichTexto.txt";
fs.readFile(fichero, {
        encoding: "utf-8"
    },
    function (err, contenido) {
        if (err) {
            console.log("Error al leer el fichero.");
        } else {
            console.log("Fichero leído correctamente.");
            let nuevoContenido = contenido.replace(/[ ]+/g, " ");
            fs.writeFile(fichero, nuevoContenido, {
                    encoding: "utf-8"
                },
                function (err) {
                    if (err) {
                        console.log("Error en la escritura del fichero");
                    } else {
                        console.log("Fichero escrito correctamente");
                    }
                });
        }
    }
);