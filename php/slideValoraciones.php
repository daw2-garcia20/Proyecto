<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.valoracion.php");
     require("class.servicio.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $valoraciones = new Valoracion($objPDO);
     $valoraciones = $valoraciones->All();

     $html = '';
     
     for($cont = 0; $cont < 3 ; $cont++){
        $objValoracion = new Valoracion($objPDO, $valoraciones[$cont]);
        $objValoracion->Load();
        $objServicio = new Servicio($objPDO, $objValoracion->getServicioID());
 
            $html .= '<!-- Service -->';
            $html .= '<div class="testimonial d-flex flex-column align-items-center justify-content-center text-center trans_200 col-3 mr-4">';
            $html .= '<div class="testimonial_image imagenValoracion">';
            $html .= '<div><img src="images/user.png" class="svg" alt=""></div>';
            $html .= '</div>';
            $html .= '<div class="testimonial_title">' . $objValoracion->getNombreCliente() . '</div>';
            $html .= '<div class="testimonial_text textoValoracion">';
            $html .= '<div class="service_text trans_200">';
            $html .= '<p>' . "\"" . $objValoracion->getComentario() . "\"" . '</p>';
            $html .= '</div>';
            $html .= '</div>';  
            $html .= '<div class="text-center">';
            $html .= '<div class="text-center mt-3">';
            $html .= '<h2>' . $objValoracion->getValoracion() . ' / 5 </h3>';
            $html .= '</div>';
            $html .= '</div>';   
            $html .= '<div class="testimonial_author">' . $objServicio->getNombre() . '</div>';
            $html .= '</div>';
     }


     echo $html;

?>