"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var SpamFilter = require("./bot_filter/spamFilter");
var ButtonFilter = require("./bot_filter/buttonFilter");
var EndFilter = require("./bot_filter/endFilter");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

var BOT_REPLY_TYPE = require("./constants").BOT_REPLY_TYPE;
var BUTTON_TYPE = require("./constants").BUTTON_TYPE;
var PAYLOAD = require("./constants").PAYLOAD;
var QUESTIONS = require("./constants").QUESTIONS;
var ANSWERS = require("./constants").ANSWERS;
var INFO = require("./constants").INFO;
var SENDER_TYPE = require("./constants").SENDER_TYPE;

var fbAPI = require("./api/facebookAPI");
var faceRecAPI = require("./api/faceRecAPI");
var ulti = require("./utilities");

var feedbacks = {};
var currentQuestion = {};

class BotAsync {
    constructor() {
        this._helloFilter = new ButtonFilter(["hi", "halo", "hế nhô", "he lo", "hello", "chào", "xin chào", "helo", "alo"],
            "Chào mừng bạn đến với Salon Đức Anh! Bạn muốn sử dụng dịch vụ nào:", [{
                title: "Đặt lịch",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.BOOKING_POST
            }, {
                title: "Thông tin về Salon",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.INFO_POST
            }]);
        
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank", "nice"], "Salon Đức Anh rất hân hạnh được phục vụ bạn");
        
        this._goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Tạm biệt, hẹn gặp lại");

        this._filters = [
            thankyouFilter,
            this._goodbyeFilter,
            this._helloFilter
        ];
    }

    setSender(sender) {
        this._helloFilter.setOutput(`Xin chào ${sender.first_name} ${sender.last_name}, Chào mừng bạn đến với Salon Đức Anh, Bạn muốn sử dụng dịch vụ nào:`);
        this._goodbyeFilter.setOutput(`Tạm biệt ${sender.first_name}, hẹn gặp lại ;)`);
    }

    chat(input) {
        for (var filter of this._filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                return filter.reply(input);
            }
        }
    }

    reply(senderId, message, senderType) {
        async(() => {
            if (typeof currentQuestion['sid_' + senderId] === 'undefined') {
                var sender = await (fbAPI.getSenderName(senderId));
                this.setSender(sender);
                
                var botReply = await (this.chat(message));
                if (botReply) {
                    message = botReply.output;
                    switch (botReply.type) {
                        case BOT_REPLY_TYPE.TEXT:
                            fbAPI.sendTextMessage(senderId, message);
                            break;
                        case BOT_REPLY_TYPE.BUTTONS:
                            let buttons = botReply.buttons;
                            //fbAPI.sendButtonMessage(senderId, message, buttons);
                            var message1 = [
                                {
                                    title: "Duc1",
                                    item_url: '',
                                    image_url: '',
                                    buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Chọn"
                                    },{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Hủy"
                                    }]
                                },
                                {
                                    title: "Duc2",
                                    item_url: '',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Chọn"
                                    }]
                                },
                                {
                                    title: "Duc3",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc4",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc5",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc6",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc7",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc8",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc9",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                },
                                {
                                    title: "Duc10",
                                    subtitle: 'Duc2-sub',
                                    item_url: 'http://google.com.vn',
                                    image_url: '',
                                     buttons: [{
                                        type: "web_url",
                                        url: 'http://google.com.vn',
                                        title: "Read this"
                                    }]
                                }
                            ];
                            fbAPI.sendGenericMessage(senderId, message1);
                            break;
                        default:
                    }
                } else {
                    fbAPI.sendTextMessage(senderId, message);
                }
                
                return false;
            }
            
            
            if (senderType == SENDER_TYPE.USER) {
                this.saveAnswer(senderId, message);
            }
            
            if (senderType == SENDER_TYPE.BOT) {
                fbAPI.sendTextMessage(senderId, message);
            }
            
        })();
    }
    
    saveAnswer(senderId, message) {
        // Save user's answer
        var fid = 'fb_' + senderId;
        if (!feedbacks[fid]) {
            feedbacks[fid] = {};
        }
        
        feedbacks[fid][currentQuestion['sid_' + senderId]] = message;
        this.nextQuestion(senderId);
    }
    
    nextQuestion(senderId) {
        var sid = 'sid_' + senderId;
        
        currentQuestion[sid] = parseInt(currentQuestion[sid]) + 1;

        if (currentQuestion[sid] == QUESTIONS.length) {
            // Review feedback
            // TODO
            this.reply(senderId, 'Bạn đã hoàn tất đặt lịch, xem lại thông tin của bạn dưới đây', SENDER_TYPE.BOT);
            delete currentQuestion[sid];
            return;
        }
        
        // Send message
        var answers = this.getAnswer(sid);
        if (answers.length > 0) {
            fbAPI.sendButtonMessage(senderId, QUESTIONS[currentQuestion[sid]], answers);    
        } else {
            fbAPI.sendTextMessage(senderId, QUESTIONS[currentQuestion[sid]]);
        }
    }
    
    getAnswer(sid) {
        return ANSWERS[currentQuestion[sid]];
    }
    
    processPostback(senderId, payload, title) {
        async(() => {
            var sender = await (fbAPI.getSenderName(senderId));
            this.setSender(sender);
            switch (payload) {
                case PAYLOAD.BOOKING_POST:
                    this.reply(senderId, 'Để đặt lịch quý khách vui lòng cho biết một số thông tin sau: \n' + QUESTIONS[0], SENDER_TYPE.BOT);
                    currentQuestion['sid_' + senderId] = 0;
                    break;
                case PAYLOAD.INFO_POST:
                    this.reply(senderId, INFO.link, SENDER_TYPE.BOT);
                    break;
                case PAYLOAD.ANSWER:
                    this.saveAnswer(senderId, title);
                    break;
                default:
                    console.log("Unknown payload: " + payload);
            }
        })();
    }
}

module.exports = new BotAsync();