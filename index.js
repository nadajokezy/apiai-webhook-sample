const express = require('express');
const bodyParser = require('body-parser');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    var a = parseFloat(req.body.result.parameters.firstNum);
    var b = parseFloat(req.body.result.parameters.secondNum);
    var data;
    if(req.body.result.action === 'searchA'){
        speech = "https://www.lamsao.com/tim-kiem.html?q=" + req.body.result.parameters.article.replace(/ /g,"%20");
    }
    if(req.body.result.action === 'plus'){
        speech = a+b;
    }
    if(req.body.result.action === 'minus'){
        speech = a-b;
    }
    if(req.body.result.action === 'multiply'){
        speech = a*b;
    }
    if(req.body.result.action === 'divide'){
        speech = a/b;
         if(b === 0){
            speech = "Dở hơi vcl. Éo ai đi chia cho 0. Về học lớp 1 đi.";
        }
    }
    if(req.body.result.action === 'mood'){
        var degree = req.body.result.parameters.feeling.degree;
        var mood = req.body.result.parameters.feeling.mood;
        speech = 'Hệ thống phân tích bạn đang '+mood+' ở mức '+degree;
        if(mood === 'vui'){
            var a = {
                "speech":speech,
                "data": {
                    "facebook": [
                        {
                            "text": speech
                        },
                        {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [
                                        {
                                            "title": "Hãy vui tiếp đê",
                                            "subtitle": "Đọc thêm những công việc thú vị nhé",
                                            "image_url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
                                            "buttons": [
                                                {
                                                    "title": "OK xem luôn",
                                                    "type": "web_url",
                                                    "url": "http://careerbuilder.vn/vi/talentcommunity/10-cong-viec-thu-vi-trong-he-nay.35A50EF0.html"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "attachment": {
                              "type": "audio",
                              "payload": {
                                "url": "https://upload.wikimedia.org/wikipedia/en/a/a3/Happy_%28Pharrell_Williams_song_-_sample%29.ogg"
                              }
                            }
                          }

                    ]
                },
                "source": "math-by-huy"
                };
        return res.json(a);
        }
        if(mood === 'buồn'){
            var a = {
                "speech":speech,
                "data": {
                    "facebook": [
                        {
                            "text": speech
                        },
                        {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [
                                        {
                                            "title": "Đừng buồn nữa",
                                            "subtitle": "Một số cách để vui lên này",
                                            "image_url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
                                            "buttons": [
                                                {
                                                    "title": "Xem tiếp",
                                                    "type": "web_url",
                                                    "url": "http://vietnamnet.vn/vn/doi-song/41-meo-don-gian-de-song-vui-ve-192654.html"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                "source": "math-by-huy"
                };
        return res.json(a);
        }
        if(mood === 'giận'){
            var a = {
                "speech":speech,
                "data": {
                    "facebook": [
                        {
                            "text": speech
                        },
                        {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [
                                        {
                                            "title": "Bực làm gì xõa đi",
                                            "subtitle": "Những cách nguôi giận này",
                                            "image_url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
                                            "buttons": [
                                                {
                                                    "title": "Vào xem",
                                                    "type": "web_url",
                                                    "url": "http://ngoisao.net/tin-tuc/choi-blog/11-chieu-dap-tan-con-nong-gian-2903885.html"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                "source": "math-by-huy"
                };
        return res.json(a);
        }
        if(mood === 'chán'){
            var a = {
                "speech":speech,
                "data": {
                    "facebook": [
                        {
                            "text": speech
                        },
                        {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [
                                        {
                                            "title": "Chán quá thì làm gì vui đê",
                                            "subtitle": "Một số việc làm khi chán này",
                                            "image_url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
                                            "buttons": [
                                                {
                                                    "title": "Ờ xem đi",
                                                    "type": "web_url",
                                                    "url": "http://news.zing.vn/10-dieu-de-lam-khi-ban-chan-nan-post856.html"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                "source": "math-by-huy"
                };
        return res.json(a);
        }
    }
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'math-test-by-huy'
    });
});
    
restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
