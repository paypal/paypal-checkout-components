import  express  from 'express'
import App  from './app';

let app = new App(express(), {appDir: __dirname});
app.setup();
app.listen();