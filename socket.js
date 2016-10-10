var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var i =0;
var joueurs={};

/*app.get('/', function(req,res){

	res.sendFile(__dirname + '/labyrinthe.html');

});*/

io.on('connection', function(socket){


	i++;
	var player;
	var pers;
	pers=i;
	player=i;
	
	
	socket.emit('positionPlayer',i);
	
	socket.broadcast.emit('online',player);
	
	socket.on('pos',function(posX,posY){
	
		socket.broadcast.emit('Personnage',posX,posY);

	});
	
	
	console.log('new player '+i);
	
	
	socket.on('Position',function(posx,posy,pers){

	socket.broadcast.emit('Personnage',posx,posy,pers);
	

	});
	
	
	
});



http.listen(8081,function(){

	console.log('Ecoute de 8081');


});
