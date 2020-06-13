$(document).ready(eventos);

toastr.options = {
    timeOut: 2000,
    progressBar: true,
    showMethod: "slideDown",
    hideMethod: "slideUp",
    showDuration: 200,
    hideDuration: 200,
    positionClass: "toast-top-center",
};

function eventos() {
    $("#inicioSesion").click(iniciarSesion);
}

function iniciarSesion() {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    var usuario = {
        username: username,
        password: password
    }

    $.ajax({
        url: "php/inicioSesion.php",
        method: "POST",
        data: usuario
    }).done(function(respuesta) {
        if (respuesta == "OK") {
            location.href = "/Proyecto/admin";
        } else {
            toastr.error(respuesta);
        }
    });
}