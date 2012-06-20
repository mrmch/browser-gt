var express = require('express'),
    app = express.createServer(), 
    io = require('socket.io').listen(app),
    controllers = [],
    screens = [],
    screen_meta = {};

app.get('/screen', function(req, res){
    res.redirect('/screen/index.html');
});
app.get('/controller', function(req, res){
    res.redirect('/controller/index.html');
});

app.use('/screen/', express.static(__dirname + '/screen/', { maxAge: 31557600000 }));
app.use('/controller/', express.static(__dirname + '/controller/'));

app.listen(8080);

var screen_io = io.of('/screens').on('connection', function(socket) {
    socket.on('set screen_id', function(screen_id) {
        if (screens.indexOf(screen_id) == -1) {
            screens.push(screen_id);
        }
        
        socket.set('screen_id', screen_id, function() {
           controller_io.emit('updated screen list', screens); 
        });
    });
    
    socket.on('set meta', function(meta) {
        socket.get('screen_id', function(err, screen_id) {
            screen_meta[screen_id] = meta;
        });
    });
    
    socket.on('disconnect', function() {
        socket.get('screen_id', function(err, screen_id) {
            screens.splice(screens.indexOf(screen_id), 1);
            controller_io.emit('updated screen list', screens);
        });
    });
});

var controller_io = io.of('/controllers').on('connection', function(socket) {
    socket.on('set controller_id', function (controller_id) {
        if (controllers.indexOf(controller_id) == -1) {
            controllers.push(controller_id);
        }

        socket.set('controller_id', controller_id);
        socket.emit('updated screen list', screens);
    });
    
    socket.on('action', function(action) {
        socket.get('controller_id', function(err, controller_id) {
            socket.get('on_screen', function(err, screen_id) {
                screen_io.emit('new action ' + screen_id, [controller_id, action]);
            });
        });
    });
    
    socket.on('join screen', function(screen_id, success) {
        socket.set('on_screen', screen_id, function() {
            socket.get('controller_id', function(err, controller_id) {
                screen_io.emit('controller joined ' + screen_id, controller_id);
            });
        });
        socket.emit('set meta', screen_meta[screen_id]);
        success(true);
    });
    
    socket.on('msg', function(message) {
        socket.get('controller_id', function(err, controller_id) {
            socket.get('on_screen', function(err, screen_id) {
                screen_io.emit('msg ' + screen_id, [controller_id, message]);
            });
        });
    });
    
    socket.on('disconnect', function() {
        socket.get('controller_id', function(err, controller_id) {
            controllers.splice(controllers.indexOf(controller_id), 1);
            
            socket.get('on_screen', function(err, screen_id) {
                screen_io.emit('controller left ' + screen_id, controller_id);
            });
        });
    });
});
