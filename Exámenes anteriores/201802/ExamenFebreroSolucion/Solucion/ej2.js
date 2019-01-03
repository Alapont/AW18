const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

let app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'frase secreta',
    resave: false,
    saveUninitialized: true,
}));

/*
 * Introducimos un middleware para que inicialice el atributo
 * de sesión, en caso de que no exista.
 * 
 * También lo añadimos a response.locals, para no tener que
 * pasarlo cada vez que llamemos a render()
 */
app.use((request, response, next) => {
    if (request.session.historial === undefined) {
        request.session.historial = [];
    }
    response.locals.historial = request.session.historial;
    next();
});

/*
 * Al iniciar, mostramos la plantilla con el resultado vacío.
 */
app.get("/", (request, response) => {
    response.render("ej2", { resultado: "" });
});

/*
 * Manejador de ruta GET para realizar operaciones.
 */
app.get("/calc", (request, response) => {
    // Si los cuadros de texto están vacíos, devolvemos ERROR
    if (request.query.operand1.trim() === "" || request.query.operand2.trim() === "") {
        response.render("ej2", { resultado: "ERROR" });
    } else {
        // Convertimos los operandos a números
        let op1 = Number(request.query.operand1);
        let op2 = Number(request.query.operand2);
        let operator = request.query.operator;
        // Si no son números, devolvemos ERROR
        if (isNaN(op1) || isNaN(op2)) {
            response.render("ej2", { resultado: "ERROR"});
        } else {

            // Calculamos el resultado
            let resultado;
            switch(operator) {
                case "+": result = op1 + op2; break;
                case "-": result = op1 - op2; break;
                case "*": result = op1 * op2; break;
                case "/": 
                    result = op2 !== 0 ? op1 / op2 : "ERROR";
                    break;
            }
            
            // Añadimos la operación al historial
            if (result !== "ERROR") {
                request.session.historial.unshift(`${op1} ${operator} ${op2} = ${result}`);
            }

            // Mostramos la nueva página
            response.render("ej2", { resultado: result, historial: request.session.historial });
        }    
    }
});

/*
 * Manejador POST para borrar la ruta del hostiral. Recibe un parámetro
 * `index` con el índice de la entrada del historial a borrar. 
 */
app.post("/deleteHistory", (request, response) => {
    request.session.historial.splice(request.body.index, 1);
    response.render("ej2", { resultado: "", historial: request.session.historial });
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});