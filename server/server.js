var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('disconnect', function() {
		io.emit('disconnect');
		console.log('disconnected');
	})
	socket.on('position update', function(msg) {
		console.log(msg);
	})

});

server.listen(4000, function() {
	console.log('listening on *:4000');
});
