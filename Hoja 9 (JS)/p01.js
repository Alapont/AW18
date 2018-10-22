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
let c1 = Object.create(c)