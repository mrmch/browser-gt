/**
 * GAME JS
 */


/*

PAUSE_ANIMATION = false,

simulateKeyPress = function(key, delay) {
    // key must be in Crafty's keys array. No lower case letters!
    var keyUp = function() {
    Crafty.trigger("KeyUp", {key: Crafty.keys[key]});
    }

    Crafty.trigger('KeyDown', {key: Crafty.keys[key]});
    window.setTimeout(keyUp, delay);
};
*/

var MARGIN = 100,
    SCREEN_WIDTH = window.innerWidth * .90,
    SCREEN_HEIGHT = window.innerHeight * .90,
    FLOOR = -250,
    TILE_SIZE = 32;

var GAME = GAME || {
    name: 'browser-bomber',
    map_width: 25,
    map_height: 17,
    tile_size: TILE_SIZE,
    max_players: 4,
    num_players: 0,
    screen: {
        width: 0,
        height: 0
    },
    placedBombs: [],
    players: {},
    player_colours: ["White", "Green", "Red", "Blue"],


    init: function() {
        /**
        * GAME.init
        * Intiates the game state
        */

        GAME.window = window;
        GAME.screen.width = SCREEN_WIDTH;
        GAME.screen.height = SCREEN_HEIGHT;
        Crafty.init(SCREEN_WIDTH, SCREEN_HEIGHT);
        Crafty.canvas.init();

        Crafty.background('rgb(127,127,127)');
        Crafty.scene("loading", GAME.loadingScreen);
        Crafty.scene("main", GAME.mainScreen);

        GAME.sprite_base = '/screen/games/' + GAME.name + '/images/';
    },

    start: function() {
        /**
         * GAME.start
         * starts the game
         */
        Crafty.scene('loading');
    },

    controller_action: function(player_id, action) {
        console.log('G', 'controller_action', player_id, action);
        if (action.hasOwnProperty('button')) {
            var b = action.button;
            console.log('G', 'controller_action', b.action, b.state);
            GAME.players[player_id].e.trigger(b.action, b);
        }

    },

    player_joined: function(player_id) {
        if (player_id in GAME.players) {
            return;
        }

        console.log('Currently have: ' + GAME.players.length + ' players');

        if (GAME.num_players >= GAME.max_players) {
            // max players
            console.log('Too many players');
            return;
        }

        var colour = GAME.player_colours[GAME.num_players];

        console.log('New player colour: ' + colour);

        GAME.players[player_id] = {
            e: Crafty
                .e('2D, DOM, ' + colour + 'Sprite, Ape, IOControls, DropsBombs')
                .attr(GAME.spawns[GAME.num_players])
                .DropBombs(1)
                .IOControls(1)
                .Ape(),
            id: player_id,
            score: 0,
        };
        
        GAME.num_players++;
        $("#game_status").html("Player joined! " + player_id);
    },

    player_left: function(player_id) {
        if (GAME.players.hasOwnProperty(player_id)) {
            delete GAME.players[player_id];
        }
        $("#game_status").html("Player left! " + player_id);
        GAME.num_players++;
    },

    loadingScreen: function() {
        /**
         * Loading screen, loads our sprites
         */

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
    },

    generateWorld: function() {
        /**
         * Generates the game world
         */
        var ground;
        var box = 'box' + Crafty.math.randomInt(1,2);
        var block = 'block' + Crafty.math.randomInt(1,2);
        

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
                            GAME.destroy();
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

        Crafty.c('IOControls', {
            __move: {left: false, right: false, up: false, down: false},
            _speed: 5,

            IOControls: function(speed) {
                if (speed) this._speed = speed;
                var move = this.__move;

                this.bind('LEFT', function(e) {
                    var from = {x: this.x, y: this.y};
                    this.x -= this._speed; 
                    this.trigger('Moved', from);
                }).bind('RIGHT', function(e) {
                    var from = {x: this.x, y: this.y};
                    this.x += this._speed;
                    this.trigger('Moved', from);
                }).bind('UP', function(e) {
                    var from = {x: this.x, y: this.y};
                    this.y -= this._speed;
                    this.trigger('Moved', from);
                }).bind('DOWN', function(e) {
                    var from = {x: this.x, y: this.y};
                    this.y += this._speed;
                    this.trigger('Moved', from);
                });

                return this;
            }
        });

        Crafty.c('DropsBombs', {
            DropBombs: function() {
                this.bind('BUTTON_A', function() {

                    Crafty.e('2D, DOM, bomb, bomb1')
                    .attr({
                        x: this._x, 
                        y: this._y, 
                        z: this._z
                    });
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
                .bind('LEFT', function(e) {
                    if (e.state == 'DOWN')
                        if (!this.isPlaying("walk_left"))
                            this.stop().animate("walk_left", 10);
                    else
                        this.stop();
                }).bind('RIGHT', function(e) {
                    if (e.state == 'DOWN')
                        if (!this.isPlaying("walk_right"))
                            this.stop().animate("walk_right", 10);
                    else
                        this.stop();
                }).bind('UP', function(e) {
                    if (e.state == 'DOWN')
                        if (!this.isPlaying("walk_up"))
                            this.stop().animate("walk_up", 10);
                    else
                        this.stop();
                }).bind('DOWN', function(e) {
                    if (e.state == 'DOWN')
                        if (!this.isPlaying("walk_down"))
                            this.stop().animate("walk_down", 10);
                    else
                        this.stop();
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

    },

    mainScreen: function() {
        /**
        * Main Game Screen
        * labels all the sprites and sets up the player
        */

        GAME.generateWorld();
    },

    tick: function() {
        /**
        * GAME.tick
        * Controls rendering each round
        */

        GAME.window.webkitRequestAnimationFrame(GAME.tick);

        if (PAUSE_ANIMATION) {
            return;
        }

        GAME.render();
    },

    render: function() {
        /**
        * GAME.render
        * renders the game screen
        */
        return;
    },
};

GAME.spawns = [{ 
    x: 1 * TILE_SIZE,
    y: 1 * TILE_SIZE,
    z: 2,
}, { 
    x: 1 * TILE_SIZE,
    y: (GAME.map_height - 2) * TILE_SIZE,
    z: 2,
}, { 
    x: (GAME.map_width - 2) * TILE_SIZE,
    y: 1 * TILE_SIZE,
    z: 2,
}, { 
    x: (GAME.map_width - 2) * TILE_SIZE,
    y: (GAME.map_height - 2) * TILE_SIZE,
    z: 2,
}];

