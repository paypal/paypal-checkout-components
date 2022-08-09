/* @flow */

import { noop } from '@krakenjs/belter';
import { getVersionFromNodeModules } from '@krakenjs/grabthar'

import { getCardMiddleware } from '../../server';
import { type SDKVersionManager } from '../../server/types'

import { mockReq, mockRes, getAccessToken } from './mock';


function getSetupCardParams(template) : Object {
    const setupCardParamsString = template && template.match(/<script nonce="">smartCard.setupCard\((.*?)\)<\/script>/);
    return  setupCardParamsString && JSON.parse(setupCardParamsString[1]);
}

jest.setTimeout(300000);

const logger = {
    debug: noop,
    info:  noop,
    warn:  noop,
    error: noop,
    track: noop
};


// $FlowFixMe testing impl
const buttonsVersionManager: SDKVersionManager = {
    getLiveVersion: () => '5.0.100',
    getOrInstallSDK: async (...args) => await getVersionFromNodeModules(args),
}

test('should do a basic card render and succeed', async () => {
    const cardMiddleware = getCardMiddleware({ logger, getAccessToken, buttonsVersionManager });

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
    const cardMiddleware = getCardMiddleware({ logger, getAccessToken, buttonsVersionManager });

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
