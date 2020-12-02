/* @flow */
/* eslint max-lines: off, no-restricted-globals: off, promise/no-native: off */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { mockWebSocket, patchWebSocket } from 'sync-browser-mocks/src/webSocket';
import { ZalgoPromise } from 'zalgo-promise/src';
import { values, destroyElement, noop, uniqueID, parseQuery } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants';
import { INTENT, CURRENCY, CARD, PLATFORM, COUNTRY, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';

import type { ZoidComponentInstance, MenuFlowProps } from '../../src/types';
import { setupButton } from '../../src';
import { loadFirebaseSDK } from '../../src/api';

import { triggerKeyPress } from './util';

export const MOCK_BUYER_ACCESS_TOKEN = 'abc123xxxyyyzzz456';

export function mockAsyncProp(handler? : Function = noop, time? : number = 1) : Function {
    return (...args) => ZalgoPromise.delay(time).then(() => handler(...args));
}

type CancelableZalgoPromise<T> = ZalgoPromise<T> & {| cancel : () => void |};

export function cancelablePromise<T>(promise : ZalgoPromise<T>) : CancelableZalgoPromise<T> {
    // $FlowFixMe
    promise.cancel = noop;
    // $FlowFixMe
    return promise;
}

export function setupMocks() {
    delete window.navigator.mockUserAgent;

    const body = document.body;

    if (!body) {
        throw new Error(`No document.body found`);
    }

    body.innerHTML = '';

    window.config = {
        urls: {
            baseUrl: '/smart'
        }
    };

    window.meta = {
        headers: {
            'x-csrf-jwt': 'xxxxxxx'
        }
    };

    window.paypal = {
        config:  {
            locale: {
                country: 'US',
                lang:    'en'
            }
        },
        Menu: () => {
            throw new Error(`Expected menu to not be rendered`);
        },
        Checkout: (props) => {
            return {
                renderTo: () => {
                    props.onAuth({ accessToken: MOCK_BUYER_ACCESS_TOKEN });

                    return props.createOrder().then(orderID => {
                        return ZalgoPromise.delay(50).then(() => {
                            return props.onApprove({
                                orderID,
                                payerID: 'AAABBBCCC'
                            }).catch(err => {
                                return props.onError(err);
                            });
                        });
                    });
                },
                close: () => {
                    return ZalgoPromise.delay(50).then(() => {
                        if (props.onClose) {
                            return props.onClose();
                        }
                    });
                },
                onError: (err) => {
                    throw err;
                }
            };
        },
        CardFields: (props) => {
            return {
                render: () => {
                    props.onAuth({ accessToken: MOCK_BUYER_ACCESS_TOKEN });

                    return props.createOrder().then(orderID => {
                        return ZalgoPromise.delay(50).then(() => {
                            return props.onApprove({
                                orderID,
                                payerID: 'AAABBBCCC'
                            });
                        });
                    });
                },
                close: () => {
                    return ZalgoPromise.delay(50).then(() => {
                        if (props.onClose) {
                            return props.onClose();
                        }
                    });
                },
                onError: (err) => {
                    throw err;
                }
            };
        },
        postRobot: {
            on:   () => ({ cancel: noop }),
            once: () => cancelablePromise(ZalgoPromise.resolve()),
            send: () => cancelablePromise(ZalgoPromise.resolve())
        }
    };

    window.xprops = {
        uid:             uniqueID(),
        clientID:        'xyz123',
        platform:        PLATFORM.DESKTOP,
        intent:          INTENT.CAPTURE,
        currency:        CURRENCY.USD,
        commit:          true,
        env:             'test',
        buttonSessionID: uniqueID(),
        createOrder:     mockAsyncProp(() => {
            return 'XXXXXXXXXX';
        }),
        style: {

        },
        locale: {
            country: 'US',
            lang:    'en'
        },
        onInit:    mockAsyncProp(noop),
        onApprove: mockAsyncProp(noop),
        onCancel:  mockAsyncProp(noop),
        onError:   mockAsyncProp((err) => {
            throw err;
        }),
        remember:                 mockAsyncProp(noop),
        getPrerenderDetails:      mockAsyncProp(noop),
        getPageUrl:               mockAsyncProp(() => 'https://www.merchant.com/foo/bar?baz=1'),
        getPopupBridge:           mockAsyncProp(noop),
        getParent:                () => window,
        getParentDomain:          () => 'https://www.merchant.com',
        enableNativeCheckout:     false
    };

    // eslint-disable-next-line compat/compat
    window.Promise.try = (method) => {
        // eslint-disable-next-line compat/compat
        return window.Promise.resolve().then(method);
    };

    const buttonsContainer = document.querySelector('#buttons-container') || document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    destroyElement(buttonsContainer);
    body.appendChild(buttonsContainer);

    const cardContainer = document.querySelector('#card-fields-container') || document.createElement('div');
    cardContainer.id = 'card-fields-container';
    destroyElement(cardContainer);
    body.appendChild(cardContainer);
}

setupMocks();
patchXmlHttpRequest();
patchWebSocket();

export function mockFunction<T, A>(obj : mixed, prop : string, mock : ({| args : $ReadOnlyArray<A>, original : (...args: $ReadOnlyArray<A>) => T |}) => T) : {| cancel : () => void |} {
    // $FlowFixMe
    const original = obj[prop];
    // $FlowFixMe
    obj[prop] = (...args) => {
        return mock({ args, original });
    };
    return {
        cancel: () => {
            // $FlowFixMe
            obj[prop] = original;
        }
    };
}

export async function clickButton(fundingSource? : string = FUNDING.PAYPAL) : Promise<void> {
    const button = window.document.querySelector(`[data-funding-source=${ fundingSource }]`);

    if (!button) {
        throw new Error(`Can not find ${ fundingSource } button`);
    }

    button.click();
    await button.payPromise;
}

export async function clickMenu(fundingSource? : string = FUNDING.PAYPAL) : Promise<void> {
    const menubutton = window.document.querySelector(`[data-funding-source=${ fundingSource }]`).parentElement.querySelector(`[data-menu]`);

    if (!menubutton) {
        throw new Error(`Can not find ${ fundingSource } menu button`);
    }

    menubutton.click();
    await menubutton.menuPromise;
}

export function enterButton(fundingSource? : string = FUNDING.PAYPAL) {
    triggerKeyPress(window.document.querySelector(`[data-funding-source=${ fundingSource }]`), 13);
}

export function mockMenu() : ZoidComponentInstance<MenuFlowProps> {
    return {
        renderTo:    () => ZalgoPromise.resolve(),
        render:      () => ZalgoPromise.resolve(),
        onError:     () => ZalgoPromise.resolve(),
        updateProps: () => ZalgoPromise.resolve(),
        close:       () => ZalgoPromise.resolve(),
        show:        () => ZalgoPromise.resolve(),
        hide:        () => ZalgoPromise.resolve()
    };
}

export const DEFAULT_FUNDING_ELIGIBILITY : FundingEligibilityType = {
    [ FUNDING.PAYPAL ]: {
        eligible: true
    }
};

export function createButtonHTML({ fundingEligibility = DEFAULT_FUNDING_ELIGIBILITY, wallet } : {| fundingEligibility? : Object, wallet? : Object |} = {}) {
    const buttons = [];

    for (const fundingSource of values(FUNDING)) {
        const fundingConfig = fundingEligibility[fundingSource];

        if (!fundingConfig || !fundingConfig.eligible) {
            continue;
        }

        if (fundingSource === FUNDING.CARD) {
            for (const card of values(CARD)) {
                const cardConfig = fundingConfig.vendors[card];

                if (!cardConfig || !cardConfig.eligible) {
                    continue;
                }

                if (cardConfig.vaultedInstruments && cardConfig.vaultedInstruments.length) {
                    const vaultedInstrument = cardConfig.vaultedInstruments[0];
                    buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }" data-payment-method-id="${ vaultedInstrument.id }"></div><div data-menu></div></div>`);
                } else {
                    buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }"></div></div>`);
                }
            }
        } else {
            if (fundingConfig.vaultedInstruments && fundingConfig.vaultedInstruments.length) {
                const vaultedInstrument = fundingConfig.vaultedInstruments[0];
                buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }" data-payment-method-id="${ vaultedInstrument.id }"></div><div data-menu></div></div>`);
            } else if (wallet && wallet[fundingSource] && wallet[fundingSource].instruments.length) {
                const walletInstrument = wallet[fundingSource].instruments[0];
                if (walletInstrument.instrumentID) {
                    buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }" data-instrument-id="${ walletInstrument.instrumentID }"></div><div data-menu></div></div>`);
                } else if (walletInstrument.paymentID) {
                    buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }" data-payment-method-id="${ walletInstrument.paymentID }"></div><div data-menu></div></div>`);
                }
            } else {
                buttons.push(`<div><div role="button" data-funding-source="${ fundingSource }"></div></div>`);
            }
        }
    }

    const body = document.body;

    if (!body) {
        throw new Error(`No document.body found`);
    }

    body.innerHTML += buttons.join('\n');
}

