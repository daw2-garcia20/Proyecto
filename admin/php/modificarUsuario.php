<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.usuario.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objUsuario = new Usuario($objPDO, $_POST['id']);
     $objUsuario->setNombreUsuario($_POST['username'])->setPassword($_POST['password'])->setNombre($_POST['nombre'])->setApellidos($_POST['apellidos'])->setAdmin($_POST['admin'])->setRolID($_POST['rol'])->Save();
 
?>