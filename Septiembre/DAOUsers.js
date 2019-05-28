'use strict';

const config = require("./config");

class DAOUsers{
    constructor(pool){
        this._pool=pool;
    }

    isUserCorrect(email, password, callback){
        this._pool.getConnection(function(err, connection){
           if(err){
            callback('Error de conexion a la base de datos');
           }else{
            const sql = 'SELECT ID FROM users WHERE email = ? AND password = ?';
            connection.query(sql, [email, password], function(err, resultado){
                if(err || resultado.length==0){
                    callback(err?`Error de acceso a la base de datos`:"usuario no encontrado");
                }else{
                    // Ponemos .shift para que no haya espacios al final
                    callback(null,resultado);
                }
            });
           }
           connection.release();
        });
    }

    getUser(id,callback){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT * FROM users WHERE ID=?`;
                connection.query(sql, [id], function(err,resultado){
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
                const sql= "INSERT INTO Users (email, password,img, UserName, gender, birth ) VALUES (?,?,?,?,?,?);";
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
    findUser(nombre,user,callback){
        //Busca a un usuario por subcadenas
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= 
                `SELECT C.ID, C.userName, c.img
                FROM(SELECT * 
                    FROM USERS U 
                    WHERE U.UserName LIKE '%f%'
                    AND U.ID != 10) C 
                    JOIN amistad A ON (C.ID = A.IdOrigen OR C.ID=A.IdDestino)
                WHERE A.IdOrigen!=10 AND A.IdDestino!=10
                GROUP BY C.ID, C.userName, c.img`;
                connection.query(sql, [("%"+nombre+"%")], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else
                        callback(null,resultado.map((amigo)=>{
                            amigo.img=(amigo.img == null)? config.defaultImg : amigo.img;
                            return amigo;
                        })); 
                })
                
            }
            connection.release();
        });
    }

    updateUser(password,img,userName,sexo,nacimiento,email,idUser,callback){
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
                    sql+=`UserName=?`;
                    firstElement=false;
                    llamada.push(userName);
                }
                if(sexo!=null){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    sql+=`gender=?`;
                    firstElement=false;
                    llamada.push(sexo);
                }
                if(nacimiento!=null && nacimiento!=""){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    firstElement=false;
                    sql+=`birth=?`;
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
                if(email!=null && email!=""){
                    if(!firstElement){
                        sql+=`,`;
                    }
                    firstElement=false;
                    sql+=`emal=?`;
                    llamada.push(email);
                }
                sql+= ` WHERE id =?;`;
                llamada.push(idUser);
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
    getImagen(id,callback){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT IMG FROM users WHERE ID=?`;
                connection.query(sql, [id], function(err,resultado){
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
    };
    
}

module.exports=DAOUsers;
