<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.rol.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayRoles = array();

     $roles = new Rol($objPDO);
     $roles = $roles->All();

     foreach($roles as $rol){
         $objRol = new Rol($objPDO, $rol);
         $objRol->Load();

         $rol = array(
            "id" => $objRol->getID(),
            "nombre" => $objRol->getNombre()
        );

        array_push($arrayRoles, $rol);
    }

    echo json_encode($arrayRoles);
 
?>