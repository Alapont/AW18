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
                callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                const sql = "INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `telefono`) VALUES (NULL,?,?,?)";
                connection.query(sql, [usuario.nombre, usuario.correo, usuario.telefono], function (err, resultado) {
                    if (err) {
                        callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        usuario.id = resultado.insertId;
                        callback(null,resultado.insertId);
                        //console.log(`Usuario insertado con id: ${resultado.insertid}`);
                    }
                })
            }
            connection.release();
        });
    }

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                //Deberíamos ver si el usuario existe
                const sql = "INSERT INTO `mensajes` (`id`, `idOrigen`, `idDestino`, `mensaje`, `hora`, `leido`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, '0');";
                connection.query(sql, [usuarioOrigen.id, usuarioDestino.id, mensaje], function (err, resultado) {
                    if (err) {
                        callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        callback(null,resultado.insertId)
                        //console.log(`Mensaje enviado :${resultado.insertId}`);
                    }
                })
            }
            connection.release();
        });
    }

    bandejaEntrada(usuario,callback) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                const sql = "Select DISTINCT mensaje "+
                "FROM mensajes "+
                "WHERE idDestino = ? AND leido = 0";
                connection.query(sql, [usuario.id], function (err, resultado) {
                    if (err) {
                        callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        resultado.forEach(mensaje => {
                            calback(null,`${mensaje.mensaje}`)
                        });
                    }
                })
            }
            connection.release();
        });
    }
    buscarUsuario(str, callback){
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
            } else {
                const sql = "Select * FROM usuarios WHERE nombre LIKE ?";
                connection.query(sql, ["%"+str+"%"], function (err, resultado) {//Se ponen las wildcards ahí antes de que lo escape
                    if (err) {
                        callback(`ERROR AL OBTENER LA CONEXION: ${err.message}`);
                    } else {
                        //console.log(`La búsqueda '${str}' resultó en ${resultado.length}:`)
                        //resultado.forEach(element => {
                        //    console.log(`${element.nombre}`)
                        //});
                        callback(null,resultado.map(function(x){
                            return x.nombre;
                        }))
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

//console.log("insertamos usuario");
let pablo = {
    nombre: "pont",
    correo: "pont@loco.com",
    telefono: "6785"
};
let neku = {
    nombre: "Neku",
    correo:"neku@ascii.fdi",
    telefono:"123456789"
}
//d.insertarUsuario(pablo);
//d.insertarUsuario(neku);
pablo.id=1;
neku.id=2;
//console.log("insertamos un mensaje:");
//d.enviarMensaje(pablo,neku, "Pena");
//console.log(`Bandeja de entrada:`)
//d.bandejaEntrada(neku);
console.log(`Búsqueda`);
d.buscarUsuario('n')