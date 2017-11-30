<?php

require_once("../modelo/modelo_Actor.php");
$cont=new modelo_actor();
$datos=$cont->get_actores();

 $actor= json_encode($datos);
   print $actor;
?>
