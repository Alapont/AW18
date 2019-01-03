

const dao_secreto = require("./private/dao_secreto");

class DAO {
    constructor(pool) {
        this.pool = pool;
    }

    // ----------------------------------------------
    // Ejercicio 1.(a)
    // ----------------------------------------------
    obtenerTodasMesas(callback) {
        this.pool.getConnection((err, conn) => {
            if (err) {
                callback(err);
            } else {
                conn.query("SELECT id, posicion, num_sillas, comensales FROM mesas", (err, rows) => {
                    conn.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, rows.map(row => ({
                            id: row.id,
                            posicion: row.posicion,
                            numOcupadas: row.comensales,
                            numLibres: row.num_sillas - row.comensales                            
                        })));
                    }
                })
            }
        });

        // ¿No te ha salido? :-/
        // En ese caso comenta todo lo anterior (incluyendo la llamada a getConnection())
        // y descomenta la siguiente línea:

        // dao_secreto.obtenerTodasMesas(this.pool, callback);
    }

    // ----------------------------------------------
    // Ejercicio 1.(c)
    // ----------------------------------------------
    obtenerMesaLibre(num_comensales, callback) {
        this.pool.getConnection((err, conn) => {
            if (err) {
                callback(err);
            } else {
                conn.query("SELECT id FROM mesas " + 
                          "WHERE nombre_reserva IS NULL AND num_sillas >= ? " +
                          "ORDER BY num_sillas LIMIT 1", 
                          [num_comensales],
                        (err, row) => {
                            conn.release();
                            if (err) {
                                callback(err);
                            } else {
                                if (row.length === 0) {
                                    callback(null, null);
                                } else {
                                    callback(null, row[0].id);
                                }
                            }
                        });
            }
        });

        // ¿No te ha salido? :-/
        // En ese caso comenta todo lo anterior (incluyendo la llamada a getConnection())
        // y descomenta la siguiente línea:

        // dao_secreto.obtenerMesaLibre(this.pool, num_comensales, callback);
    }



    buscarYReservarMesa(nombre, numComensales, callback) {
        dao_secreto.buscarYReservarMesa(this.pool, nombre, numComensales, callback);
    }
}


module.exports = DAO;