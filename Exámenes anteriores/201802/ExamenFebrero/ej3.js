const mysql = require("mysql");

let pool = mysql.createPool({
    database: "examenfebrero",
    user: "root",
    password: "",
    host: "localhost"
});


/*
 * Función para insertar una receta en la BD.
 * 
 * Mira al final de este fichero para saber el formato que tienen los
 * objetos recibidos como primer parámetro.
 * 
 * Tras la inserción, debe llamarse a la función `callback`.
 * 
 * Puedes suponer que la receta tiene, al menos, un ingrediente.
 */
function insertarReceta(receta, callback) {
    pool.getConnection((err, conn) => {
        if (err) { callback(err); return; }
        
        // --------------------------------------------
        // Completar aquí ejercicio 3
        // No olvides cerrar la conexión!
        // --------------------------------------------

    });
}



// ------------------------------------------------------------------
// Código de ejecución de prueba
// ------------------------------------------------------------------
//
// Ejecuta insertarReceta sobre la receta pasada como parámetro.

let receta = {
    nombre: "Salmorejo cordobés",
    ingredientes: [
        { nombre: "Tomates", cantidad: "1kg" },
        { nombre: "Pan", cantidad: "200gr" },
        { nombre: "Aceite de oliva", cantidad: "100gr" },
        { nombre: "Ajo", cantidad: "1 diente" },
        { nombre: "Sal", cantidad: "1 cucharadita" },
        { nombre: "Huevo duro", cantidad: "1/2" },
        { nombre: "Jamón serrano", cantidad: "50gr" },
    ],
    preparacion: "Pelar los tomates y ponerlos en la batidora junto con el ajo..."
};

insertarReceta(receta, (err) => {
    if (err) {
        console.error(err); 
    } else {
        console.log("Receta añadida correctamente");
    }
    pool.end();
});
