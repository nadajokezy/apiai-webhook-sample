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
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'math-test-by-huy'
    });
});
restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
