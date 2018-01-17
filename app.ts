import * as express from 'express';
import * as request from 'request';
import * as bodyparser from 'body-parser';
import * as qs from 'query-string';
import * as httpstatus from 'http-status-codes';
let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 3000));

app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + "/client.js");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/weather", (req, res) => {
    let params =     qs.stringify({
        q: 'viborg,DNK',
        APPID: 'c5fe9a65b85913e0f1e3be2a9a88493a',
        mode: 'JSON',
        units: 'metric'
    });
    
    let uri = "https://api.openweathermap.org/data/2.5/forecast?" + params;

    request({
        uri,
        method: "get",
        headers: {
            'Accept': 'application/json'
        }
    }, (error, response, body) => {
        if (error)
            res.status(httpstatus.GATEWAY_TIMEOUT).send();
        else
            res.status(httpstatus.OK).json(body);
    });

    
});

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}...`);
});

