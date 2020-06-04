<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.valoracion.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $objValoracion = new Valoracion($objPDO);
     $objValoracion->setNombreCliente($_POST['nombre'] . " " . $_POST['apellidos'])->setComentario($_POST['comentario'])->setValoracion($_POST['valoracion'])->setServicioID($_POST['idServicio'])->Save();

     

?>