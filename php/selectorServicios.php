<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.servicio.php");
     require("class.valoracion.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     $selector = "";

     $selector =  '<option id="opcionReserva" value="">Selecciona un servicio.</option>';

     foreach($servicios as $servicio){
        $objServicio = new Servicio($objPDO, $servicio);
        $objServicio->Load();
        $selector .= '<option id="opcionServicios" name=' . str_replace(" ","",$objServicio->getNombre()) . ' value=' . $objServicio->getID() . '>' . $objServicio->getNombre() . '</option>';
     }

     echo $selector;

     ?>