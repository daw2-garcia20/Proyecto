<?php

class Reserva extends DataBoundObject {

        protected $ID;
        protected $Nombre;
        protected $Apellidos;
        protected $Fecha;
        protected $Hora;
        protected $Completada;
        protected $Cancelada;
        protected $ServicioID;
        protected $TrabajadorID;

        protected function DefineTableName() {
                return("reservas");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombre" => "Nombre",
                        "apellidos" => "Apellidos",
                        "fecha" => "Fecha",
                        "hora" => "Hora",
                        "completada" => "Completada",
                        "cancelada" => "Cancelada",
                        "servicio_id" => "ServicioID",
                        "trabajadorId" => "TrabajadorID"));
        }
}

?>
