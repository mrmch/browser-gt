/**
 * GAME JS
 */
var GAME = GAME || {
    'name': 'browser-bomber',
    'author': 'Matt Harris',
    'desc': 'Browser based bomberman clone',
    'map_width': 25,
    'map_height': 25,
};

GAME.init = function(window) {
    /**
     * GAME.init
     * Intiates the game state
     */

    this.window = window;
    Crafty.canvas.init();
    Crafty.scene("loading", GAME.loadingScreen);
    Crafty.scene("main", GAME.mainScreen);
    GAME.sprite_base = '/screen/games/' + GAME.name + '/images/';
};

GAME.loadingScreen = function() {
    //load takes an array of assets and a callback when complete
    Crafty.load([
            GAME.sprite_base + 'white_player_32x40.gif',
            GAME.sprite_base + 'tiles_items_20x20.gif'
        ], function () {
            //when everything is loaded, run the main scene
            Crafty.scene("main"); 
    });

    //black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text").attr({
        w: 100, h: 20, x: 150, y: 120 })
        .text("Loading ...")
        .css({ "text-align": "center" });
};

GAME.generateWorld = function() {
    var ground;
    for (var i = 0; i < GAME.map_width; i++) {
        for (var j = 0; j < GAME.map_height; j++) {
            if (i === 0 || i === GAME.map_width-1 || j === 0 || j === GAME.map_height-1) {
                Crafty.e("2D, DOM, block")
                    .attr({
                        x: i * 20, 
                        y: j * 20, 
                        z: 2}
                );
            
            }
            if (i % 2 === 0 && j % 2 === 0) {
                // draw block
                //
            }
            ground = Crafty.math.randomInt(1,3);
            Crafty.e("2D, DOM, ground" + ground)
                .attr({
                    x: i * 20, 
                    y: j * 20, 
                    z:2
                }
            );
        }
    }
};

GAME.mainScreen = function() {
    Crafty.sprite(20, GAME.sprite_base + 'tiles_items_20x20.gif', {
        bomb1: [0, 0],
        bomb2: [1, 0],
        bomb3: [2, 0],
        ground1: [0, 1],
        ground2: [1, 1],
        ground3: [2, 1],
        box: [0, 2],
        block: [1, 2],
        dead: [2, 2]
    });
    Crafty.sprite(32, GAME.sprite_base + 'white_player_32x40', {
        down1: [0, 0, 32, 40],
        down2: [1, 0, 32, 40],
        down3: [2, 0, 32, 40],
        down4: [3, 0, 32, 40],
    });
    
};

GAME.tick = function() {
    /**
     * GAME.tick
     * Controls rendering each round
     */

    this.window.webkitRequestAnimationFrame(GAME.tick);

    if (PAUSE_ANIMATION) {
        console.log('animation paused');
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
    this.tick();
};

