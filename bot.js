"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var CategoryFilter = require("./bot_filter/categoryFilter");
var SearchFilter = require("./bot_filter/searchFilter");

class Bot {
    constructor() {
        /*
        var helloFilter = new SimpleFilter(["hi", "halo" "hế nhô", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot tôi đi code dạo ^_^");
        var goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Tạm biệt, hẹn gặp lại ;)");
        var helpFilter = new SimpleFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp"], "Chào bạn, mềnh là bot tôi đi code dạo.\n Do bot mới được phát triển nên chỉ có 1 số tính năng sau:\n 1. Chào hỏi cơ bản. \n 2. Thông tin về ad và bot.\n 3. Tìm từ khóa với cú pháp [từ khóa].\n 4. Tìm theo category với cú pháp {category} (coding, linh tinh, nghề nghiệp)");
        
        var botInfoFilter = new SimpleFilter(["may la ai", "may ten gi", "may ten la gi", "bot ten gi", "bot ten la gi", "your name"],
        "Mình là chat bot Tôi đi code dạo. Viết bởi anh Hoàng đập chai cute <3");
        var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi",
              "ai viet ra may", "who made you", "ad la gi", "ad ten la gi"], 
        "Ad là Pham Huy Hoàng, đập chai cute thông minh tinh tế <3. Bạn vào đây xem thêm nhé: https://toidicodedao.com/about/");
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank"], "Không có chi. Rất vui vì đã giúp được cho bạn ^_^");
        var chuiLonFilter = new SimpleFilter(["dm", "dcm", "vkl", "vl", "du me", "me may", "ccmm", "ccmn"], 
        "Bot là người nhân hậu, không chửi thề. Cút ngay không bố đập vỡ cmn ass bây giờ :v!");
        */
        
        var helloFilter = new SimpleFilter(["hi", "halo", "helo", "hế nhô", "good morning", "hello", "chào", "xin chào"], "Hello, I'm the bot of this page ^_^. Please type -help to see what I can do!");
        var goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Bye bye, see you later");
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank", "helpful"], "You're welcome ^_^");
        var helpFilter = new SimpleFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp"], "Currently, I can help you with finding articles in toidicodedao.com - an IT blog.\nYou can find by keyword (using [ ]) or category (using{ }).\nTry \"show me 3 articles with [java].\" or \"I need help with {coding}\".");
        
        var botInfoFilter = new SimpleFilter(["may la ai", "who are you", "may ten gi", "may ten la gi", "bot ten gi", "bot ten la gi", "your name"],
        "I'm a simple bot called TDCD, I can help you find articles in toidicodedao.com - an IT blog. Please type -help to see what I can do!");
        var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi",
              "ai viet ra may", "who made you", "ad la gi", "ad ten la gi"], 
        "You can know more information about my creator here: https://toidicodedao.com/about/");
        var categoryFilter = new SimpleFilter(["category", "danh muc", "the loai", "chu de"], 
        "Currently the blog has three categories: coding, linh tinh, and nghe nghiep");
        
        var chuiLonFilter = new SimpleFilter(["dm", "dcm", "vkl", "vl", "du me", "me may", "ccmm", "đậu móa", "đậu xanh", "ccmn"], 
        "Please use polite language :)!");
        
        
        this.filters = [new SearchFilter(), new CategoryFilter(), adInfoFilter, botInfoFilter, chuiLonFilter, thankyouFilter, helpFilter, goodbyeFilter, helloFilter];
    }

    chat(input, callback) {
        for (var filter of this.filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                filter.reply(input, callback);
                return;
            }
        }
        callback({output: "Sorry, I don't understand :'(. Type -help to see what I can do!", type:"text"});
    }
}

module.exports = new Bot();