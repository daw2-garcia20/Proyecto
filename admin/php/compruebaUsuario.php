<?php

session_start();

if(isset($_SESSION['usuario'])){
    if($_SESSION['rol'] == 1){
        echo "Administrador";
    }else{
        $id = $_SESSION['id'];
        echo $id;
    }
}else{
    echo "ERROR";
}