var bot = require("./../bot");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

async(() =>{
    var result = await(bot.chat("Help me with javascript please"));
    console.log(result);   
})();

