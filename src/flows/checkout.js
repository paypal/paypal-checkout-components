/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups, once } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { getParent, getTop } from 'cross-domain-utils/src';

import { persistAccessToken, type OrderResponse } from '../api';
import { CONTEXT, TARGET_ELEMENT } from '../constants';
import { getNonce } from '../util';
import { buildApproveActions, buildShippingChangeActions } from '../orders';

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
    checkoutOpen = false;

    const [ parent, top ] = [ getParent(window), getTop(window) ];

    const tasks = {};

    if (top && parent && parent !== top) {
        tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }

    return ZalgoPromise.hash(tasks).then(noop);
}

export function getDefaultContext() : $Values<typeof CONTEXT> {
    return supportsPopups() ? CONTEXT.POPUP : CONTEXT.IFRAME;
}

type CheckoutPropsOverride = {|
    createOrder : () => ZalgoPromise<string>,
    fundingSource : $Values<typeof FUNDING>,
    card? : ?$Values<typeof CARD>,
    window? : ?Object,
    validationPromise? : ZalgoPromise<boolean>,
    buyerCountry : $Values<typeof COUNTRY>,
    context? : $Values<typeof CONTEXT>
|};

type CheckoutInstance = {|
    start : () => ZalgoPromise<mixed>,
    close : () => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>
|};

export function initCheckout(props : CheckoutPropsOverride) : CheckoutInstance {
    
    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const {
        context,
        createOrder,
        fundingSource,
        validationPromise = ZalgoPromise.resolve(true),
        buyerCountry
    } = props;

    const restart = memoize(() : ZalgoPromise<OrderResponse> => {
        return ZalgoPromise.try(() => {
            // eslint-disable-next-line no-use-before-define
            return instance.close();
        }).then(() => {
            return initCheckout({
                fundingSource,
                createOrder,
                buyerCountry,
                context: CONTEXT.IFRAME
            }).start();
        }).catch(noop).then(() => {
            return new ZalgoPromise(noop);
        });
    });

    let approved = false;
    const onApprove = ({ orderID, payerID, paymentID, billingToken }) => {
        approved = true;

        const actions = {
            restart,
            ...buildApproveActions(orderID, fundingSource, restart)
        };

        return window.xprops.onApprove({ orderID, payerID, paymentID, billingToken }, actions).catch(err => {
            return window.xprops.onError(err);
        });
    };

    const onCancel = once(() => {
        return ZalgoPromise.try(() => {
            if (approved) {
                return false;
            }

            return validationPromise;

        }).then(valid => {

            if (!valid) {
                return;
            }
            
            return createOrder().then(orderID => {
                return window.xprops.onCancel({ orderID });
            }).catch(err => {
                return window.xprops.onError(err);
            });
        });
    });

    const onAuth = ({ accessToken }) : ZalgoPromise<void> => {
        return persistAccessToken(accessToken);
    };

    const onClose = () => {
        checkoutOpen = false;
        return onCancel();
    };

    const onShippingChange = window.xprops.onShippingChange
        && ((data, actions) => {
            return window.xprops.onShippingChange(data, {
                ...actions,
                ...buildShippingChangeActions(data.orderID)
            });
        });

    const nonce = getNonce();
    const { locale, commit, onError } = window.xprops;

    const instance = window.paypal.Checkout({
        ...props,

        onApprove,
        onCancel,
        onError,
        onAuth,
        onClose,
        onShippingChange,

        buyerCountry,
        locale,
        commit,
        nonce
    });

    checkoutOpen = true;
    const renderPromise = instance.renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, context);

    return {
        start:   () => renderPromise,
        close:   () => instance.close(),
        onError: (err) => instance.onError(err)
    };
}
