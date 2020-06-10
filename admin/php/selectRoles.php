<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.rol.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $roles = new Rol($objPDO);
     $roles = $roles->All();

     $selector = "";

     $selector =  '<option class="opcionRol" value="">Selecciona un servicio.</option>';

     foreach($roles as $rol){
        $objRol = new Rol($objPDO, $rol);
        $objRol->Load();
        $selector .= '<option class="opcionRol" name=' . $objRol->getNombre() . ' value=' . $objRol->getID() . '>' . $objRol->getNombre() . '</option>';
     }

     echo $selector;

     ?>