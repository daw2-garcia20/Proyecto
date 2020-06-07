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

   /*  $objServicio = new Servicio($objPDO); */

    //$objServicio->setNombre("Depilación Mujer")->setPrecio("30€")->setCategoriaID(2)->Save();

    $objNoticia = new Noticia($objPDO);
    $objNoticia->setAutor("Administrador")->setFoto("/images/tendencia.jpg")->setTitulo("Aquí te presentamos una de las tendencias de otoño – invierno")->setDescripcion("Cada año tenemos tendencias e influencias de lo que más se va a llevar, pues una de las propuestas son los BOB LONG, con Balayage. Atrévete a dar el paso, seguro no te arrepientes. Antes las tendencias eran cuadriculadas es decir todos debíamos de llevar esta o esa medida, y este o ese color, hoy en día las cosas han cambiado, se lleva lo que a ti te sienta bien ( dándole un toque de actualidad).")->setFecha(date("Y-m-d H:i:s"))->setVisitas(149)->Save();

?>