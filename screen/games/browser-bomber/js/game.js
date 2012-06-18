/**
 * GAME JS
 */

var $ = $ || null;
var window = window || null;
var Crafty = Crafty || null;
var console = console || null;

var MARGIN = 100,
    SCREEN_WIDTH = window.innerWidth * 0.90,
    SCREEN_HEIGHT = window.innerHeight * 0.90,
    FLOOR = -250,
    TILE_SIZE = 32;

var bh = function (bomb) {
    'use strict';
    return bomb.x + ',' + bomb.y;
};

var GAME = GAME || {
    name: 'browser-bomber',

    /**
     * GAME SEUTP
     */
    map_width: 25,
    map_height: 17,
    tile_size: TILE_SIZE,
    max_players: 4,
    num_players: 0,
    bomb_timer: 1000, // 30 ms
    flame_timer: 100,
    screen: {
        width: 0,
        height: 0
    },
    powerups: [{
        func: function (player) {
            'use strict';
            return (player.speed += 0.05);
        },
        prop: 'speed',
        sprite: 'more_speed'
    }, {
        func: function (player) {
            'use strict';
            return (player.range += 1);
        },
        prop: 'range',
        sprite: 'more_range'
    }, {
        func: function (player) {
            'use strict';
            return (player.max_bombs += 1);
        },
        prop: 'max_bombs',
        sprite: 'more_bombs'
    }],
    placedBombs: {},
    players: {},
    player_colours: ["White", "Green", "Red", "Blue"],

    /**
     * END OF SETUP
     */

    init: function () {
        /**
        * GAME.init
        * Intiates the game state
        */

        'use strict';

        //Crafty.modules({ 'crafty-debug-bar': 'release' }, function () {
        //    Crafty.debugBar.show();
        //});

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

    start: function () {
        /**
         * GAME.start
         * starts the game
         */
        'use strict';
        Crafty.scene('loading');
    },

    controller_action: function (player_id, action) {
        'use strict';


        if (action.hasOwnProperty('button')) {
            var b = action.button;
            b.player_id = player_id;
            GAME.players[player_id].e.trigger(b.action + player_id, b);
        }
    },

    player_joined: function (player_id) {
        'use strict';

        if (GAME.players.hasOwnProperty(player_id)) {
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
                .e('2D, DOM, ' + colour + 'Sprite, player, Player')
                .attr(GAME.spawns[GAME.num_players])
                .Player(player_id),
            id: player_id,
            colour: colour,
            score: 0
        };

        GAME.num_players = GAME.num_players + 1;
        $("#game_status").html("Player joined! " + player_id);
    },

    player_left: function (player_id) {
        'use strict';

        if (GAME.players.hasOwnProperty(player_id)) {
            GAME.players[player_id].e.destroy();
            delete GAME.players[player_id];
        }
        $("#game_status").html("Player left! " + player_id);
        GAME.num_players = GAME.num_players - 1;
    },

    loadingScreen: function () {
        /**
         * Loading screen, loads our sprites
         */

        'use strict';

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
                flame1:     [2, 2],
                flame2:     [3, 2],
                block1:     [0, 3],
                block2:     [1, 3],
                more_bombs: [0, 4],
                more_speed: [1, 4],
                more_range: [2, 4]
            });

            /*
            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'white_player_32x32.gif', {
                WhiteSprite: [0, 0]
            });
            */

            Crafty.sprite(28, GAME.sprite_base + 'raposaman.gif', {
                WhiteSprite: [0, 0]
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'red_player_32x32.gif', {
                RedSprite: [0, 0]
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'blue_player_32x32.gif', {
                BlueSprite: [0, 0]
            });

            Crafty.sprite(GAME.tile_size, GAME.sprite_base + 'green_player_32x32.gif', {
                GreenSprite: [0, 0]
            });

            GAME.loadComponents();

            Crafty.scene("main");
        });

        //black background with some loading text
        Crafty.background("#FFF");
        Crafty.e("2D, DOM, Text")
            .attr({
                w: 100,
                h: 20,
                x: 150,
                y: 120
            }).text("Loading ...")
            .css({"text-align": "center"});
    },

    loadComponents: function() {
        /**
         * Load game components
         */

        Crafty.c('Explodable', {
            Explodable: function () {
                this.requires('Collision, Grid')
                    .onHit('Flame', function () {
                        this.explode();
                    });

                return this;
            },

            explode: function () {
                var len = GAME.powerups.length,
                    rand = 0;

                rand = Crafty.math.randomInt(0, len + 1);

                if (rand < len) {
                    Crafty.e('2D, DOM, PowerUp')
                        .attr({x: this.x, y: this.y, z: this.z})
                        .PowerUp(rand);
                }
                
                this.destroy();
            }
        });

        Crafty.c('PowerUp', {
            func: null,
            prop: '',
            powerup_id: 0,
            
            PowerUp: function (i) {
                this.func = GAME.powerups[i].func;
                this.prop = GAME.powerups[i].prop;
                this.addComponent(GAME.powerups[i].sprite);

                return this;
            }
        });

        Crafty.c('Flame', {
            step: 0,

            Flame: function (opts) {
                var flame = this;
                flame.stepTimer();

                return this;
            },

            stepTimer: function () {
                var flame = this;

                this.timeout(function () {
                    flame.doStep();
                }, GAME.flame_timer);
            },

            doStep: function () {
                this.step += 1;

                if (this.step > 3) {
                    GAME.placedBombs[bh(this)] = undefined;
                    this.destroy();
                } else {
                    this.addComponent('flame' + ((this.step % 2) + 1));
                    this.stepTimer();
                }
            }
        });

        Crafty.c('Bomb', {
            step: 1,
            range: 1,
            player_id: 0,

            Bomb: function (o) {
                this.range = o.range;
                this.player_id = o.player_id;

                var bomb = this;
                bomb.stepTimer();

                this.requires('Collision, Grid')
                    .onHit('Flame', function () {
                        this.explode();
                    });
                return this;
            },

            stepTimer: function () {
                var bomb = this;

                this.timeout(function () {
                    bomb.doStep();
                }, GAME.bomb_timer);
            },

            doStep: function () {
                this.step += 1;

                if (this.step > 3) {
                    // time to explode!
                    GAME.placedBombs[bh(this)] = undefined;
                    this.explode();
                } else {
                    this.addComponent('bomb' + this.step);
                    this.stepTimer();
                }
            },

            explode: function () {
                var i = -1 * this.range,
                    f = null,
                    new_x = 0,
                    new_y = 0;

                GAME.players[this.player_id].e.current_bombs -= 1;

                while (i <= this.range) {
                    new_x = this.x + (i * GAME.tile_size);
                    new_y = this.y + (i * GAME.tile_size);

                    console.log('new pos', new_x, new_y);

                    if (new_x > 0 && new_x < GAME.map_width * GAME.tile_size) {
                        Crafty.e('2D, DOM, Flame, flame1')
                            .attr({
                                x: new_x,
                                y: this.y,
                                z: this.z
                            }).Flame();
                    }

                    if (i !== 0) {
                        if (new_y > 0 && new_y < GAME.map_height * GAME.tile_size) {
                            Crafty.e('2D, DOM, Flame, flame1')
                                .attr({
                                    x: this.x,
                                    y: new_y,
                                    z: this.z
                                }).Flame();
                        }
                    }

                    i += 1;
                }

                this.destroy();
            }
        });

        Crafty.c('Player', {
            speed: 2,
            range: 1,
            dead: false,
            move: {left: false, right: false, up: false, down: false},
            max_bombs: 1,
            current_bombs: 0,


            Player: function (player_id) {
                // setup player animation
                var move = this.move;

                this.player_id = player_id;

                this.requires('Collision, SpriteAnimation, Grid')
                    .animate('walk_down',   0, 0, 4)
                    .animate('walk_left',   0, 3, 4)
                    .animate('walk_up',     0, 2, 4)
                    .animate('walk_right',  0, 1, 4)
                    .bind('EnterFrame', function (e) {
                        var from = {x: this.x, y: this.y};

                        if (!this.dead) {
                            if (move.right) {
                                this.x += this.speed;
                            } else if (move.left) {
                                this.x -= this.speed;
                            } else if (move.up) {
                                this.y -= this.speed;
                            } else if (move.down) {
                                this.y += this.speed;
                            } else {
                                this.trigger('notMoving' + player_id);
                            }

                            if (from.x !== this.x || from.y !== this.y) {
                                this.trigger('Moved', from);
                            }

                            if (move.left) {
                                if (!this.isPlaying("walk_left")) {
                                    this.stop().animate("walk_left", 10, -1);
                                }
                            } else if (move.right) {
                                if (!this.isPlaying("walk_right")) {
                                    this.stop().animate("walk_right", 10, -1);
                                }
                            } else if (move.up) {
                                if (!this.isPlaying("walk_up")) {
                                    this.stop().animate("walk_up", 10, -1);
                                }
                            } else if (move.down) {
                                if (!this.isPlaying("walk_down")) {
                                    this.stop().animate("walk_down", 10, -1);
                                }
                            }
                        }
                    }).bind('notMoving' + this.player_id, function () {
                        this.move.left = this.move.right = this.move.up = this.move.down = false;
                        this.stop();
                    }).onHit('solid', function () {
                        // we dont like hitting solids :( 
                        console.log('hit a solid');
                        this.move.left = this.move.right = this.move.up = this.move.down = false;
                        this.stop();
                    }).onHit('PowerUp', function () {
                        console.log('hit a powerup', this);
                        var hit = this.hit('PowerUp'),
                            powerup;
                        if (hit) {
                            powerup = hit[0].obj;
                            powerup.destroy();
                            this[powerup.prop] = powerup.func(this);
                        }
                    }).bind('Moved', function (from) {
                        if (this.hit('solid')) {
                            console.log('hit a solid (moved)');

                            this.attr({
                                x: from.x,
                                y: from.y
                            });

                            this.stop();
                            this.move.left = this.move.right = this.move.up = this.move.down = false;
                        }
                    }).onHit('Flame', function () {
                        this.stop();
                        this.addComponent('dead');
                        this.dead = true;

                        console.log('player died!');
                    }).bind('LEFT' + player_id, function (e) {
                        move.left = (e.state === 'down');
                    }).bind('RIGHT' + player_id, function (e) {
                        move.right = (e.state === 'down');
                    }).bind('UP' + player_id, function (e) {
                        move.up = (e.state === 'down');
                    }).bind('DOWN' + player_id, function (e) {
                        move.down = (e.state === 'down');
                    }).bind('BUTTON_A' + player_id, function (e) {
                        var tile_x = Math.round(this.x / GAME.tile_size) * GAME.tile_size,
                            tile_y = Math.round(this.y / GAME.tile_size) * GAME.tile_size,

                            abomb = {
                                x: tile_x,
                                y: tile_y
                            };

                        if (GAME.placedBombs[bh(abomb)] === undefined) {
                            // there is no bomb here yet/right now

                            if (this.current_bombs >= this.max_bombs) {
                                return;
                            }

                            abomb.player = e.player_id;

                            abomb.e = Crafty.e('2D, DOM, Bomb, bomb, bomb1')
                                .attr({
                                    x: tile_x,
                                    y: tile_y,
                                    z: this.z
                                }).Bomb({
                                    range: this.range,
                                    player_id: this.player_id
                                });

                            GAME.placedBombs[bh(abomb)] = abomb;
                            this.current_bombs += 1;
                        }
                    });


                return this;
            },

            respawn: function (spawn) {
                var colour = GAME.players[this.player_id].colour;

                this.attr(spawn);
                this.addComponent(colour + 'Sprite');
                this.dead = false;
            }
        });

    },

    generateWorld: function () {
        /**
         * Generates the game world
         */
        'use strict';

        var ground,
            box = 'box' + Crafty.math.randomInt(1, 2),
            block = 'block' + Crafty.math.randomInt(1, 2),
            i = 0,
            j = 0;

        for (i = 0; i < GAME.map_width; i += 1) {
            for (j = 0; j < GAME.map_height; j += 1) {
                if (i === 0 || i === GAME.map_width - 1 ||
                        j === 0 || j === GAME.map_height - 1) {
                    //
                    // Draw surrounding blocks
                    Crafty.e("2D, DOM, solid, block1")
                        .attr({
                            x: i * GAME.tile_size,
                            y: j * GAME.tile_size,
                            z: 2
                        });
                } else if (i % 2 === 0 && j % 2 === 0) {

                    // Draw concrete blocks
                    Crafty.e("2D, DOM, solid, " + block)
                        .attr({
                            x: i * GAME.tile_size,
                            y: j * GAME.tile_size,
                            z: 2
                        });
                } else if (
                    ((i === 1 || i === 2) &&
                        (j === 1 || j === 2 ||
                        j === GAME.map_height - 2 || j === GAME.map_height - 3)) ||
                        ((i === GAME.map_width - 2 || i === GAME.map_width - 3) &&
                        (j === 1 || j === 2 || j === GAME.map_height - 2 || j === GAME.map_height - 3))
                ) {
                    console.log('draw nothing, player start');

                } else {

                    // draw explodable blocks
                    ground = Crafty.math.randomInt(1, 2);
                    Crafty.e('2D, DOM, solid, Explodable, ' + box)
                        .attr({
                            x: i * GAME.tile_size,
                            y: j * GAME.tile_size,
                            z: 2
                        }).Explodable();
                }

                // draw ground
                ground = Crafty.math.randomInt(1, 4);
                Crafty.e("2D, DOM, ground" + ground)
                    .attr({
                        x: i * GAME.tile_size,
                        y: j * GAME.tile_size,
                        z: 0
                    });
            }
        }
    },

    mainScreen: function () {
        /**
        * Main Game Screen
        * labels all the sprites and sets up the player
        */

        'use strict';

        GAME.generateWorld();
    },

    newGame: function () {
        /**
         * Launch a new game and update player stats
         */
        var i = 0,
            key,
            player;

        for (key in GAME.players) {
            if (GAME.players.hasOwnProperty(key)) {

                player = GAME.players[key];
                player.respawn(GAME.spawns[i]);

                i += 1;
            }
        }
    },

    tick: function () {
        /**
        * GAME.tick
        * Controls rendering each round
        */

        'use strict';

        //GAME.window.webkitRequestAnimationFrame(GAME.tick);

        //if (PAUSE_ANIMATION) {
        //    return;
        //}

        //GAME.render();
    },

    render: function () {
        /**
        * GAME.render
        * renders the game screen
        */
        'use strict';

        return;
    }
};

GAME.spawns = [{
    x: TILE_SIZE,
    y: TILE_SIZE,
    z: 2
}, {
    x: TILE_SIZE,
    y: (GAME.map_height - 2) * TILE_SIZE,
    z: 2
}, {
    x: (GAME.map_width - 2) * TILE_SIZE,
    y: TILE_SIZE,
    z: 2
}, {
    x: (GAME.map_width - 2) * TILE_SIZE,
    y: (GAME.map_height - 2) * TILE_SIZE,
    z: 2
}];

