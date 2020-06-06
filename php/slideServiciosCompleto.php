<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.servicio.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     $html = '';
     
     foreach($servicios as $servicio){
        $objServicio = new Servicio($objPDO, $servicio);
        $objServicio->Load();
 
            $html .= '<!-- Service -->';
            $html .= '<div class="service d-flex flex-row align-items-center justify-content-start trans_200 col-3 mr-4">';
            $html .= '<div class="service_icon">';
            $html .= '<div><img src=".' . $objServicio->getFoto() . '" class="svg" alt="' . $objServicio->getNombre() . '"></div>';
            $html .= '</div>';
            $html .= '<div class="service_content">';
            $html .= '<div class="service_title trans_200">' . $objServicio->getNombre() . '</div>';
            $html .= '<div class="service_text trans_200">';
            $html .= '<p>' . $objServicio->getDescripcion() . '</p>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
     }


     echo $html;

?>