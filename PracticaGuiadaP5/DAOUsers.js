'use strict';
const mysql =require ("mysql");
const config=require("./config");

class DAOUsers{
    constructor(pool){
        this._pool=pool;
    }

    isUserCorrect(email,password, callback){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT email FROM user WHERE email= ? AND password = ?`;
                connection.query(sql, [email,password], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        //si resultado==0 es trur=> dcha:izqda
                        callback(null,resultado.length==0?null:resultado[0]);
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
                        if(resultado.length!=1){
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
