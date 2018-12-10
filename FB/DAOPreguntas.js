'use strict';
const mysql = require("mysql");

/*
 *La BBDD para las preguntas tiene esta pinta
    Preguntas(_id, texto)
    Respuestas(_idRespuesta,idPregunta, texto)
    RespuestaUsuario(_idPregunta, _usuario,idRespuesta)
    Adivinar(_adivino,_adivinado,idRespuesta)
*/

class DAOPreguntas {
    constructor(pool) {
        this._pool = pool;
    }
    getPreguntas(cantidad = 5, callback = test) {
        //Devuelve una selección aleatoria de preguntas
        //No se si hacer la selección aquí o recoger todas y hacerlo en el js
        //SELECT * FROM table ORDER BY RAND() LIMIT 10000 //ty stack overflow
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT * FROM preguntas ORDER BY RAND() LIMIT ?`;
                connection.query(sql, [cantidad], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null, resultado);
                    }
                })
            }
            connection.release();
        });
    }
    getRespuestas(pregunta, callback = test) {
        //Devuelve todas las respuestas de una pregunta dada por ID
        //SELECT * FROM respuestas WHERE pidPregunta=pregunta
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT * FROM respuestas WHERE idPregunta=?`;
                connection.query(sql, [pregunta], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        //si resultado==0 es trur=> dcha:izqda
                        callback(null, resultado);
                    }
                })
            }
            connection.release();
        });
    }
    responder(pregunta, respuesta, usuario, callback = test) {
        //Asigna al usuario una respuesta para una pregunta
        //Si responde de nuevo a una pregunta falla porque usuario y pregunta son claves
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = "INSERT INTO respuestaUsuario(idPregunta,idRespuesta,usuario) VALUES (?,?,?);";
                connection.query(sql, [pregunta, respuesta, usuario], function (err, resultado) {
                    if (err) {
                        callback(`No se ha podido insertar el usuario`);
                    } else {
                        callback(null, pregunta);
                    }
                })
            }
            connection.release();
        });
    }
    addRespuesta(pregunta, respuesta, callback = test) {
        //Añade una nueva respuesta a una pregunta 
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = "INSERT INTO respuestas(idPregunta,idRespuesta) VALUES (?,?);";
                connection.query(sql, [pregunta, respuesta], function (err, resultado) {
                    if (err) {
                        callback(`No se ha podido insertar el usuario`);
                    } else {
                        callback(null, pregunta);
                    }
                })
            }
            connection.release();
        });
    }



}

function test(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

module.exports = DAOPreguntas;