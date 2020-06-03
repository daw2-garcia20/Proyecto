<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.categoria.php");
     require("class.noticia.php");
     require("class.reserva.php");
     require("class.rol.php");
     require("class.servicio.php");
     require("class.usuario.php");
     require("class.valoracion.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     $cont = 0;
     $html = '<div class="services" id="services">';
     $html .= '<div class="parallax_background" data-image-src="images/services.jpg"></div>';
     $html .= '<div class="container">';
     $html .= '<div class="row">';
     $html .= '<div class="section_title_container">';
     $html .= '<div class="section_title">';
     $html .= '<h1>Servicios</h1>';
     $html .= '</div>';
     $html .= '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris sceleri sque.</p>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '<div class="row services_row">';
     $html .= '<div class="col">';
     $html .= '<div class="section_expander">';
     $html .= '<!-- Services Slider -->';
     $html .= '<div class="services_slider_container">';
     $html .= '<div id="servicios" class="owl-carousel owl-theme services_slider">';
     $html .= '<div class="owl-item">';

     foreach($servicios as $servicio){
        $objServicio = new Servicio($objPDO, $servicio);
        $objServicio->Load();
        
         if($cont == 2){
            $html .= '</div>';
            $cont = 0;
            $html .= '<div class="owl-item">';
            $html .= '<!-- Service -->';
            $html .= '<div class="service d-flex flex-row align-items-center justify-content-start trans_200">';
            $html .= '<div class="service_icon">';
            $html .= '<div><img src="images/mirror.svg" class="svg" alt="https://www.flaticon.com/authors/freepik"></div>';
            $html .= '</div>';
            $html .= '<div class="service_content">';
            $html .= '<div class="service_title trans_200">' . $objServicio->getNombre() . '</div>';
            $html .= '<div class="service_text trans_200">';
            $html .= '<p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui ferme ntum eros hendrerit, id lobortis.</p>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
            $cont++;
         }else{
            $html .= '<!-- Service -->';
            $html .= '<div class="service d-flex flex-row align-items-center justify-content-start trans_200">';
            $html .= '<div class="service_icon">';
            $html .= '<div><img src="images/mirror.svg" class="svg" alt="https://www.flaticon.com/authors/freepik"></div>';
            $html .= '</div>';
            $html .= '<div class="service_content">';
            $html .= '<div class="service_title trans_200">' . $objServicio->getNombre() . '</div>';
            $html .= '<div class="service_text trans_200">';
            $html .= '<p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui ferme ntum eros hendrerit, id lobortis.</p>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
            $cont++;
         }
     }

     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';
     $html .= '</div>';

     echo $html;

?>