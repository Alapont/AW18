

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
                // -------------------------------------------------
                // Continúa aquí el ejercicio.
                // No te olvides de devolver la conexión al pool.
                // -------------------------------------------------
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
                // -------------------------------------------------
                // Continúa aquí el ejercicio.
                // No te olvides de devolver la conexión al pool.
                // -------------------------------------------------
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