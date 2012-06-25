var game_status, players = {}, targets = {}, red_player = false;

function random(lower, upper) {
    return Math.floor((Math.random()*upper)+lower);
}

function tick() {
    for (player in players) {
        drawPlayer(player);
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

function drawPlayer(player_id) {
    $("#" + player_id).css("left", players[player_id].x);
    $("#" + player_id).css("top", players[player_id].y);
}

function drawTarget(target, id) {
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
            
            if (Object.keys(targets).length == 0) {
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
        
        targets[i] = target;
        drawTarget(target, i);
    }
}

var GAME = {
    init: function() {
        game_status = document.createElement("div");
        game_status.setAttribute("id", "game_status");
    },
    
    start: function() {
        targets = {};
        
        $("#gameArea").html("");
        
        $("body").css("background-image", "url(/screen/games/canvas/images/bg.png)");
        
        $("#gameArea").append(game_status);
        
        // $("#game_status").html("Waiting for players...");
                
        addTargets();
        
        for (player_id in players) {
            if (player_id != undefined) {
                addPlayer(player_id);
            }
        }
        
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
        // $("#game_status").html("Player joined! " + player_id);
    },
    
    player_left: function(player_id) {
        if (player_id in players) {
            players.splice(players.indexOf(player_id), 1);
        }

        // $("#game_status").html("Player left! " + player_id);
    }
}

