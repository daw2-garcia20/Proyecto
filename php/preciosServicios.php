<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.servicio.php");
     require("class.categoria.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $categorias = new Categoria($objPDO);
     $categorias = $categorias->All();

     $servicios = new Servicio($objPDO);
     $servicios = $servicios->All();

     $html = '';
     
     foreach($categorias as $categoria){
          $objCategoria = new Categoria($objPDO, $categoria);
          $objCategoria->Load();

          $html .= '<div class="pricing_item col-4 mt-3">';
          $html .= '<div class="background_image" style="background-image:url(images/pricing.jpg)"></div>';
          $html .= '<div class="pricing_border"></div>';
          $html .= '<div class="pricing_content">';
          $html .= '<div class="pricing_title">' . $objCategoria->getNombre() . '</div>';
          $html .= '<div class="pricing_list">';
          $html .= '<ul>';

          foreach($servicios as $servicio){
               $objServicio = new Servicio($objPDO, $servicio);
               $objServicio->Load();
               if($objServicio->getCategoriaID() == $objCategoria->getID()){
                    $html .= '<li class="d-flex flex-row align-items-start justify-content-start">';
                    $html .= '<div>' . $objServicio->getNombre() . '</div>';
                    $html .= '<div class="ml-auto">' . $objServicio->getPrecio() . '</div>';
                    $html .= '</li>';
               }
          }
          $html .= '</ul>';
          $html .= '</div>';
          $html .= '</div>';
          $html .= '</div>';

     }


     echo $html;

?>