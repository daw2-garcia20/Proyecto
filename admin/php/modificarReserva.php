<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.reserva.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     $objReserva = new Reserva($objPDO, $_POST['id']);
     $objReserva->setNombre($_POST['nombre'])->setApellidos($_POST['apellidos'])->setFecha($_POST['fecha'])->setHora($_POST['hora'])->setServicioID($_POST['servicio'])->setTrabajadorID($_POST['trabajador'])->setCompletada($_POST['completada'])->setCancelada($_POST['cancelada'])->Save();