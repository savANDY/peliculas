<?php

require_once("../modelo/modelo_Pelicula.php");
$cont=new modelo_pelicula();

$idPelicula = $_POST['data'];

  $datos=$cont->get_detallesPelicula($idPelicula);

   $ikasleak= json_encode($datos);
     print $ikasleak;
?>
