var APP = (function(app) {
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
        CUI.joined(controller_id);
    }

    app.player_left = function(controller_id) {
        CUI.left(controller_id);
    }

    app.controller_action = function(controller_id, action) {
        
    }

    app.controller_message = function(controller_id, message) {
        CUI.message(controller_id, message);
    }
    
    return app;
}(APP || {}));

