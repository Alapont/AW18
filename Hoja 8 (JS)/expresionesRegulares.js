var expr = /[A-Z][0-9]{3}/;
var expr = new RegExp('[A-Z][0-9]{3}');

//cuando nos importa alguna caracteristica de la cadena
/[A-Z][0-9]{3}/.test("A655"); // → true
/[A-Z][0-9]{3}/.test("__A655__"); // → true
/[A-Z][0-9]{3}/.test("Otra cosa"); // → false
let idValido = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/;
console.log(idValido.test("8cte")); // → false
console.log(idValido.test("_cte"));// → true


//cuando nos importa la cadena en si
console.log(/\d{3}/.exec("123 456 789")); // → ["123", index: 0, ...]
console.log(/\w+@\w+/.exec("abc")); // → null
console.log(/\w+@\w+/.exec("Esto es un correo nombre_apellidos@correo"));
// → ["nombre_apellido@correo", index: 18,...]

var regexp = /(\d{4})\-([A-Z]{3})/;
var result = regexp.exec("Mi matrícula de coche es 8367-AWD");
console.log(result[0]); // → "8367-AWD" (Cadena completa)
console.log(result[1]); // → "8367" (Primer grupo de captura)
console.log(result[2]); // → "AWD" (Segundo grupo de captura)
console.log(result.index); // → 25 (Posición del ajuste dentro de la cadena)


//PROBAR POR NUESTRA CUENTA
var str = "a aa aaa";
console.log(str.match(/a+/)); // → ["a", index: 0, input:"a aa aaa",groups:undefined
console.log(str.match(/a+/g));// → ["a", "aa", "aaa"]
str = "HolA";
console.log(str.match(/hola/)); // → null
console.log(str.match(/hola/i)); // → ["HolA",index:0, input:"HolA", groups:undefined

var str = "123 456 789";
console.log(str.search(/\d{3}/)); // → 0
console.log(str.search(/3\d{2}/)); // → -1

var str = "123 456 789";
console.log(str.replace(/\d{3}/,"AAA")); // → AAA 456 789
console.log(str.replace(/\d{3}/g,"AAA")); // → AAA AAA AAA