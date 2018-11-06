"use strict";
const fs = require("fs");

function freplace(fichero, buscar, sustituir, callback) {
    fs.readFile(fichero, {
            encoding: "utf-8"
        },
        function (err, texto) {
            if (err) {
                callback(new("Error al leer el fichero."));
            } else {
                let texto2 = texto.replace(buscar, sustituir);
                fs.writeFile(fichero, texto2, {
                        encoding: "utf-8"
                    },
                    function (err) {
                        if (err) {
                            callback(new("Error en la escritura del fichero"));
                        } else {
                            callback(null);
                        }
                    }
                );
            }
        }
    );
}






module.exports(
    freplace : freplace;
)