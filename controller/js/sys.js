var CONTROLLER = (function (controller, $) {
    var dom = {}, // dict of $ objects: debug, controller, screens
        id = Math.round(Math.random() * 1000000000),
        emit_reset_id = 0;
    
    controller.meta = {};
    controller.id = id;
    controller.screens = [];
    controller.uiLib = false;
    
    // define our modules
    controller.server = (function() {
        var server = {};
        
        server.id = 0;
        server.ready = false;
        
        server.onReadyCallback = false;
        
        server.onReadyJoin = function(server_id, callback) {
            controller.server.onReadyCallback = true;
            
            var t = setInterval(function() {
                if (!controller.server.ready) {
                    return;
                }
                controller.server.join(server_id, callback);
                clearInterval(t);
            }, 10);
        }
        
        server.connected = function() {
            if (server.id) {
                return true;
            }
            return false;
        };
        
        server.join = function(server_id, callback) {
            controller.socket.emit("join screen", server_id, function(success) {
                success && callback && callback();
            });
            server.id = server_id;
        };

        server.leave = function() {
            if (!server.connected()) {
                return;
            }
            
            server.id = 0;
            $(dom.controller).empty();
            $(dom.toggles).empty();
        };
        
        server.setMeta = function(meta) {
            controller.meta = meta;
            
            controller.sensors.processSensors();
            if ('controller_ui' in controller.meta) {
                controller.ui.onReadySetUI(controller.meta.controller_ui);
            }
        };
        
        server.message = function(message) {
            controller.socket.emit('msg', message);
        };
        
        return server;
    }());

    controller.emit = (function() {
        var emit = {}, rate_max = 30;
        
        emit.counter = 0;
        emit.reset_rate = 500;
        
        emit.resetCounter = function() {
            emit.counter = 0;
        };
        
        emit.isThrottled = function() {
            if (emit.counter > rate_max) {
                return true;
            }
            return false;
        };
        
        return emit;
    }());

    controller.actions = (function() {
        var actions = {};
        
        actions.set = function(new_actions) {
            game_actions = new_actions;
            
            if ('accelerometer' in game_actions) {
                controller.sensors.enableAccelerometer();
            }
        };
        
        actions.send = function(name, o) {
            if (!controller.server.connected() || controller.emit.isThrottled()) {
                return;
            }
            
            controller.emit.counter += 1;
            controller.socket.emit('action', {'type': name, 'data': o});
            
            controller.util.debug(name + ": " + o[0] + " : " + o[1]);
        };
                
        return actions;
    }());
    
    controller.sensors = (function() {
        var sensors = {};
        
        sensors.toggleSensor = function(sensor_name) {
            if (controller.meta.sensors.indexOf(sensor_name) != -1) {
                controller.meta.sensors.splice(controller.meta.sensors.indexOf(sensor_name), 1);
            } else {
                controller.meta.sensors.push(sensor_name);
            }
        };
                
        sensors.processSensors = function() {
            if (controller.meta.sensors.indexOf("accelerometer") != -1) {
                console.log('enable accelerometer tracking');
                controller.sensors.enableAccelerometer();
            }
        };
        
        sensors.enableAccelerometer = function() {
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", function () {
                    if (controller.meta.sensors.indexOf("accelerometer") != -1) {
                        controller.actions.send('accelerometer', [event.beta, event.gamma]);
                    }
                }, true);
            
            } else if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', function () {
                    if (controller.meta.sensors.indexOf("accelerometer") != -1) {
                        controller.actions.send('accelerometer', [event.acceleration.x * 2, event.acceleration.y * 2]);
                    }
                }, true);
            } else {
                window.addEventListener("MozOrientation", function () {
                    if (controller.meta.sensors.indexOf("accelerometer") != -1) {
                        controller.actions.send('accelerometer', [orientation.x * 50, orientation.y * 50]);
                    }
                }, true);
            }
        };
        
        return sensors;
    }());
    
    // TODO: move this out into ui module
    controller.ui = {
        set: function(ui) {
            controller.uiLib = ui;
        },
        
        onReadySetUI: function(controller_ui) {
            var t = setInterval(function() {
                if (!controller.uiLib) {
                    return;
                }
                controller.uiLib.setControllerId(controller_ui);
                clearInterval(t);
            }, 10);
        },
        
        updateScreenList: function() {
            if (controller.server.onReadyCallback) {
                return;
            }
            
            $(dom.screens).show();
            $(dom.screens).html("");

            for (var i in controller.screens) {
                $(dom.screens).append($("<li>click to join: <a href='' class='joinScreen' id='" + controller.screens[i] + "'>" + controller.screens[i] + "</a></li>"));
            }
        },

        joinedScreen: function() {
            $(dom.screens).hide();
            controller.util.debug("Joined screen " + controller.server.id);
        }
    };
    
    controller.util = {
        debug: function (msg) {
            $(dom.debug).html(msg);
        }
    };
    
    controller.init = function(o) {
        dom = o.dom || {};
        emit_reset_id = window.setInterval(controller.emit.resetCounter, controller.emit.reset_rate);
    }
    
    controller.disconnected = function() {
        controller.server.leave();
    };
	
	return controller;
}(CONTROLLER || {}, jQuery));
