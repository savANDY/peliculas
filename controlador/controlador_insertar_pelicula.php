<?php

require_once '../modelo/modelo_Pelicula.php';

$arrayActores = [];

 $titulo = htmlspecialchars(trim($_POST['Titulo']));
 $anyo = htmlspecialchars(trim($_POST['Anyo']));
 $director = htmlspecialchars(trim($_POST['Director']));
 $cartel = htmlspecialchars(trim($_POST['Cartel']));
$arrayActores = ($_POST['arrayActores']);
$cont = new modelo_pelicula();
//$cont->insertar_pelicula($titulo,$anyo,$director,$cartel);
$cont->insertar_actuacion($arrayActores);

?>
