<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.noticia.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objNoticia = new Noticia($objPDO, $_POST['id']);
     $objNoticia->setAutor($_POST['autor'])->setFoto($_POST['foto'])->setTitulo($_POST['titulo'])->setFecha($_POST['fecha'])->setVisitas($_POST['visitas'])->setDescripcion($_POST['descripcion'])->Save();
 
?>