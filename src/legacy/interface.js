
import xcomponent from 'xcomponent/src';
import $logger from 'beaver-logger/client';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { PayPalCheckout } from '../components';
import { isEligible } from './eligibility';
import { config } from '../config';
import { getMeta } from '../bridge';

import { urlWillRedirectPage, redirect as redir, onDocumentReady, getElements, once } from './util';
import { renderButtons } from './button';
import { logDebug, logInfo, logWarning, logError } from './log';

let redirected = false;

function redirect(location) {

    if (redirected) {
        logWarning(`multiple_redirects`);
    }

    redirected = true;

    if (window.ppCheckpoint) {
        if (location && location.match(/^https:\/\/www\.paypal\.com/)) {
            window.ppCheckpoint('flow_fullpage_redirect');
        } else if (location && (location.match(/PayerID=/) || location.match(/ba_token=/))) {
            window.ppCheckpoint('flow_complete');
        } else {
            window.ppCheckpoint('flow_cancel');
        }
    }

    setTimeout(function() {
        redir(location);
    }, 500);

    $logger.flush();
}

/*  Parse Token
    -----------

    We are passed either a token, or a url containing the token. In order to run the new checkout component we need to
    strip out the token from the url in order to pass it down as a prop
*/

function parseToken(token) {

    if (!token) {
        return;
    }

    // We may get lucky and be passed a token straight off the bar

    if (token.match(/^(EC-)?[A-Z0-9]{17}$/)) {
        return token;
    }

    // Otherwise strip the token from the url we're sent

    let match = token.match(/token=((EC-)?[A-Z0-9]{17})/);

    if (match) {
        return match[1];
    }

    match = token.match(/(EC-[A-Z0-9]{17})/);

    if (match) {
        return match[1];
    }
}


