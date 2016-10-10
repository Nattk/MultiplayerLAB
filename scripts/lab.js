window.addEventListener("load",function(){

var socket = io.connect('http://localhost:8081');



const CASE = 30;
var monLab; //objet contenant le labyrinthe
var imgLab;

var posX;
var posY;

var posX2;
var posY2;

var id ;
var id1;
id = document.getElementById('identifiant');
id1 = id.innerText || id.textContent;

var room;
room='room'+id1;


socket.emit('rejoindre',room);

socket.on('Personnage',function(posx,posy){
			posX2=posx;
			posY2=posy;
			dessine();
});


socket.on('Player',function(nbClients){
		console.log("arrivé en"+nbClients);
		if (nbClients==1){
			console.log("arrivé en"+nbClients);
			posX=0;
			posY=0;
			
			socket.on('online',function(player){
			
			console.log(player);
			socket.emit('pos',posX,posY);
			console.log(posX,posY);	
			});
			
			dessine();
		
		
		}else if(nbClients==2){
			console.log("arrivé en"+nbClients);
			posX=9;
			posY=9;
			socket.emit('pos',posX,posY);
			//dessine();
		
			socket.on('Personnage',function(posx,posy){
				posX2=posx;
				posY2=posy;
				dessine();
			});
		} 

});


getLab();
document.addEventListener("keydown",ecouteurClavier,false);



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
	imagePers.src="images/perso.jpg";
	imagePers.onload = function(){
		gPers.drawImage(imagePers,0,0,25,25);
		g.putImageData(gPers.getImageData(0,0,28,28),posX*CASE+1,posY*CASE+1);
		
	}

	var canvasPers2 = document.createElement("canvas");
	canvasPers2.height = CASE-2;
	canvasPers2.width = CASE-2;
	var gPers1 = canvasPers2.getContext("2d");
	var imagePers1 = new Image();
	imagePers1.src = "images/bat.png";
	imagePers1.onload = function(){
	
			gPers1.drawImage(imagePers1,0,0,25,25);
			g.putImageData(gPers1.getImageData(0,0,28,28),posX2*CASE+1,posY2*CASE+1);
			
	
	}	
}
	

	

function imageLab(){
var i,x,y;
	var dim = Math.sqrt(monLab.length);
	//var zoneDessin = document.getElementById("labyrinthe");
	var zoneDessin = document.createElement("canvas");
	zoneDessin.width = CASE*dim;
	zoneDessin.height = CASE*dim;
	var g = zoneDessin.getContext("2d");
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
		g.strokeStyle='red';
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
	switch(evt.keyCode){
		case 37 :
			if(monLab[posY*dim+posX]["O"]>=0){
			
				posX = posX-1;
			
	
				console.log(posX);
				console.log(posY);
				socket.emit('Position',posX,posY);
				
				dessine();
			}
			break;
		
		case 38 :

			if(monLab[posY*dim+posX]["N"]>=0){
			
				posY = posY-1;

			console.log(posX);
			console.log(posY);
			socket.emit('Position',posX,posY);
			
				
			dessine();
			}
			break;
			
			
		case 39 :
			if(monLab[posY*dim+posX]["E"]>=0){
		
			
				posX = posX+1;

			console.log(posX);
			console.log(posY);
			socket.emit('Position',posX,posY);
		
			dessine();
			}
			break;
			
			
		case 40 :
			if(monLab[posY*dim+posX]["S"]>=0){
				posY = posY+1;
				
			console.log(posX);
			console.log(posY);
			socket.emit('Position',posX,posY);
	
			dessine();
			}
			break;
			
			
	}
}



},false);

