<?php

class Reserva extends DataBoundObject {

        protected $ID;
        protected $Fecha;
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
                        "fecha" => "Fecha",
                        "completada" => "Completada",
                        "cancelada" => "Cancelada",
                        "servicioId" => "ServicioID",
                        "trabajadorId" => "TrabajadorID"));
        }
}

?>
