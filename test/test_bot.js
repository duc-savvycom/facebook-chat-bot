"use strict";

var bot = require("./../bot");

var helloOutput = "Chào bạn, mềnh là bot tôi đi code dạo ^_^";
var unknownOutput = "Ad chưa dạy, éo bít trả lời thế lào :'(";
var goodbyeOutput = "Tạm biệt, hẹn gặp lại ;)";
var adInfoOutput = "Ad là Pham Huy Hoàng, đập chai cute thông minh tinh tế <3. Bạn vào đây xem thêm nhé: https://toidicodedao.com/about/";
var botInfoOutput = "Mình là chat bot Tôi đi code dạo. Viết bởi anh Hoàng đập chai cute <3";
var chuiLonOutput = "Bot là người nhân hậu, không chửi thề. Cút ngay không bố đập vỡ cmn ass bây giờ :v!";
var thankyouOutput = "Không có chi. Rất vui vì đã giúp được cho bạn ^_^";
var helpOutput = "Chào bạn, mềnh là bot tôi đi code dạo.\n Do bot mới được phát triển nên chỉ có 1 số tính năng sau:\n 1. Chào hỏi cơ bản. \n 2. Thông tin về ad và bot.\n 3. Tìm từ khóa với cú pháp [từ khóa].\n 4. Tìm theo category với cú pháp {category} (coding, linh tinh, nghề nghiệp)";

var testCases = [
    ["hi", helloOutput],
    ["chào", helloOutput],
    ["chao", helloOutput],
    ["chao ad", helloOutput],
    ["xin chao", helloOutput],
    ["hello", helloOutput],
    ["hế nhô", helloOutput],

    ["ad la ai", adInfoOutput],
    ["ad la gì vậy", adInfoOutput],
    ["cho minh hoi ve ad", adInfoOutput],
    ["ad là ai vậy bot?", adInfoOutput],
    ["cho minh hỏi về ad", adInfoOutput],

    ["may la ai", botInfoOutput],
    ["may ten gi", botInfoOutput],
    ["mày là ai", botInfoOutput],
    ["bot tên gì", botInfoOutput],
    ["your name", botInfoOutput],
    ["bot tên gì thế", botInfoOutput],
    ["mày tên là gì", botInfoOutput],
    
    ["cam on nhe", thankyouOutput],
    ["cảm ơn nhiều", thankyouOutput],
    ["cảm ơn", thankyouOutput],
    ["thank you", thankyouOutput],
    ["thank", thankyouOutput],

    ["dm", chuiLonOutput],
    ["dcm", chuiLonOutput],
    ["du me", chuiLonOutput],
    ["me may", chuiLonOutput],
    ["vkl", chuiLonOutput],
    ["vl", chuiLonOutput],
    ["ccmm", chuiLonOutput],
    ["ngu vl", chuiLonOutput],

    ["tạm biệt", goodbyeOutput],
    ["bye", goodbyeOutput],
    ["good bye", goodbyeOutput],
    ["bái bai", goodbyeOutput],

    ["-help", helpOutput],
    ["giúp đỡ", helpOutput],
    ["help", helpOutput],
    ["giup minh", helpOutput],
    ["giup voi", helpOutput],

    ["blah blah blah", unknownOutput],
    ["cho mình hỏi về", unknownOutput],
];

for (var testCase of testCases) {
    var input = testCase[0];
    var output = testCase[1];

    bot.chat(input, chatOutput => {
        if (chatOutput.output != output) {
            console.log("input: " + input);
            console.log("except: " + output);
            console.log("result: " + chatOutput.output);
        }
        else {
            console.log("Passed");
        }
    });
}