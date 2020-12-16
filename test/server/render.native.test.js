/* @flow */

import { noop } from 'belter';
import { FUNDING } from '@paypal/sdk-constants';

import { getNativePopupMiddleware, getNativeFallbackMiddleware, cancelWatchers } from '../../server';

import { mockReq, mockRes, graphQL, tracking } from './mock';

jest.setTimeout(300000);

afterAll(cancelWatchers);

const cache = {
    // eslint-disable-next-line no-unused-vars
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(value)
};

const logger = {
    debug: noop,
    info:  noop,
    warn:  noop,
    error: noop
};

test('should do a basic native popup render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.PAYPAL });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
});

test('should do a basic native popup render and fail with a non-paypal domain', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.PAYPAL });

    const req = mockReq({
        query: {
            parentDomain: 'haxpaypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic venmo popup render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.VENMO });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
});

test('should do a basic venmo popup render and fail with a non-paypal domain', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.VENMO });

    const req = mockReq({
        query: {
            parentDomain: 'haxpaypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic native fallback render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativeFallbackMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.PAYPAL });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
});

test('should do a basic venmo fallback render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativeFallbackMiddleware({ graphQL, cache, logger, tracking, fundingSource: FUNDING.VENMO });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

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
});

