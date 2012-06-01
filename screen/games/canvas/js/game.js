var canvas, ctx, game_status, players = {}, targets = [];

function random(lower, upper) {
    return Math.floor((Math.random()*upper)+lower);
}

function tick() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (player in players) {
        drawPlayer(player);
    }
    
    for (i in targets) {
        drawTarget(targets[i]);
    }
}

function addPlayer(player_id) {
    players[player_id] = {
        x: 0, y: 0, score: 0,
        colour: {
            r: random(0, 255),
            g: random(0, 255),
            b: random(0, 255)
        }
    };
    movePlayer(player_id, players[player_id]);
}

function drawPlayer(player_id) {
    ctx.fillStyle = "rgba(" + players[player_id].colour.r + ", " + players[player_id].colour.g + ", " + players[player_id].colour.b + ", 0.5)";
    ctx.fillRect (players[player_id].x, players[player_id].y, 50, 50);
}

function drawTarget(target) {
    var x = target.x, y = target.y, width = 30, height = 30;
    
    var x0 = x + 0.5 * width, y0 = y + 0.3 * height;
    var x1 = x + 0.1 * width, y1 = y + 0.0 * height;
    var x2 = x + 0.0 * width, y2 = y + 0.6 * height;
    var x3 = x + 0.5 * width, y3 = y + 0.9 * height;
    var x4 = x + 1.0 * width, y4 = y + 0.6 * height;
    var x5 = x + 0.9 * width, y5 = y + 0.0 * height;

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(x0,y0);
    ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    ctx.bezierCurveTo(x4,y4,x5,y5,x0,y0);

    ctx.stroke();

    ctx.restore();
}

function playerWon(player_id) {
    alert("We have a winner! " + player_id);
}

function movePlayer(player_id, direction) {    
    // set new position
    players[player_id].x += direction.x;
    players[player_id].y += direction.y;
    
    // check if any targets are hit
    for (i in targets) {
        if ((Math.abs(targets[i].x - players[player_id].x) < 30) && (Math.abs(targets[i].y - players[player_id].y) < 30)) {
            // got a hit!
            players[player_id].score += 1;
            delete targets[i];
            if (targets.length == 0) {
                playerWon(player_id);
            }
        }
    }
}

function addTargets() {
    for (var i = 0; i < 7; i++) {
        var target = {
            x: random(30, 870),
            y: random(30, 470)
        }
        
        targets.push(target);
        drawTarget(target);
    }
}

var GAME = {
    init: function() {
        game_status = document.createElement("div");
        game_status.setAttribute("id", "game_status");
        
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "game");
        canvas.setAttribute("width", 900);
        canvas.setAttribute("height", 500);
    },
    
    start: function() {
        $("#gameArea").append(game_status);
        $("#gameArea").append(canvas);
        
        $("#game_status").html("Waiting for players...");
        
        canvas = document.getElementById("game");
        ctx = canvas.getContext("2d");
        
        addTargets();
        
        window.setInterval(tick, 10);
    },
    
    controller_action: function(player_id, action) {
        var direction = {x: 0, y: 0}, delta = 3;
        
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

