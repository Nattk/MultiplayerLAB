var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var nbClients =0;
var player=0;

/*app.get('/', function(req,res){

	res.sendFile(__dirname + '/labyrinthe.html');

});*/

io.on('connection', function(socket){


	
	socket.on('rejoindre',function(room){
		
	
		
		socket.join(room,function(){
			console.log('join '+room);
				
			nbClients =  Object.keys(socket.adapter.rooms[room]).length;
			console.log('nbclient : '+nbClients);
			player=nbClients;
			console.log('La room '+room);
		
			socket.broadcast.to(room).emit('Player',nbClients);
			
			socket.broadcast.to(room).emit('online',player);
			console.log('online'+room); 
			
			
				
		});
		
		socket.on('j1',function(joueur){		
			socket.broadcast.to(room).emit('joueur1',joueur);	
		});
		
		
		console.log('player '+player);
		console.log('nbclients '+nbClients);
		
		/* 
		io.sockets.in(room).emit('Player',nbClients);
		console.log('brodcast position '+room);
		console.log('je suis joueur'+nbClients);
		io.sockets.in(room).emit('online',nbClients);
		console.log('online'+room); 
		 */
		
		
		//reçoit une position et renvoi la sienne
		socket.on('pos',function(posX,posY){
			
			socket.broadcast.to(room).emit('Personnage',posX,posY);
			
			
		});
		
		
		
//reçoit une position et renvoi la sienne

		socket.on('Position',function(posx,posy){

			socket.broadcast.to(room).emit('Personnage',posx,posy);


		});
		
		
		
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
