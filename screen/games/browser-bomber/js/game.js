/**
 * GAME JS
 */
var GAME = GAME || {
    'name': 'browser-bomber',
    'author': 'Matt Harris',
    'desc': 'Browser based bomberman clone',
    'map_width': 25,
    'map_height': 17,
    'tile_size': 32,
    'screen': {
        'width': 0,
        'height': 0
    },
    'players': {}
};


/**
 * Loading screen, loads our sprites
 */
GAME.loadingScreen = function() {

    //load takes an array of assets and a callback when complete
    Crafty.load([
            GAME.sprite_base + 'white_player_32x40.gif',
            GAME.sprite_base + 'tiles_items_20x20.gif'
        ], function () {
            //when everything is loaded, run the main scene

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'tiles_32x32.gif', {
                bomb1:      [0, 0],
                bomb2:      [1, 0],
                bomb3:      [2, 0],
                dead:       [3, 0],
                ground1:    [0, 1],
                ground2:    [1, 1],
                ground3:    [2, 1],
                ground4:    [3, 1],
                box1:       [0, 2],
                box2:       [1, 2],
                block1:     [0, 3],
                block2:     [1, 3],
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'white_player_32x32.gif', {
                WhiteSprite: [0, 0],
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'red_player_32x32.gif', {
                RedSprite: [0, 0],
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'blue_player_32x32.gif', {
                BlueSprite: [0, 0],
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'green_player_32x32.gif', {
                GreenSprite: [0, 0],
            });

            Crafty.scene("main"); 
    });

    //black background with some loading text
    Crafty.background("#FFF");
    Crafty.e("2D, DOM, Text")
        .attr({
            w: 100, 
            h: 20, 
            x: 150, 
            y: 120 })
        .text("Loading ...")
        .css({"text-align": "center"});
};

/**
 * Generates the game world
 */
GAME.generateWorld = function() {
    var ground;
    var box = 'box' + Crafty.math.randomInt(1,2);
    var block = 'block' + Crafty.math.randomInt(1,2);
    
    GAME.spawns = [
        { 
            x: 1 * GAME.tile_size,
            y: 1 * GAME.tile_size,
            z: 2,
        }, { 
            x: 1 * GAME.tile_size,
            y: (GAME.map_height - 2) * GAME.tile_size,
            z: 2,
        }, { 
            x: (GAME.map_width - 2) * GAME.tile_size,
            y: 1 * GAME.tile_size,
            z: 2,
        }, { 
            x: (GAME.map_width - 2) * GAME.tile_size,
            y: (GAME.map_height - 2) * GAME.tile_size,
            z: 2,
        }
    ];

    for (var i = 0; i < GAME.map_width; i++) {
        for (var j = 0; j < GAME.map_height; j++) {
            if (i === 0 || i === GAME.map_width-1 || 
                j === 0 || j === GAME.map_height-1) {
                
                // Draw surrounding blocks
                Crafty.e("2D, DOM, solid, block1")
                    .attr({
                        x: i * GAME.tile_size, 
                        y: j * GAME.tile_size, 
                        z: 2
                    }
                );
            } else if (i % 2 === 0 && j % 2 === 0) {

                // Draw concrete blocks
                Crafty.e("2D, DOM, solid, " + block)
                    .attr({
                        x: i * GAME.tile_size, 
                        y: j * GAME.tile_size, 
                        z: 2
                    }
                );
            } else if (
                    ((i === 1 || i === 2) && 
                    (j === 1 || j === 2 || 
                     j === GAME.map_height - 2 || j === GAME.map_height - 3)) ||
                    ((i === GAME.map_width - 2 || i === GAME.map_width - 3) && 
                    (j === 1 || j === 2 || j === GAME.map_height - 2 || j === GAME.map_height - 3))) {
                console.log('draw nothing, player start');

            } else {

                // draw explodable blocks
                ground = Crafty.math.randomInt(1, 2);
                Crafty.e('2D, DOM, solid, explodable, ' + box)
                    .attr({
                        x: i * GAME.tile_size,
                        y: j * GAME.tile_size,
                        z: 2
                    })
                    .bind('explode', function() {
                        this.destroy();
                    }
                );
                 
            }

            // draw ground
            ground = Crafty.math.randomInt(1,4);
            Crafty.e("2D, DOM, ground" + ground)
                .attr({
                    x: i * GAME.tile_size, 
                    y: j * GAME.tile_size, 
                    z: 0
                }
            );
        }
    }

    Crafty.c('LeftControls', {
        init: function() {
            this.requires('Multiway');
        },
        leftControls: function(speed) {
            this.multiway(speed, {
                W: -90,
                S: 90,
                D: 0,
                A: 180
            });
            return this;
        }
    });

    Crafty.c('Ape', {
        Ape: function() {
            // setup player animation
            this.requires('SpriteAnimation, Collision, Grid')
            .animate('walk_down',   0, 0, 4)
            .animate('walk_left',   0, 3, 4)
            .animate('walk_up',     0, 2, 4)
            .animate('walk_right',  0, 1, 4)
            .bind('NewDirection', function (direction) {
                // console.log(direction.x + " - " + direction.y);
                if (direction.x < 0) {
                    if (!this.isPlaying("walk_left"))
                        this.stop().animate("walk_left", 15, -1);
                }
                if (direction.x > 0) {
                    if (!this.isPlaying("walk_right"))
                        this.stop().animate("walk_right", 15, -1);
                }
                if (direction.y < 0) {
                    if (!this.isPlaying("walk_up"))
                        this.stop().animate("walk_up", 5, -1);
                }
                if (direction.y > 0) {
                    if (!this.isPlaying("walk_down"))
                        this.stop().animate("walk_down", 5, -1);
                }
                if(!direction.x && !direction.y) {
                    this.stop();
                }
            }).onHit('solid', function () {
                // we dont like hitting solids :( 
                return;
            }).bind('Moved', function (from) {
                if (this.hit('solid')) {
                    this.attr({
                        x: from.x, 
                        y: from.y
                    });
                }
            }).onHit('fire', function() {
                this.destroy();
                // Subtract life and play scream sound :-)
            });
            return this;
        }
    });

};

GAME.mainScreen = function() {
    /**
     * Main Game Screen
     * labels all the sprites and sets up the player
     */


    GAME.generateWorld();


    // white player
    GAME.players.white = Crafty
        .e('2D, DOM, WhiteSprite, Ape, LeftControls')
        .attr(GAME.spawns[0]).leftControls(1)
        .Ape();

    GAME.players.red = Crafty
        .e('2D, DOM, RedSprite, Ape, LeftControls')
        .attr(GAME.spawns[1]).leftControls(1)
        .Ape();

    GAME.players.green = Crafty
        .e('2D, DOM, GreenSprite, Ape, LeftControls')
        .attr(GAME.spawns[2]).leftControls(1)
        .Ape();

    GAME.players.blue = Crafty
        .e('2D, DOM, BlueSprite, Ape, LeftControls')
        .attr(GAME.spawns[3]).leftControls(1)
        .Ape();
};

GAME.tick = function() {
    /**
     * GAME.tick
     * Controls rendering each round
     */

    GAME.window.webkitRequestAnimationFrame(GAME.tick);

    if (PAUSE_ANIMATION) {
        return;
    }

    GAME.render();
};

GAME.render = function() {
    /**
     * GAME.render
     * renders the game screen
     */
    return;
};

GAME.start = function() {
    /**
     * GAME.start
     * starts the game
     */
    console.log(GAME);
    Crafty.scene('loading');
};

GAME.init = function(window, width, height) {
    /**
     * GAME.init
     * Intiates the game state
     */

    GAME.window = window;
    GAME.screen.width = width;
    GAME.screen.height = height;
    Crafty.init(width, height);
    Crafty.canvas.init();

    Crafty.background('rgb(127,127,127)');
    Crafty.scene("loading", GAME.loadingScreen);
    Crafty.scene("main", GAME.mainScreen);

    GAME.sprite_base = '/screen/games/' + GAME.name + '/images/';
};

GAME.controller_action = function(controller_id, action) {
    if (action.hasOwnProperty('accelerometer')) {
        if (action.accelerometer[0] > 20) {
            Crafty.trigger('KeyDown', {key: Crafty.keys["S"]});
            window.setTimeout('Crafty.trigger("KeyUp", {key: Crafty.keys["S"]})', 20);
        } else if (action.accelerometer[0] < -20) {
            Crafty.trigger('KeyDown', {key: Crafty.keys["W"]});
            window.setTimeout('Crafty.trigger("KeyUp", {key: Crafty.keys["W"]})', 20);
        }
        
        if (action.accelerometer[1] > 20) {
            Crafty.trigger('KeyDown', {key: Crafty.keys["D"]});
            window.setTimeout('Crafty.trigger("KeyUp", {key: Crafty.keys["D"]})', 20);
        } else if (action.accelerometer[1] < -20) {
            Crafty.trigger('KeyDown', {key: Crafty.keys["A"]});
            window.setTimeout('Crafty.trigger("KeyUp", {key: Crafty.keys["A"]})', 20);
        }        
    }
}