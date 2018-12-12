'use strict';

class DAOAmistad {
    constructor(pool, debug = false) {
        this._pool = pool;
        if (debug)
            console.log(pool);
        this._estados = ["amigo", "solicitar","rechazar"];
    }
    setAmistad(amigado, amigador,estado, callback = test) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(`Error de conexion a la base de datos`);
            } else {
                const sql = (estado=="solicitar")?`INSERT INTO amistad (estado, amigado,amigador) VALUES (?,?,?);`:
                                                    `UPDATE amistad SET estado=? WHERE amigado=? AND amigador=?`;
                connection.query(sql, [estado, amigado,amigador], function (err, resultado) {
                    if (err) {
                        callback(`Error de acceso a la base de datos`);
                    } else {
                        if(resultado.affectedRows==0){
                            connection.query(sql, [estado,amigador,amigado], function (err, resultado){
                                if (err) {
                                    callback(`Error de acceso a la base de datos`);
                                } else 
                                    callback(null, resultado);
                            });
                        }
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
                const sql = `SELECT userName, estado, img, email `+
                `FROM amistad JOIN users ON email=amigado `+
                `WHERE amigador=? `+
                `UNION `+
                `SELECT userName, estado, img, email `+
                `FROM amistad JOIN users ON email=amigador `+
                `WHERE amigado=?`;
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