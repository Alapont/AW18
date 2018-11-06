"use strict";

let fs=require("fs");

function whiteKiller(file){
    fs.readFile(
        file,
        "utf-8",
        function recive(err,content){
            if(err){
                console.log("error gordo y peludo, en el read");
            }else{
                let text=content.toString().replace(/\  */,' ')
                fs.writeFile(file,text,"utf-8,",function cb(err,datos){
                        if(err){
                            console.log("error del callback de write")
                        }
                    }
                )
            }
        }
    )
    
}

whiteKiller("Hoja A (node)\FichTexto.txt");
console.log("end")