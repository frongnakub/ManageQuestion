const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.221.181.184',
    user: 'proj',
    password: 'Oui_plic2',
    database: 'GrammarBE'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = connection;