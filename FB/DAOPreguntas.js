'use strict';
const mysql =require ("mysql");

/*
 *La BBDD para las preguntas tiene esta pinta
    Preguntas(_id, texto)
    Respuestas(_idRespuesta,idPregunta, texto)
    RespuestaUsuario(_idPregunta, _usuario,idRespuesta)
    Adivinar(_adivino,_adivinado,idRespuesta)
*/

class DAOPreguntas{
    constructor(pool){
        this._pool=pool;
    }
    getPreguntas(cantidad=5,callback=test){
        //Devuelve una selección aleatoria de preguntas
        //No se si hacer la selección aquí o recoger todas y hacerlo en el js
        //SELECT * FROM table ORDER BY RAND() LIMIT 10000 //ty stack overflow
    }
    getRespuestas(pregunta,callback=test){
        //Devuelve todas las respuestas de una pregunta dada por ID
        //SELECT * FROM respuestas WHERE pidPregunta=pregunta
    }
    responder(pregunta,respuesta,usuario,callback=test){
        //Asigna al usuario una respuesta para una pregunta
        //Si responde de nuevo a una pregunta falla porque usuario y pregunta son claves
    }
    addRespuesta(pregunta,respuesta,callback=test){
        //Añade una nueva respuesta a una pregunta 
        //INSERT
    }



}

function test(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

module.exports=DAOPreguntas;
