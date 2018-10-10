'use strict';
//ejercicio 1
function producto (x, y){
    if(typeof(x)==Number && typeof(y)==Number){
        return x*y;
    }else if((typeof(x)==Number && typeof(y)==Array)){
        return componentes(x,y);
    }else if((typeof(x)==Array && typeof(y)==Number)){
        return componentes(y,x);
    }else if(typeof(x)==Array && typeof(y)==Array && x.length == y.length){
        return escalar(x, y);
    }else{
        throw new Error ("No es nada de lo que se supone que deberia ser");
    }
}

function escalar(x, y){
    var aux=[];

    for(var i=0; i<x.length;i++){
        aux.push(x[i]*y[i]);
    }
    return aux;
}

function componentes(x, y){
    var aux=0;

    for (let i of y){
        aux+=x*i;
    }

    return aux;
}

//ejercicio 2
function sequence1 (x, y){
    var acum=x;

    for(let i of y){
        acum = i(acum);
    }

    return acum;
}

function sequence2 (x, y){
    var acum=x;

    for(let i of y){
        acum = i(acum);
        if(acum== "undefined"){
            return undefined;
        }
    }

    return acum;
}

function sequence3 (x, y, z=false){
    var acum=x;
    if(z){
        y.reverse();
    }
    for(let i of y){
        acum = i(acum);
        if(acum== "undefined"){
            return undefined;
        }
    }

    return acum;
}

//ejercicio 3
function pluck(objects, fieldName){
    var fields=[];

    for (let i of objects){
        fields.pop(i.fieldName);
    }

    return fields;
}

function partition(array, p){
    var ciertos=[];
    var falsos = [];

    for (let i of array){
        if(p){
            ciertos.push(i);
        }else{
            falsos.push();
        }
    }

    return [ciertos, falsos] ;
}

function groupBy(array, f){
    
}
