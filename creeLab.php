<?php
include_once("./include/autoload.inc.php");
include("header.html"); 
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
//$_POST['bouton']="";
if($_POST['bouton']){

    if(isset($_POST['nom'])){ 
        $nom = $_POST['nom'];
        $taille = $_POST['taille'];
        $nbJ =  $_POST['nb'];
    } 
    $lab = new Labyrinthe($taille,$taille);
    $lab->bordure();
    $lab->build();
    $lab->finalise();
    $valeur = $lab->getJson();
    $sql = "INSERT INTO labyrinthe (nom, valeur, taille, nbJoueur)
        VALUES ('".$nom."','".$valeur."','".$taille."','".$nbJ."')";

        if ($conn->query($sql) == TRUE) {

 
            $id = $conn->insert_id;
            //echo "New record created successfully";
            //echo $id;
            //header("location:./labyrinthe.php?id=".$id);
            echo "<script type='text/javascript'>document.location.replace('labyrinthe.php?id=".$id."');</script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
}
?>

    <form name="myForm" method="post" onsubmit="return validateForm()" action="">
        <table style="position: relative; margin-left:  auto; margin-right: auto; margin-top: 40px;">
            <center><h1>Remplir les champs pour ajouter un labyrinthe:</h1></center>
            <tr>
                <td>Nom</td>
                <td><input type=text name="nom"></td>
            </tr>
            <tr>
                <td>Taille:</td>
                <td><input type=text name="taille"></td>
            </tr>
            <tr>
                <td>Nb joueur:</td>
                <td><input type=text name="nb"></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="Submit" value="Ajouter" name="bouton"></td>
            </tr>
        </table>
    </form>

<?php       
 include("footer.html");  ?>
