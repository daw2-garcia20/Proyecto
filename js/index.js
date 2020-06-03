$(document).ready(function() {
    //obtenerServicios();
});

function obtenerServicios() {
    $.ajax({
        "url": "php/slideServicios.php"
    }).done(function(slider) {
        $("#servicios").html(slider);
    }).fail(function() {
        console.log("fallo ajax slider");
    });
}