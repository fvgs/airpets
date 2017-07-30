const socketIO = require('socket.io');
const {figures} = require('./figures');

const PORT = 4000;
const io = socketIO(PORT);

function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({[prop]: JSON.parse(JSON.stringify(o[prop]))})));
}

const objects = {
    alpha: pick(figures, 'tree-1', 'tree-2', 'tree-3', 'tree-4', 'tree-5',
        'tree-6', 'tree-7', 'tree-8', 'tree-9', 'mountain-1', 'grass-plant-1',
        'grass-plant-2', 'grass-plant-3', 'grass-plant-4', 'grass-plant-5',
        'grass-plant-6', 'grass-plant-7', 'grass-plant-8', 'grass-plant-9',
        'grass-plant-10', 'grass-plant-11', 'grass-plant-12', 'grass-plant-13',
        'grass-plant-14', 'grass-plant-15', 'grass-plant-16', 'grass-plant-17',
        'grass-plant-18', 'grass-plant-19', 'grass-plant-20', 'grass-plant-21',
        'grass-plant-22', 'grass-plant-23', 'grass-plant-24', 'grass-plant-25',
        'grass-plant-26', 'grass-plant-27', 'grass-plant-28', 'grass-plant-29',
        'grass-plant-30', 'grass-plant-31', 'grass-plant-32', 'grass-plant-33',
        'grass-plant-34', 'rock-1', 'rock-2', 'rock-3')
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
            position[dimension] += (Math.random() - 0.5) / 100.0;
        })
    });
    io.to('alpha').emit('update objects', objects.alpha);
}, 10);
