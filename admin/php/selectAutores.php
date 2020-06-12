<?php
     require("../../php/class.pdofactory.php");
     require("../../php/abstract.databoundobject.php");
     require("../../php/class.usuario.php");
 
     $strDSN = "pgsql:dbname=vogue;host=localhost;port=5432;";
     $objPDO = PDOFactory::GetPDO($strDSN, "postgres", "root", array());
     $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $autores = new Usuario($objPDO);
     $autores = $autores->All();

     $selector = "";

     $selector =  '<option class="opcionAutor" value="">Selecciona un autor.</option>';

     foreach($autores as $autor){
        $objAutor = new Usuario($objPDO, $autor);
        $objAutor->Load();
        $selector .= '<option class="opcionAutor" name=' . $objAutor->getNombre() . ' value=' . $objAutor->getID() . '>' . $objAutor->getNombre() . '</option>';
     }

     echo $selector;

     ?>