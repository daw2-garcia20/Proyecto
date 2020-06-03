<?php

class Rol extends DataBoundObject {

        protected $ID;
        protected $Nombre;

        protected function DefineTableName() {
                return("roles");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombre" => "Nombre"));
        }
}

?>
