"use strict";
var request = require("request");
var atob = require("atob");
var _ = require("underscore");

class YoutubeAPI {
    constructor() {
        this._token = process.env.YOUTUBE_TOKEN || "AIzaSyC7R2v8_9LeXRm15kiP3eg63ZCJE-VZv9k";
        this._url = "https://www.googleapis.com/youtube/v3/search";
    }

    findVideos(query) {
        return new Promise((resolve, reject) => {
            request({
                url: this._url,
                qs: {
                    part: "snippet",
                    type: "video",
                    q: query,
                    key: this._token
                },
                method: "GET"
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                var results = JSON.parse(body);
                // Get first 3 items
                var videos = _.first(results.items, 3).map(video => {
                    return {
                      title: video.snippet.title,
                      description: video.snippet.description,
                      link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                      thumb: video.snippet.thumbnails.high.url
                    };
                });
                resolve(videos);
            });
        });
    }
    
}

module.exports = new YoutubeAPI();
