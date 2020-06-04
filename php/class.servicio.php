<?php

class Servicio extends DataBoundObject {

        protected $ID;
        protected $Nombre;
        protected $Precio;
        protected $Foto;
        protected $Descripcion;
        protected $CategoriaID;

        protected function DefineTableName() {
                return("servicios");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombre" => "Nombre",
                        "descripcion" => "Descripcion",
                        "foto" => "Foto",
                        "precio" => "Precio",
                        "categoriaId" => "CategoriaID"));
        }
}

?>
