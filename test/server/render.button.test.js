/* @flow */

import { regexMap, noop } from '@krakenjs/belter';
import { FUNDING } from '@paypal/sdk-constants';
import {getVersionFromNodeModules} from '@krakenjs/grabthar'

import { getButtonMiddleware, cancelWatchers } from '../../server';
import { ROOT_TRANSACTION_NAME } from '../../server/components/buttons/constants';
import {type SDKVersionManager} from '../../server/types'

import {
    mockReq, mockRes, graphQL, getAccessToken, getMerchantID,
    mockContent, tracking, getPersonalizationEnabled,
    getInstanceLocationInformation, getSDKLocationInformation
} from './mock';

function getRenderedFundingSources(template) : $ReadOnlyArray<string> {
    return regexMap(template, / data-funding-source="([^"]+)"/g, (result, group1) => group1);
}

function getSetupButtonParams(template) : Object {
    const setupButtonParamsString = template && template.match(/<script nonce="">spb.setupButton\((.*?)\)<\/script>/);
    return  setupButtonParamsString && JSON.parse(setupButtonParamsString[1]);
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

// $FlowFixMe testing impl
const sdkVersionManager: SDKVersionManager = {
    getLiveVersion: () => '5.0.312',
    getOrInstallSDK: async (...args) => await getVersionFromNodeModules(args),
}

test('should do a basic button render and succeed', async () => {
    const buttonMiddleware = getButtonMiddleware({ sdkVersionManager, graphQL, getAccessToken, getMerchantID, content: mockContent, cache, logger, tracking, getPersonalizationEnabled, getInstanceLocationInformation, getSDKLocationInformation });

    const req = mockReq({
        query: {
            clientID: 'xyz'
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

    const setupButtonParams = getSetupButtonParams(html);

    if (!setupButtonParams.personalization.buttonText || !setupButtonParams.personalization.tagline) {
        throw new Error(`Expected personalization to be rendered, got: ${ JSON.stringify(setupButtonParams.personalization) }`);
    }
});

test('should do a basic button render and succeed when graphql fundingEligibility errors', async () => {

    const req = mockReq({
        query: {
            clientID:           'xyz',
            fundingEligibility: Buffer.from(JSON.stringify({
                paypal: {
                    eligible: true
                },
                card: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible: true
                        },
                        mastercard: {
                            eligible: true
                        }
                    }
                }
            }), 'utf8').toString('base64')
        }
    });

    const res = mockRes();

    const errButtonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL,
        getAccessToken,
        getMerchantID,
        content: mockContent,
        cache,
        logger,
        tracking,
        getPersonalizationEnabled,
        getInstanceLocationInformation,
        getSDKLocationInformation
    });
    // $FlowFixMe
    await errButtonMiddleware(req, res);

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

    if (fundingSources.indexOf(FUNDING.CARD) === -1) {
        throw new Error(`Expected paypal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should give a 400 error with no clientID passed', async () => {
    const buttonMiddleware = getButtonMiddleware({ sdkVersionManager, graphQL, getAccessToken, getMerchantID, content: mockContent, cache, logger, tracking, getPersonalizationEnabled, getInstanceLocationInformation, getSDKLocationInformation });

    const req = mockReq();
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const status = res.getStatus();

    if (status !== 400) {
        throw new Error(`Expected status code to be 400, got ${ status }`);
    }
});

test('should give a 400 error when an error occur while rendering button', async () => {
    const buttonMiddleware = getButtonMiddleware({ 
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID, content: mockContent, cache, logger, tracking, getPersonalizationEnabled, getInstanceLocationInformation, getSDKLocationInformation });

    // These are considered valid (validateButtonProps pass)
    const req = mockReq({
        query: {
            clientID:           'xyz',
            fundingEligibility: Buffer.from(JSON.stringify({}), 'utf8').toString('base64')
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const status = res.getStatus();

    if (status !== 400) {
        throw new Error(`Expected status code to be 400, got ${ status }`);
    }
});

test('should render empty personalization when API errors', async () => {
    const buttonMiddleware = getButtonMiddleware({ 
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID, content: mockContent, cache, logger, tracking, getPersonalizationEnabled, getInstanceLocationInformation, getSDKLocationInformation });

    const req = mockReq({
        query: {
            clientID:                     'xyz',
            simulatePersonalizationError: true
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);
    const html = res.getBody();

    const setupButtonParams = getSetupButtonParams(html);

    if (Object.keys(setupButtonParams.personalization).length > 0) {
        throw new Error(`Expected personalization to be empty, got: ${ JSON.stringify(setupButtonParams.personalization) }`);
    }
});

test('should render empty personalization when config is disabled', async () => {
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL,
        getAccessToken,
        getMerchantID,
        content:                   mockContent,
        cache,
        logger,
        tracking,
        getPersonalizationEnabled: () => false,
        getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        query: {
            clientID:                     'xyz'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);
    const html = res.getBody();

    const setupButtonParams = getSetupButtonParams(html);

    if (Object.keys(setupButtonParams.personalization).length > 0) {
        throw new Error(`Expected personalization to be empty, got: ${ JSON.stringify(setupButtonParams.personalization) }`);
    }
});

test('should render filled out tagline when config is enabled', async () => {
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL,
        getAccessToken,
        getMerchantID,
        content:                   mockContent,
        cache,
        logger,
        tracking,
        getPersonalizationEnabled: () => true,
        getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        query: {
            clientID: 'xyz'
        }
    });
    const res = mockRes();
    
    // $FlowFixMe
    await buttonMiddleware(req, res);
    const html = res.getBody();

    const setupButtonParams = getSetupButtonParams(html);
    
    if (!setupButtonParams.personalization.buttonText || !setupButtonParams.personalization.tagline) {
        throw new Error(`Expected personalization to be rendered, got: ${ JSON.stringify(setupButtonParams.personalization) }`);
    }
});

test('should do a basic button render with post and succeed', async () => {
    const buttonMiddleware = getButtonMiddleware({ 
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID, content: mockContent, cache, logger, tracking, getPersonalizationEnabled, getInstanceLocationInformation, getSDKLocationInformation });

    const req = mockReq({
        method: 'post',
        body:   {
            clientID: 'xyz'
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

    const setupButtonParams = getSetupButtonParams(html);

    if (!setupButtonParams.personalization.buttonText || !setupButtonParams.personalization.tagline) {
        throw new Error(`Expected personalization to be rendered, got: ${ JSON.stringify(setupButtonParams.personalization) }`);
    }
});

test('should find the req.model.rootTxn object in the req', async () => {
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID,
        content: mockContent, cache, logger, tracking,
        getPersonalizationEnabled, getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        method: 'post',
        body:   {
            clientID: 'sandbox'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const { name, data } = req?.model?.rootTxn;

    expect(name).toStrictEqual(ROOT_TRANSACTION_NAME.SMART_BUTTONS);
    expect(data?.client_id).toStrictEqual('sandbox');
    expect(data?.sdk_version).toStrictEqual('5.0.312');
    expect(data?.smart_buttons_version).toStrictEqual('local');
});

test('should find the rootTxn name in the req model when is wallet', async () => {
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID,
        content: mockContent, cache, logger, tracking,
        getPersonalizationEnabled, getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        method: 'post',
        body:   {
            clientID:    'sandbox',
            userIDToken: 'mockUserIdToken'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const { name } = req?.model?.rootTxn;

    expect(name).toStrictEqual(ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET);
});

test('should find the req.model.rootTxn.name in the req model when is vault', async () => {
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        graphQL, getAccessToken, getMerchantID,
        content: mockContent, cache, logger, tracking,
        getPersonalizationEnabled, getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        method: 'post',
        body:   {
            clientID:          'sandbox',
            clientAccessToken: 'mockClientAccessToken'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const { name } = req?.model?.rootTxn;

    expect(name).toStrictEqual(ROOT_TRANSACTION_NAME.SMART_BUTTONS_VAULT);
});

test('should return an HTML page with the error', async () => {
    const spyConsoleError = jest
        .spyOn(console,  'error').mockImplementationOnce(jest.fn());
    const mockTracking = jest.fn().mockImplementationOnce(() => {
        throw new Error('Mocking a critical failure');
    });
    const buttonMiddleware = getButtonMiddleware({
        sdkVersionManager,
        content: mockContent, tracking: mockTracking,
        cache, logger, graphQL, getAccessToken, getMerchantID,
        getPersonalizationEnabled,
        getInstanceLocationInformation,
        getSDKLocationInformation
    });

    const req = mockReq({
        method: 'post',
        body:   {
            clientID: 'xyz'
        }
    });
    const res = mockRes().status(400);

    // $FlowFixMe
    await buttonMiddleware(req, res);

    const status = res.getStatus();
    const body = res.getBody();

    expect(status).toBe(500);
    expect(body).toMatchSnapshot();
    spyConsoleError.mockRestore();
});