type MockEndpoint = {|
    listen : () => MockEndpoint,
    expectCalls : () => MockEndpoint,
    done : () => MockEndpoint,
    enable : () => MockEndpoint,
    disable : () => MockEndpoint
|};

export function getCreateAccessTokenMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    '/v1/oauth2/token',
        data:   {
            access_token: 'abc123'
        },
        ...options
    });
}

export function getCreateOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders'),
        data:   {
            id: 'ABCDEFG0123456789'
        },
        ...options
    });
}

export function getGetOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/smart/api/order/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getRestfulGetOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/v2/checkout/orders/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getCaptureOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/capture'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getRestfulCapturedOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders/[^/]+/capture'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getAuthorizeOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/authorize'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getMapBillingTokenApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/payment/[^/]+/ectoken'),
        data:   {
            ack:  'success',
            data: {
                token: 'ABCDEFG12345'
            }
        },
        ...options
    });
}
export function getPatchOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/patch'),
        data:   {
            ack:  'success',
            data: {}
        },
        ...options
    });
}

export function getSubscriptionIdToCartIdApiMock(options : Object = {}, subscriptionID : string = 'I-SUBSCRIPTIONID', cartId : string = 'CARTIDOFSUBSCRIPTIONS') : MockEndpoint {

    return $mockEndpoint.register({
        method: 'POST',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }/cartid`,
        data:   {
            ack:  'success',
            data: {
                token: cartId
            }
        },
        ...options
    });
}

// eslint-disable-next-line default-param-last
export function getGetSubscriptionApiMock(options : Object = {}, subscriptionID : string) : MockEndpoint {

    return $mockEndpoint.register({
        method: 'GET',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }`,
        data:   {
            ack:  'success',
            data: {
                'status':      'APPROVAL_PENDING',
                'id':          subscriptionID,
                'create_time': '2019-05-13T13:50:17Z'
            }
        },
        ...options
    });
}

