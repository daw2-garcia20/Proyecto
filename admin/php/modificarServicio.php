<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.servicio.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objServicio = new Servicio($objPDO, $_POST['id']);
     $objServicio->setNombre($_POST['nombre'])->setPrecio($_POST['precio'])->setCategoriaID($_POST['categoria'])->setDescripcion($_POST['descripcion'])->setFoto($_POST['foto'])->Save();