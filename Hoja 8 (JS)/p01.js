'use strict';
function esNumero(x){
    return !isNaN(x);
}
//Funciones chupis
function f(x){
    return x+1;
}
function g(x){
    return x*x;
}
function h(x){
    return -1*x;
}
function und(x) {
    return undefined
}
function chivata(x) {
    console.log("Fallaste")
}
let personas = [
    {nombre: "Ricardo", edad: 63},
    {nombre: "Paco", edad: 55},
    {nombre: "Enrique", edad: 32},
    {nombre: "Adrián", edad: 34}
];
function clasif(per) {
    return(per.edad >60);
}



//ejercicio 1
function producto (x, y){
    if((esNumero(x) &&Array.isArray(y))){
        return componentes(x,y);
    }else if((Array.isArray(x) && esNumero(y))){
        return componentes(y,x);
    }else if(Array.isArray(x) && Array.isArray(y) && x.length == y.length){
        return escalar(x, y);
    }else if(esNumero(x) && esNumero(y)){
        return x*y;
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
function sequence1 (val, funs){
    var acum=val;

    for(let i of funs){
        acum = i(acum);
    }

    return acum;
}

function sequence2 (val, funs){
    var acum=val;

    for(let fun of funs){
        acum = fun(acum);
        if(acum== undefined){
            return undefined;
        }
    }

    return acum;
}

function sequence3 (val, funs, right=false){
    var acum=val;
    if(right){
        funs.reverse();
    }
    for(let fun of funs){
        acum = fun(acum);
        if(acum==undefined){
            return undefined;
        }
    }

    return acum;
}

//ejercicio 3
function pluck(objects, fieldName){
    var fields=[];

    for (let i of objects){
        fields.push(i[fieldName]);
    }

    return fields;
}

function partition(array, p){
    var ciertos=[];
    var falsos = [];

    for (let i of array){
        if(p(i)){
            ciertos.push(i);
        }else{
            falsos.push(i);
        }
    }

    return [ciertos, falsos] ;
}

function groupBy(array, f){
    
}

function pluck2(elems,fieldName){
    return elems.map(elem => elem[fieldName])
}

function partition2(array,p) {
    //Separador de array según la función p
    return [array.filter(n=>(n.edad>=60)),array.filter(n=>(n.edad<60))];
}