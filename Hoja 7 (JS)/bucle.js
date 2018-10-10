'use strict';
for (let k=1; k<=5; k++) {
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
}