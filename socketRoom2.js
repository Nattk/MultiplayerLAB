var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var nbClients =0;
// var player=0;

/*app.get('/', function(req,res){

	res.sendFile(__dirname + '/labyrinthe.html');

});*/

io.on('connection', function(socket){
	/* nbClients++;
	socket.emit('num', nbClients); */
	socket.on('rejoindre',function(room){
		
		socket.join(room,function(){	

			//nbClients++;
			nbClients =  Object.keys(socket.adapter.rooms[room]).length;
			socket.emit('num', nbClients);
			console.log(nbClients);
			//player=nbClients;
			//socket.broadcast.to(room).emit('Player',nbClients);
			//socket.broadcast.to(room).emit('online',player);
			
		});
		
		
		socket.on('deconnexion', function(aroom) {
			var ancienneRoom = Object.keys(socket.adapter.rooms[aroom]).length;
			console.log(ancienneRoom);
			
			socket.leave(aroom,function(){
				nbClients--;
				console.log(nbClients);
				console.log('deconnection de la room'+aroom);
			
			});
		});
		
		/*socket.on('j1',function(joueur){		
			socket.broadcast.to(room).emit('joueur1',joueur);	
		});*/
		
		/* 
		io.sockets.in(room).emit('Player',nbClients);
		console.log('brodcast position '+room);
		console.log('je suis joueur'+nbClients);
		io.sockets.in(room).emit('online',nbClients);
		console.log('online'+room); 
		 */
		 
		 //Si tout le monde est connecté
		 socket.on('Connecte',function(connect){
		 
		 
			socket.broadcast.to(room).emit('la',connect);
		 
		 });
		 
		 //login
		 
		 socket.on('login',function(login,num){
			console.log('login '+login,'Num '+num);
			io.sockets.in(room).emit('log',login,num);
		 });
		
		
		//reçoit une position et renvoi la sienne
		socket.on('pos',function(posX,posY, num){
			
			socket.broadcast.to(room).emit('Personnage',posX,posY, num);
			
		});
		
		
		
		//reçoit une position et renvoi la sienne

		socket.on('Position',function(posX,posY, num){
			var posx = posX;
			var posy = posY;
			socket.broadcast.to(room).emit('Personnage',posx,posy, num);


		});
		
		
		socket.on('score',function(num,score){
		
			console.log(num+' '+score);
			socket.broadcast.to(room).emit('MajScore',num,score);
		
			if(score==3){
			
				console.log("numero gagnant: "+num);
				socket.broadcast.to(room).emit('Gagnant',num);
			
			}
		});
		
		
		/* socket.on('gagner',function(num){		
			console.log('gagner '+num);
			socket.broadcast.to(room).emit('Gagnant',num);
		
		}); */
		
		
		
	});

		
	
});
	

	

	//socket.emit('positionPlayer',i);
	
	
	
	
	//socket.broadcast.emit('online',player);
	

	
	/*socket.on('pos',function(posX,posY){
	
		socket.broadcast.emit('Personnage',posX,posY);

	});*/
	
	
	/*socket.on('Position',function(posx,posy,pers){

	socket.broadcast.emit('Personnage',posx,posy,pers);
	

	});*/
	
http.listen(8081,function(){

	console.log('Ecoute de 8081');


});
