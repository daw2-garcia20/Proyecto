<?php

class Usuario extends DataBoundObject {

        protected $ID;
        protected $NombreUsuario;
        protected $Password;
        protected $Nombre;
        protected $Apellidos;
        protected $Admin;
        protected $RolID;

        protected function DefineTableName() {
                return("usuarios");
        }

        protected function DefineRelationMap() {
                return(array(
                        "id" => "ID",
                        "username" => "NombreUsuario",
                        "password" => "Password",
                        "nombre" => "Nombre",
                        "apellidos" => "Apellidos",
                        "admin" => "Admin",
                        "rolId" => "RolID"));
        }
}

?>