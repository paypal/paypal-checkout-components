/* @flow */
/* eslint max-lines: off, no-restricted-globals: off, promise/no-native: off */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { mockWebSocket, patchWebSocket } from 'sync-browser-mocks/src/webSocket';
import { ZalgoPromise } from 'zalgo-promise/src';
import { values, destroyElement, noop, uniqueID, parseQuery, once } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants';
import { INTENT, CURRENCY, CARD, PLATFORM, COUNTRY, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { isWindowClosed, isSameDomain, getDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ProxyWindow } from 'post-robot/src/serialize/window';

import type { ZoidComponentInstance, MenuFlowProps } from '../../src/types';
import { setupButton, setupCard, submitCardFields } from '../../src';
import { loadFirebaseSDK, clearLsatState } from '../../src/api';

import { triggerKeyPress } from './util';

window.mockDomain = 'mock://www.paypal.com';

export const MOCK_BUYER_ACCESS_TOKEN = 'abc123xxxyyyzzz456';

beforeEach(() => {
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    window.onerror = noop;
    localStorage.clear();
    sessionStorage.clear();
});

export function promiseNoop() : ZalgoPromise<void> {
    return ZalgoPromise.resolve();
}

export function mockAsyncProp(handler? : Function = noop, time? : number = 1) : Function {
    const currentPromise = new ZalgoPromise();
    
    const asyncHandler = (...args) => {
        return ZalgoPromise.delay(time).then(() => handler(...args)).then((res) => {
            ZalgoPromise.delay(time).then(() => currentPromise.resolve(res)).catch(noop);
            return res;
        }, err => {
            ZalgoPromise.delay(time).then(() => currentPromise.reject(err)).catch(noop);
            throw err;
        });
    };
    
    asyncHandler.await = () => currentPromise;

    return asyncHandler;
}

type CancelableZalgoPromise<T> = ZalgoPromise<T> & {| cancel : () => void |};

export function cancelablePromise<T>(promise : ZalgoPromise<T>) : CancelableZalgoPromise<T> {
    // $FlowFixMe
    promise.cancel = noop;
    // $FlowFixMe
    return promise;
}

export function setupMocks() {
    clearLsatState();
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
        version: 'TEST',
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
            props.onAuth = once(props.onAuth);

            return {
                renderTo: () => {
                    props.onAuth({ accessToken: MOCK_BUYER_ACCESS_TOKEN });

                    return ZalgoPromise.try(() => {
                        if (props.window) {
                            return ProxyWindow.toProxyWindow(props.window, {
                                send: () => {
                                    throw new Error(`Can not send post message for proxy window in test`);
                                }
                            }).awaitWindow().then(win => {
                                if (!isSameDomain(win)) {
                                    // $FlowFixMe
                                    throw new Error(`Expected window passed to renderTo to be on same domain - expected ${ getDomain(window) } but got ${ getDomain(win) }`);
                                }
                            });
                        }
                    }).then(() => {
                        return props.createOrder();
                    }).then(orderID => {
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
                    if (props.window) {
                        props.window.close();
                    }

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
        QRCode: (props) => {
            return {
                renderTo: () => {
                    return ZalgoPromise.resolve();
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
                },
                updateProps: () => {
                    return ZalgoPromise.resolve();
                }
            };
        },
        CardForm: (props) => {
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
        CardFields: (props) => {
            return {
                render: () => {
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
                submit: () => {
                    return submitCardFields({ facilitatorAccessToken: 'ABCDEF12345' });
                }
            };
        },
        postRobot: {
            on:                () => ({ cancel: noop }),
            once:              () => cancelablePromise(ZalgoPromise.resolve()),
            send:              () => cancelablePromise(ZalgoPromise.resolve()),
            toProxyWindow: (win : CrossDomainWindowType) =>
                ProxyWindow.toProxyWindow(win, {
                    send: () => {
                        throw new Error(`Can not send post message for proxy window in test`);
                    }
                })
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
        onChange:  mockAsyncProp(noop),
        export:    mockAsyncProp(noop),
        onError:   mockAsyncProp((err) => {
            throw err;
        }),
        remember:                 mockAsyncProp(noop),
        getPrerenderDetails:      mockAsyncProp(noop),
        getPageUrl:               mockAsyncProp(() => 'https://www.merchant.com/foo/bar?baz=1'),
        getPopupBridge:           mockAsyncProp(noop),
        getParent:                () => window,
        getParentDomain:          () => 'https://www.merchant.com',
        enableNativeCheckout:     false,
        sessionState:         {
            get(key : string) : ZalgoPromise<?string> {
                const data = sessionStorage.getItem(key);
                return ZalgoPromise.resolve(data);
            },
            set(key : string, value : string) : ZalgoPromise<void> {
                sessionStorage.setItem(key, value);
                return ZalgoPromise.resolve();
            }
        }
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

    const singleCardFieldContainer = document.querySelector('#card-fields-container') || document.createElement('div');
    singleCardFieldContainer.id = 'card-fields-container';
    destroyElement(singleCardFieldContainer);
    body.appendChild(singleCardFieldContainer);
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
        onClose:       () => ZalgoPromise.resolve(),
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

export function createCardFieldsContainerHTML() : mixed {
    const fields = [];

    fields.push(`<div id="card-fields-container"></div>`);

    const body = document.body;

    if (!body) {
        throw new Error('No document.body found');
    }
    
    body.innerHTML += fields.join('\n');

    return document.querySelector('#card-fields-container');
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

export function getRestfulCaptureOrderApiMock(options : Object = {}) : MockEndpoint {
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

export function getRestfulAuthorizeOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders/[^/]+/authorize'),
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

export function getRestfulPatchOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'PATCH',
        uri:    new RegExp('/v2/checkout/orders/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
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
getPatchOrderApiMock().listen();

getMapBillingTokenApiMock().listen();
getSubscriptionIdToCartIdApiMock().listen();

getGraphQLApiMock().listen();
getLoggerApiMock().listen();
getValidatePaymentMethodApiMock().listen();

getRestfulGetOrderApiMock().listen();
getRestfulCaptureOrderApiMock().listen();
getRestfulAuthorizeOrderApiMock().listen();
getRestfulPatchOrderApiMock().listen();


// eslint-disable-next-line compat/compat
navigator.sendBeacon = () => true;

type NativeMockWebSocket = {|
    expect : () => {|
        done : () => Promise<void>
    |},
    // getProps : () => void,
    onInit : () => ZalgoPromise<void>,
    onApprove : ({| payerID : string |}) => ZalgoPromise<void>,
    onCancel : () => ZalgoPromise<void>,
    onError : () => ZalgoPromise<void>,
    onShippingChange : () => ZalgoPromise<void>,
    onFallback : (opts? : {| type : string, skip_native_duration : number |}) => ZalgoPromise<void>
|};

export function getNativeWebSocketMock({ getSessionUID } : {| getSessionUID : () => ?string |}) : NativeMockWebSocket {
    let getPropsRequestID;
    let onInitRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;
    let onShippingChangeRequestID;
    let onFallbackRequestID;

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

    const onInit = () => {
        onInitRequestID = uniqueID();

        return send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onInitRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onInit',
            message_data:       {}
        }));
    };

    const onApprove = () => {
        onApproveRequestID = uniqueID();

        return send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                payerID: 'XXYYZZ123456'
            }
        }));
    };

    const onCancel = () => {
        onCancelRequestID = uniqueID();

        return send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {

            }
        }));
    };

    const onError = () => {
        onErrorRequestID = uniqueID();

        return send(JSON.stringify({
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

        return send(JSON.stringify({
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

    const onFallback = (data) => {
        onFallbackRequestID = uniqueID();

        return send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onFallbackRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onFallback',
            message_data:       data
        }));
    };

    return {
        expect, onInit, onApprove, onCancel, onError, onShippingChange, onFallback
    };
}

const mockScripts = {};

export function mockScript({ src, expect = true, block = true } : {| src : string, expect? : boolean, block? : boolean |}) : {| done : () => void, await : () => ZalgoPromise<HTMLElement> |} {
    const promise = new ZalgoPromise();
    mockScripts[src] = { expect, block, promise, created: false };

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

// $FlowFixMe[method-unbinding]
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
    send : (string, Object) => ZalgoPromise<void>,
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
        return ZalgoPromise.delay(5).then(() => {
            for (const listener of (listeners[namespace] || [])) {
                listener({ val: () => messages[namespace] });
            }
        });
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
                                        hasCalls = true;
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

export function getNativeFirebaseMock({ sessionUID, extraHandler } : {| sessionUID : string, extraHandler? : Function |}) : NativeMockWebSocket {
    let onInitRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;
    let onShippingChangeRequestID;
    let onFallbackRequestID;

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

                if (messageType === 'request' && messageName === 'close') {
                    send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        sessionUID,
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

                    send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        sessionUID,
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        uniqueID(),
                        message_uid:        uniqueID(),
                        message_type:       'request',
                        message_name:       'onError',
                        message_data:       {
                            message: messageData.message
                        }
                    }));
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

        send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
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

    const onInit = () => {
        onInitRequestID = `${ uniqueID()  }_onInit`;
        waitingForResponse.push(onInitRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onInitRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onInit',
            message_data:       {}
        }));
    };


    const onApprove = ({ payerID }) => {
        onApproveRequestID = `${ uniqueID()  }_onApprove`;
        waitingForResponse.push(onApproveRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                payerID
            }
        }));
    };

    const onCancel = () => {
        onCancelRequestID = `${ uniqueID()  }_onCancel`;
        waitingForResponse.push(onCancelRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {
                
            }
        }));
    };

    const onError = () => {
        onErrorRequestID = `${ uniqueID()  }_onError`;
        waitingForResponse.push(onErrorRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
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
        onShippingChangeRequestID = `${ uniqueID()  }_onShippingChange`;
        waitingForResponse.push(onShippingChangeRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
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

    const onFallback = (data = {}) => {
        onFallbackRequestID = `${ uniqueID()  }_onFallback`;
        waitingForResponse.push(onFallbackRequestID);

        return send(`users/${ sessionUID }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        sessionUID,
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onFallbackRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onFallback',
            message_data:       data
        }));
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
        expect, onInit, onApprove, onCancel, onError, onShippingChange, onFallback
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

export async function mockSetupCardFields() : Promise<void> {
    await setupCard({
        cspNonce:               '111222333',
        facilitatorAccessToken: 'ABCDEF12345'
    });
}

export function setCardFieldsValues({ number, expiry, cvv } : {| number : string, expiry : string, cvv : string |}) : mixed {
    const numberInput = document.getElementsByName('number')[0];
    const expiryInput = document.getElementsByName('expiry')[0];
    const cvvInput = document.getElementsByName('cvv')[0];

    const inputEvent = new Event('input', { bubbles: true });
    const pasteEvent = new Event('paste', { bubbles: true });
    const focusEvent = new Event('focus', { bubbles: true });
    const blurEvent = new Event('blur', { bubbles: true });
    const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });


    if (numberInput) {
        numberInput.dispatchEvent(focusEvent);
        // $FlowFixMe
        numberInput.value = number;
        numberInput.dispatchEvent(pasteEvent);
        numberInput.dispatchEvent(inputEvent);
        numberInput.dispatchEvent(keydownEvent);
        numberInput.dispatchEvent(blurEvent);
    }

    if (expiryInput) {
        expiryInput.dispatchEvent(focusEvent);
        // $FlowFixMe
        expiryInput.value = expiry;
        expiryInput.dispatchEvent(inputEvent);
        expiryInput.dispatchEvent(keydownEvent);
        expiryInput.dispatchEvent(blurEvent);
    }

    if (cvvInput) {
        cvvInput.dispatchEvent(focusEvent);
        // $FlowFixMe
        cvvInput.value = cvv;
        cvvInput.dispatchEvent(pasteEvent);
        cvvInput.dispatchEvent(inputEvent);
        cvvInput.dispatchEvent(keydownEvent);
        cvvInput.dispatchEvent(blurEvent);
    }
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

    const originalPostRobot = window.paypal.postRobot;

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
        },
        toProxyWindow: (win : CrossDomainWindowType) => {
            return ProxyWindow.toProxyWindow(win, {
                send: () => {
                    throw new Error(`Can not send post message for proxy window in test`);
                }
            });
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

            return ZalgoPromise.delay(5).then(() => listener.handler({ source: win, origin: domain, data }))
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

        throw new Error(`No postRobot handler found for message name: ${ name } from ${ domain || 'unset domain' }`);
    };

    const done = () => {
        active = false;
        window.paypal.postRobot = originalPostRobot;
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
    |}) => void,
    onFirstLoad? : ({|
        win : CrossDomainWindowType,
        url : string,
        query : {| [string] : string |}
    |}) => void
|};

type MockWindow = {|
    getWindow : () => ?CrossDomainWindowType,
    getOpts : () => {| [string] : string |},
    send : ({| name : string, data? : mixed |}) => ZalgoPromise<Object>,
    redirect : (url : string) => ZalgoPromise<void>,
    close : () => void,
    expectClose : () => void,
    reset : () => void,
    done : () => void
|};

const getDefaultMockWindowOptions = () : MockWindowOptions => {
    // $FlowFixMe
    return {};
};

export function getMockWindowOpen({ expectedUrl, times = 1, appSwitch = false, expectClose = false, onOpen = noop, expectedQuery = [], expectImmediateUrl = true } : MockWindowOptions = getDefaultMockWindowOptions()) : MockWindow {

    let windowOpenedTimes = 0;
    const postRobotMock = getPostRobotMock();

    let win : ?CrossDomainWindowType;
    let winOpts : ?{| [string] : string |};
    

    const _onLoad = (url) => {
        if (!win) {
            throw new Error(`Expected win to be set`);
        }

        const [ stringUrl, stringQuery ] = url.split('?');

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
            url,
            query
        });
    };

    let onLoad = once(_onLoad);

    const windowOpen = window.open;
    window.open = (url, name, opts) : CrossDomainWindowType => {
        if (expectImmediateUrl && !url) {
            throw new Error(`Expected url to be immediately passed to window.open`);
        }

        windowOpenedTimes += 1;

        if (windowOpenedTimes === times) {
            window.open = windowOpen;
        }

        winOpts = opts
            ? Object.fromEntries(opts.split(',').map(pair => pair.split('=')))
            : {};

        let currentUrl = 'about:blank';

        onLoad = once(_onLoad);

        const newWin : CrossDomainWindowType = {
            // $FlowFixMe
            get location() : URL {
                return new URL(currentUrl); // eslint-disable-line compat/compat
            },
            set location(loc : string) {
                ZalgoPromise.delay(5).then(() => {
                    // $FlowFixMe
                    newWin.mockDomain = (new URL(loc).origin).replace(/^https?:/, 'mock:'); // eslint-disable-line compat/compat
                    currentUrl = loc;
                    onLoad(currentUrl);
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

            if (url && url !== 'about:blank') {
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

    const send = ({ name, data }) => {
        if (!win) {
            throw new Error(`Can not send message ${ name }, window not open`);
        }

        return postRobotMock.receive({
            win,
            // $FlowFixMe
            domain: win.location.origin,
            name,
            data
        });
    };

    const redirect = (url) => {
        if (!win) {
            throw new Error(`Can not redirect to ${ url }, window not open`);
        }

        win.location = url;
        
        return ZalgoPromise.delay(10);
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

        postRobotMock.done();
    };

    const close = () => {
        if (!win) {
            throw new Error(`Can not close window, window not open`);
        }

        expectClose = true;
        win.close();
    };

    const getWindow = () => {
        return win;
    };

    const doExpectClose = () => {
        expectClose = true;
    };

    const reset = () => {
        onLoad = once(_onLoad);
    };

    const getOpts = () => {
        if (!winOpts) {
            throw new Error(`Window options not get set`);
        }

        return winOpts;
    };

    return {
        getWindow,
        getOpts,
        send,
        redirect,
        close,
        expectClose: doExpectClose,
        done,
        reset
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
    isValid : () => boolean
|};

export function renderSmartFieldsMock({
    fundingSource,
    isValid
} : MockFieldsOptions) : SmartFieldsMock {
    window.frames = [
        {
            ...window,
            exports: {
                name:    'smart-fields',
                fundingSource,
                isValid,
                confirm
            }
        }
    ];

    const done = () => {
        delete window.frames;
    };

    return {
        done
    };
}