export function getCreateSubscriptionIdApiMock(options : Object, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    'v1/billing/subscriptions',
        data:   {
            'status':      'APPROVAL_PENDING',
            'id':          subscriptionID,
            'create_time': '2019-05-10T13:50:17Z'
        },
        ...options
    });
}

export function getReviseSubscriptionIdApiMock(options : Object, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    `v1/billing/subscriptions/${ subscriptionID }/revise`,
        data:   {
            'status':      'APPROVAL_PENDING',
            'id':          subscriptionID,
            'create_time': '2019-05-10T13:50:17Z'
        },
        ...options
    });
}

// eslint-disable-next-line default-param-last
export function getActivateSubscriptionIdApiMock(options : Object = {}, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }/activate`,
        data:   {
            ack:  'success',
            data: {}
        },
        ...options
    });
}

export function getGraphQLApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method:  'POST',
        uri:     '/graphql',
        handler: ({ uri, method, query, data, headers }) => {
            if (options.extraHandler) {
                const result = options.extraHandler({ uri, method, query, data, headers });
                if (result) {
                    return result;
                }
            }

            if (options.data) {
                return options.data;
            }

            if (data.query.includes('query GetCheckoutDetails')) {
                return {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  'capture',
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                }
                            },
                            payees: [
                                {
                                    merchantId: 'XYZ12345',
                                    email:       {
                                        stringValue: 'xyz-us-b1@paypal.com'
                                    }
                                }
                            ]
                        }
                    }
                };
            }

            if (data.query.includes('query GetNativeEligibility')) {
                return {
                    data: {
                        mobileSDKEligibility: {
                            paypal: {
                                eligibility: true
                            },
                            venmo: {
                                eligibility: true
                            }
                        }
                    }
                };
            }

            if (data.query.includes('query GetFireBaseSessionToken')) {
                return {
                    data: {
                        firebase: {
                            auth: {
                                sessionUID:   data.variables.sessionUID,
                                sessionToken: 'abc1234'
                            }
                        }
                    }
                };
            }

            if (data.query.includes('query ExchangeAuthCode')) {
                if (!data.variables.buyerAccessToken) {
                    throw new Error(`Expected buyer access token to be passed`);
                }

                return {
                    data: {
                        auth: {
                            authCode: uniqueID()
                        }
                    }
                };
            }

            if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                if (!data.variables.facilitatorAccessToken) {
                    throw new Error(`We haven't received the facilitatorAccessToken`);
                }

                if (!data.variables.buyerAccessToken) {
                    throw new Error(`We haven't received the buyer's access token`);
                }

                if (!data.variables.orderID) {
                    throw new Error(`We haven't received the orderID`);
                }

                return {
                    data: {
                        upgradeLowScopeAccessToken: true
                    }
                };
            }

            return {};
        },
        ...options
    });
}

