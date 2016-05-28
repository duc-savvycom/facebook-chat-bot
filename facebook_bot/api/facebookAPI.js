"use strict";
var request = require("request");


class FacebookAPI {
    constructor() {
        this._token = process.env.FB_TOKEN ||
            "EAAWjaJdcz14BALW4x9r13aKcwZATJ84qVANzIh4nP4Jn5GQ3YFJevqZCmtXLc27AcnKHnB7vOKibxXB3llxuvhHE1a92DZAlJNhZC0SQedmZCjguUykCXZAZAmLWA4pwt6bpQAERa2nQf2ZBeBmaUPBaZBnnE04RDptqC1BLrb7msAwZDZD";
        this._storedName = {};
    }

    getSenderName(senderID) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (that._storedName[senderID]) {
                resolve(that._storedName[senderID]);
            }
            else {

                request({
                    url: `https://graph.facebook.com/v2.6/${senderID}`,
                    qs: {
                        access_token: that._token
                    },
                    method: 'GET',

                }, function(error, response, body) {
                    var person = JSON.parse(body);
                    console.log(person);
                    that._storedName[senderID] = person.first_name;
                    resolve(person.first_name);
                });
            }
        });
    }

    sendTextMessage(sender, text) {
        var messageData = {
            text: text
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendAttachmentBack(sender, attachment) {
        var messageData = {
            attachment: attachment
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendGenericMessage(sender, posts) {

        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": []
                }
            }
        };

        var messageElements = posts.map(post => {
            return {
                title: "Article",
                subtitle: post.title,
                item_url: post.URL,
                image_url: post.featured_image,
                buttons: [{
                    type: "web_url",
                    url: post.URL,
                    title: "Read this"
                }]
            }
        });

        messageData.attachment.payload.elements = messageElements;
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }
}

module.exports = new FacebookAPI();
