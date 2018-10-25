'use strict';

let listaTareas =[
    {text:"Preparar práctica AW", tags: ["AW", "practica"]},
    {text: "Mirar fechas congreso", done:true, tags:[]},
    {text: "Ir al supermercado", tags:["personal"]},
    {text: "Mudanza", tags:["personal"]},
];

function getToDoTasks(tasks){
    return tasks.filter(task=>task.done!=true).map(task =>task.text);
}

function findByTag(tasks, tag){
    return tasks.filter(task=>task.tags.includes(tag));
}

function findByTags(tasks, par){
    return tasks.filter(
        task=>task.tags.some(
            tag=>par.some(
                x=>x==tag)));
}

function countDone(tasks){
    return tasks.filter(task=>task.done==true).length;
}

function createTask(texto){
    
}
console.log(countDone(listaTareas));