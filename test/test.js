
import paypal from 'src/index';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

import './tests';

paypal.setup({
    env: 'test'
});

afterEach(function() {
    paypal.xcomponent.destroyAll();
});

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.loggerUri,
    data: {}
}).listen();
