"use strict";
var util = require("./../utilities");
var _ = require("underscore");
var BOT_REPLY_TYPE = require("./../constants").BOT_REPLY_TYPE;
var BUTTON_TYPE = require("./../constants").BUTTON_TYPE;
var PAYLOAD = require("./../constants").PAYLOAD;

// Response where all filter false
class EndFilter {

    process(input) {

    }
    setOutput(output) {

    }
    isMatch(input) {
        return true;
    }
    reply(input) {
        return 'Xin lỗi. Chúng tôi không tìm thấy yêu cầu của bạn.';
    }
}


module.exports = EndFilter;