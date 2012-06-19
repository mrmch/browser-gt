var CONTROLLER = (function (controller) {
    controller.socket = io.connect(window.location.origin + "/controllers");
    
    controller.socket.on('updated screen list', function(updated_screens) {
        // No screens are present. If we're in one, leave it - it's defunct
        if (updated_screens.length == 0 && controller.server.id) {
            controller.server.leave();
        }

        controller.screens = updated_screens;
        controller.util.debug("Total screens: " + controller.screens.length);

        controller.ui.updateScreenList();
    });
    
    controller.socket.on('set meta', function(meta) {
        controller.server.setMeta(meta);
    });

    controller.socket.on('connect', function() {
        controller.socket.emit('set controller_id', controller.id);
    });

    controller.socket.on('disconnect', function() {
        controller.util.debug("Error connecting to the server.");
        controller.disconnected();
    });
    
    return controller;
}(CONTROLLER || {}));