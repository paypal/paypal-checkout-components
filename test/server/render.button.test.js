/* @flow */

import { regexMap } from 'belter';
import { FUNDING } from '@paypal/sdk-constants';

import { getButtonMiddleware, cancelWatchers } from '../../server';

import { mockReq, mockRes } from './mock';

function getRenderedFundingSources(template) : $ReadOnlyArray<string> {
    return regexMap(template, /data-funding-source="([^"]+)"/g, (result, group1) => group1);
}

jest.setTimeout(300000);

afterAll(cancelWatchers);

const buttonMiddleware = getButtonMiddleware();

const FUNDING_ELIGIBILITY = {
    bancontact: {
        eligible: false,
        branded:  true
    },
    card: {
        eligible: true,
        branded:  true,

        vendors: {
            visa: {
                eligible: true
            },
            mastercard: {
                eligible: true
            },
            amex: {
                eligible: true
            },
            discover: {
                eligible: true
            },
            hiper: {
                eligible: false
            },
            elo: {
                eligible: false
            },
            jcb: {
                eligible: false
            }
        }
    },
    credit: {
        eligible: false,
        branded:  true
    },
    sepa: {
        eligible: false,
        branded:  true
    },
    eps: {
        eligible: false,
        branded:  true
    },
    giropay: {
        eligible: false,
        branded:  true
    },
    ideal: {
        eligible: false,
        branded:  true
    },
    mybank: {
        eligible: false,
        branded:  true
    },
    p24: {
        eligible: false,
        branded:  true
    },
    paypal: {
        eligible: true,
        branded:  true
    },
    sofort: {
        eligible: false,
        branded:  true
    },
    venmo: {
        eligible: false,
        branded:  true
    },
    wechatpay: {
        eligible: false,
        branded:  true
    },
    zimpler: {
        eligible: false,
        branded:  true
    }
};

test('should do a basic button render and succeed', async () => {

    const req = mockReq({
        query: {
            clientID:           'xyz',
            fundingEligibility: Buffer.from(JSON.stringify(FUNDING_ELIGIBILITY)).toString('base64')
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

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

    const fundingSources = getRenderedFundingSources(html);

    if (fundingSources.indexOf(FUNDING.PAYPAL) === -1) {
        throw new Error(`Expected paypal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should render ideal button when eligible and locale is nl_NL', async () => {

    const req = mockReq({
        query: {
            'clientID':           'xyz',
            'locale.country':     'NL',
            'locale.lang':        'nl',
            'fundingEligibility': Buffer.from(JSON.stringify({
                ...FUNDING_ELIGIBILITY,
                ideal: {
                    eligible: true
                }
            })).toString('base64')
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const html = res.getBody();

    const fundingSources = getRenderedFundingSources(html);
    
    if (fundingSources.indexOf(FUNDING.IDEAL) === -1) {
        throw new Error(`Expected ideal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should give a 400 error with no clientID passed', async () => {

    const req = mockReq();
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const status = res.getStatus();

    if (status !== 400) {
        throw new Error(`Expected status code to be 400, gor ${ status }`);
    }
});
