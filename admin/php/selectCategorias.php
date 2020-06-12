<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.categoria.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $categorias = new Categoria($objPDO);
     $categorias = $categorias->All();

     $selector = "";

     $selector =  '<option class="opcionCategoria" value="">Selecciona una categoría.</option>';

     foreach($categorias as $categoria){
        $objCategoria = new Categoria($objPDO, $categoria);
        $objCategoria->Load();
        $selector .= '<option class="opcionCategoria" name=' . $objCategoria->getNombre() . ' value=' . $objCategoria->getID() . '>' . $objCategoria->getNombre() . '</option>';
     }

     echo $selector;

     ?>