const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connect = require('./configs/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const urlController = require('./controllers/url-controller');

app.get('/urlShorten',urlController.getUrl);
app.post('/urlShorten',urlController.createUrl);


app.listen('3000',async () => {
    console.log("Started on port 3000");
    await connect();
    console.log('Connected to the DB');
})