export function getLoggerApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    '/xoplatform/logger/api/logger',
        data:   {

        },
        ...options
    });
}

export function getValidatePaymentMethodApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method:  'POST',
        uri:     new RegExp('/v2/checkout/orders/[^/]+/validate-payment-method'),
        handler: ({ uri, method, query, data, headers }) => {
            if (options.extraHandler) {
                const result = options.extraHandler({ uri, method, query, data, headers });
                if (result) {
                    return result;
                }
            }

            return {};
        },
        ...options
    });
}

getCreateAccessTokenMock().listen();
getCreateOrderApiMock().listen();
getGetOrderApiMock().listen();
getCaptureOrderApiMock().listen();
getAuthorizeOrderApiMock().listen();
getMapBillingTokenApiMock().listen();
getPatchOrderApiMock().listen();
getSubscriptionIdToCartIdApiMock().listen();
getGraphQLApiMock().listen();
getLoggerApiMock().listen();
getValidatePaymentMethodApiMock().listen();

type NativeMockWebSocket = {|
    expect : () => {|
        done : () => Promise<void>
    |},
    // getProps : () => void,
    onApprove : () => void,
    onCancel : () => void,
    onError : () => void,
    onShippingChange : () => void,
    fallback : ({| buyerAccessToken : string |}) => void
|};

export function getNativeWebSocketMock({ getSessionUID } : {| getSessionUID : () => ?string |}) : NativeMockWebSocket {
    let props;

    let getPropsRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;
    let onShippingChangeRequestID;

    const { send, expect } = mockWebSocket({
        uri:     'wss://127.0.0.1/paypal/native',
        handler: ({ data }) => {
            const {
                request_uid:    requestUID,
                message_type:   messageType,
                message_status: messageStatus,
                message_name:   messageName,
                message_data:   messageData
            } = JSON.parse(data);

            if (messageType === 'response' && messageStatus === 'error') {
                throw new Error(messageData.message);
            }

            if (messageType === 'response' && messageName === 'getProps') {
                if (requestUID !== getPropsRequestID) {
                    throw new Error(`Request uid doest not match for getProps response`);
                }
                props = messageData;
            }

            if (messageType === 'response' && messageName === 'onApprove') {
                if (requestUID !== onApproveRequestID) {
                    throw new Error(`Request uid doest not match for onApprove response`);
                }
            }

            if (messageType === 'response' && messageName === 'onCancel') {
                if (requestUID !== onCancelRequestID) {
                    throw new Error(`Request uid doest not match for onCancel response`);
                }
            }

            if (messageType === 'response' && messageName === 'onError') {
                if (requestUID !== onErrorRequestID) {
                    throw new Error(`Request uid doest not match for onError response`);
                }
            }

            if (messageType === 'response' && messageName === 'onShippingChange') {
                if (requestUID !== onShippingChangeRequestID) {
                    throw new Error(`Request uid doest not match for onShippingChange response`);
                }
            }
        }
    });

    /*

    const getProps = () => {
        getPropsRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        getPropsRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'getProps'
        }));
    };

    */

    const onApprove = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onApproveRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                orderID: props.orderID,
                payerID: 'XXYYZZ123456'
            }
        }));
    };

    const onCancel = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onCancelRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {
                orderID: props.orderID
            }
        }));
    };

    const onError = () => {
        onErrorRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onErrorRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onError',
            message_data:       {
                message: 'Something went wrong'
            }
        }));
    };

    const onShippingChange = () => {
        onShippingChangeRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onShippingChangeRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onShippingChange',
            message_data:       {

            }
        }));
    };

    return {
        expect, onApprove, onCancel, onError, onShippingChange, fallback: noop
    };
}

const mockScripts = {};

export function mockScript({ src, expect = true, block = true } : {| src : string, expect? : boolean, block? : boolean |}) : {| done : () => void, await : () => ZalgoPromise<HTMLElement> |} {
    const promise = new ZalgoPromise();
    mockScripts[src] = { expect, block, promise };

    return {
        await: () => {
            return promise;
        },
        done: () => {

            if (expect && (!mockScripts[src] || !mockScripts[src].created)) {
                throw new Error(`Expected script with src ${ src } to have been created`);
            }

            delete mockScripts[src];
        }
    };
}

