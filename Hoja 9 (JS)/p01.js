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

/*
Esto funciona poco

// SE CREA UN OBJETO-PROTOTIPO QUE CONTIENE LOS MÉTODOS
let prototipoComplejo = {
	modulo: function() {
		return Math.sqrt(this.r * this.r + this.i * this.i);
	},
	argumento: function() {
		return Math.atan2(this.i, this. r);
	}
};
// SE PROGRAMA UNA FUNCIÓN QUE CREA UN OBJETO A PARTIR DEL PROTOTIPO
// Y LE CREA SUS PROPIOS ATRIBUTOS
function construirComplejo(real, imag) {
	var resultado = Object.create(prototipoComplejo);
	resultado.r = real;
	resultado.i = imag;
	return resultado;
};

prototipoComplejo.toString = function() {
	return "(" + this.r + "," + this.i + ")";
}

let c3 = construirComplejo(1, 3);
alert(c3); // muestra una ventana con el texto (1,3)
*/



let prototipoPersona = {
	valueOf: function() {
	return this.edad;
	}
};
function construirPersona(nom, ap, e) {
	var resultado = Object.create(prototipoPersona);
	resultado.nombre = nom;
	resultado.apellido = ap;
	resultado.edad = e;
	return resultado;
}
var p1 = construirPersona("Juan", "Gómez", 15);
var p2 = construirPersona("Ana", "Torres", 18);
console.log(p1+p2); // → 33



class Complejo {
	constructor(real, imag) {
		this.r = real;
		this.i = imag;
	}
	modulo() {
		return Math.sqrt(this.r * this.r + this.i * this.i);
	}
	argumento() {
		return Math.atan2(this.i, this.r);
	}
}

