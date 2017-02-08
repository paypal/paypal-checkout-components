import _ from 'underscore';
import express from 'express';
import morgan from 'morgan';
import logger from 'winston';
import { stylus }from 'stylus';
import { nib }from 'nib';
import uaParser from 'ua-parser';
import routes from './routes';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParse from 'body-parser';
import { config } from './config';


function App (app, opts) {
    this.app = app;
    this.appDir = opts.appDir || process.cwd();
    this.staticDir = path.join(__dirname, 'public');
    this.port = 8002;
}

_.extend(App.prototype, {
    setup: function () {
        let app = this.app;

        app.use(morgan('combined'));
        app.use(express.static(this.staticDir, {maxAge: 86400000}));

        app.use(cookieParser());

        app.use(bodyParse.json());
        app.use(bodyParse.urlencoded({extended: false}));

        app.use(function setup(req, res, next) {
            req.channel = uaParser.parse(req.headers['user-agent']);
            req.channel.isMobileOS = [ 'Android', 'iOS', 'Windows Phone' ].indexOf(req.channel.os.family) >= 0;
            logger.info('Channel: ' + req.channel);
            req.v4app = this;
            next();
        }.bind(this));

        routes(app);
    },

    listen: function () {
        this.app.listen(this.port, function () {
            logger.info('------ App has started and listening on ' + this.port + ' ------');

        }.bind(this));
    }
});

export default App;
