<?php
    session_start();
    require_once "./al_models.php";
    require_once "./al_main_gq.php";
    //print_r('CONSOLE LOG');
    /* S E R V E R */
    //$area=$_SESSION['area'];
    //$tipoadmin=$_SESSION['tipoadmin'];
    
    /*$iduseradmin=$_SESSION['iduser'];
    $useradmin = $_SESSION['user'];
    if ( $iduseradmin == '')
    {
        echo '{"option": "0", "value": "ERROR", "message": "ERROR: NO LOGIN"}';
        //header("Location: ../index.php?acceso='Usted debe iniciar sesión'");
        //$iduseradmin = -1;
        //$useradmin = "SERVER_DEVELOPER";
    }*/
    

    /***************************************/

    /* H O M E AND W O R K (LOCAL) */
    /***** */
    
    $iduseradmin = -1;
    $useradmin = "DEVELOPER";
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    //header('Content-type: application/json');
    
    
    $postJsonReceive = file_get_contents("php://input");
    $obj = json_decode($postJsonReceive);
    
    if($obj)
    {
        $or = new IOPTRspns();
        $or->opt = $obj->{'option'};
        $or->value = $obj->{'value'};
        $or->message = $obj->{'message'};        
        
        switch($or->opt)
        {
            case 0://global queries
                {
                    switch($or->message)
                    {
                        case "get_al_byIdGrIdCa":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $IdG = $pars->{'IdG'};//IdG: number, IdC: number
                                $IdC = $pars->{'IdC'};
                                $sc = $gq->GetAcademicLoadByIdG_IdC($IdG, $IdC); //GetTeachersAvailableBySubject($idSubject);                                
                                $or->value = json_encode($sc);
                                $or->message = "OK";
                            }
                        break;
                        case "get_all_schoolcycle":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSC = $pars->{'idSC'};
                                $sc = $gq->GetSchoolCycle(); //GetTeachersAvailableBySubject($idSubject);                                
                                $or->value = json_encode($sc);
                                $or->message = "OK";
                            }
                        break;
                        case "get_all_groups":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();                                
                                $groups = $gq->getAllGroups();
                                $or->value = json_encode($groups);
                            }
                        break;
                        case "get_groups_byPA"://Obtiene grupos por ciclo escolar
                            {
                                //$ac = new ICarrera();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $AC = $pars->{'ac'};
                                $groups = $gq->getGroupPA();
                                $or->value = json_encode($groups);
                            }
                        break;
                        case "get_groups_byAC"://Obtiene grupos por ciclo escolar
                            {
                                //$ac = new ICarrera();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $AC = $pars->{'ac'};
                                $groups = $gq->getGroupsByAC($AC);
                                $or->value = json_encode($groups);
                            }
                        break;
                        //********************************************************** */
                        case "GetTeachersAvailableBySubject":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSubject = $pars->{'idSubject'};
                                $ta = $gq->GetTeachersAvailableBySubject($idSubject);                                
                                $or->value = json_encode($ta);
                                $or->message = "OK";
                            }
                        break;
                        case "getHTeachersByIdSubject":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSubject = $pars->{'idMateria'};
                                $ta = $gq->GetHTeachersByIdSubject($idSubject);                                
                                $or->value = json_encode($ta);
                                $or->message = "OK";
                            }
                        break;
                        case "get_careers_byCoor":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $coor = $pars->{'coor'};
                                $careers = $gq->GetCareersByCoor($coor);
                                $or->value = $careers;
                                $or->message = "OK";
                            }
                        break;//
                        case "get_all_careers":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();                                
                                $careers = $gq->getAllCareers();                                
                                $or->value = $careers;
                            }
                        break;//
                        case "get_subjects_by_id_career":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();  
                                $id = $or->value;
                                $careers = $gq->getSubjecstByIdCareer($id);
                                $or->value = $careers;
                            }
                        break;
                        case "get_all_teachers":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $id = $or->value;
                                $teachers = $gq->getTeachers();
                                $or->value = $teachers;
                            }
                        break;
                        case "get_teacher_disponibilities":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();  
                                $id = $or->value;
                                $careers = $gq->getTeacherDisponibilitiesByIdTeacher($id);
                                $or->value = $careers;
                            }
                        break;
                        case "get_groups_by_id_career":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $id = $or->value;
                                $groups = $gq->getGroupsByIdCarrera($id);
                                $or->value = $groups;
                            }
                        break;//get_academic_loads_by_id_group
                        case "get_academic_loads_by_id_group":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $id = $or->value;
                                $groups = $gq->getAcademicLoadsByIdGroup($id);
                                $or->value = $groups;
                                $or->message = $id;
                            }
                        break;
                    }
                }
                break;
            case 1:// Consultas de disponibilidad
                {
                    switch($or->message)
                    {
                        case "deleteTeacherAvailable":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idDisponibilidad = $pars->{'idDisponibilidad'};
                                $ta = $gq->DeleteTeacherAvailable($idDisponibilidad);                                
                                $or->value = json_encode($ta);
                                $or->message = "OK";
                            }
                        break;
                        case "set_subject_isSerial":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idMateria = $pars->{'idMateria'};
                                $arr = json_decode($idMateria);

                                //$isSerial = $pars->{'isSerial'};
                                //$rsp = $gq->SetIsSerialSubject($idMateria, $isSerial);
                                $or->value = $gq->SetSerialsSubject($arr);// $idMateria; # json_encode($rsp);
                                $or->message = "OK";
                            }
                        break;
                        case "set_teacher_availaibility":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idMateria = $pars->{'idMateria'};
                                $idMaestro = $pars->{'idMaestro'};
                                $idRsp = $gq->setAvailibility($iduseradmin,$idMaestro,$idMateria);
                                $temp = json_encode($idRsp);
                                $pars = json_decode($temp);
                                $idDisp = $pars->{'idDisp_'};
                                //$or->value = $idDisp;
                                //{"idDisp_":"1505"}
                                //$or->message = "OK";
                                if($idDisp != false)
                                {
                                    $gq = new CGlobalQueries();
                                    $otd = $gq->GetTeachersAvailableById($idDisp);                                        
                                    $or->value= json_encode($otd);
                                    $or->message = "OK";
                                }
                            }
                        break;
                        case "set_teacher_disponibility":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idMateria = $pars->{'idMateria'};
                                $idMaestro = $pars->{'idMaestro'};
                                $idRsp = $gq->setTeacherDisponibility($iduseradmin,$idMaestro,$idMateria);
                                if($idRsp != false)
                                {
                                    $gq = new CGlobalQueries();
                                    $otd = new IDisponibilidadmaestro();
                                    $otd = $gq->getTeacherDisponibilityById($idRsp);                                        
                                    $or->value= $otd;
                                    $or->message = "Disponibilidad guardada corréctamente.";
                                }
                            }
                        break;
                        case "updateSubjectDurationById":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSubject = $pars->{'idSubject'};
                                $duration = $pars->{'duration'};
                                $rsp = $gq->updateSubjectDurationById($idSubject, $duration, $iduseradmin);
                                $or->value = $rsp;
                                if($rsp)
                                    $or->message = "Duración modificada corréctamente";
                                else
                                    $or->message = "No se ha modificado la duración";
                            }
                        break;
                        case "update_priority_teacher_disponibility":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idDisponibility = $pars->{'idDisponibility'};
                                $priority = $pars->{'priority'};
                                $rsp = $gq->updateTeacherPriorityById($idDisponibility, $priority, $iduseradmin);
                                $or->value = $rsp;
                                if($rsp)
                                    $or->message = "Prioridad modificada corréctamente";
                                else
                                    $or->message = "No se ha modificado la prioridad";
                            }
                        break;
                    }
                }
                break;
            case 2:// Consultas de la carga académica
                {
                    switch($or->message)
                    {    
                        case "getTeacherForDisponibilityByIdSubjec":
                            {
                                $tdsp = new ITeacherDisponibilitySubject();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSubject = $pars->{'idSubject'};
                                $idGroup = $pars->{'idGroup'};
                                $tdsp = $gq->getTeacherForDisponibilityByIdSubjec($idSubject, $idGroup);
                                $or->value = json_encode($tdsp);
                                $or->message = 'OK';
                            }
                        break;
                        case "getAssignedTeacherByIdSubjectAndGroup":
                            {
                                $teachers = new ITeacher();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idSubject = $pars->{'idSubject'};
                                $idGroup = $pars->{'idGroup'};
                                $teachers = $gq->getAssignedTeacherByIdSubjectAndGroup($idSubject, $idGroup);
                                $or->value = $teachers;
                                $or->message = "ok";
                            }
                        break;
                        case "setAcademicLoad":
                            {
                                //$teachers = new ITeacher();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idMaestro = $pars->{'idMaestro'};
                                $idMateria = $pars->{'idMateria'};
                                $idGrupo = $pars->{'idGrupo'};
                                $interval = $pars->{'interval'};
                                $teachers = $gq->setAcademicLoad($idMaestro, $idMateria, $idGrupo, $interval, $useradmin);
                                $or->value = $teachers;
                                $or->message = "ok";
                            }
                        break;
                        case "updateAcademicLoad":
                            {
                                //$teachers = new ITeacher();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idMaestro = $pars->{'idMaestro'};
                                $idMateria = $pars->{'idMateria'};
                                $idGrupo = $pars->{'idGrupo'};
                                $oldTeacher = $pars->{'oldTeacher'};
                                $interval = $pars->{'interval'};
                                $up_resp = $gq->updateAcademicLoad($idMaestro, $idMateria, $idGrupo, $oldTeacher, $interval, $useradmin);
                                $or->value = $up_resp;//$teachers;
                                $or->message = "ok";
                            }
                        break;
                        case "validateSchedulesHi":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $idSubject = $pars->{'idSubject'};
                                $idGroup = $pars->{'idGroup'};
                                $idTeacher = $pars->{'idTeacher'};
                                $hi = $pars->{'hi'};
                                $hf = $pars->{'hf'};
                                $_resp = $gq->validateHi($idAL, $idSubject, $idGroup, $idTeacher, $hi, $hf);
                                $or->message = json_encode($_resp);
                            }
                        break;
                        case "updateSchedulesHi":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $hi = $pars->{'hi'};
                                $_resp = $gq->updateHi($idAL, $hi);
                                $or->message = $_resp;
                            }
                        break;
                        case "validateSchedulesHf":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $idSubject = $pars->{'idSubject'};
                                $idGroup = $pars->{'idGroup'};
                                $idTeacher = $pars->{'idTeacher'};
                                $hi = $pars->{'hi'};
                                $hf = $pars->{'hf'};
                                $_resp = $gq->validateHf($idAL, $idSubject, $idGroup, $idTeacher, $hi, $hf);
                                $or->message = json_encode($_resp);
                            }
                        break;
                        case "updateSchedulesHf":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $hf = $pars->{'hf'};
                                $_resp = $gq->updateHf($idAL, $hf);
                                $or->message = $_resp;
                            }
                        break;
                        case "activateAL":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $idTeacher = $pars->{'idTeacher'};
                                $idMateria = $pars->{'idMateria'};
                                $idGrupo = $pars->{'idGrupo'};
                                $horaI = $pars->{'horaI'};
                                $horaF = $pars->{'horaF'};
                                $sessions = $pars->{'sessions'};
                                $_resp = $gq->activateAL($idAL, $idTeacher, $idMateria, $idGrupo, $horaI, $horaF, $sessions, $useradmin);
                                $or->value = json_encode($_resp);
                                $or->message = "CARGA ACTIVADA CORRÉCTAMENTE";
                            }
                        break;
                        case "getAcademicLoadById":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $_resp = $gq->getAcademicLoadById($idAL);
                                $or->value = json_encode($_resp);
                                $or->message = "OK";//$_resp;
                            }
                        break;
                        case "activateAcademicLoad":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};idAL
                                $idAL = $pars->{'idAL'};
                                $_resp = $gq->activateAcademicLoad($idAL);
                                $or->value = json_encode($_resp);
                                $or->message = $or->value;//$_resp;
                            }
                        break;
                    }
                }
                break;
            case 3://CONSULTA DE CALENDARIO ESCOLAR
                {
                    switch($or->message)
                    {
                        case "getAcademicCalendar":
                            {
                                //$tdsp = new ITeacherDisponibilitySubject();
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $idPeriodo = $pars->{'idPeriodo'};
                                $tdsp = $gq->getAcademicCalendar($idPeriodo);
                                $or->value = json_encode($tdsp);
                                $or->message = 'OK';
                            }
                            break;
                            case "setAcademicCalendar":
                                {
                                    //$tdsp = new ITeacherDisponibilitySubject();
                                    $gq = new CGlobalQueries();
                                    $pars = json_decode($or->value);//->{'idMaestro'};
                                    $idCA = $pars->{'idCA'};
                                    $idSchoolCycle = $pars->{'idSchoolCycle'};
                                    $fecha = $pars->{'fecha'};
                                    $es_inhabil = $pars->{'es_inhabil'};
                                    $descripcion = $pars->{'descripcion'};
                                    $activo = $pars->{'activo'};
                                    $resp = $gq->setAcademiLoad($idCA, $idSchoolCycle, $fecha, $descripcion, $es_inhabil, $activo);
                                    $or->value = $resp;
                                    $or->message = 'OK';
                                }
                                break;
                    }
                }
                break;
            case 4://CONSULTA DE REPORTES
                {
                    switch($or->message)
                    {
                        case "get_alMR_MainReport":
                            {
                                $gq = new CGlobalQueries();
                                $pars = json_decode($or->value);//->{'idMaestro'};
                                $opt = $pars->{'opt'};
                                $tdsp = $gq->getALRptDatas($opt);
                                $or->value = json_encode($tdsp);
                                $or->message = 'OK';
                            }
                    }
                }
                break;
            
        }
        echo json_encode($or);        
    }
    else
    {
        echo '{"option": "0", "value":' . json_encode($postJsonReceive) . ' , "message": "error de entrada en el servidor 1"}';
    }
?>