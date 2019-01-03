"use strict";


// ----------------------------------
// Realiza aquí el apartado 2.(a)
// ----------------------------------
function actualizarRanking() {
    
    // Eliminamos las filas de la tabla
    $("#ranking tbody tr").remove();

    // Continúa aquí el apartado (a)
    $.ajax({
        method: "GET",
        url: "/ranking",
        success: (data, statusText, jqXHR) => {
            let rows = Object.keys(data).map(language => {
                let row = $("<tr>");
                let firstCol = $("<td>").text(language);
                let secondCol = $("<td>").text(data[language]);
                row.append(firstCol, secondCol);
                return row;
            });
            $("#ranking tbody").append(rows);
        },
        error: (jqXHR, statusText, errorThrown) => {
            alert(`Error: ${statusText}`);
        }
    })
}


$(document).ready(function () {
    actualizarRanking();
    registrarEventoRanking();
});