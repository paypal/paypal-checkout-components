
import express from 'express';
import routes from './routes';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParse from 'body-parser';
import { config } from './config';

function App (app, opts) {
    this.app = app;
    this.appDir = opts.appDir || process.cwd();
    this.staticDir = path.join(__dirname, '../client');
    this.port = 8002;
}

App.prototype = {
    setup: function () {
        var app = this.app;

        app.use('/static/js', express.static(path.join(__dirname, '../build'), {maxAge: 86400000}));
        app.use('/static', express.static(path.join(__dirname, '../client'), {maxAge: 86400000}));

        app.use(cookieParser());

        app.use(bodyParse.json());
        app.use(bodyParse.urlencoded({extended: false}));

        routes(app);
    },

    listen: function () {
        this.app.listen(this.port, function () {
            console.log('------ App has started and listening on ' + this.port + ' ------');

        }.bind(this));
    }
};

export default App;
