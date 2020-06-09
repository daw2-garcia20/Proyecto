<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.servicio.php");
     require("class.reserva.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $objReserva = new Reserva($objPDO);
     $objReserva->setCompletada(0)->setCancelada(0)->setServicioID($_POST['servicioId'])->setTrabajadorID(1)->setNombre($_POST['nombre'])->setApellidos($_POST['apellidos'])->setFecha($_POST['fecha'])->setHora(str_replace(":","",$_POST['hora']) . "00")->Save();

?>