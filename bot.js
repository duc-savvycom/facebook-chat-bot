"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var CategoryFilter = require("./bot_filter/categoryFilter");
var SearchFilter = require("./bot_filter/searchFilter");

class Bot {
    constructor() {
        var helloFilter = new SimpleFilter(["hi", "hế nhô", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot tôi đi code dạo ^_^");
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
        
        
        this.filters = [new SearchFilter(), new CategoryFilter(), adInfoFilter, botInfoFilter, chuiLonFilter,thankyouFilter, helpFilter, goodbyeFilter, helloFilter];
    }

    chat(input, callback) {
        for (var filter of this.filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                filter.reply(input, callback);
                return;
            }
        }
        callback({output: "Ad chưa dạy, éo bít trả lời thế lào :'(", type:"text"});
    }
}

module.exports = new Bot();