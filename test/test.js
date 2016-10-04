
import paypal from 'src/index';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

import './tests';

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    console.log.apply(console, arguments);
};

paypal.setup({
    env: 'test'
});

afterEach(() => {
    paypal.xcomponent.destroyAll();
    delete window.navigator.mockUserAgent;
});

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.loggerUri,
    data: {}
}).listen();

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};
