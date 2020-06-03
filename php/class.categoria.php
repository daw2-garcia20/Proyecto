<?php

class Categoria extends DataBoundObject {

        protected $ID;
        protected $Nombre;

        protected function DefineTableName() {
                return("categorias");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombre" => "Nombre"));
        }
}

?>
