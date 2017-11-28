<?php
$mysqli = new mysqli("localhost", "root", "", "peliculas");
// Se desactiva el autocomit, entonces los querys no se haran automaticamente
$mysqli->autocommit(false);
$stop = false; // Usaremos esta variable para saber si hay errores

$sql1 = "INSERT INTO directores(idDirector, Nombre) VALUES (10, 'SpielBerg')";
$sql2 = "INSERT INTO peliculas(Titulo,anyo,idDirector,cartel) VALUES ('Tiburon', '1975', 30, '')";

$result = $mysqli->query($sql1); // Intentamos hacer el primer query
if ($mysqli->errno) {
  $stop = true; // Si entro aqui, habra un error, entonces STOP!
  echo "Error: " . $mysqli->error . ". ";
}
$result = $mysqli->query($sql2); // Intentamos hacer el segundo query
if ($mysqli->errno) {
  $stop = true;
  echo "Error: " . $mysqli->error . ". ";
}
if ($stop == false) { // Si no ha habido ningun error, se meteran a la base de datos todos los querys
  $mysqli->commit();
  echo "Datos insertados correctamente";
} else {
  $mysqli->rollback(); // Si hay error, se anulan todos los querys
  echo "No se han metido datos a la base de datos";
}
?>
