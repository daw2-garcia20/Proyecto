<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.reserva.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayReservas = array();

     $reservas = new Reserva($objPDO);
     $reservas = $reservas->Trabajador($_POST['id']); 

     foreach($reservas as $reserva){
         $objReserva = new Reserva($objPDO, $reserva);
         $objReserva->Load();

         $reserva = array(
             "id" => $objReserva->getID(),
             "completada" => $objReserva->getCompletada(),
             "cancelada" => $objReserva->getCancelada(),
             "servicioId" => $objReserva->getServicioID(),
             "trabajadorId" => $objReserva->getTrabajadorID(),
             "nombre" => $objReserva->getNombre(),
             "apellidos" => $objReserva->getApellidos(),
             "fecha" => $objReserva->getFecha(),
             "hora" => $objReserva->getHora()
         );

         array_push($arrayReservas, $reserva);
     }

     echo json_encode($arrayReservas); 
 
?>