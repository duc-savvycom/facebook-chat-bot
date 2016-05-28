"use strict";
var util = require("./../utilities");
var _ = require("underscore");
var async = require("asyncawait/async");
var await = require("asyncawait/await");

class SimpleFilter {
    constructor(inputText, output) {
        this._inputText = inputText;
        this._output = output;
    }
    process(input) {}
    isMatch(input) {
        input = util.removeUnicode(input);
        return _.some(this._inputText, function(t) {
            return input.indexOf(util.removeUnicode(t)) > -1;
        });
    }
    reply(input) {
        return async(() => {
            return await ({
                output: this._output,
                type: "text"
            });
        })();
    }
    setOutput(output) {
        this._output = output;
    }
}


module.exports = SimpleFilter;