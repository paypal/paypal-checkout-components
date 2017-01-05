/* @flow */

import 'src/index';
import '../../tests/common';

window.opener.console.warn('loaded fallback page');

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: '/legacy/complete',
    handler: () => ({
        type: 'redirect',
        url: `#return`
    })
}).expectCalls();

let interval = setInterval(() => {

    if (!window.ppxoWatching) {
        return;
    }

    clearInterval(interval);

    window.opener.console.warn('sending request');
    let req = new window.XMLHttpRequest();
    window.opener.console.warn(req.open.toString());
    req.open('POST', '/legacy/complete', true);
    req.send();

}, 100);

