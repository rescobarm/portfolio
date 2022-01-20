<?php
    ////Localhost
    require_once "../conexion.php";
    ////server
    //require_once "../../../conexion.php";
    //all
    require_once "./al_models.php";

    class CALGlobalQrys //CONSULTAS GLOBALES DE CARGAS ACADÉMICAS
    {
        private $m_cllctn;
        private $db_cntx;
        public function __construct()
        {
            $this->m_cllctn = array();
            $this->db_cntx = conexionMySQL();
        }

    }

    class CGlobalQueries 
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

        public function SetSerialsSubject(array $arr)
        {
            $t = "MATERIAS SERIADA CORRÉCTAMENTE";
            $idMTmp = 0;
            foreach($arr as $a )
            {
                $this->SetIsSerialSubject($a->{'idMateria'}, 1, $idMTmp);
                $idMTmp = $a->{'idMateria'};
            }
            return $t;
        }

        public function SetIsSerialSubject($idSubject, $isSerial, $idMateriaPadre) {
            $sql = "UPDATE `materias` 
                SET `esSeriada` = '$isSerial',
                `idMateriaPadre` = '$idMateriaPadre' 
                WHERE (`idMateria` = $idSubject);";
            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
        }

        /********AC V0.001******************** */

        public function GetAcademicLoadByIdG_IdC($IdG, $IdC)
        {
            //$IdG = 603;            
            //$IdC=30;
            $sql = "CALL SP_CA_V0_001($IdG, $IdC);";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function GetSchoolCycle()
        {
            $sql = "SELECT 0 As idSCycle, cicloactual As SchoolCycle FROM grupos WHERE cicloactual is not null AND TRIM(cicloactual) != ''
                    GROUP BY cicloactual ORDER BY cicloactual DESC;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getAllGroups() {
            //self::setNames();
            $sql = "SELECT idGrupo, Nombre, visible As Active FROM grupos ORDER BY Nombre;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getGroupPA()
        {
            $sql = "SELECT DISTINCT(g.idGrupo) As idGrupo, 
                        g.Nombre, 
                        g.fechainicio, 
                        g.Carreras_idCarrera,
                        concat_ws(' en ', c.Grado, c.Nombre) As Carrera,
                        g.anio, 
                        g.mes,
                        g.cuatrimestregrupo
                            FROM 
                                grupos g, 
                                mkprospectos mk,
                                carreras c
                                    WHERE g.idGrupo=mk.idGrupo 
                                        AND g.Carreras_idCarrera = c.idCarrera
                                        AND mk.estatusce='Pendientealta' 
                                            ORDER BY g.Nombre;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;            
            /*
                SELECT DISTINCT(grupos.idGrupo), grupos.Nombre, grupos.anio, grupos.mes 
                    FROM grupos, mkprospectos 
                        WHERE grupos.idGrupo=mkprospectos.idGrupo 
                            AND mkprospectos.estatusce='Pendientealta' ORDER BY Nombre
                            #AND Carreras_idCarrera=$idc ORDER BY Nombre
            */
        }

        public function getGroupsByAC($AC) {
            //self::setNames();
            $sql = "SELECT 
                        g.idGrupo, 
                        g.Nombre,
                        g.fechainicio, 
                        g.Carreras_idCarrera,
                        ( 
                            SELECT concat_ws(' ', c.Grado, c.Nombre, c.Modalidad) 
                                FROM carreras c 
                                    WHERE c.idCarrera = g.Carreras_idCarrera ) As Carrera,
                        g.visible As Active FROM grupos g
                                WHERE g.cicloactual = '$AC' ORDER BY g.fechainicio DESC;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        /******AVAILABILITY TEACHERS******* */

        public function DeleteTeacherAvailable($idDisponibilidad) {
            $sql = "UPDATE `ca_disponibilidadmaestro` SET `activo` = '0' WHERE (`idDisponibilidad` = $idDisponibilidad);";
            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
        }

        public function GetTeachersAvailableBySubject($idSubject) {
            $sql = "SELECT
                        d.idDisponibilidad, 
                        d.idMaestro, 
                        d.idMateria,
                        d.disPrioridad,
                        concat_ws(' ', m.Nombre, m.Apaterno, m.Amaterno) as Nombre,
                        m.Grado,
                        m.Sexo,
                        d.activo 
                            FROM ca_disponibilidadmaestro d, maestros m
                                WHERE d.idMaestro = m.idMaestro
                                    AND d.idMateria = $idSubject 
                                    AND d.activo = 1
                                        ORDER BY d.disPrioridad ASC;";//4736
            //$sql = "CALL SP_Cargas_Academicas_Activate(4736);";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function GetHTeachersByIdSubject($idSubject) {
            $sql = "SELECT 
                        0 As idDisponibilidad, 
                        m.idMaestro, 
                        0 As idMateria,
                        0 As disPrioridad,
                        concat_ws(' ', m.Nombre, m.Apaterno, m.Amaterno) as Nombre,
                        m.Grado,
                        m.Sexo,
                        0 As activo 
                            FROM maestros m WHERE m.idMaestro in 
                                (
                                    SELECT Maestros_idMaestro FROM cargas_academicas WHERE idCargasAcademicas in
                                        (
                                            SELECT idCargasAcademicas FROM cargas_academicas_calificadas
                                        )
                                    AND Materias_idMateria = $idSubject
                                );";//4736
            //$sql = "CALL SP_Cargas_Academicas_Activate(4736);";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function GetTeachersAvailableById($idDisponibility) {
            //self::setNames();
            $sql = "SELECT
                        d.idDisponibilidad, 
                        d.idMaestro, 
                        d.idMateria,
                        d.disPrioridad,
                        concat_ws(' ', m.Nombre, m.Apaterno, m.Amaterno) as Nombre,
                        m.Grado,
                        m.Sexo,
                        d.activo 
                            FROM ca_disponibilidadmaestro d, maestros m
                                WHERE d.idMaestro = m.idMaestro
                                    AND d.idDisponibilidad = $idDisponibility 
                                    AND d.activo = 1;";

            $result = $this->db_cntx->query($sql);
            // in case you need an array
            $row = $result->fetch_assoc();
            // OR in case you need just a single value
            $value = $row;//$result->fetch_row()[0] ?? false;
            $this->db_cntx->close();
            return $value;
            $this->db_cntx = null;
        }


        public function GetCareersByCoor($coor) {
            $sql = "CALL SP_CA_CarrerasByCrdncns('$coor');";//4736
            //$sql = "CALL SP_Cargas_Academicas_Activate(4736);";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
        /************************************* */

        public function setAvailibility($idAuxiliar, $idMaestro, $idMateria) {
            $sql = "CALL SP_CA_SetUpdateDisponibilidad($idAuxiliar, $idMaestro, $idMateria);";
            $result = $this->db_cntx->query($sql);
            // in case you need an array
            $row = $result->fetch_assoc();
            // OR in case you need just a single value
            $value = $row;//$result->fetch_row()[0] ?? false;
            $this->db_cntx->close();
            return $value;
            $this->db_cntx = null;
        }

        public function getAllCareers()
        {
            /*$sql = "SELECT idCarrera, 
                        concat_ws(' - ', concat_ws(' en ', Grado, Nombre), 
                            CASE Modalidad
                            WHEN 'Línea' 
                                THEN 'en línea' 
                            ELSE Modalidad
                        END
                        )  As Nombre, Modalidad,
                        revoe, vigenciarevoe, modalidadsep FROM carreras ORDER BY Nombre;";*/
            $sql = "SELECT idCarrera, 
                        concat_ws(' - ', concat_ws(' en ', Grado, Nombre), 
                            CASE 
                                WHEN modalidadsep = 'Mixto' AND Modalidad = 'Línea'
                                    THEN 'MIXTA-SEL'
                                WHEN modalidadsep = 'Mixto' AND Modalidad = 'Presencial'
                                    THEN 'MIXTA'
                                WHEN modalidadsep = 'No escolarizado'
                                    THEN 'NO ESCOLARIZADA'
                                WHEN modalidadsep = 'Mixto' AND Modalidad = 'Mixto'
                                    THEN 'MIXTA'
                                ELSE modalidadsep
                            END
                        )  As Nombre, Modalidad,
                        revoe, vigenciarevoe, modalidadsep FROM carreras ORDER BY Nombre;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getSubjecstByIdCareer($idSubject) {
            //self::setNames();
            $sql = "SELECT idMateria, Nombre, true As Active, Cuatrimestre, duracion, esSeriada
                        FROM materias 
                            WHERE Carreras_idCarrera = $idSubject 
                                ORDER BY Carreras_idCarrera, Cuatrimestre;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
          }

        public function getTeachers() {
            //self::setNames();
            $sql = "SELECT idMaestro, 
                        concat_ws(' ', Nombre, Apaterno, Amaterno,
                            CASE Grado
                                WHEN 'Maestría' 
                                    THEN 'Maestro'
                                WHEN 'Doctorado' 
                                    THEN 'Doctor'
                                WHEN 'Licenciatura'
                                    THEN 'Licenciado'
                            ELSE Grado END
                        ) As Nombre, true As Active 
                        FROM maestros ORDER BY Grado, Nombre;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getTeacherDisponibilitiesByIdTeacher($idTeacher) {
            //self::setNames();
            $sql = "SELECT 
                      dm.idDisponibilidad,
                      concat_ws(' ', ca.Grado, ca.Nombre, ca.Modalidad) as Programa,
                      ma.Nombre As Materia,
                      ma.Cuatrimestre, 
                      ma.duracion, 
                      dm.disPrioridad, 
                      dm.disPromedio,
                      ma.idMateria
                        FROM ca_disponibilidadmaestro dm
                          INNER JOIN materias ma ON dm.idMateria = ma.idMateria
                          INNER JOIN maestros te ON dm.idMaestro = te.idMaestro
                          INNER JOIN carreras ca ON ma.Carreras_idCarrera = ca.idCarrera
                            WHERE te.idMaestro = $idTeacher
                              AND dm.activo = 1 
                                ORDER BY ma.Carreras_idCarrera, Cuatrimestre;";      
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
      
        public function getGroupsByIdCarrera($idCarrera) {
            //self::setNames();
            /*$sql = "SELECT idGrupo, concat_ws(' - ', Nombre, modalidad) As Nombre FROM grupos WHERE idCarrera 
                      in (SELECT idCarrera FROM materias WHERE idCarrera 
                      in (SELECT idCarrera FROM carreras WHERE idCarrera = $idCarrera))
                        ORDER BY Nombre;";*/
      
            $sql = "CALL SP_CA_GruposNuevos_ByIdCarrera($idCarrera)";
                        
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getAcademicLoadsByIdGroup($idGroup) {
            $sql = "CALL SP_Cargas_Academicas_ByIdGrupo($idGroup);";
            
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function setTeacherDisponibility($idAuxiliar, $idMaestro, $idMateria) {
          //self::setNames();
            //$sql = "INSERT INTO `ca_disponibilidadmaestro` (`idCarrera`, `idMaestro`, `idMateria`) VALUES ($idCarrera, $idMaestro, $idMateria);";
            //$sql = "INSERT INTO `disponibilidadmaestro` (`idMaestro`, `idMateria`,`idCarrera`) VALUES ($idMaestro, $idMateria, $idCarrera);";
            $disPrioridad = 0;
            $disPromedio = 0;
            $sql = "INSERT INTO `ca_disponibilidadmaestro` 
                             (`idMaestro`, `idMateria`,`disPrioridad`,`disPromedio`,`fhCreacion`,`activo`,`idAuxiliar`) 
                      VALUES ($idMaestro, $idMateria, $disPrioridad, $disPromedio, current_date(),1,$idAuxiliar);";
            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return mysqli_insert_id($this->db_cntx);
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
        }

        public function getTeacherDisponibilityById($idDisponibility) {
            //self::setNames();
            $sql = "SELECT 
                      dm.idDisponibilidad,
                      concat_ws(' ', ca.Grado, ca.Nombre, ca.Modalidad) as Programa,
                      ma.Nombre As Materia,
                      ma.Cuatrimestre, 
                      ma.duracion, 
                      dm.disPrioridad, 
                      dm.disPromedio,
                      ma.idMateria
                        FROM ca_disponibilidadmaestro dm
                          INNER JOIN materias ma ON dm.idMateria = ma.idMateria
                          INNER JOIN maestros te ON dm.idMaestro = te.idMaestro
                          INNER JOIN carreras ca ON ma.Carreras_idCarrera = ca.idCarrera
                            WHERE dm.idDisponibilidad = $idDisponibility
                              AND dm.activo = 1;";

            $result = $this->db_cntx->query($sql);
            // in case you need an array
            $row = $result->fetch_assoc();
            // OR in case you need just a single value
            $value = $row;//$result->fetch_row()[0] ?? false;
            $this->db_cntx->close();
            return $value;
            $this->db_cntx = null;
        }

        public function updateSubjectDurationById($_idSubject, $_duration, $idAuxiliar) {
            //self::setNames();UPDATE materias SET duracion = 6 WHERE idMateria = 29;
            $sql = "UPDATE `materias` 
                        SET `duracion` = $_duration
                            WHERE (`idMateria` = $_idSubject);";
            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
          }

        public function updateTeacherPriorityById($idDisponibility, $priority, $idAuxiliar) {
            //self::setNames();
            $sql = "UPDATE `ca_disponibilidadmaestro` 
                        SET `disPrioridad` = $priority,
                            `idAuxiliar` = $idAuxiliar,
                            `fhUpdate` = current_timestamp()
                            WHERE (`idDisponibilidad` = $idDisponibility);";
            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
        }
      
        public function deleteTeacherDisponibility($idDisponibility) {
            //self::setNames();
            $sql = "UPDATE ca_disponibilidadmaestro SET activo = 0, 
                        fhUpdate = current_timestamp() WHERE (`idDisponibilidad` = $idDisponibility);";      
            try {
              $result = $this->db_cntx->query($sql);     
              $this->db_cntx->close();
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

        public function validateHi($idAL, $idSubject, $idGroup, $idTeacher, $hi, $hf) {

            $sql = "SELECT fn_ca_verificarCargaHoraria(true, $idAL, $idSubject, $idGroup,'$hi', '$hf', $idTeacher)  AS RM;";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function updateHi($idAL, $hi) {

            $sql = "UPDATE cargas_academicas 
                        SET horaInicio = '$hi' 
                            WHERE (idCargasAcademicas = $idAL);";

            $result = $this->db_cntx->query($sql);      
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx->close();
            $this->db_cntx = null;
        }

        public function validateHf($idAL, $idSubject, $idGroup, $idTeacher, $hi, $hf) {
            $sql = "SELECT fn_ca_verificarCargaHoraria(false, $idAL, $idSubject, $idGroup,'$hi', '$hf', $idTeacher)  AS RM;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function updateHf($idAL, $hf) {

            $sql = "UPDATE cargas_academicas 
                        SET horaFin = '$hf' 
                            WHERE (idCargasAcademicas = $idAL);";

            $result = $this->db_cntx->query($sql);     
            $this->db_cntx->close(); 
            if ($result) {
                return true;
            } else {
                return false;
            }
            $this->db_cntx = null;
        }

        public function activateAL($idAL, $idTeacher, $idMateria, $idGrupo, $horaI, $horaF, $sessions, $idAuxiliar) 
        {
            $sql = "CALL SP_Cargas_Academicas_AsignaHorarios($idAL, $idTeacher, $idMateria, $idGrupo, '$horaI', '$horaF', '$sessions', '$idAuxiliar');";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        /* * * CONSULTAS*DE*CALENDARIO*ESCOLAR * * */
        
        public function getAcademicCalendar($idPeriodo) {
            $sql = "SELECT * FROM ca_calendario ORDER BY fecha DESC;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function setAcademiLoad($idCA, $idSchoolCycle, $fecha, $descripcion, $es_inhabil, $activo)
        {
            $sql = "INSERT INTO ca_calendario(fecha, descripcion, es_inhabil, activo)
                        VALUES('$fecha', '$descripcion', $es_inhabil, $activo);";

            //$sql = "INSERT INTO ca_calendario (fecha, descripcion, es_inhabil, activo) 
            // VALUES ('".$ac->date."','".$ac->description."', $ih , $av);";

            $result = $this->db_cntx->query($sql);     
            $id = mysqli_insert_id($this->db_cntx);
            $this->db_cntx->close(); 
            if ($result) {
                return $id;
            } else {
                return false;
            }
            $this->db_cntx = null;
        }
        /******************************************* */

        public function getAcademicLoadByIdGroup($idGroup) {
            $sql = "CALL SP_Cargas_Academicas_ByIdGrupo($idGroup);";
            /*$sql = "SELECT 
                  CA.idCargasAcademicas,
                  CA.Maestros_idMaestro As idMaestro,
                  CA.Materias_idMateria As idMateria,
                  CA.Grupos_idGrupo As idGrupo,
                  CA.estatus,
                  MA.duracion,
                  GP.fechainicio,
                  concat_ws(' - ',concat_ws(' ', ME.Nombre, ME.Apaterno, ME.Amaterno), ME.Grado) As Maestro,
                  MA.Nombre As Materia,
                  MA.Cuatrimestre As Cuatrimestre,
                  'sesiones' AS sesiones
                  FROM cargas_academicas CA
                  INNER JOIN grupos GP ON CA.Grupos_idGrupo = GP.idGrupo
                  INNER JOIN maestros ME ON CA.Maestros_idMaestro = ME.idMaestro
                  INNER JOIN materias MA ON CA.Materias_idMateria = MA.idMateria
                      WHERE CA.Grupos_idGrupo = $idGroup
                          ORDER BY MA.Cuatrimestre;";*/
            //$sql = "CALL SP_Cargas_Academicas_ByIdGrupo($idGroup);select * FROM tbl_temp_academic_loads;";
            
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }


        public function getAcademicLoadById($idCargasAcademicas) {
            $sql = "CALL SP_Cargas_Academicas_ByIdCargasAcademica($idCargasAcademicas)";
      
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
      
        public function getTeacherDisponibilityByIdSubjec($idSubjec)
        {
            $sql = "SELECT 
                      DM.idMaestro,
                      concat_ws(' - ',concat_ws(' ', Nombre, Apaterno, Amaterno), Grado) As Maestro,
                      DM.disPrioridad As Prioridad
                        FROM ca_disponibilidadmaestro DM
                          INNER JOIN maestros MA ON DM.idMaestro = MA.idMaestro
                            WHERE DM.idMateria = $idSubjec
                              AND DM.activo = 1
                                ORDER BY DM.disPrioridad ASC;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
      
        public function getSessionsByIdS($idMaestro, $idMateria, $idGrupo) {
            $sql = "SELECT * FROM asignacionhorarios 
                      WHERE idmaestro = $idMaestro 
                        AND idmateria = $idMateria 
                        AND idgrupo = $idGrupo;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
      
        public function getAcademicLoadById_MMG($idMaestro, $idMateria, $idGrupo) {
            $sql = "SELECT idCargasAcademicas FROM cargas_academicas
                        WHERE (Maestros_idMaestro = $idMaestro) 
                          AND (Materias_idMateria = $idMateria) 
                          AND (Grupos_idGrupo = $idGrupo);";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getTeacherForDisponibilityByIdSubjec($idSubjec, $idGrupo)
        {
            /*$sql = "SELECT 
                      DM.idMaestro,
                      concat_ws(' - ',concat_ws(' ', Nombre, Apaterno, Amaterno), Grado) As Maestro,
                      DM.disPrioridad As Prioridad
                        FROM ca_disponibilidadmaestro DM
                          INNER JOIN maestros MA ON DM.idMaestro = MA.idMaestro
                            WHERE DM.idMateria = $idSubjec
                                AND DM.disPrioridad > 0
                                AND DM.activo = 1
                                ORDER BY DM.disPrioridad ASC;";*/
            $sql = "SELECT 
                        DM.idMaestro,
                        concat_ws(' - ',concat_ws(' ', Nombre, Apaterno, Amaterno), Grado) As Maestro,
                        DM.disPrioridad As Prioridad,                        
                        (
                            SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'Grupo', g.Nombre,
                                        'Carrera', c.Nombre, 
                                        'Materia', m.Nombre)) 
                                FROM cargas_academicas ca
                                    INNER JOIN grupos g 
                                        ON ca.Grupos_idGrupo = g.idGrupo
                                    INNER JOIN materias m
                                        ON ca.Materias_idMateria = m.idMateria
                                    INNER JOIN carreras c
                                        ON m.Carreras_idCarrera = c.idCarrera
                                WHERE ca.Maestros_idMaestro = MA.idMaestro
									AND ca.Estatus = 'Activo'
                                    AND g.anio = (SELECT anio FROM grupos WHERE idGrupo = $idGrupo)
                                        ORDER BY g.Nombre, c.Nombre, m.Nombre
                        ) AS JSONCargaAsignada
                        FROM ca_disponibilidadmaestro DM
                            INNER JOIN maestros MA ON DM.idMaestro = MA.idMaestro
                            WHERE DM.idMateria = $idSubjec
                                AND DM.disPrioridad > 0
                                AND DM.activo = 1
                                ORDER BY DM.disPrioridad ASC;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function getAssignedTeacherByIdSubjectAndGroup($idSubject, $idGroup)
        {
            $sql = "SELECT 
                        CA.Maestros_idMaestro As idMaestro,
                        concat_ws(' - ',concat_ws(' ', MA.Nombre, MA.Apaterno, MA.Amaterno), MA.Grado) As Maestro,
                        CA.Estatus As Active
                            FROM cargas_academicas As CA
                            INNER JOIN maestros  AS MA 
                            ON CA.Maestros_idMaestro = MA.idMaestro
                            WHERE CA.Materias_idMateria = $idSubject
                                AND CA.Grupos_idGrupo = $idGroup;";
            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        public function setAcademicLoad($idMaestro, $idMateria, $idGrupo, $interval, $user) {
            /*$sql = "INSERT INTO `cargas_academicas`  (
                      `Estatus`, `Maestros_idMaestro`, `Materias_idMateria`, 
                      `Grupos_idGrupo`, `activadopor`, `fechaasignacioncarga`, `estatusPago`) 
                          VALUES ('Inactivo', $idMaestro, $idMateria, $idGrupo, '$user', current_date(), 'NoDefinido');";*/
            $sql = "SELECT fn_ca_setAcademicLoad($idMaestro, $idMateria ,$idGrupo , 0, $interval, '$user')";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;

            /*$result = $this->db_cntx->query($sql);      
            if ($result) {
                return mysqli_insert_id($this->db_cntx);
            } else {
                return false;
            }
            $this->db_cntx = null;*/
          }
      
        public function updateAcademicLoad($idMaestro, $idMateria, $idGrupo, $old_idMaestro, $interval, $user) {
            //$sql = "UPDATE `cargas_academicas` SET `Maestros_idMaestro` = $idMaestro, `activadopor` = '$user' WHERE (`Maestros_idMaestro` = $old_idMaestro) AND (`Materias_idMateria` = $idMateria) AND (`Grupos_idGrupo` = $idGrupo);";
            $sql = "SELECT fn_ca_setAcademicLoad($idMaestro, $idMateria ,$idGrupo , $old_idMaestro, $interval, '$user');";
            $result = $this->db_cntx->query($sql);
            /*return $sql;*/
            $this->db_cntx->close();
            if ($result) {
                return $result; //mysqli_insert_id($this->db_cntx);
            } else {
                return false;
            }
            $this->db_cntx = null;
        }

        public function activateAcademicLoad($idAL) {
            $sql = "CALL SP_Cargas_Academicas_Activate($idAL);";//4736
            //$sql = "CALL SP_Cargas_Academicas_Activate(4736);";

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }

        /****************************************** */
        public function getALRptDatas($opt) {
            if($opt == 'SEL') {
                $sql = "(SELECT 
                            'Sin Disponibilidad' As label,
                            (SUM((SELECT COUNT(*) FROM materias Where Carreras_idCarrera = C.idCarrera)) 
                                -
                            SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera)))) As value
                            FROM carreras C
                        WHERE (grado like '%Maestría%' OR grado like '%Doctorado%') AND Modalidad = 'Línea' and modalidadsep = 'Mixto'
                            ORDER BY C.idCarrera Desc)
                                UNION ALL        
                        (SELECT 
                            'Con Disponibilidad' As label,
                            SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera))) AS value
                            FROM carreras C
                        WHERE (grado like '%Maestría%' OR grado like '%Doctorado%') AND Modalidad = 'Línea' #and modalidadsep = 'Mixto'
							ORDER BY Nombre); ";
            }
            elseif($opt == 'CAP') {
                $sql = "(SELECT 
                            'Sin Disponibilidad' As label,
                            (SUM((SELECT COUNT(*) FROM materias Where Carreras_idCarrera = C.idCarrera)) 
                                -
                            SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera)))) As value
                            FROM carreras C
                        WHERE (grado like '%Maestría%' OR grado like '%Doctorado%') AND Modalidad = 'Presencial' and modalidadsep = 'Mixto'
                            ORDER BY C.idCarrera Desc)
                                UNION ALL        
                        (SELECT 
                            'Con Disponibilidad' As label,
                            SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera))) AS value
                            FROM carreras C
                        WHERE (grado like '%Maestría%' OR grado like '%Doctorado%') AND Modalidad = 'Presencial' and modalidadsep = 'Mixto'
                            ORDER BY C.idCarrera Desc);";
            }
            elseif ($opt == 'CALP') { //CALP
                $sql = "(SELECT 
                'Materias' As label,
                (SUM((SELECT COUNT(*) FROM materias Where Carreras_idCarrera = C.idCarrera)) 
                    -
                SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera)))) As value
                FROM carreras C
                        WHERE grado like '%Licenciatura%' AND Modalidad = 'Presencial' and modalidadsep = 'Mixto'
                            ORDER BY Nombre)
                    UNION ALL        
            (SELECT 
                'Con Disponibilidad' As label,
                SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera))) AS value
                FROM carreras C
                        WHERE grado like '%Licenciatura%' AND Modalidad = 'Presencial' and modalidadsep = 'Mixto'
                            ORDER BY Nombre)";
            }
            elseif ($opt == 'CALL') {
                $sql = "(SELECT 
                            'Materias' As label,
                            (SUM((SELECT COUNT(*) FROM materias Where Carreras_idCarrera = C.idCarrera)) 
                                -
                            SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera)))) As value
                            FROM carreras C
                                WHERE grado like '%Licenciatura%' AND Modalidad = 'Línea' #and modalidadsep = 'Mixto'
                                    ORDER BY Nombre)
                            UNION ALL        
                        (SELECT 
                            'Con Disponibilidad' As label,
                                SUM((SELECT fn_numDisponibilidadPorMateria(C.idCarrera))) AS value
                                    FROM carreras C
                                        WHERE grado like '%Licenciatura%' AND Modalidad = 'Línea' #and modalidadsep = 'Mixto'
                                            ORDER BY Nombre)";
            }

            foreach ($this->db_cntx->query($sql) as $res) {
                $this->m_cllctn[] = $res;
            }
            $this->db_cntx->close();
            return $this->m_cllctn;
            $this->db_cntx = null;
        }
        /****************************************** */
        
        public function setSCDate($ac) {
            $ih = $ac->unskilled ? 1 : 0;
            $av = $ac->saved ? 1 : 0;
            $sql = "INSERT INTO ca_calendario (fecha, descripcion, es_inhabil, activo) 
                    VALUES ('".$ac->date."', 
                    '".$ac->description."', $ih , $av);";

            $result = $this->db_cntx->query($sql);
            $this->db_cntx->close();
            if ($result) {
                return mysqli_insert_id($this->db_cntx);
            } else {
                return false;
            }
            $this->db_cntx = null;
        }
    }
?>  
