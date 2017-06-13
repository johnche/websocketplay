var express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);
var port = 8000;

express.get('/', function(req, res){
	res.sendFile('main.html', {root: __dirname});
});

io.on('connection', function(socket){
	console.log('connected');
});

http.listen(port, function(){
	console.log('Listening to port ' + port);
});
