/* @flow */

import { regexMap } from 'belter';

import { FUNDING } from '../../constants';
import { buttonMiddleware, cancelPayPalCheckoutComponentWatcher } from '../../server/button';

import { mockReq, mockRes } from './mock';

function getRenderedFundingSources(template) : Array<string> {
    return regexMap(template, /data-funding-source="([^"]+)"/g, (result, group1) => group1);
}

afterAll(cancelPayPalCheckoutComponentWatcher);

test('should do a basic button render and succeed', async () => {

    let req = mockReq();
    let res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    let status = res.getStatus();
    let contentType = res.getHeader('content-type');
    let html = res.getBody();

    if (status !== 200) {
        throw new Error(`Expected response status to be 200, got ${ status }`);
    }

    if (contentType !== 'text/html') {
        throw new Error(`Expected content type to be text/html, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }

    if (html.indexOf(`class="paypal-button-container`) === -1) {
        throw new Error(`Expected button template to be rendered`);
    }

    let fundingSources = getRenderedFundingSources(html);

    if (fundingSources.indexOf(FUNDING.PAYPAL) === -1) {
        throw new Error(`Expected paypal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should render ideal button when locale is nl_NL', async () => {

    let req = mockReq({
        query: {
            'locale.country': 'NL',
            'locale.lang':    'nl'
        }
    });
    let res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    let html = res.getBody();

    let fundingSources = getRenderedFundingSources(html);
    
    if (fundingSources.indexOf(FUNDING.IDEAL) === -1) {
        throw new Error(`Expected ideal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});
