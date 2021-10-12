/* @flow */

import { noop } from 'belter';

import { getCardMiddleware, cancelWatchers } from '../../server';

import { mockReq, mockRes, getAccessToken, getInstanceLocationInformation } from './mock';

function getSetupCardParams(template) : Object {
    const setupCardParamsString = template && template.match(/<script nonce="">smartCard.setupCard\((.*?)\)<\/script>/);
    return  setupCardParamsString && JSON.parse(setupCardParamsString[1]);
}

jest.setTimeout(300000);

afterAll((done) => {
    cancelWatchers();
    done();
});

const cache = {
    // eslint-disable-next-line no-unused-vars
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(value)
};

const logger = {
    debug: noop,
    info:  noop,
    warn:  noop,
    error: noop,
    track: noop
};

test('should do a basic card render and succeed', async () => {
    const cardMiddleware = getCardMiddleware({ logger, cache, getAccessToken, getInstanceLocationInformation });

    const req = mockReq({
        query: {
            clientID: 'xyz'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await cardMiddleware(req, res);

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

    const setupCardParams = getSetupCardParams(html);

    if (!setupCardParams.facilitatorAccessToken === 'ABCDEF12345') {
        throw new Error(`Expected facilitatorAccessToken to be 'ABCDEF12345', got: ${ JSON.stringify(setupCardParams.facilitatorAccessToken) }`);
    }
});

test('should fail with a non-clientId', async () => {
    const cardMiddleware = getCardMiddleware({ logger, cache, getAccessToken, getInstanceLocationInformation });

    const req = mockReq({
        query: {
            clientID:     ''
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await cardMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 400) {
        throw new Error(`Expected response status to be 400, got ${ status }`);
    }

    if (contentType !== 'text/plain') {
        throw new Error(`Expected content type to be text/plain, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error('Expected res to have a body');
    }

});
