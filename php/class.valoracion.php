<?php

class Valoracion extends DataBoundObject {

        protected $ID;
        protected $NombreCliente;
        protected $Comentario;
        protected $Valoracion;
        protected $ServicioID;

        protected function DefineTableName() {
                return("valoraciones");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "nombreCliente" => "NombreCliente",
                        "comentario" => "Comentario",
                        "valoracion" => "Valoracion",
                        "servicioId" => "ServicioID"));
        }
}

?>