$(document).ready(function() {
    $.ajax({
        "url": "php/compruebaUsuario.php"
    }).done(function(respuesta) {
        if (respuesta == "ERROR") {
            location.href = "login.html";
        } else {
            if (respuesta == "Administrador") {
                location.href = "login.html";
            } else {
                idTrabajador = respuesta;
                eventos();
            }

        }
    });
});

var servicios = "";
var trabajadores = "";

function eventos() {
    obtenerInfoUsuario();
    obtenerServicios();
    obtenerTrabajadores();
    obtenerReservas();
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

function obtenerTrabajadores() {
    $.ajax({
        "url": "php/obtenerTrabajadores.php"
    }).done(function(trabajadoresPHP) {
        trabajadores = JSON.parse(trabajadoresPHP);
    });
}

function obtenerReservas() {
    var id = {
        id: idTrabajador
    }
    $.ajax({
        url: "php/obtenerReservasTrabajador.php",
        method: "POST",
        data: id
    }).done(function(reservas) {
        console.log(reservas);
        rellenarTabla(JSON.parse(reservas));
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
                "title": "Apellidos",
                "targets": [2],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Fecha",
                "targets": [3],
                "visible": true,
                "searchable": true,
                "sortable": true
            },

            {
                "title": "Hora",
                "targets": [4],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Servicio",
                "targets": [5],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Completada",
                "targets": [6],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Cancelada",
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
                data: "nombre",
                render: function(nombre) {
                    return '<input disabled class="nombre form-control position-static" type="text" value="' + nombre + '">'
                }
            },
            {
                data: "apellidos",
                render: function(apellidos) {
                    return '<input disabled class="apellidos form-control position-static" type="text" value="' + apellidos + '">'
                }
            },
            {
                data: "fecha",
                render: function(fecha) {
                    return '<input disabled class="fecha form-control position-static" type="text" value="' + fecha + '">'
                }
            },
            {
                data: "hora",
                render: function(hora) {
                    return '<input disabled class="hora form-control position-static" type="text" value="' + hora + '">'
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
                data: "completada",
                render: function(completada) {
                    var check = "";
                    if (completada) {
                        check = `<div class="form-check text-center">
                        <input disabled checked class="completada form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    } else {
                        check = `<div class="form-check text-center">
                        <input disabled class="completada form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    }
                    return check;
                }
            },
            {
                data: "cancelada",
                render: function(cancelada) {
                    var check = "";
                    if (cancelada) {
                        check = `<div class="form-check text-center">
                        <input disabled checked class="cancelada form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    } else {
                        check = `<div class="form-check text-center">
                        <input disabled class="cancelada form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    }
                    return check;
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
            $(this).parents("tr").find('.completada').attr("disabled", false);
            $(this).parents("tr").find('.cancelada').attr("disabled", false);
            $(this).parents("tr").find('.guardar').attr("disabled", false);
            habilitar = 0;
        } else if (habilitar == 0) {
            $(this).parents("tr").find('.id').attr("disabled", true);
            $(this).parents("tr").find('.completada').attr("disabled", true);
            $(this).parents("tr").find('.cancelada').attr("disabled", true);
            $(this).parents("tr").find('.guardar').attr("disabled", true);
            habilitar = 1;
        }
        editar = 1;

    });

    $(tbody).on("click", "i.guardar", function() {

        if (editar == 1) {

            var id = tabla.row($(this).parents("tr")).data();
            id = id.id;
            var completada = $(this).parents("tr").find('.completada').prop("checked");
            var cancelada = $(this).parents("tr").find('.cancelada').prop("checked");

            var reserva = {
                completada: completada,
                cancelada: cancelada
            }

            $.ajax({
                url: "php/modificarReservaTrabajador.php",
                method: "POST",
                data: reserva
            }).done(function(respuesta) {
                console.log(respuesta);
                habilitar = 1;
                eventos();
            })
        }
    });
}

function logOut() {
    $.ajax({
        url: "php/cerrarSesion.php",
    }).done(function(respuesta, textStatus) {
        location.href = "login.html";
    });
}