<?php

class Servicio extends DataBoundObject {

        protected $ID;
        protected $Nombre;
        protected $Precio;
        protected $CategoriaID;

        protected function DefineTableName() {
                return("servicios");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombre" => "Nombre",
                        "precio" => "Precio",
                        "categoriaId" => "CategoriaID"));
        }
}

?>
