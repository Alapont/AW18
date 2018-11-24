'use strict';
const mysql = require("mysql");

class DAOAmigos {
    constructor(pool) {
        this._pool = pool;
        this._estado={amistad:1,solicitado:2,solicitador:3}
    }
    _estadoCorrecto(estado){
        var estado=false;
        _estado.array.forEach(state => {
            estado=estado||state==estado;
        });
        return estado;
    }
    getAmigos(user,callback=test){
        this._getRelacciones(user,this._estado.amistad,callback);
    }
    getSolicitudes(user,callback=test){
        this._getRelacciones(user,this._estado.solicitado,callback);
    }
    _getRelacciones(user, estado,callback = test) {
        //Devuelve todos los amigos de user
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT user, nombre, foto FROM amistad WHERE propietario= ? AND estado = ? ;`;
                connection.query(sql, [user,estado], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null,resultado);
                    }
                });
                connection.release();
            }
        });
    }
    resolver(solicitando,solicitador,aceptar=false, callback = test) {
        //Resolver solicitud
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT * foto FROM amistad WHERE propietario= ?;`;
                connection.query(sql, [user], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null,resultado);
                    }
                });
                connection.release();
            }
        });
    }
    addSolicitud(){}
    addAmistad(){}
    _getRelacion(solicitando,solicitador,callback=test){//Resolver solicitud
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT estado FROM amistad WHERE amistador = ? AND amistado = ?;`;
                connection.query(sql, [solicitando, solicitador], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        if(resultado.length!=1)
                            callback("Error interno en la base de datos");
                        else
                            callback(null,resultado);
                    }
                });
                connection.release();
            }
        });
    }
    _setRelacion(solicitando,solicitador,estado,callback=test){
        if(!this._estadoCorrecto(estado))
            callback("Parametro incorrecto");
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = "UPDATE `amistad` SET `estado` = ?WHERE `amistad`.`amigador` = ? AND `amistad`.`amigado` = ?";
                connection.query(sql, [estado,solicitando, solicitador], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null,resultado);
                    }
                });
                connection.release();
            }
        });
    }
}



function test(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

module.exports = DAOAmigos;