/* @flow */

import { destroyAll } from 'zoid/src';
import { getHost, getPath } from '@paypal/sdk-client/src';

const script = document.createElement('script');
script.setAttribute('id', 'test-sdk-script');
script.setAttribute('type', 'mock/javascript');
script.setAttribute('src', `https://${ getHost() }${ getPath() }?client-id=abcxyz123`);
script.setAttribute('data-client-token', 'TEST');

const body = document.body;

if (body) {
    body.appendChild(script);
}

window.mockDomain = 'mock://www.paypal.com';

window.paypal = require('../src/interface/button');

// $FlowFixMe
window.paypal.destroyAll = destroyAll;

window.paypal.setupButtons();
