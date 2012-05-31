var canvas, ctx, game_status, players = {};

function tick() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (player in players) {
        drawPlayer(player);
    }
}

function addPlayer(player_id) {
    players[player_id] = {
        x: 0, y: 0,
        colour: {
            r: Math.floor((Math.random()*255)+0),
            g: Math.floor((Math.random()*255)+1),
            b: Math.floor((Math.random()*100)+1)
        }
    };
    movePlayer(player_id, players[player_id]);
}

function drawPlayer(player_id) {
    ctx.fillStyle = "rgba(" + players[player_id].colour.r + ", " + players[player_id].colour.g + ", " + players[player_id].colour.b + ", 0.5)";
    ctx.fillRect (players[player_id].x, players[player_id].y, 55, 50);
}

function movePlayer(player_id, direction) {    
    // set new position
    players[player_id].x += direction.x;
    players[player_id].y += direction.y;
}

var GAME = {
    init: function() {
        game_status = document.createElement("div");
        game_status.setAttribute("id", "game_status");
        
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "game");
        canvas.setAttribute("width", 800);
        canvas.setAttribute("height", 800);
    },
    
    start: function() {
        $("#gameArea").append(game_status);
        $("#gameArea").append(canvas);
        
        $("#game_status").html("Waiting for players...");
        
        canvas = document.getElementById("game");
        ctx = canvas.getContext("2d");
        
        window.setInterval(tick, 10);
    },
    
    controller_action: function(player_id, action) {
        var direction = {x: 0, y: 0}, delta = 1;
        
        if (action.hasOwnProperty('accelerometer')) {
            if (action.accelerometer[0] > 20) {
                direction.y += delta;
            } else if (action.accelerometer[0] < -20) {
                direction.y -= delta;
            }

            if (action.accelerometer[1] > 20) {
                direction.x += delta;
            } else if (action.accelerometer[1] < -20) {
                direction.x -= delta;
            }
            
            movePlayer(player_id, direction);   
        }
    },
    
    player_joined: function(player_id) {
        if (player_id in players) {
            return;
        }
        
        addPlayer(player_id);
        $("#game_status").html("Player joined! " + player_id);
    },
    
    player_left: function(player_id) {
        if (players.indexOf(player_id) != -1) {
            players.splice(players.indexOf(player_id), 1);
        }
        $("#game_status").html("Player left! " + player_id);
    }
}