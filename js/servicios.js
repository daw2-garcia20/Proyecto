$(document).ready(eventos);

function eventos() {
    obtenerServicios();
}

function obtenerServicios() {
    $.ajax({
        "url": "php/slideServiciosCompleto.php"
    }).done(function(slider) {
        $("#servicios").html(slider);
    });
}