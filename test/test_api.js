"use strict";

var api = require("./../api/wordpressAPI");

api.searchPost(5, "lập trình viên", console.log);

api.searchCategory(5, "chuyện-nghề-nghiệp", console.log);