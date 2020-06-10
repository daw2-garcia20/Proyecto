$(document).ready(eventos);

var roles = "";

function eventos() {
    obtenerRoles();
    obtenerUsuarios();
    editar_eliminar_datatable();
}

function obtenerRoles() {
    $.ajax({
        "url": "php/obtenerRoles.php"
    }).done(function(rolesPHP) {
        roles = JSON.parse(rolesPHP);
    });
}

function obtenerUsuarios() {
    $.ajax({
        "url": "php/obtenerUsuarios.php"
    }).done(function(usuarios) {
        rellenarTabla(JSON.parse(usuarios));
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
                "title": "Username",
                "targets": [1],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Password",
                "targets": [2],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Nombre",
                "targets": [3],
                "visible": true,
                "searchable": true,
                "sortable": true
            },

            {
                "title": "Apellidos",
                "targets": [4],
                "visible": true,
                "searchable": true,
                "sortable": true
            },
            {
                "title": "Admin",
                "targets": [5],
                "visible": true,
                "searchable": false,
                "sortable": false
            },
            {
                "title": "Rol",
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
                data: "username",
                render: function(username) {
                    return '<input disabled class="username form-control position-static" type="text" value="' + username + '">'
                }
            },
            {
                data: "password",
                render: function(password) {
                    return '<input disabled class="password form-control position-static" type="text" value="' + password + '">'
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
                data: "admin",
                render: function(admin) {
                    var check = "";
                    if (admin) {
                        check = `<div class="form-check text-center">
                        <input disabled checked class="admin form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    } else {
                        check = `<div class="form-check text-center">
                        <input disabled class="admin form-check-input position-static largerCheckbox" type="checkbox">
                        </div>`;
                    }
                    return check;
                }
            },
            {
                data: "rolId",
                render: function(rolId) {

                    var selector = '<select disabled class="rol form-control">';

                    Object.keys(roles).forEach(function(key) {
                        if (roles[key].id == rolId) {
                            selector += `<option selected value="${roles[key].id}">${roles[key].nombre}</option>`;
                        } else {
                            selector += `<option value="${roles[key].id}">${roles[key].nombre}</option>`;
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
            $(this).parents("tr").find('.username').attr("disabled", false);
            $(this).parents("tr").find('.password').attr("disabled", false);
            $(this).parents("tr").find('.nombre').attr("disabled", false);
            $(this).parents("tr").find('.apellidos').attr("disabled", false);
            $(this).parents("tr").find('.admin').attr("disabled", false);
            $(this).parents("tr").find('.rol').attr("disabled", false);
            $(this).parents("tr").find('.guardar').attr("disabled", false);
            habilitar = 0;
        } else if (habilitar == 0) {
            $(this).parents("tr").find('.id').attr("disabled", true);
            $(this).parents("tr").find('.username').attr("disabled", true);
            $(this).parents("tr").find('.password').attr("disabled", true);
            $(this).parents("tr").find('.nombre').attr("disabled", true);
            $(this).parents("tr").find('.apellidos').attr("disabled", true);
            $(this).parents("tr").find('.admin').attr("disabled", true);
            $(this).parents("tr").find('.rol').attr("disabled", true);
            $(this).parents("tr").find('.guardar').attr("disabled", true);
            habilitar = 1;
        }
        editar = 1;

    });

    $(tbody).on("click", "i.guardar", function() {

        if (editar == 1) {

            var id = tabla.row($(this).parents("tr")).data();
            id = id.id;
            var username = $(this).parents("tr").find('.username').val();
            var password = $(this).parents("tr").find('.password').val();
            var nombre = $(this).parents("tr").find('.nombre').val();
            var apellidos = $(this).parents("tr").find('.apellidos').val();
            var admin = $(this).parents("tr").find('.admin').prop('checked');
            var rol = $(this).parents("tr").find('.rol').val();

            var usuario = {
                id: id,
                username: username,
                password: password,
                nombre: nombre,
                apellidos: apellidos,
                admin: admin,
                rol: parseInt(rol)
            }

            $.ajax({
                url: "php/modificarUsuario.php",
                method: "POST",
                data: usuario
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
            url: "php/eliminarUsuario.php",
            method: "POST",
            data: datos
        }).done(function(respuesta, textStatus) {
            eventos();
        });
    });
}