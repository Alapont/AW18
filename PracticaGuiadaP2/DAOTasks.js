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
                        let tareas = [];

                        resultado.forEach(element => {
                            let pos=tareas.indexOf({id:resultado.id});
                            if(pos==-1){
                                tareas.push({id:element.id, text:element.text, done:element.done, tags: []});
                                pos=tareas.findIndex(i=>i.id==element.id);
                            }
                            tareas[pos].tags.push(element.tag);
                            
                        });
                        callback(null,tareas);
                    }
                });
            }
            connection.release();
        });
    }

    insertTask(email, task, callback) {
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `INSERT INTO task (user, text, done) VALUES (?,?,?);`;
                connection.query(sql, [email, task[0], task[1]], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        const sql1= `INSERT INTO tag (taskId, tag) VALUES ?;`;
                        let values = task[2].map(f=> [resultado.insertId,f]);
                        connection.query(sql1, [values], function(err,rdo){
                            if(err){
                                callback(`Error de acceso a la base de datos`);
                            }else{
                                callback(null,resultado.insertId);
                            }
                        });
                    }
                });

                
            }
            connection.release();
        });
    }

    markTaskDone(idTask, callback) {
    // marca la tarea idTask como realizada
    //UPDATE `task` SET `done` = '1' WHERE `task`.`id` = 1;
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= "UPDATE `task` SET `done` = '1' WHERE `task`.`id` = ?";
                connection.query(sql, [idTask], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        if (resultado.changedRows==0)
                            callback("Error de acceso a la base de datos");
                        else
                            callback(null,resultado);
                    }
                })
            }
            connection.release();
        });
    }

    deleteCompleted(email, callback) {
        //borra todas las tareas donde done = true (1) del usuario email
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `DELETE FROM task WHERE user=? AND done = 1;`;
                connection.query(sql, [email], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        callback(null,resultado);
                    }
                })
            }
            connection.release();
        });
    }

}



function test(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

module.exports = DAOTasks;