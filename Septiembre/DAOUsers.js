'use strict';

class DAOUsers{
    constructor(pool){
        this._pool=pool;
    }

    isUserCorrect(email, password, callback){
        this._pool.getConnection(function(err, connection){
           if(err){
            callback('Error de conexion a la base de datos');
           }else{
            const sql = 'SELECT userName FROM users WHERE email = ? AND password = ?';
            connection.query(sql, [email, password], function(err, resultado){
                if(err || resultado.length==0){
                    callback(err?`Error de acceso a la base de datos`:"usuario no encontrado");
                }else{
                    // Ponemos .shift para que no haya espacios al final
                    callback(null,resultado.shift());
                }
            });
           }
           connection.release();
        });
    }

    getUser(email,callback){
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
    addUser(email,password,img,userName,sexo,nacimiento,callback){
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

    findUser(nombre,email,callback){
        //Busca a un usuario por subcadenas
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT * FROM users WHERE users.email NOT IN(SELECT amistad.amigador FROM amistad where amistad.amigado =? AND estado<>"rechazado")
                AND users.email NOT IN(SELECT amistad.amigado FROM amistad where amistad.amigador=? AND estado<>"rechazado") AND users.userName LIKE ?`
                connection.query(sql, [email, email,("%"+nombre+"%")], function(err,resultado){
                    
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else
                        //console.log(resultado[0]);
                        callback(null,resultado); 
                })
                
            }
            connection.release();
        });
    }

    updateUser(password,img,userName,sexo,nacimiento,email,callback){
        this._pool.getConnection(function(err,connection){
            let llamada=[];
            let firstElement=true;
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                let sql= `UPDATE users SET `;
                if(img!=null){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    sql += `img=?`;
                    firstElement=false;
                    llamada.push(img);
                }
                if(userName!=null && userName!=""){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    sql+=`userName=?`;
                    firstElement=false;
                    llamada.push(userName);
                }
                if(sexo!=null){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    sql+=`sexo=?`;
                    firstElement=false;
                    llamada.push(sexo);
                }
                if(nacimiento!=null && nacimiento!=""){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    firstElement=false;
                    sql+=`nacimiento=?`;
                    llamada.push(nacimiento);
                }
                if(password!=null && password!=""){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    firstElement=false;
                    sql+=`password=?`;
                    llamada.push(password);
                }
                sql+= ` WHERE email =?;`;
                llamada.push(email);
                connection.query(sql, llamada, function (err, resultado){
                    if(err){
                        callback(`No se ha podido modificar el usuario`);
                    }else{
                        callback(null, resultado);
                    }
                })
            }
            connection.release();
        });
    }

    
}

module.exports=DAOUsers;