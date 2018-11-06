let ejnode = require('Hoja\ A\ (node)\\ejnode.js');
let fichero = "fichero2.txt";
let buscar = /\b[0-9]+\b/g;
let sustituir = "{numero}";
ejnode.freplace(fichero, buscar, sustituir, cb_freplace);

function cb_freplace(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Sustitución realizada con éxito");
    }
}