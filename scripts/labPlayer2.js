window.addEventListener("load",function(){

var socket = io.connect('http://localhost:8081');

const CASE = 30;
var monLab=12; //objet contenant le labyrinthe
var imgLab;

var posX=0;
var posY=0;
var score1=0;
var login1;

var posX2;
var posY2;
var score2=0;
var login2;

var posX3;
var posY3;
var score3=0;
var login3;

var posX4
var posY4;
var score4=0;
var login4;


var essai1=0;var essai2=0;var essai3=0;var essai4=0;var essai5=0;var essai6=0;var essai7=0;var essai8=0;var essai9=0;var essai10=0;var essai11=0;var essai12=0;

var num=0;
var id ;
var id1;
id = document.getElementById('identifiant');
id1 = id.innerText || id.textContent;

var nbJoueur1=document.getElementById('nbJoueur');
var nbJoueur= nbJoueur1.innerText || nbJoueur1.textContent;

var log=document.getElementById('login');
var login= log.innerText || log.textContent;

var room;
room='room'+id1;

var connect=false;
var n = 3;

var tableau = 12;


function countDown(){
   n--;
   if(n > 0){
      setTimeout(countDown,1000);
	  document.getElementById('time').innerHTML = "Le jeu commence dans : "+n;


   }
   $('#time').css('display','block');
   $('#time').bPopup();
   
   if(n==0){
   
	$('#time').bPopup().close();
   
   }
   
}
		
function rien(event){
		event.preventDefault();
	}

function TimeOut(){
console.log('Partez !');
document.addEventListener("keydown",ecouteurClavier,false);

}


socket.emit('rejoindre',room);
socket.emit('login',login,num);



socket.on('log',function(login,num){

	if(num==1){
	
		
		login1=login;
		document.getElementById('score1').innerHTML ="Score de "+login1+" : "+score1 ; 

	}
	
	else if(num==2){
	
		
		login2=login;
		document.getElementById('score2').innerHTML ="Score de "+login2+" : "+score2 ; 
	}
	
	else if(num==3){
	
		login3=login;
		document.getElementById('score3').innerHTML ="Score de "+login3+" : "+score3 ; 
	
	}
	
	else if(num==4){
		
		login4=login;
		document.getElementById('score4').innerHTML ="Score de "+login4+" : "+score4 ; 

	}

});

socket.on('num', function(nbClients){
	
	var dim = Math.sqrt(monLab.length);
	num = nbClients;
	
	if(num!=nbJoueur){
		document.addEventListener("keydown",rien,false);
		document.getElementById('Attente').innerHTML ="En attente de "+(nbJoueur-num)+" joueur(s) Veuillez patienter" ; 
		$('#Attente').bPopup();
		socket.emit('login',login,num);	
		}
		
	else if(num==nbJoueur){
		
		$('#Attente').bPopup().close();
		connect=true;
		socket.emit('Connecte',connect);
		socket.emit('login',login,num);	
		setTimeout(countDown,1000);
		setTimeout(TimeOut,3000);				
		
	}
	
	socket.on('la',function(connect){
		
		if (connect==true){
		$('#Attente').bPopup().close();
		socket.emit('login',login,num);	
		setTimeout(TimeOut,3000);
		setTimeout(countDown,1000);
		}
	

	});
	
	

});


socket.on('MajScore',function(num,score){
	if(num==1){
	
		
		score1=score;
		document.getElementById('score1').innerHTML ="Score de "+login1+" : "+score1 ; 

	}
	
	else if(num==2){
	
		
		score2=score;
		document.getElementById('score2').innerHTML ="Score de "+login2+" : "+score2 ; 
	}
	
	else if(num==3){
	
		score3=score;
		document.getElementById('score3').innerHTML ="Score de "+login3+" : "+score3 ; 
	
	}
	
	else if(num==4){
		
		score4=score;
		document.getElementById('score4').innerHTML ="Score de "+login4+" : "+score4 ; 

	
	}


});


socket.on('Gagnant',function(num){
	console.log('gagnant '+num);
	document.getElementById('Gagner').innerHTML =' Vous avez perdu! Le joueur '+num+' a gagné ';
	$('#Gagner').bPopup();
	document.addEventListener("keydown",rien,false);		
});


socket.on('Personnage',function(posx,posy,num){
	if (num==1) {
		posX = posx;
		posY = posy;
		dessine();
		
	}
	if (num==2) {
		posX2 = posx;
		posY2 = posy;
		dessine();
	} 
	if (num==3) {
		posX3 = posx;
		posY3 = posy;
		dessine();
	}
	
	if (num==4) {
		posX4 = posx;
		posY4 = posy;
		dessine();
	}
});
getLab();
	
$( "#loginco" ).submit(function(event) {
	alert( "Etes Vous sur de vouloir vous déconnecter pendant la partie ?" );
	socket.emit('deconnexion',room);
});

function dessine(){
	var dim = Math.sqrt(monLab.length);
	var zoneDessin = document.getElementById("labyrinthe");
	zoneDessin.width = CASE*dim;
	zoneDessin.height = CASE*dim;
	var g = zoneDessin.getContext("2d");
	var lab = new Image();
	lab.src = imgLab;
	lab.onload = function() {
		g.drawImage(lab,0,0);
	}
	
	
	
		var canvasPers = document.createElement("canvas");
		canvasPers.width = CASE-2;
		canvasPers.height = CASE-2;
		var gPers = canvasPers.getContext('2d');
		var imagePers= new Image();
		imagePers.src="images/Turbo.png";
		imagePers.onload = function(){
			gPers.drawImage(imagePers,0,0,25,25);
			g.putImageData(gPers.getImageData(0,0,28,28),posX*CASE+1,posY*CASE+1);
			
		}
		
		
			if(num==1 &&posX==0 && posY==dim-1 && essai1==0){
				
				essai1++;
				score1++;
				socket.emit('score',num,score1);
				//document.getElementById('score1').innerHTML ="score j1 "+score1 ;
				if(score1==3){
					
					
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').bPopup();
					
					
					
				}
				document.addEventListener("keydown",rien,false);
			}
		
			
			if(num==1 && posX==dim-1 && posY==dim-1 && essai2==0){
		
				essai2++
				score1++;
				socket.emit('score',num,score1);
			
				if(score1==3){
						
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').bPopup();
					
				}
				
			//document.getElementById('score1').innerHTML ="score j1 "+score1 ;
			
			}
			
			
			
			if(num==1 && posX==dim-1 && posY==0 && essai3==0){
		
				essai3++
				score1++;
				socket.emit('score',num,score1);
				
				if(score1==3){
					
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();	
				}
			//document.getElementById('score1').innerHTML ="score j1 "+score1 ;

			}
			document.getElementById('score1').innerHTML ="score de "+login1+" : "+score1 ; 

		

		

	
		
		var canvasPers2 = document.createElement("canvas");
		canvasPers2.height = CASE-2;
		canvasPers2.width = CASE-2;
		var gPers1 = canvasPers2.getContext("2d");
		var imagePers1 = new Image();
		imagePers1.src = "images/Skid.png";
		imagePers1.onload = function(){
		
			gPers1.drawImage(imagePers1,0,0,25,25);
			g.putImageData(gPers1.getImageData(0,0,28,28),posX2*CASE+1,posY2*CASE+1);
				
		
		}


		if(num==2 && posX2==dim-1 && posY2==dim-1 && essai4==0){
			essai4++;
			score2++;
			socket.emit('score',num,score2);
			
			if(score2==3){
				
					
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			

			}
			
			if(num==2 && posX2==0 && posY2==dim-1 && essai5==0){
			essai5++;
			score2++;
			socket.emit('score',num,score2);
				
				if(score2==3){
				
					
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			}
			
			if(num==2 && posX2==0 && posY2==0 && essai6==0 ){
			essai6++;
			score2++;
			socket.emit('score',num,score2);
				if(score2==3){
				
					
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			
			}
	
			document.getElementById('score2').innerHTML ="score de "+login2+" : "+score2 ;
	
	if(nbJoueur==3){
		
		$('.score').css('height','250px');
		document.getElementById('score3').innerHTML ="score de "+login3+" : "+score3 ; 
	
		var canvasPers3 = document.createElement("canvas");
		canvasPers3.height = CASE-2;
		canvasPers3.width = CASE-2;
		var gPers3 = canvasPers3.getContext("2d");
		var imagePers3 = new Image();
		imagePers3.src = "images/Shadow.png";
		imagePers3.onload = function(){
		
			gPers3.drawImage(imagePers3,0,0,25,25);
			g.putImageData(gPers3.getImageData(0,0,28,28),posX3*CASE+1,posY3*CASE+1);
				
		}
		
		
		if(num==3 && posX3==dim-1 && posY3==0 && essai7==0){
			console.log(tableau);
			console.log('pos x: '+posX+'  posY: '+posY);
			essai7++;
			score3++;
			socket.emit('score',num,score3);
				
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien("keydown"),false);		
				}

			}
			
			else if(num==3 && posX3==0 && posY3==dim-1 && essai8==0){
			console.log(tableau);
			console.log('pos x: '+posX+'  posY: '+posY);
			essai8++;
			score3++;
			socket.emit('score',num,score3);
			
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien("keydown"),false);		
				}
			}
			
			else if(num==3 && posX3==0 && posY3==0 && essai9==0){
			console.log(tableau);
			console.log('pos x: '+posX+'  posY: '+posY);
			essai9++;
			score3++;
			socket.emit('score',num,score3);
			
				
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien("keydown"),false);		
				}
				
			}
	
	}	
		
	
	else if(nbJoueur==4){
			
		$('.score').css('height','235px');	
		var canvasPers3 = document.createElement("canvas");
		canvasPers3.height = CASE-2;
		canvasPers3.width = CASE-2;
		var gPers3 = canvasPers3.getContext("2d");
		var imagePers3 = new Image();
		imagePers3.src = "images/Shadow.png";
		imagePers3.onload = function(){
		
			gPers3.drawImage(imagePers3,0,0,25,25);
			g.putImageData(gPers3.getImageData(0,0,28,28),posX3*CASE+1,posY3*CASE+1);
				
		}
	
		

		if(num==3 && posX3==dim-1 && posY3==0 && essai7==0){

			

			essai7++;
			score3++;
			socket.emit('score',num,score3);
			
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			}
			
			else if(num==3 && posX3==0 && posY3==dim-1 && essai8==0){
			console.log(tableau);
			console.log('pos x: '+posX+'  posY: '+posY);
			essai8++;
			score3++;
			socket.emit('score',num,score3);
				
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			}
			
			else if(num==3 && posX3==0 && posY3==0 && essai9==0){
			console.log(tableau);
			console.log('pos x: '+posX+'  posY: '+posY);
			essai9++;
			score3++;
			socket.emit('score',num,score3);
				
				if(score3==3){
				
					document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
					$('#Gagner').css('display','block');
					$('#Gagner').bPopup();
					document.addEventListener("keydown",rien,false);		
				}
			}
			document.getElementById('score3').innerHTML ="score de "+login3+" : "+score3; 
				
				var canvasPers4 = document.createElement("canvas");
				canvasPers4.height = CASE-2;
				canvasPers4.width = CASE-2;
				var gPers4 = canvasPers4.getContext("2d");
				var imagePers4 = new Image();
				$('#score4').css('display','block');
				imagePers4.src = "images/Chet.png";
				imagePers4.onload = function(){
				
					gPers4.drawImage(imagePers4,0,0,25,25);
					g.putImageData(gPers4.getImageData(0,0,28,28),posX4*CASE+1,posY4*CASE+1);
						
				}
				
				
				if(num==4 && posX4==0 && posY4==0 && essai10==0){
					console.log(tableau);
					console.log('pos x: '+posX+'  posY: '+posY);
					essai10++;
					score4++;
					socket.emit('score',num,score4);
						
						if(score4==3){
				
							document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
							$('#Gagner').css('display','block');
							$('#Gagner').bPopup();
							document.addEventListener("keydown",rien,false);		
						}
					}
					
					else if(num==4 && posX4==dim-1 && posY4==dim-1 && essai11==0){
					console.log(tableau);
					console.log('pos x: '+posX+'  posY: '+posY);
					essai11++;
					score4++;
					socket.emit('score',num,score4);
					
						if(score4==3){
				
							document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
							$('#Gagner').css('display','block');
							$('#Gagner').bPopup();
							document.addEventListener("keydown",rien,false);		
						}

					}
					
					else if(num==4 && posX4==dim-1 && posY4==0 && essai12==0){
					console.log(tableau);
					console.log('pos x: '+posX+'  posY: '+posY);
					essai12++;
					score4++;
					socket.emit('score',num,score4);
					
						if(score4==3){
				
							document.getElementById('Gagner').innerHTML =' Vous avez gagner !';
							$('#Gagner').css('display','block');
							$('#Gagner').bPopup();
							document.addEventListener("keydown",rien,false);		
						}
					}
			}	
			document.getElementById('score4').innerHTML ="score de "+login4+" : "+score4; 
	
}
	

	

