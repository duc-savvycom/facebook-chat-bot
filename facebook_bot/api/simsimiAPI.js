"use strict";
var request = require("request");
var atob = require("atob");

class SimsimiAPI {
    constructor() {
        this._key = process.env.SIM_TOKEN || atob("ODZlZmJlNjktY2U1Yi00MzZmLWJhNGEtMWE5NDMxMGUyMGY2");
        this._url = `http://api.simsimi.com/request.p?key=${this._key}&lc=vn&text=`;
    }

    getMessage(text) {
        var url =  this._url + encodeURI(text);
        return new Promise((resolve, reject) => {
            request({
                url: this._url + encodeURI(text),
                method: "GET"
            }, (err, response, body) => {
                var rs = JSON.parse(body);
                if (rs.result === 100) {
                    resolve(rs.response);
                } else if(rs.result === 509) {
                    resolve("Các bạn chat nhiều quá API hết 100 limit cmnr. Mai bạn quay lại nhé :'(. ");
                }else {
                    reject();
                }
            });
        });
    }

}

module.exports = new SimsimiAPI();
