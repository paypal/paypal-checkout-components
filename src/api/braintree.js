
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { loadScript, memoize, noop } from '../lib/util';
import { config } from '../config';

function getTokenFromUrl(url) {
    let match = url.match(/token=((EC-)?[A-Z0-9]{17})/);

    if (match) {
        return match[1];
    }

    throw new Error(`Could not find token in approval url: ${url}`);
}

let loadBraintree = memoize(() => {

    let promises = [];

    if (window.braintree) {
        config.braintree_version = window.braintree.client.VERSION;
    } else {
        promises.push(loadScript(config.urls.braintree_client));
    }

    if (!window.braintree || !window.braintree.paypal) {
        promises.push(loadScript(config.urls.braintree_paypal));
    }

    return Promise.all(promises).then(() => {
        return window.braintree;
    });
});

let getClient = memoize(authorization => {

    return loadBraintree().then(braintree => {
        return new Promise((resolve, reject) => {

            return braintree.client.create({ authorization }, (err, client) => {

                if (err) {
                    return reject(err);
                }

                braintree.paypal.create({ client }, (err2, paypal) => {

                    if (err2) {
                        return reject(err2);
                    }

                    return resolve(paypal);
                });
            });
        });
    });

});

let paymentTokenToOptions = {};

export function createBraintreePayment(authorization, options) {

    return getClient(authorization).then(paypal => {
        return new Promise((resolve, reject) => {

            paypal._frameService.open = noop;

            paypal._frameService.redirect = function(url) {
                let token = getTokenFromUrl(url);

                paymentTokenToOptions[token] = options;

                return resolve(token);
            };

            paypal.tokenize(options, (err, result) => {

                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    });
}

export function tokenizeBraintreePayment(authorization, { paymentToken, payerID, paymentID, returnUrl }) {

    let options = paymentTokenToOptions[paymentToken];

    return getClient(authorization).then(paypal => {
        return new Promise((resolve, reject) => {

            let channel = returnUrl.match(/channel=([^&]+)/)[1];

            paypal._tokenizePayPal(options, {

                channel,
                token:     paymentToken,
                PayerID:   payerID,
                paymentId: paymentID

            }, (err, result) => {

                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    });
}

export let braintree = {
    payment: {
        create:   createBraintreePayment,
        tokenize: tokenizeBraintreePayment
    }
};
