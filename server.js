var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , controllers = [];

app.listen(8080);

function handler (req, res) {
    fs.readFile(__dirname + '/controller/controller.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading controller.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.on('set controller_id', function (controller_id) {
        if (controllers.indexOf(controller_id) == -1) {
            controllers.push(controller_id);
        }

        socket.set('controller_id', controller_id, function() {
            io.sockets.emit('updated controller list', controllers);
        });
    });
    
    socket.on('action', function(action) {
        socket.get('controller_id', function(err, controller_id) {
            io.sockets.emit('new action', [controller_id, action]);
        });
    })

    socket.on('disconnect', function() {
        socket.get('controller_id', function(err, controller_id) {
            controllers.splice(controllers.indexOf(controller_id), 1);
            io.sockets.emit('updated controller list', controllers);
        });
    });
});
