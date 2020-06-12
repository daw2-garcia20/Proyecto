<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.categoria.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $arrayCategorias = array();

     $categorias = new Categoria($objPDO);
     $categorias = $categorias->All();

     foreach($categorias as $categoria){
         $objCategoria = new Categoria($objPDO, $categoria);
         $objCategoria->Load();

         $categoria = array(
            "id" => $objCategoria->getID(),
            "nombre" => $objCategoria->getNombre()
        );

        array_push($arrayCategorias, $categoria);
    }

    echo json_encode($arrayCategorias);
 
?>