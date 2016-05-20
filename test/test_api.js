"use strict";

var api = require("./../api/wordpressAPI");


api.searchByTag(5, "javascript", (rs) => {
    console.log("Search result: ");
    for (var r of rs) {
        console.log("Search by Tag");
        console.log(r);
    }
});

api.searchPost(5, "review sách", (rs) => {
    console.log("Search result: ");
    for (var r of rs) {
        console.log("Search by post");
        console.log(r);
    }
});

api.searchCategory(5, "chuyện-nghề-nghiệp", (rs) => {
    console.log("Category result: ");
    for (var r of rs) {
        console.log("Search by Category");
        console.log(r);
    }
});