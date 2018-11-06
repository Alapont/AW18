"use strict";

// globals.js
// ----------
console.log(__dirname);
// → /home/manuel/AW/core-modules/
console.log(__filename);
// → /home/manuel/AW/core-modules/globals.j

console.log("ejemplo3")
const path = require("path");
const infoFichero = path.parse(__filename);
console.log(infoFichero);
// → { root: 'H:\\'
// dir: 'H:\\UCM\\FDI\\AW\\2018-2019\\node.js\\ejercicios\\pruebas'
// base: 'ej1.js'
// ext: '.js'
// name: 'ej1' }
const nuevoFichero = path.join(infoFichero.dir, "nuevo",
    infoFichero.base);
console.log(nuevoFichero);
// → H:\UCM\FDI\AW\2018-2019\node.js\ejercicios\prueb

console.log("ejemplo4")


let fs = require('fs');
for (let i = 1; i < 10; i++) {
    let fichero = "f" + i + ".txt";
    console.log("Solicitada la escritura del fichero " + fichero);
    fs.writeFile(fichero, fichero, function (err) { //a ver, que no hay ficheros
        if (!err) {
            console.log("Terminada la escritura del fichero")
        }
    })
}

console.log("\n\n\nejemplo5\n")

const texto = "Actualmente el registro de nmp tiene 800.000 paquetes."
fs.writeFile("npm.txt", texto, {
        encoding: "utf-8"
    },
    function (err) {
        if (err) {
            console.log("Error al escribir el fichero.");
        } else {
            console.log("Fichero escrito correctamente.");
            fs.readFile("npm.txt", {
                    encoding: "utf-8"
                },
                function (err, contenido) {
                    if (!err) {
                        console.log(contenido);
                    }
                });
        }
    });

console.log("\n\n\n\nAcceso a bases de datos\n\n\nejemplo 6")