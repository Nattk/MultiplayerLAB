<?php
include_once("include/autoload.inc.php");
session_start();
if(isset($_SESSION["id"])){
    include("header.html"); 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projetlab";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if(isset($_GET['id'])){
    $id = $_GET['id'];
    $sql = 'select * from labyrinthe where id = "'.$id.'"';
    $result = $conn->query($sql);
    
    foreach ($result as $key => $value) {
    	$nom	 =  $value['nom'];
        $serial1 =  $value['valeur'];
		$nb =  $value['nbJoueur'];
		}
    //echo $serial1;
    
}
echo "<script src='./scripts/labPlayer2.js'></script>";
echo "<script src='http://localhost:8081/socket.io/socket.io.js'></script>";
echo "<div id='serial' style='display:none;'>".$serial1."</div>";
echo "<center><h1>".$nom."</h1></center>";
echo "<div id='identifiant' style='display:none;'>".$id."</div>";
echo "<div id='nbJoueur' style='display:none;'>".$nb."</div>";
echo "<center><canvas id='labyrinthe'></canvas></center>";
echo "<div class='time' id='time'></div>";
echo "<div id='Gagner' class='Gagner'></div>";
echo "<div id='Attente' class='Attente'></div>";
echo "<div class='score'>";
echo "<div id='score1'></div>" ;
echo "<div id='score2'></div>" ;
echo "<div id='score3'></div>" ;
echo "<div id='score4'></div>" ;
echo "</div>";	
echo "<div id='login' style='display:none;'>".$_SESSION['login']."</div>";
include("footer.html");	
}else{
	$erreur = 'Vous devez vous connecter!!!';
    header("location: index.php?error=".$erreur);
}
?>