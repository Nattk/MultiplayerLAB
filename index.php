<?php  
session_start();
if(!isset($_SESSION["id"])){ 
	include("header.html");	 ?>

	<div class="connexion">
		<form action="./libs/connexion_ajout.php" method="post" id="">
			<section class="content">
				<h2>Connexion</h2>
				<div style="color:red;"><?php if($_GET['error']==1){ echo 'Login ou mot de passe incorrect'; } ?></div>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" type="text" id="input-4" name="login" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span class="input__label-content input__label-content--hoshi">Login</span>
					</label>
				</span>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" type="password" id="input-5" name="pwd" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-2" for="input-5">
						<span class="input__label-content input__label-content--hoshi">Password</span>
					</label>
				</span><br />
				<span class="input input--hoshi" ><input style="border-radius:10px;" type="submit" name="connexion" value="Connexion" /></span>
				<span class="input input--hoshi" ><input style="background-color:black; color:yellow; border-radius:10px;width:161px;cursor:pointer;" id="inscription" value="S'inscrire" /></span>
			</section>
		</form>
	</div>
	<div class="inscription">
		<form action="./libs/connexion_ajout.php" method="post" id="inscription">
			<section class="content">
				<h2>Inscription</h2>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" name="nom" type="text" id="input-4" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span class="input__label-content input__label-content--hoshi">Nom</span>
					</label>
				</span>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" name="prenom" type="text" id="input-5" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-2" for="input-5">
						<span class="input__label-content input__label-content--hoshi">Prenom</span>
					</label>
				</span><br />
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" name="mail" type="text" id="input-6" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-3" for="input-6">
						<span class="input__label-content input__label-content--hoshi">Email</span>
					</label>
				</span>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" name="login" type="text" id="input-6 login1" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-4" for="input-6">
						<span class="input__label-content input__label-content--hoshi">Login</span>
					</label>
					
				</span><br /><span id="msgbox" style="display:none;font-size: .5em;"></span>
				<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" name="pass"  type="password" id="input-6" />
					<label class="input__label input__label--hoshi input__label--hoshi-color-5" for="input-6">
						<span class="input__label-content input__label-content--hoshi">Password</span>
					</label>
				</span><br />
				<span class="input input--hoshi" ><input style="border-radius:10px;" name="inscription" type="submit" value="Envoyer" /></span>
			</section>
		</form>
	</div>

<?php 
	include("footer.html");  
}else{
	header("location:listeLab.php");
} ?>