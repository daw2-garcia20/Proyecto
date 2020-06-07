$(document).ready(eventos);

var idServicio = 0;
var valoracion = 0;

function eventos() {
    selectorServicios();
    $("#botonEnviarValoracion").click(function() {
        event.preventDefault();
        enviarValoracion();
    });
    $("#selectServicios").change(function() {
        idServicio = $(this).val();
    });
    $(".puntoValoracion").click(function() {
        valoracion = $(this).val();
    });
}

function selectorServicios() {
    $.ajax({
        "url": "php/selectorServicios.php"
    }).done(function(options) {
        $("#selectServicios").append(options);
    });
}

function enviarValoracion() {
    var comentario = $("#comentario").val();
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();

    var opinion = {
        "nombre": nombre,
        "apellidos": apellidos,
        "comentario": comentario,
        "valoracion": parseFloat(valoracion),
        "idServicio": parseInt(idServicio)
    };
    $.ajax({
        "url": "php/enviarValoracion.php",
        "method": "POST",
        "data": opinion
    }).done(function(options) {
        /* location.reload; */
    });
}