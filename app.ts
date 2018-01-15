import * as express from 'express';
let app = express();
app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
    res.send("poato");
});

app.listen(app.get('port')); 