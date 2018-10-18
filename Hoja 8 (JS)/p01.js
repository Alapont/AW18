'use strict';

function esNumero(x){
    //también es puede utilizar typeof x=="number"
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

/*Escribir una función producto que reciba dos parámetros (llamados x e y) y devuelva su producto, teniendo en cuenta que tanto la x como la y pueden ser números o vectores (representados como arrays). La función se comportará del siguiente modo:
Si x e y son números, se calculará su producto.
Si x es un número e y es un vector (o viceversa), se calculará el vector que resulta de multiplicar todas los componentes de y por x.
Si x e y son vectores de la misma longitud, se calculará el producto escalar de ambos.
En cualquier otro caso, se lanzará una excepción.*/

/*FALLOS GENERALES
    -no se puede utilizar un for..in para recorrer un array! For..in itera sobre propiedades definidas por el usuario además de sobre los elementos del array.
    Además el orden de iteración es arbitrario. 
        EJEMPLO
        
            let a = [1,2,3,4];
            a.ordenado=true;
            for(let i in a){
            console.log("i= " + i + " a= " + a[i])
    }
    -El paso de parámetros a las funciones es por valor. Cuando el parámetro es un objeto, lo que se pasa es la referencia al objeto.
    Si se modifica el objeto dentro de la función, los cambios quedan reflejados fuera de la función.
        EJEMPLO DE MAL HECHO

            function multiplicarArray(array, valor){
                for(let i in array){
                    array[i]=array[i]*valor;
                }
                return array;
            }
            function multiplicarArray(array, valor){
                let resultado=[];
                for(let i=0; i<array.length;i++){
                    resultado[i]=array[i]*valor;
                }
                return resultado;
            }
    -hay que sacar escalar fuera para que de igual si mete un array o el que, que solo lo llame al producto . Es decir, solo una función grande y pequeñitas. Punto para Pont. 
*/


function producto (x, y){
    if((esNumero(x) &&Array.isArray(y))){
        return componentes(x,y);
    }else if((Array.isArray(x) && esNumero(y))){
        return componentes(y,x);
        //algunos no han comparado que los dos arrays sean de la misma length. Nosotros si. Punto para Pont.
    }else if(Array.isArray(x) && Array.isArray(y) && x.length == y.length){
        return escalar(x, y);
    }else if(esNumero(x) && esNumero(y)){
        return x*y;
    }else{
        //solo hay que hacer throw dentro de la función, no try..catch..throw..Punto para Pont.
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

/*Escribir una función sequence que reciba un array de funciones [f_1, ..., f_n] y un elemento inicial x. La función debe aplicar f_1 a x, y pasar el resultado a f_2 que a su vez le pasará el resultado a f_3 y así sucesivamente. Se piden tres versiones diferentes de la función sequence:
Implementar la función sequence1 suponiendo que ninguna de las funciones del array recibido devuelve el valor undefined.
Implementar la función sequence2 para que, en el caso en que una función del array devolviera el valor undefined, la función sequence2 devuelva directamente undefined sin seguir ejecutando las funciones restantes.
Implementar la función sequence3 para que reciba un tercer parámetro opcional (right), cuyo valor por defecto será false. Si el parámetro right tiene el valor true, el recorrido del elemento por las funciones será en orden inverso: desde la última función del array hasta la primera. Independientemente del recorrido, la función sequence3 se comportará como la función sequence2.
(NOTA: dentro de una función se puede comprobar que el último parámetro no está presente comparándolo con undefined).
*/

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
/*no está bien hacer funs.reverse. Lo que hace es modificar el array de fuera también. Tienes que devolver un resultado.Punto menos para Pont */
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

/*Escribir una función pluck(objects, fieldName) que devuelva el atributo de nombre fieldName de cada uno de los objetos contenidos en el array objects de entrada.
 Se devolverá un array con los valores correspondientes. Por ejemplo:*/
 //Está bien. Punto para Pont.
function pluck(objects, fieldName){
    var fields=[];

    for (let i of objects){
        fields.push(i[fieldName]);
    }

    return fields;
}


/*Implementar una función partition(array, p) que devuelva un array con dos arrays. El primero contendrá los elementos x de array tales que p(x) devuelve true. Los restantes elementos se añadirán al segundo array*/
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
/*
OTRA FORMA
function partition(array,p){
    let resultado=[ [],[] ];
    let indice, elemento;

    for(let i=0; i<array.Length;i++){
        if(p(array[i])){
            resultado[0].push(array[i]);
        }else{
            resultado[1].push(array[i]);
        }
    }
    return resultado;
}
*/

function groupBy(array, f){
    
}

function pluck2(elems,fieldName){
    return elems.map(elem => elem[fieldName])
}

function partition2(array,p) {
    //Separador de array según la función p
    return [array.filter(n=>(n.edad>=60)),array.filter(n=>(n.edad<60))];
}