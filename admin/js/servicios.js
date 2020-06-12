$(document).ready(eventos);

var categorias = "";

function eventos() {
    obtenerCategorias();
    obtenerServicios();
    editar_eliminar_datatable();
}

function obtenerServicios() {
    $.ajax({
        "url": "php/obtenerServicios.php"
    }).done(function(serviciosPHP) {
        rellenarTabla(JSON.parse(serviciosPHP));
    });
}

function obtenerCategorias() {
    $.ajax({
        "url": "php/obtenerCategorias.php"
    }).done(function(categoriasPHP) {
        categorias = JSON.parse(categoriasPHP);
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
                "title": "Precio",
                "targets": [2],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Categoria",
                "targets": [3],
                "visible": true,
                "searchable": true,
                "sortable": true
            },

            {
                "title": "Descripción",
                "targets": [4],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Foto",
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
            },
            {
                "title": "",
                "targets": [8],
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
                data: "precio",
                render: function(precio) {
                    return '<input disabled class="precio form-control position-static" type="text" value="' + precio + '">'
                }
            },
            {
                data: "categoriaId",
                render: function(categoriaId) {

                    var selector = '<select disabled class="categoria form-control">';

                    Object.keys(categorias).forEach(function(key) {
                        if (categorias[key].id == categoriaId) {
                            selector += `<option selected value="${categorias[key].id}">${categorias[key].nombre}</option>`;
                        } else {
                            selector += `<option value="${categorias[key].id}">${categorias[key].nombre}</option>`;
                        }
                    });

                    selector += '</select>';
                    return selector;
                }
            },
            {
                data: "descripcion",
                render: function(descripcion) {
                    return '<input disabled class="descripcion form-control position-static" type="text" value="' + descripcion + '">'
                }
            },
            {
                data: "foto",
                render: function(foto) {
                    return '<input disabled class="foto form-control position-static" type="text" value="' + foto + '">'
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
            $(this).parents("tr").find('.precio').attr("disabled", false);
            $(this).parents("tr").find('.categoria').attr("disabled", false);
            $(this).parents("tr").find('.descripcion').attr("disabled", false);
            $(this).parents("tr").find('.foto').attr("disabled", false);
            $(this).parents("tr").find('.guardar').attr("disabled", false);
            habilitar = 0;
        } else if (habilitar == 0) {
            $(this).parents("tr").find('.id').attr("disabled", true);
            $(this).parents("tr").find('.nombre').attr("disabled", true);
            $(this).parents("tr").find('.precio').attr("disabled", true);
            $(this).parents("tr").find('.categoria').attr("disabled", true);
            $(this).parents("tr").find('.descripcion').attr("disabled", true);
            $(this).parents("tr").find('.foto').attr("disabled", true);
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
            var precio = $(this).parents("tr").find('.precio').val();
            var categoria = $(this).parents("tr").find('.categoria').val();
            var descripcion = $(this).parents("tr").find('.descripcion').val();
            var foto = $(this).parents("tr").find('.foto').val()

            var servicio = {
                id: id,
                nombre: nombre,
                precio: precio,
                categoria: categoria,
                descripcion: descripcion,
                foto: foto
            }

            $.ajax({
                url: "php/modificarServicio.php",
                method: "POST",
                data: servicio
            }).done(function(respuesta) {
                console.log(respuesta);
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
            url: "php/eliminarServicio.php",
            method: "POST",
            data: datos
        }).done(function(respuesta, textStatus) {
            eventos();
        });
    });
}