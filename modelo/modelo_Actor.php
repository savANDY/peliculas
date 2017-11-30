<?php
require_once '../controlador/conector.php';
class modelo_actor{
    private $link;
    private $actor;

    public function __construct(){
        $this->link=Conectar::conexion();
        $this->actor=array();
         }

    public function get_actores(){
       $sql="CALL actores_cuantas_peliculas()";
       $consulta=$this->link->query($sql);
         while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
           {
            $this->actor[]=$row;
           }
       $consulta->free_result();
       $this->link->close();
       return $this->actor;
      }

    public function insertar_ikasle($nombre,$edad,$curso){
        $consulta=$this->link->query("CALL sp_insertar_ikasle('$nombre', '$edad', '$curso')");

    }

    public function ultimo_id() {
      $sql="CALL sp_max_ikasle_id()";
      $consulta=$this->link->query($sql);
        $row = mysqli_fetch_array($consulta, MYSQLI_ASSOC);
        $this->id_ultimo=$row['idMax'];
      $consulta->free_result();
      $this->link->close();
      return $this->actor;
     }


    public function insertar_matricula($ikasle_id,$modulo_id){
      $consulta=$this->link->query("CALL sp_insertar_matricula('$ikasle_id', '$modulo_id')");
    }

public function borrar_ikasle($ikasle_id){
        $consulta=$this->link->query("CALL sp_borrar_ikasle('$ikasle_id')");

    }

public function modificar_ikasle($id,$nombre,$edad,$curso){
     $consulta=$this->link->query("CALL sp_modificar_ikasle('$id' , '$nombre', '$edad', '$curso')");
   }

}
?>
