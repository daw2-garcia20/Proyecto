<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.noticia.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objNoticia = new Noticia($objPDO);
     $objNoticia->setAutor($_POST['autor'])->setFoto($_POST['foto'])->setTitulo($_POST['titulo'])->setDescripcion($_POST['descripcion'])->setFecha(date("Y-m-d H:i:s"))->setVisitas(0)->Save();
 
?>