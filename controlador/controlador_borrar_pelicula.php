<?php

require_once("../modelo/modelo_Pelicula.php");
$cont=new modelo_pelicula();

$idPelicula = $_POST['data'];

  $datos=$cont->borrarPelicula($idPelicula);

   $pelicula= json_encode($datos);
     print $pelicula;
?>
