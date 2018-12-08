'use strict';
const mysql =require ("mysql");

class DAOAmistad{
    constructor(pool,debug=false){
        this._pool=pool;
        if(debug)
        console.log(pool);
        this._estados=["amigo","solicitud"];
    }
    getAmigos(user,callback=test){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT amigado, estado  FROM amistad WHERE amigador= ?`;
                connection.query(sql, [user], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else{
                        //si resultado==0 es trur=> dcha:izqda
                        callback(null,resultado);
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


module.exports=DAOAmistad;
