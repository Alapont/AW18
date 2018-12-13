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
    addUser(email,password,img,userName,sexo,nacimiento,callback=test){
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
    findUser(nombre,email,callback=test){
        //Busca a un usuario por subcadenas
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT userName,email,img,estado FROM users LEFT OUTER JOIN amistad on users.email=amistad.amigador WHERE userName LIKE ? AND amistad.amigado =? UNION ` + 
                           `SELECT userName,email,img,estado FROM users LEFT OUTER JOIN amistad on users.email=amistad.amigado  WHERE userName LIKE ? AND amistad.amigador =? `;
                connection.query(sql, [("%"+nombre+"%"),email,("%"+nombre+"%"),email], function(err,resultado){
                    if(err){
                        callback(`Error de acceso a la base de datos`);
                    }else
                        //callback(null,resultado); //Todo el objeto usuario
                        callback(null,resultado); //Solo los nombres
                })
                
            }
            connection.release();
        });
    }
    updateUser(password,img,userName,sexo,nacimiento,email,callback=test){
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

    getImagen(email, callback=test){
        this._pool.getConnection(function(err,connection){
            if(err){
                callback(`Error de conexion a la base de datos`);
            }else{
                const sql= `SELECT img FROM users WHERE email=?;`
                connection.query(sql, [email], function(err,resultado){
                    if(err){
                        callback(`No se ha podido coger la imagen`);
                    }else{
                        callback(null, (resultado.length==0)?null:resultado[0].img);
                    }
                });
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
