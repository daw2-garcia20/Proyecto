<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.noticia.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $noticias = new Noticia($objPDO);
     $noticias = $noticias->All();

     $html = '';

     for($cont = 0; $cont < 3; $cont++){
        $objNoticia = new Noticia($objPDO, $noticias[$cont]);
        $objNoticia->Load();

        $html .= '<div class="article mr-3 ">';
        $html .= '<div class="article_image"><img src=".' . $objNoticia->getFoto() . '" alt="' . $objNoticia->getTitulo() . '"></div>';
        $html .= '<div class="article_container">';
        $html .= '<div class="article_title_container d-flex flex-row align-items-start justify-content-start">';
        $html .= '<div>';
        $html .= '<div class="article_author_image">';
        $html .= '<a href="#"><img src="images/user.png" alt=""></a>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '<div class="article_content">';
        $html .= '<div class="article_date"><a href="#">' . date($objNoticia->getFecha()) . '</a></div>';
        $html .= '<div class="article_title"><a class="tituloNoticiaBlanco" href="#">' . $objNoticia->getTitulo() . '</a></div>';
        $html .= '<div class="article_author"><a href="#">' . $objNoticia->getAutor() . '</a></div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
     }


     echo $html;

?>