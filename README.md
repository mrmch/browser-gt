(codename) Browser Games platform
==========

Platform expects games to implement a certain API, which is used to allow for selection of games, and communication between the game, platform server and controllers.

Define your game
----------------

Games are defined by using meta.json file. Here is a template:

`
{
  "name": "Name of your game",
  "id": "Unique identifier of your game",
  "author": "List of authors",
  "description": "Description of the game",
  
  // required controller actions. this is what controllers will be required to send to the game
  // choose only what you need. List of all currently supported actions:
  "actions": ["accelerometer",]
  
  "imports": [
    "list-of-your-javascript/includes.js",
  ]
}
`

GAME API to implement
--------------------------
Here is a base template for games to use:

`var GAME = {
    init: function() {
      // invoked by the platform when user selects this game
      // initialize your game, create canvas elements, and whatever is required
    },
    
    start: function() {
      // invoked by the platform right after a call to init()
      // games are provided with a DIV to "run" in. Its id is "gameArea".
    },
    
    controller_action: function(player_id, action) {
      // invoked when a connected controller performs an action.
      // action object's properties match what game has defined via meta.json 
      // action = {
      //  'accelerometer': {'x', 'y'},
      // }
    },
    
    player_joined: function(player_id) {
      // invoked when a controller joins this game.
      // once this happens, controller's actions become avaialbe to the game via method above
    },
    
    player_left: function(player_id) {
      // invoked when a controller leaves the game
    }
}`