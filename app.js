"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var bodyparser = require("body-parser");
var qs = require("query-string");
var httpstatus = require("http-status-codes");
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 3000));
app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + "/client.js");
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/weather", function (req, res) {
    var params = qs.stringify({
        q: 'viborg,DNK',
        APPID: 'c5fe9a65b85913e0f1e3be2a9a88493a',
        mode: 'JSON',
        units: 'metric'
    });
    var uri = "https://api.openweathermap.org/data/2.5/forecast?" + params;
    request({
        uri: uri,
        method: "get",
        headers: {
            'Accept': 'application/json'
        }
    }, function (error, response, body) {
        if (error)
            res.status(httpstatus.GATEWAY_TIMEOUT).send();
        else
            res.status(httpstatus.OK).json(body);
    });
});
app.listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port') + "...");
});
