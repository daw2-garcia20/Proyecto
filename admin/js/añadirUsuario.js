$(document).ready(eventos);

var rol = 0;

function eventos() {
    selectorRoles();
    $("#añadirUsuario").click(añadirUsuario);
    $("#roles").change(function() {
        rol = $(this).val();
    })
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