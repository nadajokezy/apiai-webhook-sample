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
        return '{
"speech":speech,
"data": {
    "facebook": [
        {
            "text": "blabla"
        },
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Some title",
                            "subtitle": "Some subtitle",
                            "image_url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
                            "buttons": [
                                {
                                    "title": "More info",
                                    "type": "web_url",
                                    "url": "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    ]
}
"source":"math-by-huy"
}';
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
