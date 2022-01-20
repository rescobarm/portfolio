<?php
    require_once "./conexion.php";
    //require_once "../conexion.php";
    require_once "./academic_calendar/models.php";

    class CSchoolCalendarCtllr 
    {
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
        
        public function setSCDate($ac) {
            $ih = $ac->unskilled ? 1 : 0;
            $av = $ac->saved ? 1 : 0;
            $sql = "INSERT INTO ca_calendario (fecha, descripcion, es_inhabil, activo) 
                    VALUES ('".$ac->date."', 
                    '".$ac->description."', $ih , $av);";

            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return mysqli_insert_id($this->db_cntx);
            } else {
                return false;
            }
            $this->db_cntx = null;
        }
    }
?>