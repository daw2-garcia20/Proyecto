<?php
     require("class.pdofactory.php");
     require("abstract.databoundobject.php");
     require("class.noticia.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $noticias = new Noticia($objPDO);
     $noticias->LoadMoreViews();


    $html .= '<div class="single_article d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">';
    $html .= '<div class="single_article_image"><img src=".' . $noticias->getFoto() . '" alt=""></div>';
    $html .= '<div class="single_article_content">';
    $html .= '<div class="sigle_article_date"><a href="#">' . date($noticias->getFecha()) . '</a></div>';
    $html .= '<div class="single_article_title"><a href="#">' . $noticias->getTitulo() . '</a></div>';
    $html .= '<div class="single_article_text">';
    $html .= '<p>' . $noticias->getDescripcion() . '</p>';
    $html .= '</div>';
    $html .= '<div class="single_article_author d-flex flex-row align-items-center justify-content-start">';
    $html .= '<div>';
    $html .= '<div class="article_author_image">';
    $html .= '<a href="#"><img src="images/user.png" alt=""></a>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '<div class="single_article_author_name"><a href="#">' . $noticias->getAutor() . '</a></div>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';

    echo $html;

?>