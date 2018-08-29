/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop } from 'belter';

import { getOrder, captureOrder, authorizeOrder, persistAccessToken, type OrderResponse } from './api';

type ActionsType = {
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        get : () => ZalgoPromise<OrderResponse>
    },
    restart : () => ZalgoPromise<void>
};

function enableLightbox() {
    window.paypal.client().Checkout.contexts.iframe = true;
}

type CheckoutComponent = {
    close : () => ZalgoPromise<void>
};

function buildActions(checkout : CheckoutComponent, orderID : string) : ActionsType {

    let restartFlow = memoize(() =>
        checkout.close().then(() => {
            enableLightbox();
            // eslint-disable-next-line no-use-before-define
            return renderCheckout({
                payment: () => ZalgoPromise.resolve(orderID)
            });
        }).then(() =>
            new ZalgoPromise(noop)
        )
    );

    let handleCaptureError = (err) => {
        if (err && err.message === 'CC_PROCESSOR_DECLINED') {
            return restartFlow();
        }

        if (err && err.message === 'INSTRUMENT_DECLINED') {
            return restartFlow();
        }

        throw new Error('Order could not be captured');
    };

    let orderGet = memoize(() => getOrder(orderID));

    let orderCapture = memoize(() =>
        captureOrder(orderID)
            .catch(handleCaptureError)
            .finally(orderGet.reset)
    );

    let orderAuthorize = memoize(() =>
        authorizeOrder(orderID)
            .catch(handleCaptureError)
            .finally(orderGet.reset)
    );

    return {
        order: {
            capture:    orderCapture,
            authorize:  orderAuthorize,
            get:        orderGet
        },
        restart: restartFlow
    };
}

export function renderCheckout(props : Object = {}) : ZalgoPromise<mixed> {

    let createOrder = memoize(window.xprops.createOrder);

    return window.paypal.client().Checkout.renderTo(window.top, {

        payment: createOrder,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onError: window.xprops.onError,

        onAuthorize({ orderID, payerID }) : ZalgoPromise<void> {
            let actions = buildActions(this, orderID);

            return window.xprops.onApprove({ orderID, payerID }, actions).catch(err => {
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

        ...props
    });
}
