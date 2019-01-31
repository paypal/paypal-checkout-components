/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';
import { getParent, getTop } from 'cross-domain-utils/src';

import { getOrder, captureOrder, authorizeOrder, patchOrder, persistAccessToken, billingTokenToOrderID, callGraphQL, type OrderResponse } from './api';
import { ORDER_API_ERROR, ORDER_ID_PATTERN, ERROR_URL } from './constants';

type ActionsType = {|
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        get : () => ZalgoPromise<OrderResponse>
    },
    restart : () => ZalgoPromise<OrderResponse>
|};

type ShippingChangeActionsType = {|
    order : {
        patch : () => ZalgoPromise<OrderResponse>
    }
|};

type CheckoutComponent = {|
    close : () => ZalgoPromise<void>
|};

function buildExecuteActions(checkout : CheckoutComponent, orderID : string) : ActionsType {

    const restartFlow = memoize(() : ZalgoPromise<OrderResponse> =>
        checkout.close().then(() => {
            // eslint-disable-next-line no-use-before-define
            return renderCheckout({
                createOrder: () => ZalgoPromise.resolve(orderID)
            }, 'iframe');
        }).catch(noop).then(() => new ZalgoPromise(noop)));

    const handleProcessorError = (err : mixed) : ZalgoPromise<OrderResponse> => {
        if (err && err.message === ORDER_API_ERROR.CC_PROCESSOR_DECLINED) {
            return restartFlow();
        }

        if (err && err.message === ORDER_API_ERROR.INSTRUMENT_DECLINED) {
            return restartFlow();
        }

        throw new Error('Order could not be captured');
    };

    const orderGet = memoize(() =>
        getOrder(orderID));

    const orderCapture = memoize(() => {
        if (window.xprops.intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return captureOrder(orderID)
            .catch(handleProcessorError)
            .finally(orderGet.reset);
    });

    const orderAuthorize = memoize(() =>
        authorizeOrder(orderID)
            .catch(handleProcessorError)
            .finally(orderGet.reset));

    return {
        order: {
            capture:    orderCapture,
            authorize:  orderAuthorize,
            get:        orderGet
        },
        restart: restartFlow
    };
}

function buildShippingChangeActions(checkout : CheckoutComponent, orderID : string, actions : {}) : ShippingChangeActionsType {

    const handleProcessorError = () : ZalgoPromise<OrderResponse> => {
        throw new Error('Order could not be patched');
    };

    const orderPatch = (patch = []) =>
        patchOrder(orderID, patch)
            .catch(handleProcessorError);

    return {
        ...actions,
        order: {
            patch: orderPatch
        }
    };
}

function validateOrder(orderID : string) : ZalgoPromise<void> {
    if (!orderID.match(ORDER_ID_PATTERN)) {
        throw new Error(`${ orderID } does not match pattern for order-id, ec-token or cart-id`);
    }

    return callGraphQL(`
        checkout {
            checkoutSession(token : "${ orderID }") {
                cart {
                    intent
                    returnUrl {
                        href
                    }
                    cancelUrl {
                        href
                    }
                    amounts {
                        total {
                            currencyCode
                        }
                    }
                }
            }
        }
    `).then(res => {
        const cart = res.data.checkout.checkoutSession.cart;

        const intent = (cart.intent.toLowerCase() === 'sale') ? INTENT.CAPTURE : cart.intent.toLowerCase();
        const currency = cart.amounts && cart.amounts.total.currencyCode;
        const returnUrl = cart.returnUrl && cart.returnUrl.href;
        const cancelUrl = cart.cancelUrl && cart.cancelUrl.href;

        const expectedIntent = window.xprops.intent;
        const expectedCurrency = window.xprops.currency;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ intent } to the sdk`);
        }

        if (currency && currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ currency } to the sdk`);
        }

        if (returnUrl && returnUrl.indexOf(ERROR_URL) !== 0) {
            throw new Error(`Expected return url to be either blank, or "${ ERROR_URL }". Return url is forbidden for smart payment button integration.`);
        }

        if (cancelUrl && cancelUrl.indexOf(ERROR_URL) !== 0) {
            throw new Error(`Expected cancel url to be either blank, or "${ ERROR_URL }". Cancel url is forbidden for smart payment button integration.`);
        }
    });
}

let checkoutOpen = false;
let canRenderTop = false;

export function setupCheckout() {
    const [ parent, top ] = [ getParent(window), getTop(window) ];

    if (top && parent && parent !== top) {
        window.paypal.Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }
}

function getCreateOrder(props : Object = {}) : () => ZalgoPromise<string> {
    return memoize(() => {
        return ZalgoPromise.try(() => {
            if (props.createOrder) {
                return props.createOrder();
            } else if (window.xprops.createBillingAgreement) {
                return window.xprops.createBillingAgreement().then(billingToken => {
                    return billingTokenToOrderID(billingToken);
                });
            } else if (window.xprops.createOrder) {
                return window.xprops.createOrder();
            } else {
                throw new Error(`No mechanism to create order`);
            }
        });
    });
}

function getNonce() : string {
    let nonce = '';
    if (document.body) {
        nonce = document.body.getAttribute('data-nonce') || '';
    }
    return nonce;
}

function getDefaultContext() : string {
    return supportsPopups() ? 'popup' : 'iframe';
}

export function renderCheckout(props : Object = {}, context : string = getDefaultContext()) : ZalgoPromise<mixed> {

    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const [ parent, top ] = [ getParent(window), getTop(window) ];

    const createOrder = getCreateOrder(props);
    const renderWindow = (canRenderTop && top) ? top : parent;

    const validateOrderPromise = createOrder().then(validateOrder);

    const addOnProps = {};

    if (window.xprops.onShippingChange) {
        addOnProps.onShippingChange = function onShippingChange(data, actions) : ZalgoPromise<void> {
            return window.xprops.onShippingChange(data, buildShippingChangeActions(this, data.orderID, actions));
        };
    }

    const instance = window.paypal.Checkout({
        ...props,
        ...addOnProps,

        createOrder,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onError: window.xprops.onError,

        onApprove({ orderID, payerID, paymentID, billingToken }) : ZalgoPromise<void> {
            const actions = buildExecuteActions(this, orderID);

            return window.xprops.onApprove({ orderID, payerID, paymentID, billingToken }, actions).catch(err => {
                return window.xprops.onError(err);
            });
        },

        onCancel: () : ZalgoPromise<void> => {
            return ZalgoPromise.try(() => {
                return createOrder();
            }).then(orderID => {
                return window.xprops.onCancel({ orderID });
            }).catch(err => {
                return window.xprops.onError(err);
            });
        },

        onAuth: ({ accessToken }) : ZalgoPromise<void> => {
            return persistAccessToken(accessToken);
        },

        onClose: () => {
            checkoutOpen = false;
        },

        nonce: getNonce()
    });
    
    return instance.renderTo(renderWindow, 'body', context).then(() => {
        return validateOrderPromise.catch(err => {
            return ZalgoPromise.all([
                instance.close(),
                instance.onError(err)
            ]);
        });
    });
}
