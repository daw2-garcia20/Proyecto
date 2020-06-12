$(document).ready(eventos);

var categoria = 0;

function eventos() {
    selectorCategorias();
    $("#añadirServicio").click(añadirServicio);
    $("#categorias").change(function() {
        categoria = $(this).val();
    })
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