/* @flow */

import '../../tests/common';

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

patchXmlHttpRequest();

$mockEndpoint.register({
    method:  'POST',
    uri:     '/legacy/complete',
    handler: () => ({
        type: 'redirect',
        url:  `#return`
    })
}).expectCalls();

let interval = setInterval(() => {

    if (!window.ppxoWatching) {
        return;
    }

    clearInterval(interval);

    let req = new window.XMLHttpRequest();
    req.open('POST', '/legacy/complete', true);
    req.send();

}, 100);

