<?php
require_once '../controlador/conector.php';
class modelo_pelicula{
  private $link;
  private $usuario;

  public function __construct(){
    $this->link=Conectar::conexion();
    $this->usuario=array();
  }

  public function get_peliculas(){
    $sql="CALL peliculas_con_director()";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->usuario[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->usuario;
  }

  public function get_detallesPelicula($id){
    $sql="CALL pelicula_por_id('$id')";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->usuario[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->usuario;
  }

  public function modificar_pelicula($idPelicula,$titulo,$anyo,$director,$cartel){
    $consulta=$this->link->query("CALL modificar_pelicula('$idPelicula' , '$titulo', '$anyo', '$director', '$cartel')");
  }

  public function get_ultimoid(){
    $sql="SELECT max(idPelicula) ultimoId FROM peliculas";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->director[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->director;
  }


  public function insertar_pelicula($titulo,$anyo,$director,$cartel){
    $consulta=$this->link->query("CALL insertar_pelicula('$titulo','$anyo','$director','$cartel')");
  }

  public function insertar_matricula($ikasle_id,$modulo_id){
    $consulta=$this->link->query("CALL sp_insertar_matricula('$ikasle_id', '$modulo_id')");
  }

  public function borrar_ikasle($ikasle_id){
    $consulta=$this->link->query("CALL sp_borrar_ikasle('$ikasle_id')");

  }



}
?>
