<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.noticia.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayNoticias = array();

     $noticias = new Noticia($objPDO);
     $noticias = $noticias->All();

     foreach($noticias as $noticia){
         $objNoticia = new Noticia($objPDO, $noticia);
         $objNoticia->Load();

         $noticia = array(
             "id" => $objNoticia->getID(),
             "autor" => $objNoticia->getAutor(),
             "foto" => $objNoticia->getFoto(),
             "titulo" => $objNoticia->getTitulo(),
             "descripcion" => $objNoticia->getDescripcion(),
             "fecha" => $objNoticia->getFecha(),
             "visitas" => $objNoticia->getVisitas()
         );

         array_push($arrayNoticias, $noticia);
     }

     echo json_encode($arrayNoticias);
 
?>