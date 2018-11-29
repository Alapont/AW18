'use strict';
const mysql =require ("mysql");

class DAOUsers{
    constructor(pool){
        this._pool=pool;
    }

    isUserCorrect(email,password, callback){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT email,user, password FROM user WHERE email= ? AND password = ?`;
                connection.query(sql, [email,password], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        callback(null,(resultado.length==1)?resultado[0].user:null);
                        //callback(null,resultado.length==1);
                    }
                })
            }
            connection.release();
        });
    }

    getUserImageName(email,callback){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT img FROM user WHERE email=?`;
                connection.query(sql, [email], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        if(resultado.length==0){
                            callback(`No existe el usuario`);
                        }else{
                            callback(null,resultado[0]);
                        } 
                    }
                })
            }
            connection.release();
        });
    }


}

module.exports=DAOUsers;
