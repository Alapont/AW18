'use strict';

class DAOAmistad {
    constructor(pool, debug = false) {
        this._pool = pool;
        if (debug)
            console.log(pool);
        this._estados = ["amigo", "solicitud"];
    }
    setAmistad(amigado, amigador, callback = test) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `INSERT INTO amistad (amigador, amigado, estado) VALUES (?,?,?);`;
                connection.query(sql, [amigador, amigado, "amigo"], function (err, resultado) {
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

    getAmigos(user, callback = test) {
        this._pool.getConnection((err, connection)=>{
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = `SELECT userName, estado, img, email FROM amistad JOIN users ON email=amigado WHERE amigador=? OR amigado=?`;
                connection.query(sql, [user, user], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                            //si resultado==0 es trur=> dcha:izqda
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