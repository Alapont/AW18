'use strict';
const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this._pool = pool;
    }

    getAllTasks(email, callback) {

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