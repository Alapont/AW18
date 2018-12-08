'use strict';
const mysql =require ("mysql");
const config=require("./config");

class DAOAmistad{
    constructor(pool){
        this._pool=pool;
    }
}

module.exports=DAOAMistad;