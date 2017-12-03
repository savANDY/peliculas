<?php
if (isset($_GET['pelicula'])) {
  require_once("vista/pelicula.php");
} else {
require_once("vista/inicio.php");
}
?>
