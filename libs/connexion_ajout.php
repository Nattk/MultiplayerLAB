<?php
include_once("../include/autoload.inc.php");
session_start();
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
if(isset($_POST['inscription'])){
	if(isset($_POST["login"])){
		$nom 		= $_POST['nom'];
		$prenom 	= $_POST['prenom'];
		$mail 		= $_POST['mail'];
		$login 		= $_POST['login'];
		$mdp 		= $_POST['pass'];
		
		$sql = "INSERT INTO utilisateur (nom, prenom, mail, login, mdp)
		VALUES ('".$nom."','".$prenom."','".$mail."','".$login."','".$mdp."')";

		if ($conn->query($sql) === TRUE) {
		   $erreur = "L'ajout a été fait avec succès";
		    header("location: ../index.php?error=".$erreur);
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
}
if(isset($_POST['connexion'])){
	if((isset($_POST["login"]))&&(isset($_POST["pwd"]))){
		$login 	= $_POST['login'];
		$mdp 	= $_POST['pwd'];
		$sql = "SELECT * FROM utilisateur WHERE login = '".$login."' AND mdp = '".$mdp."' ";
		$result = $conn->query($sql);
		$data = mysql_fetch_array($result);
		if($result->num_rows > 0){
			foreach ($result as $data) {
		        $_SESSION["id"]     = $data['id'];
		        $_SESSION["nom"]    = $data['nom'];
		        $_SESSION["prenom"] = $data['prenom'];
		        $_SESSION["login"]  = $data['login'];
			}
			
	        header("location:../listeLab.php");
	    }else{
	    	//$erreur = 'Login ou mot de passe incorrect';
	    	$erreur = 1;
	        header("location:../index.php?error=".$erreur);
	    }
		/*if ($result->num_rows > 0) {
		    // output data of each row
		    echo "connexion reuissi";
		} else {
		    echo "0 results";
		}*/
	}
}
if(isset($_POST['deconnexion'])){
	// Ouvre une nouvelle session
	session_start();

	session_unset();

	// Ferme la session
	session_destroy();

	header("location:../index.php");
}
?>