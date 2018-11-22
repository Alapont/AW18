"use strict";
module.exports = {
    mysqlConfig: {
        host: "localhost", // Ordenador que ejecuta el SGBD
        user: "root", // Usuario que accede a la BD
        password: "", // Contraseña con la que se accede a la BD
        database: "facebluff" // Nombre de la base de datos
    },
    port: 8080, // Puerto en el que escucha el servidor
    testData:{
        sesion:{
            user:"pont",
            _user:"pont",
            nombre:"Pablo Alapont Tomás",
            puntos:50,
            edad:33,
            sexo:"Hombre",
            nacimiento:"15/02/1990",
            img:null,
            solicitudes:[
                {user:"sacoMan",nombre:"el hombre del saco",img:"img"},
                {user:"yago",nombre:"Yago el teclas",img:"img"}],
            amigos:[
                {user:"neku",nombre:"neku",img:"img"},
                {user:"pascal",nombre:"pascal",img:"img"}]
        }

    }
}