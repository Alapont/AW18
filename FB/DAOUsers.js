'use strict';
const mysql =require ("mysql");

class DAOUsers{
    constructor(pool,debug=false){
        this._pool=pool;
        if(debug)
        console.log(pool);
    }
    
    isUserCorrect(email,password, callback=test){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT userName FROM user WHERE email= ? AND password = ?`;
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
    getUserImageName(email,callback=test){
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
function test(err, data){
    console.log((err)?"error: "+err:"No error");
    console.log(data);
    
}

module.exports=DAOUsers;
