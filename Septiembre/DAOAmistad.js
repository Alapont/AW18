'use strict';

const config = require("./config");
class DAOAmistad {
    constructor(pool, debug = false) {
        this._pool = pool;
        if (debug)
            console.log(pool);
        this._estados = ["pendiente","aceptado","rechazado"];
    }
    peticion(origen,destino,callback=test){
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `INSERT INTO amistad (idOrigen, idDestino,estado) VALUES (?,?,?);`
                connection.query(sql, [origen,destino,"pendiente"], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        
                         callback(null, resultado);
                         
                    }
                });
            }
            connection.release();
        });
    }

    setAmistad(amigado, amigador,estado, callback = test) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `INSERT INTO amistad (estado, amigado,amigador) VALUES (?,?,?);`
                connection.query(sql, [estado, amigado,amigador], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        
                         callback(null, resultado);
                         
                    }
                });
            }
            connection.release();
        });
    }

    editAmistad(amigado, amigador,estado, callback = test) {
        
            this._pool.getConnection(function (err, connection) {
                if (err) {
                    callback(`Error de conexion a la base de datos`);
                } else {
                    const sql = `UPDATE amistad SET estado=? WHERE (amigado=? AND amigador=?) OR (amigado=? AND amigador=?)`;
                    connection.query(sql, [estado, amigado,amigador, amigador, amigado], function (err, resultado) {
                        if (err) {
                            callback(`Error de acceso a la base de datos`);
                        } else {
                            
                             callback(null, resultado);
                             
                        }
                    });
                }
                connection.release();
            });
    }
    
    getAmistades(user,callback=test){
        this._pool.getConnection((err, connection)=>{
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = 
                `SELECT U1.ID, U1.UserName,U1.points,U1.img
                FROM amistad A1 JOIN users U1 ON A1.IdOrigen=U1.ID 
                WHERE A1.IdDestino=? AND A1.estado = 'aceptado' AND U1.activo=1
                UNION 
                SELECT U2.ID, U2.UserName,U2.points,U2.img
                FROM amistad A2 JOIN users U2 ON A2.IdDestino=U2.ID 
                WHERE A2.IdOrigen = ? AND A2.estado = 'aceptado' AND U2.activo=1`;
                connection.query(sql, [user, user], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null, 
                            resultado.map((amigo)=>{
                                amigo.img=(amigo.img == null)? config.defaultImg : amigo.img;
                                return amigo;
                            })
                        );
                    }
                    connection.release();
                });
            }
        });
    }
    getSolicitudes(user, callback=test){
        this._pool.getConnection((err, connection)=>{
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = 
                `SELECT U1.ID, U1.UserName,U1.points,U1.img
                FROM amistad A1 JOIN users U1 ON A1.IdOrigen=U1.ID 
                WHERE A1.IdDestino=? AND A1.estado = 'aceptado' AND U1.activo=1`
                connection.query(sql, [user, user], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        callback(null, resultado);
                    }
                    connection.release();
                });  
            }
        });
    }
}
function test(err, data) {
    console.log((err) ? "error: " + err : "No error");
    console.log(data);

}


module.exports = DAOAmistad;
