
// TODO: need to shim in a promise library for squid etc.

import { $Api } from 'squid-core/dist/api';
import { $promise } from 'squid-core/dist/promise';
import { $util } from 'squid-core/dist/util';

import { getAuth, getPayment, executePayment, getLocale } from './api';

let { Promise, config, Checkout } = window.paypal;

$promise.use(Promise);

function isLightboxEligible() {

    return getAuth().then(auth => {

        if (!$util.cookiesEnabled()) {
            return false;
        }

        if (auth.logged_in || auth.remembered || auth.refresh_token) {
            return true;
        }
    });
}

function determineLocale() {

    return Promise.try(() => {

        let userLocale = window.xprops.locale;

        if (userLocale) {
            let [ lang, country ] = userLocale.split('_');

            if (!config.locales[country]) {
                throw new Error(`Invalid country: ${country} for locale ${userLocale}`);
            }

            if (config.locales[country].indexOf(lang) === -1) {
                throw new Error(`Invalid language: ${lang} for locale ${userLocale}`);
            }

            return { lang, country };
        }

        return getLocale();
    });
}

function memoize(method) {

    let called = false;
    let result;

    function memoizeWrapper() {

        if (called) {
            return result;
        }

        called = true;
        result = method.apply(this, arguments);

        return result;
    }

    memoizeWrapper.reset = () => {
        called = false;
    };

    return memoizeWrapper;
}

function getActions(checkout, data, actions, intent) {

    let restartFlow = () => {
        return checkout.close().then(() => {
            return renderCheckout(data.paymentToken);
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

                if (data.intent) {

                    if (data.intent !== 'sale') {
                        throw new Error('Client side execute is only available for sale transactions');
                    }

                    return executePayment(data.paymentToken, data.payerID, restartFlow).finally(() => {
                        actions.payment.get.reset();
                    });
                }

                return actions.payment.get().then(payment => {

                    if (!payment || payment.intent !== 'sale') {
                        throw new Error('Client side execute is only available for sale transactions');
                    }

                    return executePayment(data.paymentToken, data.payerID, restartFlow).finally(() => {
                        actions.payment.get.reset();
                    });
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


function renderCheckout(paymentToken) {

    Checkout.renderTo(window.top, {

        payment: paymentToken || window.xprops.payment,
        billingAgreement: window.xprops.billingAgreement,

        locale: window.xprops.locale,
        commit: window.xprops.commit,

        onAuthorize(data, actions) {

            data = data || {};

            Object.defineProperty(data, 'payment', {
                __warning__: `Please call actions.payment.get() to get payment details`
            });

            return Promise.try(() => window.xprops.onAuthorize(data, getActions(this, data, actions)))
                .catch(err => {

                    if (window.console && window.console.error) {
                        window.console.error(err.stack);
                    }

                    throw err;
                });
        },

        onCancel(data, actions) {

            return Promise.try(() => window.xprops.onCancel(data, actions))
                .catch(err => {

                    if (window.console && window.console.error) {
                        window.console.error(err.stack);
                    }

                    throw err;
                });
        },

        onAuth(data) {
            $Api.addHeader('x-paypal-internal-euat', data.accessToken);
        }
    });
}

function setup() {

    isLightboxEligible().then(eligible => {

        Checkout.contexts.lightbox = !window.xprops.disableLightbox && eligible;
    });

    determineLocale().then(locale => {
        config.locale.country = locale.country;
        config.locale.lang = locale.lang;
    });


    let button = document.getElementById('buttonContainer').querySelector('button');

    button.addEventListener('click', event => {
        event.preventDefault();

        renderCheckout();

        if (window.xprops.onClick) {
            window.xprops.onClick();
        }
    });
}

setup();
