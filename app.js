"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.set('port', (process.env.PORT || 3000));
app.get('/', function (req, res) {
    res.send("poato");
});
app.listen(app.get('port'));
