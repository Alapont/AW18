'use strict';

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
                const sql= `SELECT userName FROM users WHERE email= ? AND password = ?`;
                connection.query(sql, [email,password], function(err,resultado){
                    if(err||resultado.length==0){
                        callback(err?`Error de acceso a la base de datos`:"usuario no encontrado");
                    }else{
                        //si resultado==0 es trur=> dcha:izqda
                        callback(null,resultado.shift());
                    }
                })
            }
            connection.release();
        });
    }
    getUser(email,callback=test){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT * FROM users WHERE email=?`;
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
    addUser(email,password,img="../img/usuario.jpg",userName,sexo="null",nacimiento="null",callback=test){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= "INSERT INTO users (email, password,img, userName, sexo, nacimiento ) VALUES (?,?,?,?,?,?);";
                connection.query(sql, [email,password,img,userName,sexo,nacimiento],function (err,resultado){
                    if(err){
                        callback(`No se ha podido insertar el usuario`);
                    }else{
                        callback(null,userName);
                    }
                })
            }
            connection.release();
        });
    }
    findUser(nombre,callback=test){
        //Busca a un usuario por subcadenas
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT * FROM users WHERE userName LIKE ? `;
                connection.query(sql, [("%"+nombre+"%")], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else
                        //callback(null,resultado); //Todo el objeto usuario
                        callback(null,resultado.map(user=>user.userName)); //Solo los nombres
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
