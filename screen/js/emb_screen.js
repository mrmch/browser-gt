var EMBSCREEN = (function(embscreen) {
    var controllers = [],
        server_url;
    
    embscreen.screen_id = Math.round(Math.random() * 1000000000);
    embscreen.meta = {};
    
    embscreen.init = function(o) {
        server_url = o.server_url || window.location.origin;
        embscreen.socket = io.connect(server_url + "/screens");
        embscreen.network();
        
        embscreen.meta = o || {};
        
        APP.init();
        APP.start();
    }
    
    embscreen.network = function() {
        // network code
        embscreen.socket.on('connect', function() {
            // announce this screen to the server
            embscreen.socket.emit('set screen_id', embscreen.screen_id, function() {
                embscreen.socket.emit('set meta', embscreen.meta);
            });
        });

        embscreen.socket.on('controller joined ' + embscreen.screen_id, function(controller_id) {
            // controller joined
            controllers.push(controller_id);

            // notify the game
            APP.player_joined(controller_id);
            
            console.log(controller_id);
        });

        embscreen.socket.on('controller left ' + embscreen.screen_id, function(controller_id) {
            controllers.splice(controllers.indexOf(controller_id), 1);

            // notify the game     
            APP.player_left(controller_id);   
        });

        embscreen.socket.on('new action ' + embscreen.screen_id, function(o) {
            // controller performed an action
            // o[0]: controller id
            // o[1]: action object: {type, data}
            APP.controller_action(o[0], o[1]);
        });

        embscreen.socket.on('msg ' + embscreen.screen_id, function(o) {
            // controller sent a message
            // o[0]: controller_id
            // o[1]: message
            APP.controller_message(o[0], o[1]);
        });

        embscreen.socket.on('disconnect', function() {
            // connection error handling
        });
    }    
    return embscreen;
}(EMBSCREEN || {}));
