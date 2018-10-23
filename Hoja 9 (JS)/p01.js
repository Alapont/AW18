'use strict';

let c = {
	r:1,
	i:1,
	modulo: function() {
		return Math.sqrt(this.r*this.r +
		this.i*this.i);
	},
	argumento: function() {
		return Math.atan2(this.i,this.r);
	}
};

function construirComplejo(real, imag) {
	return {
			r : real,
			i : imag,
			modulo: function() {
			return Math.sqrt(this.r * this.r + this.i * this.i);
		},
		argumento: function() {
			return Math.atan2(this.i, this. r);
		}
	}
}
var c1 = construirComplejo(-3, 0);
console.log(c1.argumento()); // → 3.141592653589793
var c2 = construirComplejo(1, 1);
console.log(c2.modulo()); // → 1.4142135623730951

//Creamos un objeto c1 que tiene de prototipo a c 
/*
	JS no tiene objetos per se, sino lista de atributos que pueden ser funciones y van todos juntos. Lo que puedes hacer es una "lista de atributos" que tenga de referencia otra "lista de atributos", así si algo no lo tiene en su lista de atributos, va a mirar en la de referencia, y si no en la de referencia y así hasta que alguien tenga de referencia a null.
*/
let c3 = Object.create(c)

let persona = {
	nombre: "",
	apellidos: ""
}
let medico = Object.create(persona);
medico.especialidad = "";
console.log(Object.getPrototypeOf(medico) === persona);// → true
console.log(Object.getPrototypeOf(persona) === Object.prototype);// → true

//Ejercicio 8

class figura{
	constructor(x,y){
		this.x=x;
		this.y=y;
		esBlanco=RegExp("\#[fF]{6}");
		esColor=RegExp("\#[0-9a-fA-F]{6}");
	}
	pintar(){
		console.log(`Nos movemos a la posición ([${x}],[${y}])\n Cogemos la pintura de color [${color}]`);
	};
	esBlanca(){
		return 
	};
}
class elipse extends figura{
	constructor(x,y,rh,rv){
		this.rh=rh;
		this.rv=rv;
		super(x,y);
	}
	pintar(){
		figura.pintar(x,y);
		console.log(`Pintamos elipse de radios ${this.rh} y ${this.rv}`);
	}
}
class circulo{
	constructor(x,y,r){
		this.x=x;
		this.y=y;
		super(x,y,r,r);
	}

}