"use strict";

const DAO = require("./ej1_dao");
const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "examen_julio"
});

const dao = new DAO(pool);


function bucleReservas(numReservas, mesasSinReservar, veredicto, callback) {
    if (numReservas > 11) {
        callback(null, veredicto);
    } else {
        let numComensalesMesaValida =
            Math.min.apply(null,
                mesasSinReservar.filter(m => m.numLibres >= numReservas).map(m => m.numLibres)
            );

        let mesasValidas = mesasSinReservar.filter(m => m.numLibres == numComensalesMesaValida).map(m => m.id);
        if (mesasValidas.length == 0) {
            mesasValidas = [null];
        }

        dao.obtenerMesaLibre(numReservas, (err, idMesa) => {
            if (err) {
                callback(err);
            } else {
                console.log(`Para una reserva de ${numReservas} comensales:`);
                console.log(` - La consulta devuelve la mesa nº ${idMesa}`);
                console.log(` - Debe devolver una de las mesas: ${mesasValidas.join(", ")}`);
                if (mesasValidas.includes(idMesa)) {
                    console.log("Ok");
                    bucleReservas(numReservas + 1, mesasSinReservar, veredicto, callback);
                } else {
                    console.log("La consulta es INCORRECTA.\n");
                    bucleReservas(numReservas + 1, mesasSinReservar, false, callback);
                }
            }
        });
    }
}

dao.obtenerTodasMesas((err, mesas) => {
    if (err) {
        console.error("No se puede obtener la información sobre todas las mesas.");
        console.error(err);
    } else {
        let mesasSinReservar = mesas.filter(m => m.numOcupadas == 0);
        console.log("Mesas sin reservar:");
        console.log(mesasSinReservar.map(m => `* Mesa nº ${m.id} con ${m.numLibres} asientos`).join("\n"));
        bucleReservas(1, mesasSinReservar, true, (err, veredicto) => {
            pool.end();
            if (err) {
                console.error("Se ha producido un error durante la ejecución de los tests.");
            } else {
                if (veredicto) {
                    console.log("Todos los test funcionan correctamente.");
                } else {
                    console.log("La implementación no ha pasado alguno de los tests.");
                }
            }
        });
    }
});
