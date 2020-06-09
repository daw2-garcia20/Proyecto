<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.servicio.php");
     require("class.reserva.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     $reservas = new Reserva($objPDO);
     $reservasFiltradas = $reservas->obtenerFiltrados($_POST['fecha'], $_POST['hora']);
     $totalReservas = count($reservasFiltradas);

     $html = '';

    $reservado = 0;

     $html .=  '<option id="opcionReserva" value="">Selecciona un servicio.</option>';

     foreach($servicios as $servicio){
        $reservado = 0; 
         $objServicio = new Servicio($objPDO, $servicio);
         $objServicio->Load();
         foreach($reservasFiltradas as $filtro){
            if($objServicio->getID() == $filtro){
                $reservado++; 
            }
         }
         if($reservado == 0){
            $html .= '<option id="opcionServicios" name=' . str_replace(" ","",$objServicio->getNombre()) . ' value=' . $objServicio->getID() . '>' . $objServicio->getNombre() . '</option>';
         }
     }
     
    echo $html;  
 
?>