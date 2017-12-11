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


  public function insertar_pelicula_y_actuaciones($titulo,$anyo,$director,$cartel,$arrayActores){
    $this->link->autocommit(false);
    $stop = false;


    if (!is_int($director)) {
      $sqlDirector = "CALL insertar_director('$director')";

      $result = $this->link->query($sqlDirector); // Intentamos hacer el primer query
      if ($this->link->errno) {
        $stop = true; // Si entro aqui, habra un error, entonces STOP!
        print "Error: " . $this->link->error . ". ";
      }
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
      $director = $row['ultimoId'];

    @mysqli_next_result($this->$result);


    //  $result->free_result();
  //    $this->link->close();
    }


    $sql1 = "CALL insertar_pelicula('$titulo','$anyo','$director','$cartel')";
    //print $sql;

    $result = $this->link->query($sql1); // Intentamos hacer el primer query
    if ($this->link->errno) {
      $stop = true; // Si entro aqui, habra un error, entonces STOP!
      print "Error: " . $this->link->error . ". ";
    }

    for($i=0; (($i < count($arrayActores)) && ($stop == false)); $i++){
      $partido = explode("-", $arrayActores[$i]);

      $idActor = $partido[0];
      $esProtagonista = $partido[1];

      $sql2 = "CALL insertar_actuacion('$idActor','$esProtagonista')";

      $result = $this->link->query($sql2); // Intentamos hacer el segundo query
      if ($this->link->errno) {
        $stop = true;
        print "Error: " . $this->link->error . ". ";
      }
    }

    if ($stop == false) { // Si no ha habido ningun error, se meteran a la base de datos todos los querys
      $this->link->commit();
      print "Datos insertados correctamente";
    } else {
      $this->link->rollback(); // Si hay error, se anulan todos los querys
      print "No se han metido datos a la base de datos";
    }
  }

  public function insertar_pelicula($titulo,$anyo,$director,$cartel){
    $sql = "CALL insertar_pelicula('$titulo','$anyo','$director','$cartel')";
    print $sql;
    $consulta=$this->link->query($sql);

  }

  public function insertar_actuacion($arrayActuacion){

    for($i=0; $i < count($arrayActuacion); $i++){
      $partido = explode("-", $arrayActuacion[$i]);

      $idActor = $partido[0];
      $esProtagonista = $partido[1];
      $consulta=$this->link->query("CALL insertar_actuacion('$idActor','$esProtagonista')");
    }
  }



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
