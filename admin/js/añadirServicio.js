$(document).ready(function() {
    $.ajax({
        "url": "php/compruebaUsuario.php"
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta == "ERROR") {
            location.href = "login.html";
        } else {
            if (respuesta == "Administrador") {
                eventos();
            } else {
                location.href = "agenda.html";
            }

        }
    });
});

var categoria = 0;

function eventos() {
    obtenerInfoUsuario();
    selectorCategorias();
    $("#añadirServicio").click(añadirServicio);
    $("#categorias").change(function() {
        categoria = $(this).val();
    });
    $("#cerrarSesion").click(logOut);
}

function obtenerInfoUsuario() {
    $.ajax({
        "url": "php/infoUsuario.php"
    }).done(function(respuesta) {
        console.log(respuesta);
        $("#nombreUsuario").html(respuesta);
    });
}

function selectorCategorias() {
    $.ajax({
        url: "php/selectCategorias.php"
    }).done(function(options) {
        $("#categorias").html(options);
    });
}

function añadirServicio() {
    var nombre = $("#nombre").val();
    var precio = $("#precio").val();
    var descripcion = $("#descripcion").val();
    var foto = $("#foto").val();

    var servicio = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        foto: foto,
        categoria: parseInt(categoria),
    }

    $.ajax({
        url: "php/añadirServicio.php",
        method: "POST",
        data: servicio
    });
}

function logOut() {
    $.ajax({
        url: "php/cerrarSesion.php",
    }).done(function(respuesta, textStatus) {
        location.href = "login.html";
    });
}