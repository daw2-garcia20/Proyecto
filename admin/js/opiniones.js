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
var servicios = "";

function eventos() {
    obtenerInfoUsuario();
    obtenerServicios();
    obtenerOpiniones();
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

function obtenerServicios() {
    $.ajax({
        "url": "php/obtenerServicios.php"
    }).done(function(serviciosPHP) {
        servicios = JSON.parse(serviciosPHP);
    });
}

function obtenerOpiniones() {
    $.ajax({
        "url": "php/obtenerOpiniones.php"
    }).done(function(opiniones) {
        console.log(opiniones);
        rellenarTabla(JSON.parse(opiniones));
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
                "title": "Nombre",
                "targets": [1],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Comentario",
                "targets": [2],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Valoracion",
                "targets": [3],
                "visible": true,
                "searchable": true,
                "sortable": true
            },

            {
                "title": "Servicio",
                "targets": [4],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "",
                "targets": [5],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "",
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
            }
        ],
        "columns": [{
                data: "id",
                render: function(id) {
                    return '<input disabled class="id form-control position-static" type="text" value="' + id + '">'
                }
            },
            {
                data: "nombre",
                render: function(nombre) {
                    return '<input disabled class="nombre form-control position-static" type="text" value="' + nombre + '">'
                }
            },
            {
                data: "comentario",
                render: function(comentario) {
                    return '<input disabled class="comentario form-control position-static" type="text" value="' + comentario + '">'
                }
            },
            {
                data: "valoracion",
                render: function(valoracion) {
                    return '<input disabled class="valoracion form-control position-static" type="text" value="' + valoracion + '">'
                }
            },
            {
                data: "servicioId",
                render: function(servicioId) {

                    var selector = '<select disabled class="servicio form-control">';

                    Object.keys(servicios).forEach(function(key) {
                        if (servicios[key].id == servicioId) {
                            selector += `<option selected value="${servicios[key].id}">${servicios[key].nombre}</option>`;
                        } else {
                            selector += `<option value="${servicios[key].id}">${servicios[key].nombre}</option>`;
                        }
                    });

                    selector += '</select>';
                    return selector;
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
            $(this).parents("tr").find('.nombre').attr("disabled", false);
            $(this).parents("tr").find('.comentario').attr("disabled", false);
            $(this).parents("tr").find('.valoracion').attr("disabled", false);
            $(this).parents("tr").find('.servicio').attr("disabled", false);
            $(this).parents("tr").find('.guardar').attr("disabled", false);
            habilitar = 0;
        } else if (habilitar == 0) {
            $(this).parents("tr").find('.id').attr("disabled", true);
            $(this).parents("tr").find('.nombre').attr("disabled", true);
            $(this).parents("tr").find('.comentario').attr("disabled", true);
            $(this).parents("tr").find('.valoracion').attr("disabled", true);
            $(this).parents("tr").find('.servicio').attr("disabled", true);
            $(this).parents("tr").find('.guardar').attr("disabled", true);
            habilitar = 1;
        }
        editar = 1;

    });

    $(tbody).on("click", "i.guardar", function() {

        if (editar == 1) {

            var id = tabla.row($(this).parents("tr")).data();
            id = id.id;
            var nombre = $(this).parents("tr").find('.nombre').val();
            var comentario = $(this).parents("tr").find('.comentario').val();
            var valoracion = $(this).parents("tr").find('.valoracion').val();
            var servicio = $(this).parents("tr").find('.servicio').val();

            var valoracion = {
                id: id,
                nombre: nombre,
                comentario: comentario,
                valoracion: valoracion,
                servicio: parseInt(servicio)
            }

            $.ajax({
                url: "php/modificarValoracion.php",
                method: "POST",
                data: valoracion
            }).done(function(respuesta) {
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
            url: "php/eliminarValoracion.php",
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