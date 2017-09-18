

var express = require('express');
var app = express();
var config = require('./config/config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
mongoose.connect(config.dbURL, {
    useMongoClient : true
});
var models = require('./models/models')(mongoose);
var controllers = require('./controllers/controllers')(models, jwt, config);
var xml = require('xml');
var jsontoxml = require('jsontoxml');
var validateRequest = require('./middlewares/validateRequest');
var port = process.env.PORT || 4000;
var env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

// app.all('/api/v1/*', validateRequest);
require('./routes/routes')(express, app, controllers, jsontoxml);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, function() {
    console.log('Movie Store API running on port: ' + port);
    console.log('Environment: ' + env);
});