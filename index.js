const { Socket } = require('dgram');

const app = require('express')();

const server = require('http').Server(app);

const io = require('socket.io')(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('chat.message', (message) => {
        io.emit('chat.message', message);
    });

    socket.on('disconnect', () => {
        io.emit('chat.message', 'User have been out the chat room!!!');
    })
});