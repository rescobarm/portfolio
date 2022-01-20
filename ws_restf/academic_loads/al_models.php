
<?php
    class IOPTRspns {
        public $opt;
        public $value;
        public $message;
    }

    class ICarrera {
        public $idCarrera;
        public $Nombre;
        public $Grado;
        public $Modalidad;
        public $revoe;
        public $vigenciarevoe;
        public $modalidadsep;
    }

    class IGroup {
        public $idGrupo; 
        public $Nombre; 
        public $Carreras_idCarrera; 
        public $anio; 
        public $gruposep; 
        public $mes; 
        public $activadopor; 
        public $cicloingreso; 
        public $cicloactual; 
        public $periodoingreso; 
        public $periodoactual; 
        public $cuatrimestregrupo; 
        public $estatusadmisiones; 
        public $visible; 
        public $vigenciacredencial; 
        public $fechaalta; 
        public $fechainicio;
    }

    class ITeacher {
        public $idMaestro;
        public $Nombre;
        public $Apaterno;
        public $Amaterno;
        public $Clave;
        public $Sexo;
        public $Grado;
        public $email;
        public $telefono;
        public $cedula;
        public $password;
    }

    class IDisponibilidadmaestro{
        public $idDisponibilidad;
        public $idMaestro;
        public $idMateria;
        public $disPrioridad;
        public $disPromedio;
        public $fhCreacion;
        public $fhUpdate;
        public $activo;
        public $idAuxiliar;
    }
    
    class ITeacherDisponibilitySubject {
        public $idMaestro;
        public $Maestro;
        public $Prioridad;
        public $Active;
        public $JSONCargaAsignada;
    }
    ?>