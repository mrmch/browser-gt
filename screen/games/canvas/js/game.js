var canvas, ctx, game_status, players = {}, targets = [], hitTargets = [], red_player = false;

function random(lower, upper) {
    return Math.floor((Math.random()*upper)+lower);
}

function tick() {
    // clear canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (player in players) {
        drawPlayer(player);
    }
    
    // for (i in targets) {
    //     drawTarget(targets[i], i);
    // }
    
    // for (i in hitTargets) {
        // drawWhiteBox(hitTargets[i]);
    // }
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
    if (red_player) {
        player = $("<img src='/screen/games/canvas/images/red_bunny.png'>");
    } else {
        player = $("<img src='/screen/games/canvas/images/bunny.png'>");
    }
    player.css("position", "absolute");
    player.css("left", 20);
    player.css("top", 20);
    player.attr("id", player_id);
    red_player = !red_player;
    
    $("#gameArea").append(player);
    movePlayer(player_id, players[player_id]);
}

function drawWhiteBox(target) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect (target.x, target.y, 40, 40);
}

function drawPlayer(player_id) {
    $("#" + player_id).css("left", players[player_id].x);
    $("#" + player_id).css("top", players[player_id].y);
    // ctx.fillStyle = "rgba(" + players[player_id].colour.r + ", " + players[player_id].colour.g + ", " + players[player_id].colour.b + ", 0.5)";
    // ctx.fillRect (players[player_id].x, players[player_id].y, 50, 50);
    
    
}

function drawTarget(target, id) {
    // var x = target.x, y = target.y, width = 30, height = 30;
    // 
    // var x0 = x + 0.5 * width, y0 = y + 0.3 * height;
    // var x1 = x + 0.1 * width, y1 = y + 0.0 * height;
    // var x2 = x + 0.0 * width, y2 = y + 0.6 * height;
    // var x3 = x + 0.5 * width, y3 = y + 0.9 * height;
    // var x4 = x + 1.0 * width, y4 = y + 0.6 * height;
    // var x5 = x + 0.9 * width, y5 = y + 0.0 * height;
    // 
    // ctx.save();
    // 
    // ctx.beginPath();
    // 
    // ctx.moveTo(x0,y0);
    // ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    // ctx.bezierCurveTo(x4,y4,x5,y5,x0,y0);
    // 
    // ctx.stroke();
    // 
    // ctx.restore();
    
    // var img = new Image();   // Create new img element  
    // img.onload = function(){  
    //   ctx.drawImage(img, target.x, target.y);
    // };  
    // img.src = '/screen/games/canvas/images/carrot.jpg';
    
    var img = $("<img src='/screen/games/canvas/images/carrot.png'>");
    img.css("position", "absolute").css("top", target.y).css("left", target.x);
    img.attr("id", id);
    $("#gameArea").append(img);
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
            $("img#" + i).hide("slow");
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
        drawTarget(target, i);
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
        $("#gameArea").html("");
        
        $("#gameArea").css("background-image", "url(/screen/games/canvas/images/bg.png)");
        
        $("#gameArea").append(game_status);
        $("#gameArea").append(canvas);
        
        $("#game_status").html("Waiting for players...");
        
        // canvas = document.getElementById("game");
        // ctx = canvas.getContext("2d");
        
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        addTargets();
        
        window.setInterval(tick, 10);
    },
    
    controller_action: function(player_id, action) {
        var direction = {x: 0, y: 0}, delta = 3;
        
        if (action.type == "accelerometer") {
            if (action.data[0] > 20) {
                direction.y += delta;
            } else if (action.data[0] < -20) {
                direction.y -= delta;
            }

            if (action.data[1] > 20) {
                direction.x += delta;
            } else if (action.data[1] < -20) {
                direction.x -= delta;
            }
            
            movePlayer(player_id, direction);
            
        } else if (action.type == "button") {
            if (action.data.action == "UP") {
                direction.y -= delta;
            }
            
            if (action.data.action == "DOWN") {
                direction.y += delta;
            }
            
            if (action.data.action == "RIGHT") {
                direction.x += delta;
            }
            
            if (action.data.action == "LEFT") {
                direction.x -= delta;
            }
            
            movePlayer(player_id, direction);
        }
    },
    
    controller_message: function (player_id, message) {
        'use strict';
        
        if (message == "new game") {
            GAME.start();
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
        if (player_id in players) {
            delete players[player_id];
        }

        $("#game_status").html("Player left! " + player_id);
    }
}

