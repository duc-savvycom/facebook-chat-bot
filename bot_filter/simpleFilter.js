"use strict";
var util = require("./utilities");
var _ = require("underscore");

class SimpleFilter {
    constructor(inputText, output) {
        this.inputText = inputText;
        this.output = output;
    }
    process(input) {}
    isMatch(input) {
        input = util.removeUnicode(input);
        return _.some(this.inputText, function(t) {
            return input.indexOf(util.removeUnicode(t)) > -1;
        });
    }
    reply(input, callback) {
        callback({
            output: this.output,
            type: "text"
        });
    }
}


module.exports = SimpleFilter;