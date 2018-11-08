'use strict';
const mysql =require ("mysql");

class DAOTasks{
    constructor(host, user, pass, base){
        this._pool=mysql.createPool({
            host: host,
            user: user,
            password: pass,
            database: base
        });
    }

    getAllTasks(email,callback){

    }

    insertTask(email,task,callback){

    }

    markTaskDone(idTask, callback){

    }

    deleteCompleted(email,callback){
        
    }
}

function test(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
}

module.exports=DAOTasks;