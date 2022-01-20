<?php
    //require_once "../config.php";


    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    header('Content-type: application/json');
    $postJsonReceive = file_get_contents("php://input");
    $obj = json_decode($postJsonReceive);
    if($obj)
    {
        $or = new IOPTRspns();
        $or->opt = $obj->{'option'};
        $or->value = $obj->{'value'};
        $or->message = $obj->{'message'};
        
        require_once('queryDisponibilities.php');
        $opt = $obj->{'option'};
        $teachers_ctrllr = new CTeachersDataCtllr();
        switch($opt) {
            case "get_school_subjects":
                $school_subjects = $teachers_ctrllr->getCarreras();
                echo '{"option": "1", "value":' . json_encode($school_subjects) . ' , "message":"Carreras de la institución"}';
            break;
            case "get_school_teachers":
                $teachers = $teachers_ctrllr->getDocentes();
                echo '{"option": "school_subjects", "value":' . json_encode($teachers) . ' , "message": "Docentes de la institución"}';
            break;
            case "get_materias":
                $id_carrera = $obj->{'value'};
                $datos = $teachers_ctrllr->getMateriasById($id_carrera);

                if($datos){
                    echo '{"option": "3", "value":' . json_encode($datos) . ' , "message": "Materias de la carrera"}';
                }
                else {
                    echo '{"option": "0", "value": "error" , "message": "Error al seleccionar las materias de las carreras"}';
                }
            break;
            case "get_tecama":
                $id_teacher = $obj->{'value'};
                $datos = $teachers_ctrllr->getTeacherDisponibilityByIdTeacher($id_teacher);
                if(count($datos) > 0  ){
                    echo '{"option": "teacher_disponibilities", "value":' . json_encode($datos) . ' , "message": "Materias de la carrera"}';
                }
                else {
                    echo '{"option": "warning", "value": "warning" , "message": "No se le ha asignado disponibilidad"}';
                }
                break;
            case "set_camado":
                $idCarrera = $obj->{'idCarrera'};
                $idMaestro = $obj->{'idMaestro'};
                $idMateria = $obj->{'idMateria'};
                //$teachers_ctrllr = new CTeachersDataCtllr("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
                $idDisponibility = $teachers_ctrllr->setTeacherDisponibility($idCarrera, $idMaestro, $idMateria);
                if($idDisponibility){
                    //$teachers_ctrllr = new CTeachersDataCtllr("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
                    $datos = $teachers_ctrllr->getTeacherDisponibilityById($idDisponibility);
                    echo '{"option": "teacher_disponibilities", "value":' . json_encode($datos) . ' , "message": "Materias de la carrera"}';
                    //echo json_encode($datos);
                } else {
                    echo '{"option": "0", "value": "error" , "message": "Materias de la carrera"}';
                }
                break;
            case "updt_teapri":
                //require_once('../consultas/consulta_docentes.php');
                $idDisponobility = $obj->{'idDisponobility'};
                $priority = $obj->{'priority'};
                //$teachers_ctrllr = new CTeachersDataCtllr("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
                $rep = $teachers_ctrllr->updateTeacherPriorityById($idDisponobility, $priority);
                if($rep){
                    echo '{"option": "6", "value":"'.$idDisponobility.'" , "message": "Materias de la carrera"}';
                } else {
                    echo '{"option": "0", "value": "error" , "message": "Materias de la carrera"}';
                }
            break;
            case "del_teadisp":
                //require_once('../consultas/consulta_docentes.php');
                $idDisponobility = $obj->{'idDisponobility'};
                //$teachers_ctrllr = new CTeachersDataCtllr("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
                $rep = $teachers_ctrllr->deleteTeacherDisponibility($idDisponobility);
                if($rep) {
                    echo '{"option": "5", "value":"'.$idDisponobility.'", "message":"Registro eliminado corréctamente"}';
                } else {
                    echo '{"option": "0", "value": "error", "message":"No tiene permisos para borrar registros" }';                
                }
                break;
            default:
                echo json_encode("no option");
        }
    }

    class IOPTRspns {
        public $opt;
        public $value;
        public $message;
    }
?>