"use strict"

/*
Se pide implementar una función leerArticulos(callback) que obtenga todos los 
artículos de la base de datos. Esta función debe construir un array de objetos,
cada uno de ellos representando la información de un artículo mediante cuatro 
atributos: id (númerico), titulo (cadena de texto), fecha (objeto Date) y 
palabrasClave (array de cadenas).
*/
const mysql = require("mysql");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "AW"
});
function callback(err,data){
    console.log(`callback:`)
    if (err){
        console.log(`err: ${err}\n`);
    }else{console.log(`no err\n`)}
    console.log(`data: ${data}\n`)
}
function leerArticulos(callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(`Error al obtener la conexión: ${err.message}`,null);
        } else {
            connection.query(
                "SELECT ID, Titulo, Fecha "+
                "From articulos join palabrasclave",
                function (err, filas) {
                    connection.release();
                    if (err) {
                        callback("Error al realizar la consulta",null);
                    } else {
                        //llamada para hacer el array de palabras clave
                    }
                }
            )
        }
    });
}

leerArticulos(callback);