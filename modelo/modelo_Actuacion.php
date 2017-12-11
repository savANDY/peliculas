<?php
require_once '../controlador/conector.php';
class modelo_actuacion{
  private $link;
  private $pelicula;

  public function __construct(){
    $this->link=Conectar::conexion();
    $this->pelicula=array();
  }

  // public function insertar_actuacion($idActor,$esProtagonista){
  //   $consulta=$this->link->query("CALL insertar_actuacion('$idActor','$esProtagonista')");
  // }

}
?>
