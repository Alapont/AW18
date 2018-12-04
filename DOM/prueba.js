"use strict";

//todo lo ves en la pagina html en el navegador
$(function () {
    let parrafos = $("p");
    console.log(parrafos);


    console.log($("header").children());
    console.log($("p").parent());
    console.log($("p").parents());
    console.log($("li").length); //numero de elementos li que hay en el html

});

//metodo prop
//escribimos una propiedad
let candadoAbierto = true;

function cambiarCandado() {
    candadoAbierto = !candadoAbierto;
    if (candadoAbierto) {
        $("#candado").prop("src", "candadoAbierto.png");
    } else {
        $("#candado").prop("src", "candadoCerrado.png");
    }
}
$(function () {
    $("#botonAbrirCerrar").on("click", cambiarCandado);
});

//leemos una propiedad


function mostrarInfo() {
    let edad = $("#campoEdad").prop("value");
    let fumador = $("#campoFumador").prop("checked");
    alert(`Tienes ${edad} años y ` +
        `${fumador ? '' : 'no'} eres fumador`);
}

$(function () {
    $("#enter").on("click", mostrarInfo);
});
//añadir modificar o eliminar clases de los css
$(function () {
    let cabecera = $("h1");
    cabecera.on("click", function () {
        cabecera.toggleClass("rojo");
    });
});

// Todos los encabezados <h1> tendrán el texto de color verde
$("h1").css("color", "green");
console.log($("h1").eq(0).css("font-size")); // → "32px"