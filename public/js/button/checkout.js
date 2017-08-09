
let { Checkout, Promise } = window.paypal;

import { enableLightbox, detectLightboxEligibility } from './lightbox';
import { memoize } from './util';
import { getPayment, executePayment } from './api';
import { persistAccessToken } from './user';

function buildActions(checkout, data, actions, intent) {

    let restartFlow = () => {
        return checkout.close().then(() => {
            enableLightbox();
            renderCheckout({ payment: () => data.paymentToken });
            return new Promise();
        });
    };

    actions = {

        ...actions,

        payment: {

            execute: memoize(() => {

                checkout.closeComponent();

                if (!data.paymentID) {
                    throw new Error('Client side execute is only available for REST based transactions');
                }

                return executePayment(data.paymentID, data.payerID).finally(() => {
                    actions.payment.get.reset();

                }).catch(err => { // eslint-disable-line

                    // processor decline use case, we re-render the flow.

                    if (err && err.message === 'CC_PROCESSOR_DECLINED') {
                        return restartFlow();
                    }

                    if (err && err.message === 'INSTRUMENT_DECLINED') {
                        return restartFlow();
                    }

                    throw new Error('Payment could not be executed');
                });
            }),

            get: memoize(() => {

                if (!data.paymentID) {
                    throw new Error('Client side get is only available for REST based transactions');
                }

                return getPayment(data.paymentID);
            }),

            executeAndConfirm: () => {
                throw new Error('Not implemented');
            }
        },

        restart: restartFlow
    };

    return actions;
}


export function renderCheckout(props = {}) {

    Checkout.renderTo(window.top, {

        payment: window.xprops.payment,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onError: window.xprops.onError,

        onAuthorize(data, actions) {

            actions = buildActions(this, data, actions);

            return window.xprops.onAuthorize(data, actions).catch(err => {
                return window.xchild.error(err);
            });
        },

        onCancel(data, actions) {

            return window.xprops.onCancel(data, actions).catch(err => {
                return window.xchild.error(err);
            });
        },

        onAuth({ accessToken }) {
            persistAccessToken(accessToken);
            detectLightboxEligibility();
        },

        ...props
    });
}
