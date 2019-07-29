/* @flow */

import { randomBytes } from 'crypto';

import express from 'express';

import { getButtonMiddleware } from './buttons';
import type { ExpressRequest, ExpressResponse } from './types';

const app = express();
const PORT = process.env.PORT || 8003;
const URI = '/smart/buttons';

const buttonMiddleware = getButtonMiddleware();

app.get(URI, (req : ExpressRequest, res : ExpressResponse) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);
    
    return buttonMiddleware(req, res);
});

app.listen(PORT, () => {
    console.log(`Smart Button server listening on http://localhost.paypal.com:${ PORT }${ URI }?clientID=alc_client1`); // eslint-disable-line no-console
});
