$(document).ready(eventos);

function eventos() {
    $("#añadirRol").click(añadirRol);
}

function añadirRol() {
    var nombre = $("#nombre").val();

    var rol = {
        nombre: nombre,
    }

    $.ajax({
        url: "php/añadirRol.php",
        method: "POST",
        data: rol
    });
}