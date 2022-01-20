<?php
    session_start();
    //$useradmin = $_SESSION['user'];
    //$area=$_SESSION['area'];
    //$tipoadmin=$_SESSION['tipoadmin'];

    //$iduseradmin=$_SESSION['iduser'];
    /*if ( $iduseradmin == '')
    {
        $iduseradmin = -1;
    }*/
    /* H O M E */
    /***** */
    $iduseradmin = -1;

    require_once "./al_models.php";
    require_once "./al_main_gq.php";

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
                        case "get_all_groups":
                            {
                                //$ac = new ICarrera();                                
                                $gq = new CGlobalQueries();                                
                                $groups = $gq->getAllGroups();
                                $or->value = $groups;
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
                            }
                        break;
                    }
                }
                break;
            case 1://
                {
                    switch($or->message)
                    {
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
        }
        echo json_encode($or);        
    }
    else
    {
        echo '{"option": "0", "value":' . json_encode($postJsonReceive) . ' , "message": "error de entrada en el servidor 1"}';
    }
?>