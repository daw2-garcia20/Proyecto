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

var rol = 0;

function eventos() {
    obtenerInfoUsuario();
    selectorRoles();
    $("#añadirUsuario").click(añadirUsuario);
    $("#roles").change(function() {
        rol = $(this).val();
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

function selectorRoles() {
    $.ajax({
        url: "php/selectRoles.php"
    }).done(function(options) {
        console.log(options);
        $("#roles").html(options);
    });
}

function añadirUsuario() {
    var username = $("#username").val();
    var password = $("#password").val();
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var admin = $("#admin").prop("checked");

    var usuario = {
        username: username,
        password: password,
        nombre: nombre,
        apellidos: apellidos,
        admin: admin,
        rol: parseInt(rol)
    }

    $.ajax({
        url: "php/añadirUsuario.php",
        method: "POST",
        data: usuario
    });
}

function logOut() {
    $.ajax({
        url: "php/cerrarSesion.php",
    }).done(function(respuesta, textStatus) {
        location.href = "login.html";
    });
}