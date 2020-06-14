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


var autores = "";

function eventos() {
    obtenerInfoUsuario();
    obtenerAutores();
    obtenerNoticias();
    editar_eliminar_datatable();
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

function obtenerAutores() {
    $.ajax({
        "url": "php/obtenerAutores.php"
    }).done(function(autoresPHP) {
        autores = JSON.parse(autoresPHP);
        console.log(autores);
    });
}

function obtenerNoticias() {
    $.ajax({
        "url": "php/obtenerNoticias.php"
    }).done(function(noticias) {
        rellenarTabla(JSON.parse(noticias));
    });
}

function rellenarTabla(datos) {
    tabla = $("#tabla").DataTable({
        destroy: true,
        "dom": "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>",
        "data": datos,
        "columnDefs": [{
                "title": "Id",
                "targets": [0],
                "visible": false,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Titulo",
                "targets": [1],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Foto",
                "targets": [2],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Descripcion",
                "targets": [3],
                "visible": true,
                "searchable": true,
                "sortable": true
            },

            {
                "title": "Autor",
                "targets": [4],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Fecha",
                "targets": [5],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Visitas",
                "targets": [6],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "",
                "targets": [7],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "",
                "targets": [8],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "",
                "targets": [9],
                "visible": true,
                "searchable": false,
                "sortable": false
            }
        ],
        "columns": [{
                data: "id",
                render: function(id) {
                    return '<input disabled class="id form-control position-static" type="text" value="' + id + '">'
                }
            },
            {
                data: "titulo",
                render: function(titulo) {
                    return '<input disabled class="titulo form-control position-static" type="text" value="' + titulo + '">'
                }
            },
            {
                data: "foto",
                render: function(foto) {
                    return '<input disabled class="foto form-control position-static" type="text" value="' + foto + '">'
                }
            },
            {
                data: "descripcion",
                render: function(descripcion) {
                    return '<input disabled class="descripcion form-control position-static" type="text" value="' + descripcion + '">'
                }
            },
            {
                data: "autor",
                render: function(autor) {

                    var selector = '<select disabled class="autor form-control">';

                    Object.keys(autores).forEach(function(key) {
                        if (autores[key].id == autor) {
                            selector += `<option selected value="${autores[key].id}">${autores[key].nombre}</option>`;
                        } else {
                            selector += `<option value="${autores[key].id}">${autores[key].nombre}</option>`;
                        }
                    });

                    selector += '</select>';
                    return selector;
                }
            },
            {
                data: "fecha",
                render: function(fecha) {
                    return '<input disabled class="fecha form-control position-static" type="text" value="' + fecha + '">'
                }
            },
            {
                data: "visitas",
                render: function(visitas) {
                    return '<input disabled class="visitas form-control position-static" type="text" value="' + visitas + '">'
                }
            },
            {
                "defaultContent": `<div class="text-center">
                                    <i type="button" class="editar boton fas fa-pencil-alt fa-2x"></i>
                                </div>`
            },
            {
                "defaultContent": `<div class="text-center">
                                    <i type="button" disabled=true class="guardar boton fas fa-save fa-2x"></i>
                                </div>`
            },
            {
                "defaultContent": `<div class="text-center">
                                    <i type="button" class="eliminar boton fas fa-trash fa-2x"></i>
                                </div>`
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
}

function editar_eliminar_datatable() {

    var tbody = "#tabla";
    var habilitar = 1;
    var editar = 0;

    $(tbody).on("click", "i.editar", function() {

        if (habilitar == 1) {
            $(this).parents("tr").find('.id').attr("disabled", false);
            $(this).parents("tr").find('.titulo').attr("disabled", false);
            $(this).parents("tr").find('.foto').attr("disabled", false);
            $(this).parents("tr").find('.descripcion').attr("disabled", false);
            $(this).parents("tr").find('.autor').attr("disabled", false);
            $(this).parents("tr").find('.fecha').attr("disabled", false);
            $(this).parents("tr").find('.visitas').attr("disabled", false);
            $(this).parents("tr").find('.guardar').attr("disabled", false);
            habilitar = 0;
        } else if (habilitar == 0) {
            $(this).parents("tr").find('.id').attr("disabled", true);
            $(this).parents("tr").find('.titulo').attr("disabled", true);
            $(this).parents("tr").find('.foto').attr("disabled", true);
            $(this).parents("tr").find('.descripcion').attr("disabled", true);
            $(this).parents("tr").find('.autor').attr("disabled", true);
            $(this).parents("tr").find('.fecha').attr("disabled", true);
            $(this).parents("tr").find('.visitas').attr("disabled", true);
            $(this).parents("tr").find('.guardar').attr("disabled", true);
            habilitar = 1;
        }
        editar = 1;

    });

    $(tbody).on("click", "i.guardar", function() {

        if (editar == 1) {

            var id = tabla.row($(this).parents("tr")).data();
            id = id.id;
            var titulo = $(this).parents("tr").find('.titulo').val();
            var foto = $(this).parents("tr").find('.foto').val();
            var descripcion = $(this).parents("tr").find('.descripcion').val();
            var autor = $(this).parents("tr").find('.autor').val();
            var fecha = $(this).parents("tr").find('.fecha').val();
            var visitas = $(this).parents("tr").find('.visitas').val();

            var noticia = {
                id: id,
                titulo: titulo,
                foto: foto,
                descripcion: descripcion,
                autor: parseInt(autor),
                fecha: fecha,
                visitas: parseInt(visitas)
            }


            $.ajax({
                url: "php/modificarNoticia.php",
                method: "POST",
                data: noticia
            }).done(function() {
                habilitar = 1;
                eventos();
            })
        }
    });


    $(tbody).on("click", "i.eliminar", function() {
        var id = tabla.row($(this).parents("tr")).data();
        id = id.id;

        var datos = {
            id: id
        }
        $.ajax({
            url: "php/eliminarNoticia.php",
            method: "POST",
            data: datos
        }).done(function(respuesta, textStatus) {
            eventos();
        });
    });
}

function logOut() {
    $.ajax({
        url: "php/cerrarSesion.php",
    }).done(function(respuesta, textStatus) {
        location.href = "login.html";
    });
}