const createElement = document.createElement;
// $FlowFixMe
document.createElement = function mockCreateElement(name : string) : HTMLElement {
    const el = createElement.apply(this, arguments);

    if (name !== 'script') {
        return el;
    }

    const setAttribute = el.setAttribute;
    el.setAttribute = function mockSetAttribute(key : string, value : string) {
        if (key === 'src' && mockScripts[value]) {
            mockScripts[value].created = true;
            const { block } = mockScripts[value];

            if (block) {
                setAttribute.call(this, 'type', 'mock/javascript');
            }

            setAttribute.apply(this, arguments);
            mockScripts[value].promise.resolve(el);
        }
    };

    const addEventListener = el.addEventListener;
    el.addEventListener = function mockAddEventListener(eventName : string, handler : () => void) {
        if (eventName === 'load') {
            handler();
            return;
        }

        addEventListener.apply(this, arguments);
    };

    return el;
};

export function mockFirebaseScripts() : {| done : () => void, await : () => ZalgoPromise<$ReadOnlyArray<HTMLElement>> |} {
    loadFirebaseSDK.reset();

    const mockfirebaseApp = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
        expect: true,
        block:  true
    });

    const mockfirebaseAuth = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
        expect: true,
        block:  true
    });

    const mockfirebaseDatabase = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js',
        expect: true,
        block:  true
    });

    return {
        await: () => {
            return ZalgoPromise.all([
                mockfirebaseApp.await(),
                mockfirebaseAuth.await(),
                mockfirebaseDatabase.await()
            ]);
        },
        done: () => {
            delete window.firebase;
            loadFirebaseSDK.reset();
            mockfirebaseApp.done();
            mockfirebaseAuth.done();
            mockfirebaseDatabase.done();
        }
    };
}

export const MOCK_FIREBASE_CONFIG = {
    apiKey:            'AIzaSyAeyii31bJYddKqSHrkyiRKU3EHCvh-owM',
    authDomain:        'testmessaging-63f5d.firebaseapp.com',
    databaseURL:       'https://testmessaging-63f5d.firebaseio.com',
    projectId:         'testmessaging-63f5d',
    storageBucket:     'testmessaging-63f5d.appspot.com',
    messagingSenderId: '330437320943',
    appId:             '1:330437320943:web:c7a8b59c274429d1707b1a',
    measurementId:     'G-6ZYN3ND8X2'
};

type MockFirebase = {|
    send : (string, Object) => void,
    expect : () => {|
        done : () => void
    |}
|};

let firebaseOffline = false;

function mockFirebase({ handler } : {| handler : ({| data : Object |}) => void |}) : MockFirebase {
    const firebaseScriptsMock = mockFirebaseScripts();

    let hasCalls = false;

    const messages = {};
    const listeners = {};

    const splitPath = (path : string) => {
        const pathComponents = path.split('/');
        let [ namespace, key ] = [ pathComponents.slice(0, -1), pathComponents[pathComponents.length - 1] ];
        namespace = namespace.join('/');
        return { namespace, key };
    };

    const send = (path, data) => {
        const { namespace, key } = splitPath(path);
        messages[namespace] = messages[namespace] || {};
        messages[namespace][key] = data;
        for (const listener of (listeners[namespace] || [])) {
            listener({ val: () => messages[namespace] });
        }
    };

    firebaseScriptsMock.await().then(() => {
        window.firebase = {
            initializeApp: () => {
                // pass
            },
            auth: () => {
                return {
                    signInWithCustomToken: () => {
                        return ZalgoPromise.resolve();
                    }
                };
            },
            database: () => {
                return {
                    ref: (path) => {
                        return {
                            set: (data) => {
                                if (firebaseOffline) {
                                    return;
                                }

                                ZalgoPromise.delay(0).then(() => {
                                    hasCalls = true;
                                    const { namespace } = splitPath(path);
                                    send(path, data);
                                    handler({
                                        data: messages[namespace]
                                    });
                                });
                            },
                            on: (item, onHandler) => {
                                listeners[path] = listeners[path] || [];
                                listeners[path].push((...args) => {
                                    if (!firebaseOffline) {
                                        onHandler(...args);
                                    }
                                });
                            }
                        };
                    },
                    goOffline: () => {
                        firebaseOffline = true;
                    },
                    goOnline: () => {
                        firebaseOffline = false;
                    }
                };
            }
        };

        window.firebase.database.INTERNAL = {
            forceWebSockets: () => {
                // pass
            }
        };
    });

    const expect = () => {
        return {
            done: () => {
                firebaseScriptsMock.done();
                if (!hasCalls) {
                    throw new Error(`Expected calls to firebase`);
                }
            }
        };
    };

    return { send, expect };
}

