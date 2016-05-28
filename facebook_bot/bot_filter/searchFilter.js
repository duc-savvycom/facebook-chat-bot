"use strict";
var util = require("./../utilities");
var _ = require("underscore");
var api = require("./../api/wordpressAPI");
var async = require("asyncawait/async");
var await = require("asyncawait/await");

class SearchFilter {
    process(input) {
        var query = /\[(.*)\]/.exec(input)[1];

        var inp = util.charToNumber(util.removeUnicode(input));

        var numberMatch = inp.match(/\d/g);
        var number = 3; //Default la 3 bai
        if (numberMatch !== null) {
            number = parseInt(inp.match(/\d/g)[0]);
        }

        this.number = number;
        this.query = query;
    }
    isMatch(input) {
        var match = /\[(.*)\]/.exec(input);
        return match !== null;
    }
    reply(input) {
        return async(() => {
            var result = await(api.searchPost(this.number, this.query));
            return {output: result, type: 'post'};
        })();
    }
}


module.exports = SearchFilter;