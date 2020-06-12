$(document).ready(eventos);

var autor = 0;

function eventos() {
    selectorAutores();
    $("#añadirNoticia").click(añadirNoticia);
    $("#autores").change(function() {
        autor = $(this).val();
    })
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