"use strict";
var util = require("./../utilities");
var _ = require("underscore");
var api = require("./../api/wordpressAPI");

var tags = [{
    "slug": "series-javascript-sida",
    "name": "series javascript sida"
}, {
    "slug": "dependency-inversion",
    "name": "dependency inversion"
}, {
    "slug": "inversion-of-control",
    "name": "inversion of control"
}, {
    "slug": "dependency-injection",
    "name": "dependency injection"
}, {
    "slug": "front-end-developer",
    "name": "front-end developer"
}, {
    "slug": "series-c-hay-ho",
    "name": "series C# hay ho"
}, {
    "slug": "project-manager",
    "name": "project manager"
}, {
    "slug": "javascript-sida",
    "name": "Javascript sida"
}, {
    "slug": "lap-trinh-vien",
    "name": "lập trình viên"
}, {
    "slug": "truong-dai-hoc",
    "name": "trường đại học"
}, {
    "slug": "lap-trinh-web",
    "name": "lập trình web"
}, {
    "slug": "visual-studio",
    "name": "visual studio"
}, {
    "slug": "web-developer",
    "name": "web developer"
}, {
    "slug": "stackoverflow",
    "name": "stackoverflow"
}, {
    "slug": "kinh-nghiem",
    "name": "kinh nghiệm"
}, {
    "slug": "nghe-nghiep",
    "name": "nghề nghiệp"
}, {
    "slug": "programming",
    "name": "programming"
}, {
    "slug": "review-sach",
    "name": "review sách"
}, {
    "slug": "javascript",
    "name": "javascript"
}, {
    "slug": "programmer",
    "name": "programmer"
}, {
    "slug": "mobile-app",
    "name": "mobile app"
}, {
    "slug": "lancaster",
    "name": "lancaster"
}, {
    "slug": "c-hay-ho",
    "name": "c# hay ho"
}, {
    "slug": "architect",
    "name": "architect"
}, {
    "slug": "phong-van",
    "name": "phỏng vấn"
}, {
    "slug": "unit-test",
    "name": "unit test"
}, {
    "slug": "huong-dan",
    "name": "hướng dẫn"
}, {
    "slug": "code-cung",
    "name": "code cứng"
}, {
    "slug": "technical",
    "name": "technical"
}, {
    "slug": "sinh-vien",
    "name": "sinh viên"
}, {
    "slug": "lap-trinh",
    "name": "lập trình"
}, {
    "slug": "tieng-anh",
    "name": "tiếng Anh"
}, {
    "slug": "interview",
    "name": "interview"
}, {
    "slug": "developer",
    "name": "developer"
}, {
    "slug": "thoi-quen",
    "name": "thói quen"
}, {
    "slug": "interface",
    "name": "interface"
}, {
    "slug": "front-end",
    "name": "front-end"
}, {
    "slug": "angularjs",
    "name": "angularjs"
}, {
    "slug": "cong-nghe",
    "name": "công nghệ"
}, {
    "slug": "ung-dung",
    "name": "ứng dụng"
}, {
    "slug": "xin-viec",
    "name": "xin việc"
}, {
    "slug": "viec-lam",
    "name": "việc làm"
}, {
    "slug": "database",
    "name": "database"
}, {
    "slug": "lam-viec",
    "name": "làm việc"
}, {
    "slug": "doc-sach",
    "name": "đọc sách"
}, {
    "slug": "ngon-ngu",
    "name": "ngôn ngữ"
}, {
    "slug": "thu-vien",
    "name": "thư viện"
}, {
    "slug": "function",
    "name": "function"
}, {
    "slug": "dai-hoc",
    "name": "đại học"
}, {
    "slug": "chia-se",
    "name": "chia sẻ"
}, {
    "slug": "project",
    "name": "project"
}, {
    "slug": "testing",
    "name": "testing"
}, {
    "slug": "program",
    "name": "program"
}, {
    "slug": "hoc-tap",
    "name": "học tập"
}, {
    "slug": "c-net",
    "name": "c#.net"
}, {
    "slug": "series",
    "name": "series"
}, {
    "slug": "coding",
    "name": "coding"
}, {
    "slug": "mobile",
    "name": "mobile"
}, {
    "slug": "design",
    "name": "design"
}, {
    "slug": "du-hoc",
    "name": "du học"
}, {
    "slug": "senior",
    "name": "senior"
}, {
    "slug": "junior",
    "name": "junior"
}, {
    "slug": "review",
    "name": "review"
}, {
    "slug": "jquery",
    "name": "jquery"
}, {
    "slug": "google",
    "name": "google"
}, {
    "slug": "object",
    "name": "object"
}, {
    "slug": "ebook",
    "name": "ebook"
}, {
    "slug": "solid",
    "name": "solid"
}, {
    "slug": "coder",
    "name": "coder"
}, {
    "slug": "java",
    "name": "java"
}, {
    "slug": "html",
    "name": "html"
}, {
    "slug": "blog",
    "name": "blog"
}, {
    "slug": "book",
    "name": "book"
}, {
    "slug": "sach",
    "name": "sách"
}, {
    "slug": "linq",
    "name": "linq"
}, {
    "slug": "mvc",
    "name": "mvc"
}, {
    "slug": "sql",
    "name": "sql"
}, {
    "slug": "oop",
    "name": "oop"
}, {
    "slug": "ioc",
    "name": "ioc"
}, {
    "slug": "css",
    "name": "css"
}, {
    "slug": "ide",
    "name": "ide"
}, {
    "slug": "fpt",
    "name": "fpt"
}, {
    "slug": "php",
    "name": "PHP"
}];

class TagFilter {
    process(input) {
        input = util.removeUnicode(input);
        var inp = util.charToNumber(input);
        var numberMatch = inp.match(/\d/g);
        var number = 3; //Default la 3 bai
        if (numberMatch !== null) {
            number = parseInt(inp.match(/\d/g)[0]);
        }

        this.number = number;
        for (var tag of tags) {
            if (input.indexOf(util.removeUnicode(tag.name)) > -1) {
                this.tag = tag.slug;
                return;
            }
        }
    }
    isMatch(input) {
        input = util.removeUnicode(input);
        return _.some(tags, function(tag) {
            return input.indexOf(util.removeUnicode(tag.name)) > -1;
        });
    }
    reply(input, callback) {
        api.searchByTag(this.number, this.tag, result => {
            callback({
                output: result,
                type: 'post'
            });
        });
    }
}


module.exports = TagFilter;