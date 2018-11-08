'use strict';
const mysql =require ("mysql");

class DAOUsers{
    constructor(host, user, pass, base){
        this._pool=mysql.createPool({
            host: host,
            user: user,
            password: pass,
            database: base
        });
    }

    isUserCorrect(email,password, callback){

    }

    getUserImageName(email,callback){

    }


}

function test(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
}

module.exports=DAOUsers;