export function getNativeFirebaseMock({ getSessionUID, extraHandler } : {| getSessionUID : () => string, extraHandler? : Function |}) : NativeMockWebSocket {
    let props;

    let getPropsRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;
    let onShippingChangeRequestID;
    let fallbackRequestID;

    const received = {};
    const waitingForResponse = [];

    const { send, expect: expectFirebase } = mockFirebase({
        // eslint-disable-next-line complexity
        handler: ({ data }) => {
            for (const id of Object.keys(data)) {
                const message = JSON.parse(data[id]);

                const {
                    request_uid:    requestUID,
                    message_uid:    messageUID,
                    message_type:   messageType,
                    message_status: messageStatus,
                    message_name:   messageName,
                    message_data:   messageData
                } = message;

                if (received[messageUID]) {
                    continue;
                }

                received[messageUID] = true;

                if (messageType === 'response' && waitingForResponse.indexOf(requestUID) !== -1) {
                    waitingForResponse.splice(waitingForResponse.indexOf(requestUID), 1);
                }

                if (extraHandler) {
                    extraHandler(message);
                }

                if (messageType === 'request'  && messageName === 'setProps') {
                    const {
                        orderID, facilitatorAccessToken, pageUrl, commit,
                        userAgent, buttonSessionID, env, webCheckoutUrl
                    } = messageData;

                    if (!orderID || !facilitatorAccessToken || pageUrl !== '' || !commit || !userAgent || !buttonSessionID || !env || !webCheckoutUrl) {
                        throw new Error(`Missing props`);
                    }

                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        requestUID,
                        message_uid:        uniqueID(),
                        message_type:       'response',
                        message_name:       'setProps',
                        message_status:     'success',
                        message_data:       {}
                    }));


                    props = messageData;
                }

                if (messageType === 'request' && messageName === 'close') {
                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        requestUID,
                        message_uid:        uniqueID(),
                        message_type:       'response',
                        message_name:       'close',
                        message_status:     'success',
                        message_data:       {}
                    }));
                }

                if (messageType === 'response' && messageStatus === 'error') {
                    if (messageName === 'onError') {
                        throw new Error(messageData.message);
                    }

                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        onApproveRequestID,
                        message_uid:        uniqueID(),
                        message_type:       'request',
                        message_name:       'onError',
                        message_data:       {
                            message: messageData.message
                        }
                    }));
                }

                if (messageType === 'response' && messageName === 'getProps') {
                    if (requestUID !== getPropsRequestID) {
                        throw new Error(`Request uid doest not match for getProps response`);
                    }
                    props = messageData;
                }

                if (messageType === 'response' && messageName === 'onApprove') {
                    if (requestUID !== onApproveRequestID) {
                        throw new Error(`Request uid doest not match for onApprove response`);
                    }
                }

                if (messageType === 'response' && messageName === 'onCancel') {
                    if (requestUID !== onCancelRequestID) {
                        throw new Error(`Request uid doest not match for onCancel response`);
                    }
                }

                if (messageType === 'response' && messageName === 'onError') {
                    if (requestUID !== onErrorRequestID) {
                        throw new Error(`Request uid doest not match for onError response`);
                    }
                }

                if (messageType === 'response' && messageName === 'onShippingChange') {
                    if (requestUID !== onShippingChangeRequestID) {
                        throw new Error(`Request uid doest not match for onShippingChange response`);
                    }
                }
            }
        }
    });

    /*

    const getProps = () => {
        getPropsRequestID = `${ uniqueID()  }_getProps`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        getPropsRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'getProps'
        }));

        waitingForResponse.push(getPropsRequestID);
    };

    */

    const onApprove = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onApproveRequestID = `${ uniqueID()  }_onApprove`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                orderID: props.orderID,
                payerID: 'XXYYZZ123456'
            }
        }));

        waitingForResponse.push(onApproveRequestID);
    };

    const onCancel = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onCancelRequestID = `${ uniqueID()  }_onCancel`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {
                orderID: props.orderID
            }
        }));

        waitingForResponse.push(onCancelRequestID);
    };

    const onError = () => {
        onErrorRequestID = `${ uniqueID()  }_onError`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onErrorRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onError',
            message_data:       {
                message: 'Something went wrong'
            }
        }));

        waitingForResponse.push(onErrorRequestID);
    };

    const onShippingChange = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onShippingChangeRequestID = `${ uniqueID()  }_onShippingChange`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onShippingChangeRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onShippingChange',
            message_data:       {

            }
        }));

        waitingForResponse.push(onShippingChangeRequestID);
    };

    const fallback = ({ buyerAccessToken } : {| buyerAccessToken : string |}) => {
        fallbackRequestID = `${ uniqueID() }_fallback`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        fallbackRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'fallback',
            message_data:       { buyerAccessToken }
        }));

        waitingForResponse.push(onErrorRequestID);
    };

    const expect = () => {
        const { done: firebaseDone } = expectFirebase();

        return {
            done: async () => {
                firebaseDone();

                if (waitingForResponse.length) {
                    await ZalgoPromise.delay(0);
                }

                if (waitingForResponse.length) {
                    throw new Error(`Waiting for responses from firebase: ${  waitingForResponse.join(', ') }`);
                }
            }
        };
    };

    return {
        expect, onApprove, onCancel, onError, onShippingChange, fallback
    };
}

