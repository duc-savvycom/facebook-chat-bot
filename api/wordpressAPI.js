"use strict";

var request = require("request");

class WordpressAPI {
    constructor() {
        this.apiUrl = "https://public-api.wordpress.com/rest/v1.1/sites";
        this.site = "toidicodedao.com";
    }

    searchPost(numberOfPost, searchQuery, callback) {
        var url = `${this.apiUrl}/${this.site}/posts/?search=${encodeURI(searchQuery)}&number=${numberOfPost}&fields=title,URL,featured_image`;
        request({
            url: url,
            method: "GET"
        }, (err, response, body) => {
            callback(body);
        });
    }

    searchCategory(numberOfPost, category, callback) {
        var url = `${this.apiUrl}/${this.site}/posts/?category=${encodeURI(category)}&number=${numberOfPost}&fields=title,URL,featured_image`;
        
        request({
            url: url,
            method: "GET"
        }, (err, response, body) => {
            callback(body);
        });
    }
}

module.exports = new WordpressAPI();