<?php

class Noticia extends DataBoundObject {

        protected $ID;
        protected $Autor;
        protected $Foto;
        protected $Titulo;
        protected $Descripcion;

        protected function DefineTableName() {
                return("noticias");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "autor" => "Autor",
                        "foto" => "Foto",
                        "titulo" => "Titulo",
                        "descripcion" => "Descripcion"));
        }
}

?>
