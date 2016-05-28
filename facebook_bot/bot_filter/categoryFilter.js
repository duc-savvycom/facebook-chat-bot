"use strict";
var util = require("./../utilities");
var _ = require("underscore");
var api = require("./../api/wordpressAPI");
var async = require("asyncawait/async");
var await = require("asyncawait/await");

class CategoryFilter {
    process(input) {
        var category = /\{(.*)\}/.exec(input)[1];
        if (util.removeUnicode(category).indexOf("chuyen") === -1) {
            category = "chuyện " + category;
        };

        var inp = util.charToNumber(util.removeUnicode(input));
        var numberMatch = inp.match(/\d/g);
        var number = 3; //Default la 3 bai
        if (numberMatch !== null) {
            number = parseInt(inp.match(/\d/g)[0]);
        }

        this.number = number;
        this.category = category;
    }
    isMatch(input) {
        var match = /\{(.*)\}/.exec(input);
        return match !== null;
    }
    reply(input) {
        // Return a promise so that it can be awaited
        return async(() => {
            var result = await(api.searchCategory(this.number, this.category));
            return {output: result, type: 'post'};
        })();
    }
}


module.exports = CategoryFilter;