function imageLab(){
var i,x,y;
	var dim = Math.sqrt(monLab.length);
	
	posX2=dim-1;
	posY2=0;
	
	posX3=dim-1;
	posY3=dim-1;
	
	posX4=0;
	posY4=dim-1;
	
	//var zoneDessin = document.getElementById("labyrinthe");
	var zoneDessin = document.createElement("canvas");
	zoneDessin.width = CASE*dim;
	zoneDessin.height = CASE*dim;
	
	var g = zoneDessin.getContext("2d");
	var gradient=g.createLinearGradient(0,0,170,0);
	gradient.addColorStop("0.3","yellow");
	gradient.addColorStop("0.6","green");
	gradient.addColorStop("1.0","orange");

	g.beginPath();
	for(i=0;i<monLab.length;i++){
		x = (i%dim)*CASE;
		y = Math.floor(i/dim)*CASE;
		if(monLab[i]["N"]<0){
			g.moveTo(x,y);
			g.lineTo(x+CASE,y);
		}
		 if(monLab[i]["S"]<0){
			g.moveTo(x,y+CASE);
			g.lineTo(x+CASE,y+CASE);
		}	
		 if(monLab[i]["E"]<0){
			g.moveTo(x+CASE,y);
			g.lineTo(x+CASE,y+CASE);
		}
		if(monLab[i]["O"]<0){
			g.moveTo(x,y);
			g.lineTo(x,y+CASE);	
		}
		g.strokeStyle=gradient;
		g.lineWidth=2;	
		g.stroke();
		g.closePath();
		imgLab = zoneDessin.toDataURL();

	}
}
	