function getFullpageRedirectUrl(token) {

    if (!token) {
        throw new Error(`Can not get redirect url - token is blank`);
    }

    if (token.match(/^https?:\/\//)) {
        return token;
    }

    let ecToken = parseToken(token);

    if (!ecToken) {
        throw new Error(`Can not match token in ${token}`);
    }

    return `${config.checkoutUrl}?token=${ecToken}`;
}

function matchUrlAndPaymentToken(item) {

    if (!item || !item.trim()) {
        logError(`startflow_no_url_or_token`, { item });
        throw new Error(`startflow_no_url_or_token`);
    }

    let paymentToken = item && parseToken(item);
    let url = (item && item !== paymentToken) ? item : null;

    if (url && !url.match(/^https?:\/\/|^\//)) {
        logWarning(`startflow_relative_url`, { url });
    }

    if (url && paymentToken) {
        logDebug(`startflow_url_with_token`, { item });
    } else if (url) {
        logDebug(`startflow_url_with_no_token`, { item });
        paymentToken = xcomponent.CONSTANTS.PROP_DEFER_TO_URL;
    } else if (paymentToken) {
        logDebug(`startflow_with_token`, { item });
        url = getFullpageRedirectUrl(item);
    }

    return { paymentToken, url };
}


/*  Get Token
    ---------

    Normally in the component world, getToken would be a user-provided function which passes a callback, and expects
    that callback to be called with either an error, or an EC token.

    In our case, we can emulate these callback calls by setting over the startFlow and closeFlow globals, and using
    them as our success and failure cases.

    Note: this method is set to `precall: true` mode. This means that it will be called the moment the component is
    inited on the page. This means that the moment we initialize, we're ready to start accepting a token via one of the
    global methods.
*/

function getPaymentTokenAndUrl() {
    return new Promise((resolve, reject) => {

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        window.paypal.checkout.startFlow = once((item) => {
            logDebug(`gettoken_startflow`, { item });

            if (window.ppCheckpoint) {
                window.ppCheckpoint('flow_startflow');
            }

            return resolve(matchUrlAndPaymentToken(item));
        });
    });
}


/*  Init PayPal Checkout
    --------------------

    Initialize the PayPalCheckout component with some standard props:

    - Pass in env from global state (saved during setup() call)
    - Return to success url on payment authorize
    - Return to cancel url on cancel
*/

let paypalCheckoutInited = false;

function initPayPalCheckout(props = {}) {

    logInfo(`init_checkout`);

    if (paypalCheckoutInited) {
        logWarning(`multiple_init_paypal_checkout`);
    }

    paypalCheckoutInited = true;

    PayPalCheckout.autocloseParentTemplate = false;

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_start');
    }

    // We don't want initXO to do anything during this process. We've already opened the window so we're good to go.

    window.paypal.checkout.initXO = function() {
        logDebug(`paymenttoken_initxo`);
    };

    if (!props.paymentToken) {
        let paymentTokenAndUrl = getPaymentTokenAndUrl();

        props.paymentToken = paymentTokenAndUrl.then(result => result.paymentToken);

        if (!props.url) {
            props.url = paymentTokenAndUrl.then(result => result.url);
        }
    }

    if (!isEligible()) {

        props.url.then(url => {
            logDebug(`startflow_ineligible`, { url });

            return redirect(url);
        });

        return;
    }

    let paypalCheckout = PayPalCheckout.init({

        uid: window.pp_uid,

        onPaymentAuthorize({ returnUrl }) {

            reset();

            logInfo(`payment_authorized`);

            if (!urlWillRedirectPage(returnUrl)) {
                this.closeParentTemplate();
            }

            return redirect(returnUrl);
        },

        onPaymentCancel({ cancelUrl }) {

            reset();

            logInfo(`payment_canceled`);

            if (!urlWillRedirectPage(cancelUrl)) {
                logInfo(`hash_change_close_overlay`);
                this.closeParentTemplate();
            }

            return redirect(cancelUrl);
        },

        onError() {

            reset();
        },

        ...props
    });

    window.paypal.checkout.closeFlow = (closeUrl) => {
        logWarning(`closeflow`);

        reset();

        try {
            paypalCheckout.destroy(new Error(`closeFlow called`));
        } catch (err) {
            console.error(err);
        }

        if (closeUrl) {
            logWarning(`closeflow_with_url`, { closeUrl });
            return redirect(closeUrl);
        }
    };

    return paypalCheckout;
}


function renderPayPalCheckout(props = {}) {

    let paypalCheckout = initPayPalCheckout(props);

    if (paypalCheckout) {
        return paypalCheckout.render().catch(err => {

            logError(`error`, { error: err.stack || err.toString() });

            Promise.all([ props.url, props.paymentToken ]).then(([ url, paymentToken ]) => {

                if (url) {
                    return redirect(url);
                }

                if (paymentToken) {
                    return redirect(getFullpageRedirectUrl(paymentToken));
                }
            });

            throw err;
        });
    }
}


function triggerClickHandler(handler, event) {
    if (handler.toString().match(/^function\s*\w*\s*\(err(or)?\)\ *\{/)) {
        logWarning(`click_function_expects_err`);
        handler.call(null);
    } else {
        handler.call(null, event);
    }
}


function handleClick(button, env, clickHandler, condition) {

    button.addEventListener('click', event => {

        if (condition instanceof Function && !condition.call()) {
            logDebug(`button_click_condition_disabled`);
            return;
        }

        logInfo(`button_click`);

        if (clickHandler instanceof Function) {
            logDebug(`button_clickhandler`);

            let paymentTokenAndUrl = getPaymentTokenAndUrl();
            let url = paymentTokenAndUrl.then(result => result.url);
            let paymentToken = paymentTokenAndUrl.then(result => result.paymentToken);

            let paymentCancelled = false;

            window.paypal.checkout.initXO = () => {
                logDebug(`initxo_clickhandler`);
            };

            let _closeFlow = window.paypal.checkout.closeFlow;
            window.paypal.checkout.closeFlow = (closeUrl) => {
                logWarning(`closeflow_clickhandler`);

                if (closeUrl) {
                    logWarning(`closeflow_with_url`, { closeUrl });
                    return redirect(closeUrl);
                }

                paymentCancelled = true;

                reset();
            };

            triggerClickHandler(clickHandler, event);

            window.paypal.checkout.closeFlow = _closeFlow;

            if (paymentCancelled) {
                return;
            }

            logInfo(`init_paypal_checkout_click`);

            renderPayPalCheckout({ env, url, paymentToken });

        } else {

            if (!isEligible()) {
                return;
            }

            logDebug(`button_hijack`);

            let targetElement;

            if (button && button.form) {
                targetElement = button.form;
            } else if (button && button.tagName && button.tagName.toLowerCase() === 'a') {
                targetElement = button;
            } else if (button && button.tagName && (button.tagName.toLowerCase() === 'img' || button.tagName.toLowerCase() === 'button') && button.parentNode.tagName.toLowerCase() === 'a') {
                targetElement = button.parentNode;
            } else if (button && button.tagName && button.tagName.toLowerCase() === 'button' && button.parentNode.parentNode.tagName.toLowerCase() === 'a') {
                targetElement = button.parentNode.parentNode;
            } else if (this && this.hasOwnProperty('target') && typeof this.target !== 'undefined') { // not sure what this use case is
                targetElement = this; // eslint-disable-line
            }

            if (!targetElement) {
                logError(`no_target_element`);
                throw new Error(`Can not find element to hijack target for button click`);
            }

            logInfo(`init_paypal_checkout_hijack`);

            initPayPalCheckout({
                env,
                paymentToken: xcomponent.CONSTANTS.PROP_DEFER_TO_URL
            }).renderHijack(targetElement);
        }
    });
}


/*  Setup
    -----

    Emulate window.paypal.checkout.setup.

    The purpose of this method is to:

    - Set up configuration for the incontext flow
    - Render a button to initiate the checkout window
*/

function setup(id, options = {}) {

    logInfo(`setup`, {
        env: options.environment,
        options: JSON.stringify(options)
    });

    if (window.I10C) {
        logInfo(`instart`);
    }

    if (config.paypalUrls[options.environment]) {
        if (config.env !== options.environment) {
            config.env = options.environment;

        }
    } else {
        options.environment = config.env;
    }

    if (options.locale) {
        let [ lang, country ] = options.locale.split('_');

        getMeta.then(() => {

            if (config.locales[country]) {
                config.locale.country = country;

                if (config.locales[country].indexOf(lang) !== -1) {
                    config.locale.lang = lang;
                } else {
                    logWarning(`invalid_user_lang`, { country, lang, def: config.locales[country][0] });
                    config.locale.lang = config.locales[country][0];
                }

            } else if (config.locales.US[country]) {
                config.locale.country = 'US';
                config.locale.lang = country;

            } else {
                logWarning(`invalid_user_country`, { country });
            }
        });
    }

    if (options.buttons) {
        if (getElements(options.buttons).length) {
            options.button = options.buttons;
            delete options.buttons;
        } else {
            let buttons = options.buttons.map(item => item && item.button);
            if (getElements(buttons).length) {
                options.button = buttons;
                delete options.buttons;
            }
        }
    }

    if (options.button && options.button.length !== 0) {
        let buttonElements = getElements(options.button);

        if (buttonElements.length) {
            buttonElements.forEach(el => {
                logInfo(`listen_click_custom_button`);
                handleClick(el, options.environment, options.click, options.condition);
            });
        } else {
            logWarning(`button_element_not_found`, { element: JSON.stringify(options.button) });
        }
    }

    return renderButtons(id, options).then(buttons => {
        buttons.forEach(button => {
            logInfo(`listen_click_paypal_button`);
            handleClick(button.el, options.environment, button.click, button.condition);
        });
    });
}


/*  Init XO
    -------

    Emulate paypal.checkout.initXO

    Normally this would be used only to open the checkout page. But here we can just kick off the whole flow, since
    getToken will handle loading the token into the window for us.
*/

function initXO() {

    logDebug(`initxo`);

    if (!isEligible()) {
        return;
    }

    logInfo(`init_paypal_checkout_initxo`);

    renderPayPalCheckout();
}


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(item) {
    logDebug(`startflow`, { item });

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_startflow');
    }

    let { paymentToken, url } = matchUrlAndPaymentToken(item);

    logInfo(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({
        url:          Promise.resolve(url),
        paymentToken: Promise.resolve(paymentToken)
    });
}


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow(closeUrl) {
    logWarning(`closeflow`);

    if (closeUrl) {
        logWarning(`closeflow_with_url`, { closeUrl });
        return redirect(closeUrl);
    }

    console.warn('Checkout is not open, can not be closed');
}

function reset() {

    // Once our callback has been called, we can set the global methods to their original values

    window.paypal.checkout.initXO    = initXO;
    window.paypal.checkout.startFlow = startFlow;
    window.paypal.checkout.closeFlow = closeFlow;
}


/*  Scan for buttons
    ----------------

    Scan for any buttons on the page with a data-paypal-button attribute and auto-attach the PaypalCheckout component to them
*/

onDocumentReady(() => {

    let buttons = Array.prototype.slice.call(document.querySelectorAll('[data-paypal-button]'));

    if (buttons && buttons.length) {
        logDebug(`data_paypal_button`, { number: buttons.length });

        for (let button of buttons) {

            let id = button.getAttribute('data-paypal-id');

            let environment;

            if (button.hasAttribute('data-env')) {
                environment = button.getAttribute('data-env');
            } else if (button.hasAttribute('data-sandbox')) {
                environment = 'sandbox';
            }

            setup(id, { environment, button });
        }
    }

    // Show hidden buttons

    Array.prototype.slice.call(document.getElementsByClassName('paypal-button-hidden')).forEach(el => {
        el.className = el.className.replace('paypal-button-hidden', '');
    });
});


/*  paypal.checkout
    ---------------

    Set paypal.checkout global functions to support legacy integrations
*/

if (window.paypal) {
    logWarning(`window_paypal_exists`);
}

window.paypal = window.paypal || {};
window.paypal.checkout = window.paypal.checkout || {};

if (window.paypal.checkout.setup) {
    console.error('Error: window.paypal.checkout already exists. You may have inserted the checkout.js script more than once. Ignoring further attempts to assign to window.paypal.checkout.');
} else {

    window.paypal.checkout.setup = setup;
    window.paypal.checkout.initXO = initXO;
    window.paypal.checkout.startFlow = startFlow;
    window.paypal.checkout.closeFlow = closeFlow;

    window.paypal.checkout.urlPrefix = `${config.checkoutUrl}?token=`;

    window.paypal.checkout.events = {
        on(name) {
            logError(`eventing_unsupported`, { name });
        }
    };

    window.PAYPAL = window.PAYPAL || {};
    window.PAYPAL.checkout = window.paypal.checkout;
    window.PAYPAL.apps = window.PAYPAL.apps || {};
    window.PAYPAL.apps.checkout = window.paypal.checkout;
}


/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

if (window.paypalCheckoutReady instanceof Function) {
    logDebug(`paypal_checkout_ready_passed`);
    let paypalCheckoutReady = window.paypalCheckoutReady;
    onDocumentReady(() => {
        logDebug(`paypal_checkout_ready`);
        paypalCheckoutReady();
    });
}

try {
    delete window.paypalCheckoutReady;

    Object.defineProperty(window, 'paypalCheckoutReady', {
        set(method) {
            onDocumentReady(() => {
                logDebug(`paypal_checkout_ready_setter`);
                method.call(window);
            });
        }
    });
} catch (err) {
    logError('paypal_checkout_ready_setter_error', { error: err.stack || err.toString() });
}
