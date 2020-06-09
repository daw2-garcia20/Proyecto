$(document).ready(eventos);

var idServicio = 0;
var idServicioReserva = 0;
var valoracion = 0;

function eventos() {
    obtenerServicios();
    obtenerPrecios();
    selectorServicios();
    $("#botonEnviarValoracion").click(function() {
        enviarValoracion();
    });
    $("#selectServicios").change(function() {
        idServicio = $(this).val();
    });
    $("#selectReserva").change(function() {
        idServicioReserva = $(this).val();
    });
    $(".puntoValoracion").click(function() {
        valoracion = $(this).val();
    });
    $("#enviarReserva").click(function() {
        enviarReserva();
    });
    $("#fecha").datepicker({
        format: "dd/mm/yyyy"
    });
    $("#fecha").change(function() {
        var fecha = ($(this).val());
        var hora = $("#hora").val();
        hora = hora.trim();
        if (hora != "") {
            filtrarSelector(fecha, hora);
        }
    });
    $("#hora").change(function() {
        var hora = $(this).val();
        var fecha = $("#fecha").val();
        fecha = fecha.trim();
        if (fecha != "") {
            filtrarSelector(fecha, hora);
        }
    });
    $("#hora").clockpicker({
        donetext: 'Done',
        autoclose: true
    });
}

function obtenerServicios() {
    $.ajax({
        "url": "php/slideServiciosCompleto.php"
    }).done(function(slider) {
        $("#servicios").html(slider);
    });
}

function obtenerPrecios() {
    $.ajax({
        "url": "php/preciosServicios.php"
    }).done(function(slider) {
        $("#precios").html(slider);
    });
}

function selectorServicios() {
    $.ajax({
        "url": "php/selectorServicios.php"
    }).done(function(options) {
        $("#selectServicios").append(options);
        $("#selectReserva").html(options);
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
    });
}

function enviarReserva() {
    var nombre = $("#nombreReserva").val();
    var apellidos = $("#apellidosReserva").val();
    var email = $("#emailReserva").val();
    var telefono = $("#telefonoReserva").val();
    var fecha = $("#fecha").val();
    var hora = $("#hora").val();

    var reserva = {
        "nombre": nombre,
        "apellidos": apellidos,
        "email": email,
        "telefono": telefono,
        "fecha": fecha,
        "hora": hora,
        "servicioId": idServicioReserva
    }

    $.ajax({
        "url": "php/enviarReserva.php",
        "method": "POST",
        "data": reserva
    }).done(function(options) {});
}

function filtrarSelector(fecha, hora) {
    var filtros = {
        "fecha": fecha,
        "hora": hora
    };
    $.ajax({
        "url": "php/filtroReserva.php",
        "method": "POST",
        "data": filtros
    }).done(function(options) {
        console.log(options);
        $("#selectReserva").html(options);
    });
}