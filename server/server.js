const socketIO = require('socket.io');
const { figures } = require('./figures');

const PORT = 4000;
const io = socketIO(PORT);

function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({[prop]: JSON.parse(JSON.stringify(o[prop]))})));
}

const objects = {
    alpha: pick(figures, 'raven', 'dog', 'lion-cub', 'zebra')
};

io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', function () {
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
    Object.values(objects.alpha).forEach(({position}) => {
        Object.keys(position).forEach(dimension => {
            position[dimension] += Math.random() - 0.5
        })
    });
    io.to('alpha').emit('update objects', objects.alpha)
}, 1000);
