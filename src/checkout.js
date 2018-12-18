/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop } from 'belter/src';
import { INTENT } from '@paypal/sdk-constants/src';
import { getParent, getTop } from 'cross-domain-utils/src';

import { getOrder, captureOrder, authorizeOrder, persistAccessToken, callGraphQL, type OrderResponse } from './api';
import { ORDER_API_ERROR, ORDER_ID_PATTERN, ERROR_URL } from './constants';

type ActionsType = {|
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        get : () => ZalgoPromise<OrderResponse>
    },
    restart : () => ZalgoPromise<OrderResponse>
|};

function enableLightbox() {
    window.paypal.Checkout.contexts.iframe = true;
}

type CheckoutComponent = {|
    close : () => ZalgoPromise<void>
|};

function buildExecuteActions(checkout : CheckoutComponent, orderID : string) : ActionsType {

    const restartFlow = memoize(() : ZalgoPromise<OrderResponse> =>
        checkout.close().then(() => {
            enableLightbox();
            // eslint-disable-next-line no-use-before-define
            return renderCheckout({
                createOrder: () => ZalgoPromise.resolve(orderID)
            });
        }).then(() => new ZalgoPromise(noop)));

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

    const orderCapture = memoize(() =>
        captureOrder(orderID)
            .catch(handleProcessorError)
            .finally(orderGet.reset));

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
        const currency = cart.amounts.total.currencyCode;
        const returnUrl = cart.returnUrl && cart.returnUrl.href;
        const cancelUrl = cart.cancelUrl && cart.cancelUrl.href;

        const expectedIntent = window.xprops.intent;
        const expectedCurrency = window.xprops.currency;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }`);
        }

        if (currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }`);
        }

        if (returnUrl && returnUrl.indexOf(ERROR_URL) !== 0) {
            throw new Error(`Expected return url to be either blank, or "${ ERROR_URL }". Return url is not needed or used by smart payment button integration.`);
        }

        if (cancelUrl && cancelUrl.indexOf(ERROR_URL) !== 0) {
            throw new Error(`Expected cancel url to be either blank, or "${ ERROR_URL }". Cancel url is not needed or used by smart payment button integration.`);
        }
    });
}

let checkoutOpen = false;
let canRenderTop = true;

export function setupCheckout() {
    const [ parent, top ] = [ getTop(window), getParent() ];

    if (top && parent && parent !== top) {
        window.paypal.Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }
}

function getNonce() : string {
    let nonce = '';
    if (document.body) {
        nonce = document.body.getAttribute('data-nonce') || '';
    }
    return nonce;
}

export function renderCheckout(props : Object = {}) : ZalgoPromise<mixed> {

    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const [ parent, top ] = [ getTop(window), getParent() ];

    const createOrder = memoize(props.createOrder || window.xprops.createOrder);
    const renderWindow = (canRenderTop && top) ? top : parent;

    const validateOrderPromise = createOrder().then(validateOrder);

    return window.paypal.Checkout.renderTo(renderWindow, {
        ...props,

        createOrder,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onError: window.xprops.onError,

        onApprove({ orderID, payerID, paymentID }) : ZalgoPromise<void> {
            const actions = buildExecuteActions(this, orderID);

            return window.xprops.onApprove({ orderID, payerID, paymentID }, actions).catch(err => {
                return window.xchild.error(err);
            });
        },

        onCancel: () : ZalgoPromise<void> => {
            return ZalgoPromise.try(() => {
                return createOrder();
            }).then(orderID => {
                return window.xprops.onCancel({ orderID });
            }).catch(err => {
                return window.xchild.error(err);
            });
        },

        onAuth: ({ accessToken }) : ZalgoPromise<void> => {
            return persistAccessToken(accessToken);
        },

        onClose: () => {
            checkoutOpen = false;
        },

        nonce: getNonce()

    }).then(checkout => {

        return validateOrderPromise.catch(err => {
            checkout.destroy();
            throw err;
        });
    });
}
