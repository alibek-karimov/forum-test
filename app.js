/**
 * Created by Alibek on 14.04.2016.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(express.static('./web')); //static web
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;