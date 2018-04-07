var express = require('express');
var bodyparser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyparser.json());


app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});

// Add The Routes
require('./routes')(app);

// Turn on that server!
app.listen(port, () => {
    console.log('App listening on port ${port}');
});

module.exports = app;
