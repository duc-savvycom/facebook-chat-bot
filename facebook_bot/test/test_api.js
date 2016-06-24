"use strict";

var wpAPI = require("./../api/wordpressAPI");
var girlAPI = require("./../api/girlAPI");
var simsimiAPI = require("./../api/simsimiAPI");
var youtubeAPI = require("./../api/youtubeAPI");
var btoa = require("btoa");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

async(() =>{
    let results = await([
        youtubeAPI.findVideos("sơn tùng"),
        youtubeAPI.findVideos("hkt"),
        youtubeAPI.findVideos("trịnh công sơn"),
    ]);
    console.log(results);
})();

/*
async(() =>{
    let results = await([
        girlAPI.getRandomSexyImage(),
        girlAPI.getRandomSexyImage(),
        girlAPI.getRandomSexyImage(),
    ]);
    console.log(results);
})();
*/

/*
async(() =>{
    let results = await([
        girlAPI.getRandomGirlImage(),
        girlAPI.getRandomGirlImage(),
        girlAPI.getRandomGirlImage(),
    ]);
    console.log(results);
})();

async(() =>{
    let results = await([
        wpAPI.searchByTag(5, "javascript"),
        wpAPI.searchPost(5, "review sách"),
        wpAPI.searchCategory(5, "chuyện-nghề-nghiệp")
        ]);
    console.log(results);
})();

async(() =>{
    let results = await([
        simsimiAPI.getMessageFree("anh iu em"),
        simsimiAPI.getMessageFree("anh nhớ em"),
        simsimiAPI.getMessageFree("em ăn gì chưa?"),
    ]);
    console.log(results);
})();
*/