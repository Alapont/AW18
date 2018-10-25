'use strict';

let listaTareas =[
    {text:"Preparar práxtica AW", tags: ["AW", "practica"]},
    {text: "Mirar fechas congreso", done:true, tags:[]},
    {text: "Ir al supermercado", tags:["personal"]},
    {text: "Mudanza", tags:["personal"]},
];

function getToDoTasks(tasks){
    var toDo=tasks.splice();

    return toDo.filter(done=true);
}