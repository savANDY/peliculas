<?php

require_once '../modelo/modelo_Actuacion.php';
 $idActor = htmlspecialchars(trim($_POST['idActor']));
 $esProtagonista = htmlspecialchars(trim($_POST['esProtagonista']));
$cont = new modelo_actuacion();
$cont->insertar_actuacion($idActor,$esProtagonista);
?>
