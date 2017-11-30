<?php
if (isset($_GET['pelicula'])) {
  require_once("vista/pelicula.html");
} else {
require_once("vista/inicio.html");
}
?>
