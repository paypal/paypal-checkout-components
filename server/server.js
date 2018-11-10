/* @flow */

import express from 'express';

import { getButtonMiddleware } from './button';

const app = express();
const PORT = process.env.PORT || 8003;
const URI = '/sdk/js/smart-buttons';

app.get(URI, getButtonMiddleware());

app.listen(PORT, () => {
    console.log(`Smart Button server listening on http://localhost.paypal.com:${ PORT }${ URI }?clientID=alc_client1`); // eslint-disable-line no-console
});
