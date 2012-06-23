var APP = (function(app) {
    var controllers = [],
        votes = {};
    
    app.voting_data = [{
        key: "Voting Data",
        values: [
            {
                "label": "A",
                "value": 0
            },
            {
                "label": "B",
                "value": 0
            },
            {
                "label": "C",
                "value": 0
            },
            {
                "label": "D",
                "value": 0
            }
        ]
    }];
    
    app.init = function() {
        
    }
    
    app.start = function() {
        $(function() {
            var base_url = window.location.host;
            $.get("http://" + base_url + "/screen/apps/" + EMBSCREEN.meta.id + "/screen.html", function(data) {
                $("body").append(data);
                $("#qrcode").attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=" + base_url + "/controller/index.html?id=" + EMBSCREEN.screen_id);
            });
        });
    }
    
    app.player_joined = function(controller_id) {
        console.log(controller_id);
        // alert(controller_id);
    }
    
    app.player_left = function(controller_id) {
        // alert(controller_id);
    }
    
    app.controller_action = function(controller_id, action) {
        
    }
    
    app.controller_message = function(controller_id, message) {
        var answers = ["A", "B", "C", "D"], answer_id = answers.indexOf(message.button);
        
        // new vote
        if (!(controller_id in votes)) {
            votes[controller_id] = message.button;
            app.voting_data[0].values[answer_id].value += 1;
        
        // changed vote
        } else if (votes[controller_id] != message.button) {
            app.voting_data[0].values[answers.indexOf(votes[controller_id])].value -= 1;
            votes[controller_id] = message.button;
            app.voting_data[0].values[answer_id].value += 1;
        }
        
        app.updateChart();
    }
    
    return app;
}(APP || {}));