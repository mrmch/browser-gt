var app = require('express').createServer(),
    io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client/index.html');
});

io.sockets.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my event', function(data) {
        console.log(data);
    });
});