function getLab(){
	var request = new XMLHttpRequest();
	var url = "labyrinthe.php";
	request.open("GET",url,true);
	request.send();
	request.onreadystatechange = function(){
		if((request.readyState == 4)&&(request.status == 200)){
			elt = document.getElementById('serial');
			monLab1 = elt.innerText  || elt.textContent;
			monLab = JSON.parse(monLab1);
			imageLab();
			dessine();
		}
	}
}

function ecouteurClavier(evt){

	var dim = Math.sqrt(monLab.length);
	if (num==1) {
	
		switch(evt.keyCode){
		case 37 :
			if(monLab[posY*dim+posX]["O"]>=0){
				posX = posX-1;
				socket.emit('Position',posX,posY, num);
				dessine();
				
			}
			break;
		
		case 38 :

			if(monLab[posY*dim+posX]["N"]>=0){
				posY = posY-1;
				socket.emit('Position',posX,posY, num);
				dessine();
			}
			break;
			
		case 39 :
			if(monLab[posY*dim+posX]["E"]>=0){
				posX = posX+1;
				socket.emit('Position',posX,posY, num);
				dessine();
			}
			break;
			
		case 40 :
			if(monLab[posY*dim+posX]["S"]>=0){
				posY = posY+1;
				socket.emit('Position',posX,posY, num);
				dessine();
			}
			break;
		}
	}else if (num==2) {
		switch(evt.keyCode){
		case 37 :
			if(monLab[posY2*dim+posX2]["O"]>=0){
				posX2 = posX2-1;
				socket.emit('Position',posX2,posY2, num);
				dessine();
			}
			break;
		
		case 38 :

			if(monLab[posY2*dim+posX2]["N"]>=0){
				posY2 = posY2-1;
				socket.emit('Position',posX2,posY2, num);
				dessine();
			}
			break;
			
		case 39 :
			if(monLab[posY2*dim+posX2]["E"]>=0){
				posX2 = posX2+1;
				socket.emit('Position',posX2,posY2, num);
				dessine();
			}
			break;
			
		case 40 :
			if(monLab[posY2*dim+posX2]["S"]>=0){
				posY2 = posY2+1;
				socket.emit('Position',posX2,posY2, num);
				dessine();
			}
			break;
		}
	}else if (num==3) {
		switch(evt.keyCode){
		case 37 :
			if(monLab[posY3*dim+posX3]["O"]>=0){
				posX3 = posX3-1;
				socket.emit('Position',posX3,posY3, num);
				dessine();
			}
			break;
		
		case 38 :

			if(monLab[posY3*dim+posX3]["N"]>=0){
				posY3 = posY3-1;
				socket.emit('Position',posX3,posY3, num);
				dessine();
			}
			break;
			
		case 39 :
			if(monLab[posY3*dim+posX3]["E"]>=0){
				posX3 = posX3+1;
				socket.emit('Position',posX3,posY3, num);
				dessine();
			}
			break;
			
		case 40 :
			if(monLab[posY3*dim+posX3]["S"]>=0){
				posY3 = posY3+1;
				socket.emit('Position',posX3,posY3, num);
				dessine();
			}
			break;
		}
	}else if (num==4) {
		switch(evt.keyCode){
		case 37 :
			if(monLab[posY4*dim+posX4]["O"]>=0){
				posX4 = posX4-1;
				socket.emit('Position',posX4,posY4, num);
				dessine();
			}
			break;
		
		case 38 :

			if(monLab[posY4*dim+posX4]["N"]>=0){
				posY4 = posY4-1;
				socket.emit('Position',posX4,posY4, num);
				dessine();
			}
			break;
			
		case 39 :
			if(monLab[posY4*dim+posX4]["E"]>=0){
				posX4 = posX4+1;
				socket.emit('Position',posX4,posY4, num);
				dessine();
			}
			break;
			
		case 40 :
			if(monLab[posY4*dim+posX4]["S"]>=0){
				posY4 = posY4+1;
				socket.emit('Position',posX4,posY4, num);
				dessine();
			}
			break;
		}
	}
	
}
},false);