<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.usuario.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objUsuario = new Usuario($objPDO, $_POST['id']);
     $objUsuario->MarkForDeletion();
     
 
?>