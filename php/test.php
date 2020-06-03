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

    /* $objCategoria = new Categoria($objPDO, 2);

    $objCategoria->Load();

    echo $objCategoria->getID();
    echo $objCategoria->getNombre(); */

    $objServicio = new Servicio($objPDO);

    //$objServicio->setNombre("Depilación Mujer")->setPrecio("30€")->setCategoriaID(2)->Save();



?>