export const MOCK_SDK_META = 'abc123';

export async function mockSetupButton(overrides? : Object = {}) : Promise<void> {
    await setupButton({
        facilitatorAccessToken:        'QQQ123000',
        merchantID:                    [ 'XYZ12345' ],
        fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
        personalization:               {},
        buyerCountry:                  COUNTRY.US,
        isCardFieldsExperimentEnabled: false,
        firebaseConfig:                MOCK_FIREBASE_CONFIG,
        eligibility:                   {
            cardFields: false,
            native:     false
        },
        sdkMeta: MOCK_SDK_META,
        ...overrides
    });
}

type PostRobotMock = {|
    receive : <T>({| // eslint-disable-line no-undef
        name : string,
        win? : CrossDomainWindowType,
        domain? : string,
        data? : mixed
    |}) => ZalgoPromise<T>,  // eslint-disable-line no-undef
        done : () => void
    |};

export function getPostRobotMock() : PostRobotMock {
    let active = true;

    const listeners = [];

    window.paypal.postRobot = {
        on: (name, options, handler) => {
            const listener = { name, options, handler, once: false };
            listeners.push(listener);
            return {
                cancel: () => {
                    listeners.splice(listeners.indexOf(listener), 1);
                }
            };
        },
        once: (name, options, handler) => {
            const promise = new ZalgoPromise();
            const listener = { name, options, handler, promise, once: true };
            listeners.push(listener);
            // $FlowFixMe
            promise.cancel = () => {
                listeners.splice(listeners.indexOf(listener), 1);
            };
            return promise;
        },
        send: () => {
            throw new Error(`postRobot.send: not implemented`);
        }
    };

    const receive = ({ name, win, domain, data }) => {
        if (!active) {
            throw new Error(`Post-robot mock not active`);
        }

        if (win && isWindowClosed(win)) {
            throw new Error(`Expected sending window to be open`);
        }

        for (const listener of listeners) {
            if (listener.name !== name) {
                continue;
            }

            if (win && listener.options.window && listener.options.window !== win) {
                continue;
            }

            if (domain && listener.options.domain && listener.options.domain !== domain) {
                continue;
            }

            return ZalgoPromise.try(() => listener.handler({ source: win, origin: domain, data }))
                .then(res => {
                    if (listener.promise) {
                        listener.promise.resolve(res || data);
                    }
                    return res;
                }, err => {
                    if (listener.promise) {
                        listener.promise.reject(err);
                    }
                    throw err;
                });
        }

        throw new Error(`No postRobot handler found for message name: ${ name }`);
    };

    const done = () => {
        active = false;
        delete window.paypal.postRobot;
    };

    return {
        // $FlowFixMe
        receive,
        done
    };
}

type MockWindowOptions = {|
    expectedUrl? : string,
    expectImmediateUrl? : boolean,
    times? : number,
    appSwitch? : boolean,
    expectClose? : boolean,
    expectedQuery? : $ReadOnlyArray<string>,
    onOpen? : ({|
        win : CrossDomainWindowType,
        url : string,
        query : {| [string] : string |}
    |}) => void
|};

type MockWindow = {|
    getWindow : () => ?CrossDomainWindowType,
    expectClose : () => void,
    done : () => void
|};

const getDefaultMockWindowOptions = () : MockWindowOptions => {
    // $FlowFixMe
    return {};
};

