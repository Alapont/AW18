"use strict";

function mostrarAcceso(selector) {
    let permitido = $(selector);
    permitido.show();
    setTimeout(() => {
        permitido.hide();
    }, 1000);
}

function accesoPermitido() {
    mostrarAcceso("#permitido");
}

function accesoDenegado() {
    mostrarAcceso("#denegado");
}


$(() => {
    // Esta variable contendrá la combinación introducida hasta el momento
    let combinacionActual = "";


    $("#teclado > .numero").on("click", (evt) => {
        // Obtenemos el receptor del evento "click"
        let botonPulsado = $(evt.target);

        // --------------------------------------------
        // Completar aquí ejercicio 4
        // --------------------------------------------

    });

    /*
     * Manejador para borrar la combinación introducida hasta el momento
     */
    $("#teclado > .borrar").on("click", (evt) => {
        combinacionActual = "";
        $("#display").text("");
    });

});