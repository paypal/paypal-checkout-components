
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes  = require('./routes');

module.exports = function(options) {
    options = options || {};

    var app = express();

    app.use('/static/js', express.static(path.join(__dirname, '../build'), {maxAge: 86400000}));
    app.use('/static', express.static(path.join(__dirname, '../client'), {maxAge: 86400000}));

    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(function setup(req, res, next) {
        req.v4app = this;
        next();
    }.bind(this));

    routes(app);

    return app;
}
