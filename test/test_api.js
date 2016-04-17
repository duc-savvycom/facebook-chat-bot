"use strict";

var api = require("./../api/wordpressAPI");

api.searchPost(5, "review sách", (rs) => {
    console.log("Search result: ");
    for (var r of rs) {
        console.log(r);
    }
});


api.searchCategory(5, "chuyện-nghề-nghiệp", (rs) => {
    console.log("Category result: ");
    for (var r of rs) {
        console.log(r);
    }
});