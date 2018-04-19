
import { enableLightbox, detectLightboxEligibility } from './lightbox';
import { memoize, noop, match, redirect as redir } from './util';
import { getPayment, executePayment, getOrder, captureOrder, mapToToken, getCheckoutAppData, getCheckoutCart } from './api';
import { persistAccessToken } from './user';

function buildActions(checkout, data, actions, intent) {

    let restartFlow = () => {
        return checkout.close().then(() => {
            enableLightbox();
            renderCheckout({ payment: () => data.paymentToken });
            return new window.paypal.Promise(noop);
        });
    };

    let handleExecuteError = (err) => {
        if (err && err.message === 'CC_PROCESSOR_DECLINED') {
            return restartFlow();
        }

        if (err && err.message === 'INSTRUMENT_DECLINED') {
            return restartFlow();
        }

        throw new Error('Payment could not be executed');
    };

    let paymentGet = memoize(() => {
        if (!data.paymentID) {
            throw new Error('Client side payment get is only available for REST based transactions');
        }

        return getPayment(data.paymentID);
    });

    let paymentExecute = memoize(() => {
        if (!data.paymentID) {
            throw new Error('Client side payment execute is only available for REST based transactions');
        }

        checkout.closeComponent();

        return executePayment(data.paymentID, data.payerID)
            .catch(handleExecuteError)
            .finally(paymentGet.reset);
    });

    let orderGet = memoize(() => {
        if (!data.orderID) {
            throw new Error('Client side order get is only available for REST based transactions');
        }

        return getOrder(data.orderID);
    });

    let orderCapture = memoize(() => {
        if (!data.orderID) {
            throw new Error('Client side order capture is only available for REST based transactions');
        }
        
        checkout.closeComponent();

        return captureOrder(data.orderID)
            .catch(handleExecuteError)
            .finally(orderGet.reset);
    });

    return {
        ...actions,
        payment: {
            execute: paymentExecute,
            get:     paymentGet
        },
        order: {
            capture: orderCapture,
            get:     orderGet
        },
        restart: restartFlow
    };
}

function buildCancelActions(checkout, data, actions) {

    let redirect = (win, url) => {
        return window.paypal.Promise.all([
            redir(win || window.top, url || data.cancelUrl),
            actions.close()
        ]);
    }; 
    
    return {
        ...actions,
        redirect
    };
}

function getCancelData(payment, data) {
    return window.paypal.Promise.try(() => {
        return data.paymentToken || payment().then(id => mapToToken(id));
    }).then(paymentToken => {
        return window.paypal.Promise.all([
            getCheckoutAppData(paymentToken),
            getCheckoutCart(paymentToken)
        ]).then(([ appData, cart ]) => {

            let paymentID = appData.payment_id;
            let cancelUrl = appData.urls.cancel_url;
            let intent = cart.payment_action;
            let billingID = paymentToken;
            let billingToken = match(cancelUrl, /ba_token=((BA-)?[A-Z0-9]+)/);

            return { paymentToken, paymentID, intent, billingID, billingToken, cancelUrl };
        });
    });
}


export function renderCheckout(props = {}) {

    let payment = memoize(window.xprops.payment);

    window.paypal.Checkout.renderTo(window.top, {

        payment,

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
            return window.paypal.Promise.try(() => {
                return getCancelData(payment, data);
            }).then(cancelData => {
                let cancelActions = buildCancelActions(this, cancelData, actions);
                return window.xprops.onCancel(cancelData, cancelActions);
            }).catch(err => {
                return window.xchild.error(err);
            });
        },

        onAuth({ accessToken }) {
            persistAccessToken(accessToken);
            detectLightboxEligibility();
        },

        style: {
            overlayColor: window.xprops.style.overlayColor
        },

        ...props
    }).catch(noop);
}
