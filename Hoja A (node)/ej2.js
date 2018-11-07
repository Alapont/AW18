"use strict";
const mysql = require("mysql");

class DAO {

    constructor(auxHost, usuario, pass, base) {
        this._pool = mysql.createPool({
            host: auxHost,
            user: usuario,
            password: pass,
            database: base
        });

    }



    insertarUsuario(usuario, callback) {

        this._pool.getConnection(function (err, connection) {
            if (err) {
                console.log(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                const sql = "INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `telefono`) VALUES (NULL,?,?,?)";
                connection.query(sql, [usuario.nombre, usuario.correo, usuario.telefono], function (err, resultado) {
                    if (err) {
                        console.log(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        usuario.id = resultado.insertId;
                        console.log("EVERYTHING IS AWESOME");
                    }
                })
            }
            connection.release();
        });
    }

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                console.log(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                const sql = "INSERT INTO `mensajes` (`id`, `idOrigen`, `idDestino`, `mensaje`, `hora`, `leido`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, '0');";
                connection.query(sql, [usuarioOrigen.id, usuarioDestino.id, mensaje], function (err, resultado) {
                    if (err) {
                        console.log(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        console.log(`EVERYTHING IS AWESOMEx2:${resultado.insertId}`);
                    }
                })
            }
            connection.release();
        });
    }
}
module.exports = DAO;

console.log("creacion de dao");
let d = new DAO("localhost", "root", "", "ej2");

console.log("insertamos usuario");
let pablo = {
    nombre: "pont",
    correo: "pont@loco.com",
    telefono: "6785"
};
d.insertarUsuario(pablo);

console.log("insertamos un mensaje");
d.enviarMensaje({id:1}, {id:2}, "cosos");