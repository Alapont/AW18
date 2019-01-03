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
        // Insertamos la receta
        conn.query("INSERT INTO recetas(nombre, preparacion) VALUES (?, ?)", 
            [receta.nombre, receta.preparacion],
            (err, result) => {
                if (err) { callback(err); return; }
                // Construimos la lista de tuplas a insertar en la BD. Para cada ingrediente, la tupla
                // es de la forma (nombre, cantidad, id_de_receta)
                let marks = receta.ingredientes.map(ing => [ing.nombre, ing.cantidad, result.insertId]);

                conn.query("INSERT INTO ingredientes(nombre, cantidad, idReceta) VALUES ?", [marks],
                        (err, result) => {
                            conn.release();
                            callback(err);
                        }
                );
            });
    });
}

/*
 * Implementación alternativa, que construye la lista de tuplas de la manera
 * vista en clase.
 * 
 */
function insertarReceta2(receta, callback) {
    pool.getConnection((err, conn) => {
        if (err) { callback(err); return; }
        conn.query("INSERT INTO recetas(nombre, preparacion) VALUES (?, ?)", 
            [receta.nombre, receta.preparacion],
            (err, result) => {
                if (err) { callback(err); return; }

                // `strs` será un array de cadenas de la forma: ["(?, ?, ?)", "(?, ?, ?)", "(?, ?, ?)", ...]
                // Tendrá tantos elementos como ingredientes tenga la receta
                let strs = [];

                // `marks` contendrá los valores asignados a los marcadores.
                let marks = [];

                receta.ingredientes.forEach(ing => {
                    strs.push("(?, ?, ?)");
                    marks.push(ing.nombre);
                    marks.push(ing.cantidad);
                    marks.push(result.insertId);
                });
                
                conn.query("INSERT INTO ingredientes(nombre, cantidad, idReceta) VALUES " + strs.join(", "), marks,
                        (err, result) => {
                            callback(err);
                        }
                );
            });
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
