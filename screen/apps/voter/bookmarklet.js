var APP = (function(app) {
    var controllers = [];
    app.init = function() {
        
    }
    
    app.start = function() {
        $(function() {
            var base_url = window.location.host;
            $("body").append("<h1>Social Voting: " + EMBSCREEN.screen_id + "</h1>");
            $("body").append("<img src='https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=" + base_url + "/controller/index.html?id=" + EMBSCREEN.screen_id + "'>");
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
        
    }
    
    return app;
}(APP || {}));