'use strict';
/*for (let k=1; k<=5; k++) {
	console.log("k = " + k);
}

let x=9 //let no permite redefiniciones y se comporta menos como js
let y=6

if (x<y) {
	console.log(`${x} es menor que ${y}`);  //Ojo que para que resuelva ${coso} tiene que ser comilla ` no vale ni ' ni "
}else{
	console.log(`${x} NO es menor que ${y}`);
}
let day=3;
switch(day) {
	case 6:
	case 7:
		console.log("es un finde \\^^/")
		break;
	default:
		console.log("es laboral y te jodes como herodes 💩");
}

function abs(x){
	if (x< 0){
		return-x;
	}
	return x;
}
x=abs(-3)
console.log(`el valor absoluto de x es ${x}`);

try{
	throw new Error("JAJAJAJA, toma caca 💩")
}catch (e) {
	console.log(e.message);
	console.log(e.stack);
	console.log(e.name);
}finally{
	console.log(`finally se ejecuta siempre`);
}/*

/*10/10/18 */
let persona ={
	nombre: "piolin",
	apellidos: "looney toones",
	edad: 99
};
 console.log(persona.nombre);
 console.log(persona.edad);

let pop = {};
console.log(pop);
pop = persona.nombre;
console.log(pop);
console.log(persona.noexiste);

let z = {
	"cocacola" : "cereza",
	"fanta" : "limon"
}
console.log(z.fanta);
console.log(Object.keys(persona));

if("cocacola" in z){
	console.log("z si tiene cocacola");
}

function incrementar(x) {
	return x + 1;
}
function duplicar(x) {
	return 2 * x;
}
function cuadrado(y) {
	return y * y;
}
function factorial(n) {
	if (n <= 0) {
	return 1;
} else {
	return n * factorial(n - 1);
	}
}

let i = incrementar;
/*IMPORTANTE
no poner paréntesis cuando se asigna una función a una variable
let i = incrementar();
NONOONONONONONONOONONONONONO
ERROR: I IS NOT A FUNCTION */
console.log(i(5));
	
function aplicar_funciones(funs, z) {
	for (let i = 0; i < funs.length; i++) {
		console.log(`Aplicar función ${i} pasando ${z}: ${funs[i](z)}`);
	}
}
aplicar_funciones([incrementar,duplicar,cuadrado,factorial], 5);


function buscar_por_nombre(nombre) {
	switch(nombre) {
		case "INC": return incrementar;
		case "DUP": return dup;
		case "SQR": return cuadrado;
		case "FCT": return factorial;
	}
// Si la función termina sin alcanzar un return,
// se considera que devuelve undefined
}
var g = buscar_por_nombre("INC");
console.log(g(10));

//función anónima
let f = function() { console.log("Hola"); };
f();
let go = function(x, y) { return x + y; };
console.log(go(3, 5));

//se puede reemplazar dacorial por una función anónima?
aplicar_funciones(
	[ function(x) { return x - 3; },
	function(x) { return Math.sqrt(x); },
	factorial, //cambiar esta función por una anónima recursiva. Sí funciona
	//hay que usar cosos de arguments y callee para que funcione y salir del modo estricto
	function(z) { return Math.log(z); } ], 2);

let s;
let p;
let inc;
s = suma(6,7); // Se ejecuta sin problemas
function suma (a,b) {return a+b;}
/*p = inc(8); // TypeError: inc is not a function
inc = function (x) {return ++x;};
*/

/*NOTACIÓN LAMBDA
en vez de:
	function (x, y, z) { }
	function (x) { console.log(`Valor recibido: ${x}`); }
	function (x) { return x + 1; }

se puede escribir
	(x, y, z) => { }
	x => { console.log(`Valor recibido: ${x}`); }
	x => x + 1
*/

//ARRAYS
//inicialización
let a = [23, 12, 69, 11, 34, 45];
//o bien
let b = new Array(10);

//se pueden añadir propiedades
a.estaOrdenado = false;
console.log(a);

//puede variarse su longitud en tiempo de ejecución modificando length
a.length += 2; 
console.log(a);
a.length=3;
console.log(a);

//métodos para modificar el tamaño de array
/*
	push(x)
Inserta x al final del array.
	pop()
Elimina y devuelve el último elemento del array.
	unshift(x)
Añade x al principio del array, desplazando los restantes
elementos.
	shift()
Elimina el primer elemento del array, desplazando los
restantes elementos.
	splice(ini, num) 
Partiendo del elemento en la posición
ini, elimina num elementos.
*/
let t = [1,2,3,4,5];
console.log(t);
t.push(8);
console.log(t);
t.unshift(-4);
console.log(t);
t.pop();
console.log(t);
t.shift();
console.log(t);
t.splice(2,2);
//el array cuenta desde 1, no desde 0. la pos 2 seria lo que pensamos que es t[1]
console.log(t);