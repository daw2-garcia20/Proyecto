<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.usuario.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objUsuario = new Usuario($objPDO);
     $id = $objUsuario->inicioSesion($_POST['username'],$_POST['password']);


     $usuario = new Usuario($objPDO, $id);
     $usuario->Load();

     if($usuario->getNombreUsuario() == $_POST['username']){
         if($usuario->getPassword() == $_POST['password']){
            echo "OK";
            session_start();
            $_SESSION['usuario'] = $usuario->getNombreUsuario();
            $_SESSION['rol'] = $usuario->getRolID();
            $_SESSION['id'] = $usuario->getID();
         }else{
             echo "Usuario o contraseña incorrectos";
         }
     }else{
         echo "Usuario o contraseña incorrectos";
     }

?>