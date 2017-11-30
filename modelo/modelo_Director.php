<?php
require_once '../controlador/conector.php';
class modelo_director{
    private $link;
    private $director;

    public function __construct(){
        $this->link=Conectar::conexion();
        $this->director=array();
         }

    public function get_directores(){
       $sql="SELECT * FROM directores";
       $consulta=$this->link->query($sql);
         while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
           {
            $this->director[]=$row;
           }
       $consulta->free_result();
       $this->link->close();
       return $this->director;
      }
}
?>
