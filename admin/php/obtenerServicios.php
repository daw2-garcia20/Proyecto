<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.servicio.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayServicios = array();

     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     foreach($servicios as $servicio){
         $objServicio = new Servicio($objPDO, $servicio);
         $objServicio->Load();

         $servicio = array(
            "id" => $objServicio->getID(),
            "nombre" => $objServicio->getNombre(),
            "precio" => $objServicio->getPrecio(),
            "categoriaId" => $objServicio->getCategoriaID(),
            "descripcion" => $objServicio->getDescripcion(),
            "foto" => $objServicio->getFoto()
        );

        array_push($arrayServicios, $servicio);
    }

    echo json_encode($arrayServicios);
 
?>