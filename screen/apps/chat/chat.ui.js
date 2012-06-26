var CUI = (function(cui) {
    cui.joined = function(uid) {
        $("#message_list").append($("<li>User joined: " + uid + "</li>"));
    };
    
    cui.left = function(uid) {
        $("#message_list").append($("<li>User left: " + uid + "</li>"));
    };
    
    cui.message = function(uid, message) {
        $("#message_list").append($("<li>" + uid + " said: " + message + "</li>"));
    };
    
    return cui;
}(CUI || {}));

