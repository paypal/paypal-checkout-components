/* @flow */

import express from 'express';

import { getButtonMiddleware } from './button';

let app = express();

app.get('/webapps/hermes/smart-button', getButtonMiddleware());

app.listen(8000, () => {
    console.log('Smart Button server listening on http://localhost:8000/webapps/hermes/smart-button?clientID=alc_client1'); // eslint-disable-line no-console
});
