/* @flow */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { ZalgoPromise } from 'zalgo-promise';
import { values } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants';
import { INTENT, CURRENCY, CARD } from '@paypal/sdk-constants/src';

import { triggerKeyPress } from './util';

export function setupMocks() {

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
        Checkout: (props) => {
            return {
                renderTo: () => {
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
        }
    };

    window.xprops = {
        intent:      INTENT.CAPTURE,
        currency:    CURRENCY.USD,
        createOrder: () => {
            return ZalgoPromise.resolve('XXXXXXXXXX');
        },
        style: {

        },
        locale: {
            country: 'US',
            lang:    'en'
        },
        onInit: () => {
            return ZalgoPromise.resolve();
        },
        onClick: () => {
            return ZalgoPromise.resolve();
        },
        onApprove: () => {
            return ZalgoPromise.resolve();
        },
        onCancel: () => {
            return ZalgoPromise.resolve();
        },
        onError: (err) => {
            throw err;
        },
        remember: () => {
            return ZalgoPromise.resolve();
        },
        getPrerenderDetails: () => ZalgoPromise.resolve(),
        getParent:           () => window
    };

    window.Promise.try = (method) => {
        return window.Promise.resolve().then(method);
    };
}

setupMocks();
patchXmlHttpRequest();

export function mockFunction<T, A>(obj : mixed, prop : string, mock : ({ args : $ReadOnlyArray<A>, original : (...args: $ReadOnlyArray<A>) => T }) => T) : { cancel : () => void } {
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

export function clickButton(fundingSource? : string = FUNDING.PAYPAL) {
    window.document.querySelector(`button[data-funding-source=${ fundingSource }]`).click();
}

export function enterButton(fundingSource? : string = FUNDING.PAYPAL) {
    triggerKeyPress(window.document.querySelector(`button[data-funding-source=${ fundingSource }]`), 13);
}

export const DEFAULT_FUNDING_ELIGIBILITY = {
    [ FUNDING.PAYPAL ]: {
        eligible: true
    }
};

export function createButtonHTML(fundingEligibility? : Object = DEFAULT_FUNDING_ELIGIBILITY) : string {
    const buttons = [];

    // $FlowFixMe
    for (const fundingSource of values(FUNDING)) {
        const fundingConfig = fundingEligibility[fundingSource];

        if (!fundingConfig || !fundingConfig.eligible) {
            continue;
        }

        buttons.push(`<button data-funding-source="${ fundingSource }"></div>`);

        if (fundingConfig.vaultedInstruments) {
            for (const vaultedInstrument of fundingConfig.vaultedInstruments) {
                buttons.push(`<button data-funding-source="${ fundingSource }" data-payment-method-id="${ vaultedInstrument.id }"></div>`);
            }
        }

        if (fundingSource === FUNDING.CARD) {
            for (const card of values(CARD)) {
                const cardConfig = fundingConfig.vendors[card];

                if (!cardConfig || !cardConfig.eligible) {
                    continue;
                }

                buttons.push(`<button data-funding-source="${ fundingSource }" data-card="${ card }"></div>`);

                if (cardConfig.vaultedInstruments) {
                    for (const vaultedInstrument of cardConfig.vaultedInstruments) {
                        buttons.push(`<button data-funding-source="${ fundingSource }" data-card="${ card }" data-payment-method-id="${ vaultedInstrument.id }"></div>`);
                    }
                }
            }
        }
    }

    return buttons.join('\n');
}

type MockEndpoint = {|
    listen : () => void,
    expectCalls : () => void,
    done : () => void
|};

export function getAuthApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/smart/api/auth',
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/smart/api/order/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function captureOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/capture'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function authorizeOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/authorize'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function mapBillingTokenApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/payment/[^/]+/ectoken'),
        data:   {
            ack:  'success',
            data: {
                token: 'ABCDEFG12345'
            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}
export function patchOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/patch'),
        data:   {
            ack:  'success',
            data: {}
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getGraphQLApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    '/graphql',
        data:   {
            data: {
                checkoutSession: {
                    cart: {
                        intent:    'capture',
                        returnUrl: {
                            href: 'https://www.paypal.com/checkoutnow/error'
                        },
                        cancelUrl: {
                            href: 'https://www.paypal.com/checkoutnow/error'
                        },
                        amounts: {
                            total: {
                                currencyCode: 'USD'
                            }
                        }
                    }
                }
            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
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

export function validatePaymentMethodApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders/[^/]+/validate-payment-method'),
        data:   {
        
        },
        ...options
    });
}

getAuthApiMock().listen();
getOrderApiMock().listen();
captureOrderApiMock().listen();
authorizeOrderApiMock().listen();
mapBillingTokenApiMock().listen();
patchOrderApiMock().listen();
getGraphQLApiMock().listen();
getLoggerApiMock().listen();
validatePaymentMethodApiMock().listen();
