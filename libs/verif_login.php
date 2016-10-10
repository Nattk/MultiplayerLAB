<?php
include_once("../include/autoload.inc.php");
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projetLab";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$login = $_POST['login'];

if(strlen($login)==0){
	echo "empty";
}else{
	$sql = "SELECT login FROM utilisateur WHERE login = '".$login."'";
	$result = $conn->query($sql);
	//$data = mysql_fetch_array($result);
	if($result->num_rows > 0){
	//if ($result=='1' || $result > '1') {
		# code...
		echo "no";
		$ok = false;
	}else{
		echo "yes";
	}
}

?>