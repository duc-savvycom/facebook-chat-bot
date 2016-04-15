"use strict";

var api = require("./../api/wordpressAPI");

api.searchPost(5, "lập trình viên", (rs) => {
    for (var r of rs) {
        console.log(r);
    }
});

api.searchCategory(5, "chuyện-nghề-nghiệp", (rs) => {
    for (var r of rs) {
        console.log(r);
    }
});