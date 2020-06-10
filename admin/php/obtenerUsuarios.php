<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.usuario.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayUsuarios = array();

     $usuarios = new Usuario($objPDO);
     $usuarios = $usuarios->All();

     foreach($usuarios as $usuario){
         $objUsuario = new Usuario($objPDO, $usuario);
         $objUsuario->Load();

         $usuario = array(
             "id" => $objUsuario->getID(),
             "username" => $objUsuario->getNombreUsuario(),
             "password" => $objUsuario->getPassword(),
             "nombre" => $objUsuario->getNombre(),
             "apellidos" => $objUsuario->getApellidos(),
             "admin" => $objUsuario->getAdmin(),
             "rolId" => $objUsuario->getRolID()
         );

         array_push($arrayUsuarios, $usuario);
     }

     echo json_encode($arrayUsuarios);
 
?>