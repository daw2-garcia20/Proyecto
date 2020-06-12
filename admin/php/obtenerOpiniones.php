<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.valoracion.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayValoraciones = array();

     $valoraciones = new Valoracion($objPDO);
     $valoraciones = $valoraciones->All();

     foreach($valoraciones as $valoracion){
         $objValoracion = new Valoracion($objPDO, $valoracion);
         $objValoracion->Load();

         $valoracion = array(
            "id" => $objValoracion->getID(),
            "nombre" => $objValoracion->getNombreCliente(),
            "comentario" => $objValoracion->getComentario(),
            "valoracion" => $objValoracion->getValoracion(),
            "servicioId" => $objValoracion->getServicioID()
        );

        array_push($arrayValoraciones, $valoracion);
    }

    echo json_encode($arrayValoraciones);
 
?>