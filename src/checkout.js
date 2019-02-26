/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';
import { getParent, getTop } from 'cross-domain-utils/src';

import { getOrder, captureOrder, authorizeOrder, patchOrder, persistAccessToken, billingTokenToOrderID, callGraphQL, type OrderResponse } from './api';
import { ORDER_API_ERROR, ORDER_ID_PATTERN, ERROR_URL, CONTEXT, TARGET_ELEMENT } from './constants';

type ActionsType = {|
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        patch : () => ZalgoPromise<OrderResponse>,
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

function buildShippingChangeActions(orderID : string) : ShippingChangeActionsType {

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    return {
        order: { patch }
    };
}

function buildApproveActions(checkout : CheckoutComponent, orderID : string) : ActionsType {

    const restart = memoize(() : ZalgoPromise<OrderResponse> =>
        checkout.close().then(() => {
            // eslint-disable-next-line no-use-before-define
            return renderCheckout({
                createOrder: () => ZalgoPromise.resolve(orderID)
            }, 'iframe');
        }).catch(noop).then(() => new ZalgoPromise(noop)));

    const handleProcessorError = (err : mixed) : ZalgoPromise<OrderResponse> => {
        if (err && err.message === ORDER_API_ERROR.CC_PROCESSOR_DECLINED) {
            return restart();
        }

        if (err && err.message === ORDER_API_ERROR.INSTRUMENT_DECLINED) {
            return restart();
        }

        throw new Error('Order could not be captured');
    };

    const get = memoize(() =>
        getOrder(orderID));

    const capture = memoize(() => {
        if (window.xprops.intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return captureOrder(orderID)
            .catch(handleProcessorError)
            .finally(get.reset);
    });

    const authorize = memoize(() =>
        authorizeOrder(orderID)
            .catch(handleProcessorError)
            .finally(get.reset));

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    return {
        restart,
        order: { capture, authorize, patch, get }
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

function getRenderWindow() : Object {
    const top = getTop(window);
    if (canRenderTop && top) {
        return top;
    } else {
        return window.xprops.getParent();
    }
}

export function setupCheckout() : ZalgoPromise<void> {
    const [ parent, top ] = [ getParent(window), getTop(window) ];

    const tasks = {};

    if (top && parent && parent !== top) {
        tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }

    return ZalgoPromise.hash(tasks).then(noop);
}

function getCreateOrder(props : Object = {}, validationPromise : ZalgoPromise<boolean>) : () => ZalgoPromise<string> {
    return memoize(() => {
        return validationPromise.then(valid => {
            if (!valid) {
                return new ZalgoPromise(noop);
            } else if (props.createOrder) {
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

export function getDefaultContext() : string {
    return supportsPopups() ? CONTEXT.POPUP : CONTEXT.IFRAME;
}

export function renderCheckout(
    props : Object = {},
    context : string = getDefaultContext(),
    validationPromise? : ZalgoPromise<boolean> = ZalgoPromise.resolve(true)
) : ZalgoPromise<mixed> {
    
    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const orderCreate = getCreateOrder(props, validationPromise);

    const instance = window.paypal.Checkout({
        ...props,
        
        createOrder: orderCreate,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onError: window.xprops.onError,

        onApprove({ orderID, payerID, paymentID, billingToken }) : ZalgoPromise<void> {
            const actions = buildApproveActions(this, orderID);

            return window.xprops.onApprove({ orderID, payerID, paymentID, billingToken }, actions).catch(err => {
                return window.xprops.onError(err);
            });
        },

        onCancel: () : ZalgoPromise<void> => {
            return ZalgoPromise.try(() => {
                return orderCreate();
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

        onShippingChange: window.xprops.onShippingChange
            ? (data, actions) => {
                return window.xprops.onShippingChange(data, {
                    ...actions,
                    ...buildShippingChangeActions(data.orderID)
                });
            } : null,

        nonce: getNonce()
    });

    orderCreate().then(validateOrder).catch(err => {
        return ZalgoPromise.all([
            instance.close(),
            instance.onError(err)
        ]);
    });

    validationPromise.then(valid => {
        if (!valid) {
            instance.close();
        }
    });
    
    return instance.renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, context);
}
