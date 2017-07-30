const socketIO = require('socket.io');

const PORT = 4000;
const io = socketIO(PORT);

const objects = {
	alpha: {
		A: {x: 0, y: 0, z: 0},
		B: {x: 2, y: 2, z: 2},
		C: {x: -2, y: -2, z: -2},
	},
};

io.on('connect', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', function() {
		io.emit('disconnect');
		console.log('disconnected');
	});

	// socket.on('position update', (msg) => {
	// 	console.log(msg);
	// })

	socket.on('join room', (room) => {
		socket.join(room)
	})
});

setInterval(() => {
	Object.values(objects.alpha).forEach((obj) => {
		Object.keys(obj).forEach((key) => {
			obj[key] += Math.random() - 0.5
		})
	});
	io.to('alpha').emit('update objects', objects.alpha)
}, 1000);