export function getMockWindowOpen({ expectedUrl, times = 1, appSwitch = false, expectClose = false, onOpen = noop, expectedQuery = [], expectImmediateUrl = true } : MockWindowOptions = getDefaultMockWindowOptions()) : MockWindow {

    let windowOpenedTimes = 0;

    let win : ?CrossDomainWindowType;

    const windowOpen = window.open;
    window.open = (url) : CrossDomainWindowType => {
        if (expectImmediateUrl && !url) {
            throw new Error(`Expected url to be immediately passed to window.open`);
        }

        windowOpenedTimes += 1;

        if (windowOpenedTimes === times) {
            window.open = windowOpen;
        }

        let currentUrl = 'about:blank';

        const onLoad = () => {
            if (!win) {
                throw new Error(`Expecred win to be set`);
            }

            const [ stringUrl, stringQuery ] = currentUrl.split('?');

            if (expectedUrl && stringUrl !== expectedUrl) {
                throw new Error(`Expected url to be ${ expectedUrl }, got ${ stringUrl }`);
            }

            const query = parseQuery(stringQuery);

            for (const key of expectedQuery) {
                if (!query[key]) {
                    throw new Error(`Expected query param: ${ key }`);
                }
            }

            onOpen({
                win,
                url: currentUrl,
                query
            });
        };

        const newWin : CrossDomainWindowType = {
            get location() : {||} {
                // $FlowFixMe
                return {
                    protocol: 'about:'
                };
            },
            set location(loc : string) {
                ZalgoPromise.delay(10).then(() => {
                    currentUrl = loc;
                    onLoad();
                });
            },
            closed: false,
            close:  () => {
                newWin.closed = true;

                if (!expectClose) {
                    throw new Error(`Expected window to not close`);
                }
            },
            focus:       noop,
            frames:      [],
            length:      0,
            // $FlowFixMe
            open:        noop,
            // $FlowFixMe
            parent:      null,
            // $FlowFixMe
            top:         null,
            // $FlowFixMe
            self:        null,
            postMessage: noop
        };

        const mockElement = (tagName = 'div') => {
            return {
                tagName,
                appendChild:      noop,
                removeChild:      noop,
                setAttribute:     noop,
                querySelector:    noop,
                querySelectorAll: () => [],
                children:         []
            };
        };

        if (!url) {
            // $FlowFixMe
            newWin.document = {
                createElement:   mockElement,
                createTextNode:  mockElement,
                documentElement: mockElement()
            };
        }

        newWin.parent = newWin.top = newWin.self = newWin;
        win = newWin;

        ZalgoPromise.delay(10).then(() => {
            if (appSwitch) {
                newWin.closed = true;
            }

            if (url) {
                newWin.location = url;
            }
        });

        if (appSwitch) {
            ZalgoPromise.delay(10).then(() => {
                newWin.closed = true;
            });
        }

        return newWin;
    };

    const done = () => {
        window.open = windowOpen;

        if (windowOpenedTimes !== times) {
            throw new Error(`Expected window.open to be called ${ times } times, got ${ windowOpenedTimes } calls`);
        }

        if (expectClose && win && !win.closed) {
            throw new Error(`Expected window to close`);
        }

        if (!expectClose && win && win.closed) {
            throw new Error(`Expected window to not close`);
        }

        // cleanup
        if (win && !win.closed) {
            expectClose = true;
            win.close();
        }
    };

    const getWindow = () => {
        return win;
    };

    const doExpectClose = () => {
        expectClose = true;
    };

    return {
        getWindow,
        expectClose: doExpectClose,
        done
    };
}

export function generateOrderID() : string {
    return uniqueID().slice(0, 8);
}

const ensureWindowOpenOnClick = () => {

    let isClick = false;
    let clickTimeout;

    function doClick() {
        isClick = true;

        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            isClick = false;
        }, 1);
    }

    const HTMLElementClick = window.HTMLElement.prototype.click;
    window.HTMLElement.prototype.click = function overrideHTMLElementClick() : void {
        doClick();
        return HTMLElementClick.apply(this, arguments);
    };

    const HTMLElementDispatchEvent = window.HTMLElement.prototype.dispatchEvent;
    window.HTMLElement.prototype.dispatchEvent = function overrideHTMLElementDispatchEvent(event : Event) : void {
        // $FlowFixMe
        if (event.type === 'keypress' && (event.key === 13 || event.key === 32)) {
            doClick();
        }
        return HTMLElementDispatchEvent.apply(this, arguments);
    };

    if (!document.body) {
        throw new Error(`Expected to find document body`);
    }

    document.body.addEventListener('keydown', (event : Event) => {
        // $FlowFixMe
        if (event.key === 13 || event.key === 32) {
            doClick();
        }
    });

    const windowOpen = window.open;
    window.open = function patchedWindowOpen() : CrossDomainWindowType {

        if (!isClick) {
            throw new Error(`Attempted to open window not in click event`);
        }

        return windowOpen.apply(this, arguments);
    };
};

ensureWindowOpenOnClick();


type SmartFieldsMock = {|
    done : () => void
|};

type MockFieldsOptions = {|
    fundingSource : string,
    isValid : () => boolean,
    confirm : ?() => ZalgoPromise<void | string>
|};

export function renderSmartFieldsMock({
    fundingSource,
    isValid,
    confirm
} : MockFieldsOptions) : SmartFieldsMock {
    window.frames = [
        {
            exports: {
                name:    'smart-fields',
                fundingSource,
                isValid,
                confirm
            },
            ...window
        }
    ];

    const done = () => {
        delete window.frames;
    };

    return {
        done
    };
}
