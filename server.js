var express = require('express'),
    app = express.createServer(), 
    io = require('socket.io').listen(app),
    controllers = [];

app.get('/screen', function(req, res){
    res.redirect('/screen/index.html');
});
app.get('/controller', function(req, res){
    res.redirect('/controller/index.html');
});

app.use('/screen/', express.static(__dirname + '/screen/'));
app.use('/controller/', express.static(__dirname + '/controller/'));

app.listen(8080);

io.sockets.on('connection', function (socket) {
    socket.on('set controller_id', function (controller_id) {
        if (controllers.indexOf(controller_id) == -1) {
            controllers.push(controller_id);
        }

        socket.set('controller_id', controller_id, function() {
            io.sockets.emit('updated controller list', controllers);
        });
    });

    socket.on('disconnect', function() {
        socket.get('controller_id', function(err, controller_id) {
            controllers.splice(nodes.indexOf(controller_id), 1);
            io.sockets.emit('updated controller list', controllers);
        });
    });
});

