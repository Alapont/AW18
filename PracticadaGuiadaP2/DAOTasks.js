'use strict';
const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this._pool = pool;
    }
    //devuelve todas las tareas asociadas a un usuario, junto a los tags asociados a cada una de ellas
    //en una unica consulta que relacione task y tags. Rdo=array de tareas
    getAllTasks(email, callback) {
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT tag, done, id,text FROM tag JOIN task ON taskId=id WHERE user=?;`;
                connection.query(sql, [email], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        
                        callback(null);
                    }
                })
            }
            connection.release();
        });
    }

    insertTask(email, task, callback) {

    }

    markTaskDone(idTask, callback) {

    }

    deleteCompleted(email, callback) {

    }
}

function test(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

module.exports = DAOTasks;