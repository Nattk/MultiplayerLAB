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
$sql = "SELECT * FROM labyrinthe";
$result = $conn->query($sql);
//$data = mysql_fetch_array($result);
?>
<div>
    <center>
        <h1>
            <a href="creeLab.php" >Crée labyrinthe</a>
        </h1>
    </center>
    </center>
    <center>
        <table>
            <center><tr><h2>Liste des Labyrinthes:</h2></tr></center>
            <?php
            foreach ($result as $key => $value) {
                echo "<li><a href='labyrinthe.php?id=".$value['id']."'>".$value['nom']."&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ".$value['taille']."X".$value['taille']."
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp".$value['nbJoueur']."</li><br />";
            }
            echo "</ul>";
            ?>
        </table>
    </center>
</div>
<?php 
include("footer.html");
}else{
    $erreur = 'Vous devez vous connecter!!!';
    header("location: index.php?error=".$erreur);
} 
 ?>