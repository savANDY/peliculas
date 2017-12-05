<?php
require_once '../controlador/conector.php';
class modelo_pelicula{
  private $link;
  private $pelicula;

  public function __construct(){
    $this->link=Conectar::conexion();
    $this->pelicula=array();
  }

  public function get_peliculas(){
    $sql="CALL peliculas_con_director()";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->pelicula[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->pelicula;
  }

  public function get_detallesPelicula($id){
    $sql="CALL pelicula_por_id('$id')";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->pelicula[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->pelicula;
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
    $sql = "CALL insertar_pelicula('$titulo','$anyo','$director','$cartel')";
    print $sql;
    $consulta=$this->link->query($sql);

  }

  public function insertar_actuacion($arrayActuacion){
    // print "array entero: " . $arrayActuacion;
    // print " array 1: " . $arrayActuacion[0];
    // print " array 2: " . $arrayActuacion[1];
    for($i=0; $i < count($arrayActuacion); $i++){
      $partido = explode("-", $arrayActuacion[$i]);
    //  print_r($partido);
      $idActor = $partido[0];
      $esProtagonista = $partido[1];
    $consulta=$this->link->query("CALL insertar_actuacion('$idActor','$esProtagonista')");
  }
  }

  // public function insertar_matricula($ikasle_id,$modulo_id){
  //   $consulta=$this->link->query("CALL sp_insertar_matricula('$ikasle_id', '$modulo_id')");
  // }
  //
  // public function borrar_ikasle($ikasle_id){
  //   $consulta=$this->link->query("CALL sp_borrar_ikasle('$ikasle_id')");
  // }

  public function borrarPelicula($pelicula_id){
    $sql="CALL borrar_pelicula('$pelicula_id')";
    $consulta=$this->link->query($sql);
    while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
    {
      $this->pelicula[]=$row;
    }
    $consulta->free_result();
    $this->link->close();
    return $this->pelicula;
  }



}
?>
