"use strict";
var girlAPI = require("./../api/girlAPI");
var SimpleFilter = require("./simpleFilter");
var BOT_REPLY_TYPE = require("./../constants").BOT_REPLY_TYPE;

class GirlFilter extends SimpleFilter {

    reply(input) {
        return girlAPI.getRandomGirlImage().then(imgUrl => {
            return {
                output: imgUrl,
                type: BOT_REPLY_TYPE.IMAGE
            }
        });
    }

}

module.exports = GirlFilter;