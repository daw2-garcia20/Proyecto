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

var autor = 0;

function eventos() {
    obtenerInfoUsuario();
    selectorAutores();
    $("#añadirNoticia").click(añadirNoticia);
    $("#autores").change(function() {
        autor = $(this).val();
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

function selectorAutores() {
    $.ajax({
        url: "php/selectAutores.php"
    }).done(function(options) {
        console.log(options);
        $("#autores").html(options);
    });
}

function añadirNoticia() {
    var titulo = $("#titulo").val();
    var descripcion = $("#descripcion").val();
    var foto = $("#foto").val();

    var noticia = {
        titulo: titulo,
        descripcion: descripcion,
        foto: foto,
        autor: parseInt(autor)
    }

    $.ajax({
        url: "php/añadirNoticia.php",
        method: "POST",
        data: noticia
    });
}

function logOut() {
    $.ajax({
        url: "php/cerrarSesion.php",
    }).done(function(respuesta, textStatus) {
        location.href = "login.html";
    });
}