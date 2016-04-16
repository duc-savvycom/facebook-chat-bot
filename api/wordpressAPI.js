"use strict";
var util = require("./../utilities");
var request = require("request");
var _ = require("underscore");

class WordpressAPI {
    constructor() {
        this.apiUrl = "https://public-api.wordpress.com/rest/v1.1/sites";
        this.site = "toidicodedao.com";
    }

    searchPost(numberOfPost, searchQuery, callback) {
        var url = `${this.apiUrl}/${this.site}/posts/?search=${encodeURI(searchQuery)}&number=10&fields=title,URL,featured_image`;
        request({
            url: url,
            method: "GET"
        }, (err, response, body) => {
            var found = JSON.parse(body);
            var posts = found.posts;
            
            var result =  _.sample(posts, numberOfPost);
            result.map(rs => rs.title = util.decodeAndTruncate(rs.title));
            callback(result);
        });
    }

    searchCategory(numberOfPost, category, callback) {
        var url = `${this.apiUrl}/${this.site}/posts/?category=${encodeURI(category)}&number=10&fields=title,URL,featured_image`;
        
        request({
            url: url,
            method: "GET"
        }, (err, response, body) => {
            var found = JSON.parse(body);
            var posts = found.posts;
            var result = _.sample(posts, numberOfPost);
            result.map(rs => rs.title = util.decodeAndTruncate(rs.title));
            callback(result);
        });
    }
}

module.exports = new WordpressAPI();