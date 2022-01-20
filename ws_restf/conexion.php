<?php
    //require_once "./conexion.php";

    /*header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }*/

	function conexionMySQL()
	{
		//echo "Hola, por favor no usen echo's para imprimir en pantallas";
		//$conexion = new mysqli(SERVER,USER,PASS,DB);
		//$conexion = new mysqli("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
		//$teachers_ctrllr = new CTeachersDataCtllr("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
		
		$conexion = new mysqli("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_saecajabd");
		//$conexion = new mysqli("38.146.68.37", "iexproed_rudi", "E=EH_[=nkD]k", "iexproed_casel");

		if($conexion->connect_error)
		{
			$error ="<div class='error'>";
			$error .= "Error de Conexión No.<b>".$conexion->connect_errno."</b> Mensaje del error: <mark>".$conexion->connect_error."</mark>";
			$error .= "/<div>";

			die($error);
		}
		else
		{
			//$formato = "<div class='mensaje'>Conexión exitosa: <b>%s</b></div>";
			//printf($formato,$conexion->host_info);
		
		}

		$conexion->query("SET CHARACTER SET UTF8");
		return $conexion;
	}
?>
