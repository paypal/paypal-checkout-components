/* @flow */

import express from 'express';

import { buttonMiddleware } from './button';

let app = express();

app.get('/webapps/hermes/smart-button', buttonMiddleware);

app.listen(8000, () => {
    console.log('Smart Button server listening on http://localhost:8000'); // eslint-disable-line no-console
});
