"use strict";
var request = require("request");


class SimsimiAPI {
    constructor() {
        this._key = "99eb625e-0add-4419-b73c-42620c99ed5d";
        this._url = `http://sandbox.api.simsimi.com/request.p?key=${this._key}&lc=vn&text=`;
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
                } else {
                    reject();
                }
            });
        });
    }

}

module.exports = new SimsimiAPI();
