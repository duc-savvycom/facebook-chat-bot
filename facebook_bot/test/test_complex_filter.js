"use strict";

var bot = require("./../bot");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

async(() =>{
    let result = await([
        bot.chat("Help me with javascript please"),
        bot.chat("Help me with [javascript] please"),
        bot.chat("Help me with {coding} please")
        ]);
    console.log(result);   
})();

async(() =>{
    let result = await([
        bot.chat("blah blah"),
        bot.chat("số đo 3 vòng của em là gì"),
        bot.chat("anh iu em")
    ]);
    console.log(result);   
})();