'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';
                if (requestBody.result.action === 'plus') {
                    speech = requestBody.result.action.parameters.firstNum + requestBody.result.action.parameters.secondNum;
                }
                if (requestBody.result.action === 'minus') {
                    speech = requestBody.result.action.parameters.firstNum - requestBody.result.action.parameters.secondNum;
                }
                if (requestBody.result.action === 'multiply') {
                    speech = requestBody.result.action.parameters.firstNum * requestBody.result.action.parameters.secondNum;
                }
                if (requestBody.result.action === 'divide') {
                    speech = requestBody.result.action.parameters.firstNum / requestBody.result.action.parameters.secondNum;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'math_api_by_huy'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});