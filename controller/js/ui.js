var UI = function () {
    var ui = {}, container;
    
    ui.controls = [];
    ui.box_size = 60;
    ui.use_events = {};
    
    ui.event_types = {
        mouse: {
            start: 'mousedown',
            stop: 'mouseup',
            leave: 'mouseleave',
            listen_string: 'mousedown mouseup'
        },
        touch: {
            start: 'touchstart',
            stop: 'touchend',
            leave: 'touchmove',
            listen_string: 'touchstart touchend'
        }
    };
    
    ui.init = function(opts) {
        var dpad = COMPONENT_SETS.dpad({
                x: 0,
                y: 0
            }),
            
            two_buttons = COMPONENT_SETS.twoButtons({
                x: 0,
                y: 0
            });
        
        container = opts.container || '#controller';
        container = $(container);
        
        // figure out which events are going to be used
        $('body').one('mousemove', function(e){
            ui.use_events = ui.event_types.mouse;
            console.log("We're going to use mouse events", ui.use_events);
        }).one('touchstart', function(e) {
            $('body').unbind('mousemove');
            use_events = ui.event_types.touch;
            console.log("We're going to use touch events", ui.use_events);
        });

        // render UI
        for (i = 0; i < dpad.length; i++) {
            ui.controls.push(new COMPONENT(dpad[i], ui));
        }

        for (i = 0; i < two_buttons.length; i++) {
            ui.controls.push(new COMPONENT(two_buttons[i], ui));
        }
        
        for (i = 0; i < ui.controls.length; i++) {
            container.append(ui.controls[i].render({controlId:i}));
        }

        container.on(ui.use_events.listen_string, 'div', ui.fireEvent);
    };
    
    ui.fireEvent = function(e) {
        var controlId = parseInt($(this).data('controlId')) || 0;
        ui.controls[controlId].fireEvent(e);
    };
    
    return ui;
}

var COMPONENT = function (init, ui) {
    var component = {},
        x, y, w, h, fill, type, action, fireOnce, text, state, bounds, intervalTimeout;
    
    x = init.x || 0;
    y = init.y || 0;
    w = init.w || ui.box_size;
    h = init.h || ui.box_size;
    fill = init.fill || '#FF6600';
    type = init.type || 'button';
    action = init.action || '';
    fireOnce = init.fireOnce || false;
    text = init.text || false;
    state = init.state || 'up';
    bounds = init.bounds || ['top', 'left'];
    interval_timeout = 50;
    
    component.render = function(opts) {
        var controlId = opts.controlId || null,
            el = document.createElement('div'),
            text = document.createElement('span');

        $(el)
            .attr('id', action)
            .data('controlId', parseInt(controlId)) 
            .css({
                position: 'absolute',
                width: w,
                height: h,
                background: fill
            })
            .css(bounds[0], y)
            .css(bounds[1], x);

        if (text) {
            $(text).text(text); // TODO: just wow...
            $(text).css('font-size', w + 'px');
            $(el).append(text);
        }

        el = '#' + action;
        return el;
    };
    
    component.fireEvent = function(e) {
        e.preventDefault();

        if (e.type == ui.use_events.start) {
            $(el).bind(ui.use_events.leave, ui.fireEvent);
            component.fireMouseDown(); 
        
        } else if (e.type == ui.use_events.stop) {
            component.fireMouseUp();
        
        } else if (e.type == ui.use_events.leave) {
            component.fireMouseUp();
        }
    };

    component.fireMouseDown = function() {
        console.log('fireMouseDown', this);
        state = 'down';

        clearInterval(interval);

        // fire the event!
        CONTROLLER.actions.send("button", component);

        // set interval for repeated events
        if (!fireOnce) {
            interval = setInterval(function() {
                component.fireMouseDown();
            }, interval_timeout);            
        }

    };

    component.fireMouseUp = function() {
        console.log('fireMouseUp', this);

        clearInterval(interval);

        $(el).unbind(ui.use_events.leave);
        state = 'up';
        CONTROLLER.actions.send("button", component);
    };
    
    return component;
};

var COMPONENT_SETS = (function (components) {
    components.dpad = function(opts) {
        opts.x = opts.x || 0;
        opts.y = opts.y || 0;
        opts.w = opts.w || 80;
        opts.h = opts.h || 80;
        opts.padding = opts.padding || 0;

        var buttons = [{
                x: opts.x + opts.w, 
                y: opts.y, 
                w: opts.w,
                h: opts.h,
                action: 'UP',
                bounds: ['top', 'left']
            }, {
                x: opts.x, 
                y: opts.y + opts.w, 
                w: opts.w,
                h: opts.h,
                action: 'LEFT',
                bounds: ['top', 'left']
            },  {
                x: opts.x + (opts.w* 2), 
                y: opts.y + opts.h, 
                w: opts.w,
                h: opts.h,
                action: 'RIGHT',
                bounds: ['top', 'left']
            }, {
                x: opts.x + opts.w, 
                y: opts.y + (opts.h* 2), 
                w: opts.w,
                h: opts.h,
                action: 'DOWN',
                bounds: ['top', 'left']
            }
        ]; 

        return buttons;
    };

    components.twoButtons = function(opts) {
        opts.x = opts.x || 0;
        opts.y = opts.y || 0;
        opts.w = opts.w || 100;
        opts.h = opts.h || 100;
        opts.padding = opts.padding || 20;

        var buttons = [
            {
                x: opts.x + opts.padding + (opts.w * 2), 
                y: opts.y + opts.h, 
                w: opts.w, 
                h: opts.h, 
                action: 'BUTTON_A',
                text: 'A',
                fill: '#33FF00',
                fireOnce: true,
                bounds: ['top', 'right']
            }, {
                x: opts.x + opts.w, 
                y: opts.y + opts.h, 
                w: opts.w, 
                h: opts.h, 
                action: 'BUTTON_B',
                text: 'B',
                fill: '#33FF00',
                fireOnce: true,
                bounds: ['top', 'right']
            }
        ];
        return buttons; 
    };
    
    return components;
}(COMPONENT_SETS || {}));
