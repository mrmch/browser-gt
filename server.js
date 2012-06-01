var express = require('express'),
    app = express.createServer(), 
    io = require('socket.io').listen(app),
    controllers = [],
    screens = [];

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
    // Screens
    socket.on('set screen_id', function(screen_id) {
        if (screens.indexOf(screen_id) == -1) {
            screens.push(screen_id);
        }
        
        socket.set('screen_id', screen_id, function() {
           io.sockets.emit('updated screen list', screens); 
        });
    });
    
    // Controllers
    socket.on('set controller_id', function (controller_id) {
        if (controllers.indexOf(controller_id) == -1) {
            controllers.push(controller_id);
        }

        socket.set('controller_id', controller_id, function() {
            io.sockets.emit('updated screen list', screens);
        });
    });
    
    socket.on('action', function(action) {
        socket.get('controller_id', function(err, controller_id) {
            socket.get('on_screen', function(err, screen_id) {
                io.sockets.emit('new action ' + screen_id, [controller_id, action]);
            });
        });
    });
    
    socket.on('join screen', function(screen_id) {
        socket.set('on_screen', screen_id, function() {
            socket.get('controller_id', function(err, controller_id) {
                io.sockets.emit('controller joined ' + screen_id, controller_id);
            });
        });
    });

    // Both
    socket.on('disconnect', function() {
        socket.get('controller_id', function(err, controller_id) {
            controllers.splice(controllers.indexOf(controller_id), 1);
            
            socket.get('on_screen', function(err, screen_id) {
                io.sockets.emit('controller left ' + screen_id, controller_id);
            });
        });
        
        // this is buggy. screens gets erased when controllers disconnect
        socket.get('screen_id', function(err, screen_id) {
            screens.splice(screens.indexOf(screen_id), 1);
            io.sockets.emit('updated screen list', screens);
        });
    });
});

