"use strict";

const mysql = require("mysql");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "AW"
});

console.log("\n\ncódigo de cada diapositiva");
pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        connection.query(
            "SELECT Nombre, Apellidos FROM Contactos",
            function (err, filas) {
                if (err) {
                    console.log('Error en la consulta a la base de datos');
                } else {
                    //Acceso a las filas resultado de la consulta
                    filas.forEach(function (fila) {
                        console.log(`${fila.Nombre} ${fila.Apellidos}`);
                    });

                }
            }
        );
    }
});

console.log("\n\ncódigo de ejemplo de Marina");
pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        connection.query(
            "SELECT Nombre, Apellidos FROM Contactos",
            function (err, filas) {
                connection.release();
                if (err) {
                    console.log('Error al realizar la consulta');
                } else {
                    filas.forEach(function (fila) {
                        console.log(`${fila.Nombre} ${fila.Apellidos}`);
                    })
                }
            }
        )
    }
});


console.log("añadir contacto");


pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        const sql = "INSERT INTO Contactos(Nombre, Apellidos) " +
            "VALUES ('Neku','esMaja')"
        connection.query(sql, function (err, resultado) {
            connection.release();
            if (err) {
                console.log("Error de inserción: " + err);
            } else {
                // Imprime el identificador de la nueva fila
                console.log(resultado.insertId);
                // Imprime el número de filas insertadas
                console.log(resultado.affectedRows);
            }
        });
    }
});

console.log("fin")