function actualizarTabla() {
    // Hacer petición AJAX a /highestRecords
    
    // y construir tablas
}


$(document).ready(function() {
    actualizarTabla();
    
    // Esta función será llamada cada vez que se pulse
    // el botón 'Enviar':
    $("#enviar").on("click", function() {
        // Realizar petición AJAX a /newRecord y llamar a
        // actualizarTabla() cuando esta petición finalice
        // con éxito
    });
});