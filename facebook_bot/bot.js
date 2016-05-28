"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var CategoryFilter = require("./bot_filter/categoryFilter");
var SearchFilter = require("./bot_filter/searchFilter");
var TagFilter = require("./bot_filter/tagFilter");
var async = require("asyncawait/async");
var await = require("asyncawait/await");

var fbAPI = require("./api/facebookAPI");

class BotAsync {
    constructor() {
        
        this._helloFilter = new SimpleFilter(["hi", "halo", "hế nhô", "he lo", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot tôi đi code dạo ^_^");
        this._goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Tạm biệt, hẹn gặp lại ;)");
        var helpFilter = new SimpleFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp"], "Chào bạn, mềnh là bot tôi đi code dạo.\n Do bot mới được phát triển nên chỉ có 1 số tính năng sau:\n 1. Hỏi linh tinh (ioc là gì, tao muốn học javascript).\n 2. Tìm từ khóa với cú pháp [từ khóa] (Cho tao 4 bài [java]).\n 4. Tìm theo category với cú pháp {category} (Tự dưng muốn học {coding})");
        
        var botInfoFilter = new SimpleFilter(["may la ai", "may ten gi", "may ten la gi", "bot ten gi", "bot ten la gi", "your name"],
        "Mình là chat bot Tôi đi code dạo. Viết bởi anh Hoàng đập chai cute <3");
        var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi", "who is ad", "ad la thang nao", "thong tin ve ad", "ad dau",
              "ai viet ra may", "who made you", "ad la gi", "ad ten la gi"], 
        "Ad là Pham Huy Hoàng, đập chai cute thông minh tinh tế <3. Bạn vào đây xem thêm nhé: https://toidicodedao.com/about/");
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank", "nice", "good job"], "Không có chi. Rất vui vì đã giúp được cho bạn ^_^");
                var categoryFilter = new SimpleFilter(["category", "danh muc", "the loai", "chu de"], 
        "Hiện tại blog có 3 category: coding, linh tinh, và nghề nghiệp");
        var chuiLonFilter = new SimpleFilter(["dm", "đậu xanh", "rau má", "dcm", "vkl", "vl", "du me", "may bi dien", "bố láo", "ngu the", "me may", "ccmm", "ccmn", "bot ngu", "đờ mờ", "fuck", "fuck you"], 
        "Bot là người nhân hậu, không chửi thề. Cút ngay không bố đập vỡ cmn ass bây giờ :v!");
        
        /*
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
        */
        
        this._filters = [new SearchFilter(), new CategoryFilter(), new TagFilter(), adInfoFilter, botInfoFilter, categoryFilter, chuiLonFilter, thankyouFilter, helpFilter, this._goodbyeFilter, this._helloFilter];
    }
    
    setName(name) {
        this._helloFilter.setOutput(`Chào ${name}, mềnh là bot tôi đi code dạo ^_^`);
        this._goodbyeFilter.setOutput(`Tạm biệt ${name}, hẹn gặp lại ;)`);
    }

    chat(input) {
        for (var filter of this._filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                return filter.reply(input);
            }
        }
        return async(() => {
            return await({output: "Xin lỗi bot còn nhỏ dại nên không hiểu. Bạn gõ -help xem!", type:"text"});
        })();
    }
    
    reply(sender, textInput) {
        async(() => {
            var name = await (fbAPI.getSenderName(sender));
            this.setName(name);

            var botReply = await (this.chat(textInput));
            if (botReply.type == "text") {
              var reply = botReply.output;
              fbAPI.sendTextMessage(sender, reply);
            }
            else if (botReply.type == "post") {
              var posts = botReply.output;
              if (posts.length > 0) {
                //sendTextMessage(sender, "These articles might be helpful for you ;)");
                fbAPI.sendTextMessage(sender, "Bạn xem thử mấy bài này nhé ;)");
                fbAPI.sendGenericMessage(sender, posts);
              }
              else {
                fbAPI.sendTextMessage(sender, "Xin lỗi mình không tim được bài nào ;)");
                //sendTextMessage(sender, "Sorry, I can not find any article for you :'(");
              }
            }
        })();
    }
    
    sendAttachmentBack(sender, attachment) {
        fbAPI.sendAttachmentBack(sender, attachment);
    }
}

module.exports = new BotAsync();