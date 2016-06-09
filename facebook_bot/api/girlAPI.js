"use strict";
// Get image from xkcn.info
var request = require("request");
var atob = require("atob");

class GirlAPI {
    constructor() {
        this._key = process.env.TUMBLR_TOKEN || atob("STVKWUNTVnFueXBET1lrYjdZdHBZN1JLME91ZmRHT0ZKZ1FTNUZFaXp2eFNHcXEwRjA=") ;
        this._url = `https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=${this._key}`;
    }
    
    // Only get 1 image each time from xkcn.info
    getRandomGirlImage() {
        var max = 4500; // Get random image with index from 0 to 4500
        var randomIndex = Math.floor((Math.random() * max));
        var apiUrl = `${this._url}&limit=1&offset=${randomIndex}`;
        
        return new Promise((resolve, reject) => {
            request({
                url: apiUrl,
                method: "GET"
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                var rs = JSON.parse(body);
                var imageUrl = rs.response.posts[0].photos[0].original_size.url;
                resolve(imageUrl);
            });
        });
    }
}

module.exports = new GirlAPI();
