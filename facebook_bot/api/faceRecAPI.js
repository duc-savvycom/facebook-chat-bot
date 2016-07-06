"use strict";
// Get image from xkcn.info
var request = require("request");
var _ = require("underscore");
var atob = require("atob");

class FaceRecAPI {
    constructor() {
        this._key = process.env.MS_FACE_TOKEN || atob("MmRhZTA1OWQ2NTNmNDdhZGE0NmJlMWJlZTE1ZjUxYzk=");
        this._apiUrl = `https://api.projectoxford.ai/emotion/v1.0/recognize`;
    }

    // Only get 1 image each time from xkcn.info
    analyzeEmo(imageUrl) {

        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl,
                headers: {
                    "Ocp-Apim-Subscription-Key": this._key
                },
                method: "POST",
                json: true,
                body: {
                    "url": imageUrl
                }
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (response.statusCode == 403 || response.statusCode == 429) {
                    resolve("Hết băng thông rồi, 1 phút nữa quay lại test nhé :'(");
                    return;
                }

                if (body.length == 0) {
                    resolve("Hình mờ ảo quá, chẳng thấy mặt đâu");
                }
                else {
                    var faceEmos = _.pairs(body[0].scores);
                    var mainEmo = _.max(faceEmos, emo => emo[1])[0];

                    var emoReply = {
                        "anger": "Bình tĩnh bình tĩnh. Thằng nào chọc giận anh thế...",
                        "fear": "Mói xem phim mà xong à, nhìn mặt sợ vãi hà",
                        "happiness": "Có gì vui mà nhìn mặt phởn phơ thế, kể nghe với",
                        "neutral": "Mặt lạnh như tiền vô cảm xúc.",
                        "sadness": "Có gì buồn vậy, tập sự em nghe nào...",
                        "surprise": "Ngạc nhiên sửng sốt, không thốt nên lời"
                    };

                    resolve(emoReply[mainEmo]);
                }



            });
        });
    }

}

module.exports = new FaceRecAPI();
