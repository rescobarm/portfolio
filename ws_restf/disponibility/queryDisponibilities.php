<?php
  require_once "../../../conexion.php";
  class CTeachersDataCtllr {

    private $m_cllctn;
    private $db_cntx;

    public function __construct()
    {
        $this->m_cllctn = array();
        $this->db_cntx = conexionMySQL();
    }

    private function setNames() {
      return $this->db_cntx->query("SET NAMES 'utf8'");
    }

    /* B E T A */

    //CAMBIAR ESTA CONSULTA A LA BASE ADECUADA
    public function getCarreras() {
      //self::setNames();
      $sql = "SELECT idCarrera, concat_ws(' ', Grado, Nombre, Modalidad) As Nombre  FROM carreras ORDER BY Nombre;";
      foreach ($this->db_cntx->query($sql) as $res) {
          $this->m_cllctn[] = $res;
      }
      return $this->m_cllctn;
      $this->db_cntx = null;
    }

    public function getDocentes() {
      //self::setNames();
      $sql = "SELECT idMaestro, concat_ws(' ', Nombre, Apaterno, Amaterno, ' - ',Grado) As Nombre FROM maestros ORDER BY Nombre;";
      foreach ($this->db_cntx->query($sql) as $res) {
          $this->m_cllctn[] = $res;
      }
      return $this->m_cllctn;
      $this->db_cntx = null;
    }

    public function getMateriasById($id) {
      //self::setNames();
      $sql = "SELECT idMateria, Nombre, Cuatrimestre, duracion FROM materias WHERE Carreras_idCarrera = $id order by idMateria;";
      foreach ($this->db_cntx->query($sql) as $res) {
          $this->m_cllctn[] = $res;
      }
      return $this->m_cllctn;
      $this->db_cntx = null;
    }

    public function getTeacherDisponibilityByIdTeacher($idTeacher) {
      //self::setNames();
      $sql = "SELECT 
                dm.idDisponibilidad as Id,
                concat_ws(' ', ca.Grado, ca.Nombre, ca.Modalidad) as Programa,
                ma.Nombre As Materia,
                ma.Cuatrimestre, 
                ma.duracion, 
                dm.disPrioridad As Propridad, 
                dm.disPromedio As Promedio,
                ma.idMateria
                  FROM ca_disponibilidadmaestro dm
                    INNER JOIN materias ma ON dm.idMateria = ma.idMateria
                    INNER JOIN maestros te ON dm.idMaestro = te.idMaestro
                    INNER JOIN carreras ca ON ma.Carreras_idCarrera = ca.idCarrera
                      WHERE te.idMaestro = $idTeacher
                        AND dm.activo = 1;";      
      foreach ($this->db_cntx->query($sql) as $res) {
          $this->m_cllctn[] = $res;
      }
      return $this->m_cllctn;
      $this->db_cntx = null;
    }

    public function getTeacherDisponibilityById($idDisponibility) {
      //self::setNames();
      $sql = "SELECT 
                dm.idDisponibilidad as Id,
                concat_ws(' ', ca.Grado, ca.Nombre, ca.Modalidad) as Programa,
                ma.Nombre As Materia,
                ma.Cuatrimestre, 
                ma.duracion, 
                dm.disPrioridad As Propridad, 
                dm.disPromedio As Promedio,
                ma.idMateria
                  FROM ca_disponibilidadmaestro dm
                    INNER JOIN materias ma ON dm.idMateria = ma.idMateria
                    INNER JOIN maestros te ON dm.idMaestro = te.idMaestro
                    INNER JOIN carreras ca ON ma.Carreras_idCarrera = ca.idCarrera
                      WHERE dm.idDisponibilidad = $idDisponibility
                        AND dm.activo = 1;";
                        
      foreach ($this->db_cntx->query($sql) as $res) {
          $this->m_cllctn[] = $res;
      }
      return $this->m_cllctn;
      $this->db_cntx = null;
    }

    public function setTeacherDisponibility($idCarrera, $idMaestro, $idMateria) {
      //self::setNames();
      //$sql = "INSERT INTO `ca_disponibilidadmaestro` (`idCarrera`, `idMaestro`, `idMateria`) VALUES ($idCarrera, $idMaestro, $idMateria);";
      //$sql = "INSERT INTO `disponibilidadmaestro` (`idMaestro`, `idMateria`,`idCarrera`) VALUES ($idMaestro, $idMateria, $idCarrera);";
      $disPrioridad = 0;
      $disPromedio = 0;
      $sql = "INSERT INTO `ca_disponibilidadmaestro` 
                       (`idMaestro`, `idMateria`,`disPrioridad`,`disPromedio`,`activo`,`idAuxiliar`) 
                VALUES ($idMaestro, $idMateria, $disPrioridad, $disPromedio,1,0);";
      $result = $this->db_cntx->query($sql);      
      if ($result) {
          return mysqli_insert_id($this->db_cntx);
      } else {
          return false;
      }
      $this->db_cntx = null;
    }

    public function updateTeacherPriorityById($idDisponibility, $priority) {
      //self::setNames();
      $sql = "UPDATE `ca_disponibilidadmaestro` SET `disPrioridad` = $priority WHERE (`idDisponibilidad` = $idDisponibility);";
      $result = $this->db_cntx->query($sql);      
      if ($result) {
          return true;
      } else {
          return false;
      }
      $this->db_cntx = null;
    }

    public function deleteTeacherDisponibility($idDisponibility) {
      //self::setNames();
      $sql = "UPDATE ca_disponibilidadmaestro SET activo = 0 WHERE (`idDisponibilidad` = $idDisponibility);";      
      try {
        $result = $this->db_cntx->query($sql);     
        if ($result) {
          return true;
        } else {
            return false;
        }
      } catch (Exception $e) {
          return $e->getMessage();
      }
      $this->db_cntx = null;
    }
  }
?>

