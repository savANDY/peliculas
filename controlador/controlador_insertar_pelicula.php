<?php

require_once '../modelo/modelo_Pelicula.php';

$arrayActores = [];

 $titulo = htmlspecialchars(trim($_POST['Titulo']));
 $anyo = htmlspecialchars(trim($_POST['Anyo']));
 $director = htmlspecialchars(trim($_POST['Director']));
 $cartel = htmlspecialchars(trim($_POST['Cartel']));

$arrayActores = json_decode(stripslashes($_POST['arrayActores']));

//print "Array en controlador: " . $arrayActores[1];
$cont = new modelo_pelicula();
$cont->insertar_pelicula_y_actuaciones($titulo,$anyo,$director,$cartel,$arrayActores);
//$cont->insertar_actuacion($arrayActores);

?>
