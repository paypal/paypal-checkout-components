
import xcomponent from 'xcomponent/src';
import $logger from 'beaver-logger/client';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { PayPalCheckout } from '../components';
import { isICEligible } from './eligibility';
import { config } from '../config';
import { setupBridge } from '../bridge';

import { urlWillRedirectPage, redirect as redir, onDocumentReady, getElements, once } from './util';
import { renderButtons } from './button';
import { logDebug, logInfo, logWarning, logError } from './log';


if (window.xchild && !window.paypalCheckout) {
    window.paypalCheckout = window.xchild;
}


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

    let paymentTokenAndUrl = new Promise((resolve, reject) => {

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        window.paypal.checkout.startFlow = once((item, opts) => {
            logDebug(`gettoken_startflow`, { item });

            if (window.ppCheckpoint) {
                window.ppCheckpoint('flow_startflow');
            }

            if (opts) {
                logWarning(`startflow_with_options`, { opts: JSON.stringify(opts) });
            }

            return resolve(matchUrlAndPaymentToken(item));
        });
    });

    let url          = paymentTokenAndUrl.then(result => result.url);
    let paymentToken = paymentTokenAndUrl.then(result => result.paymentToken);

    return { url, paymentToken };
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


function triggerClickHandler(handler, event) {
    if (handler.toString().match(/^function\s*\w*\s*\(err(or)?\)\ *\{/)) {
        logWarning(`click_function_expects_err`);
        handler.call(null);
    } else {
        handler.call(null, event);
    }
}


function handleClick(env, clickHandler, event) {
    logDebug(`button_click_handler`);

    let { url, paymentToken } = getPaymentTokenAndUrl();

    if (!isICEligible()) {

        url.then(redirectUrl => {
            logDebug(`ineligible_startflow`, { url: redirectUrl });
            return redirect(redirectUrl);
        });

        return triggerClickHandler(clickHandler, event);
    }

    let paymentCancelled = false;

    window.paypal.checkout.initXO = () => {
        logDebug(`initxo_clickhandler`);

        if (window.ppCheckpoint) {
            window.ppCheckpoint('flow_initxo');
        }
    };

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

    if (paymentCancelled) {
        return;
    }

    logInfo(`init_paypal_checkout_click`);

    renderPayPalCheckout({ env, url, paymentToken });
}


function handleClickHijack(env, button) {
    logDebug(`button_click_hijack`);

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
        return;
    }

    logInfo(`init_paypal_checkout_hijack`);

    let paypalCheckout = initPayPalCheckout({
        env,
        paymentToken: xcomponent.CONSTANTS.PROP_DEFER_TO_URL
    });

    paypalCheckout.renderHijack(targetElement);
}



function listenClick(env, button, clickHandler, condition) {

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_listenclick');
    }

    let isClick  = (clickHandler instanceof Function);

    if (!isICEligible() && !isClick) {
        return logDebug(`ineligible_listenclick`);
    }

    if (button.hasAttribute('data-paypal-click-listener')) {
        return logWarning(`button_already_has_paypal_click_listener`);
    }

    button.setAttribute('data-paypal-click-listener', true);

    if (!isEligible() && !isClick) {

        button.addEventListener('click', event => {
            if (window.ppCheckpoint) {
                window.ppCheckpoint('flow_buttonclick');
            }
        });

        return logDebug(`ineligible_listenclick`);
    }

    button.addEventListener('click', event => {

        if (window.ppCheckpoint) {
            window.ppCheckpoint('flow_buttonclick');
        }

        logInfo(`button_click`);

        if (condition instanceof Function) {
            if (condition.call()) {
                logInfo(`button_click_condition_enabled`);
            } else {
                return logInfo(`button_click_condition_disabled`);
            }
        }

        if (isClick) {
            return handleClick(env, clickHandler, event);

        } else {
            return handleClickHijack(env, button);
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

let setupCalled = false;

function setup(id, options = {}) {

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_setup');
    }

    id = id || 'merchant';

    logInfo(`setup`, {
        id,
        env: options.environment,
        options: JSON.stringify(options, (key, val) => {
            if (val instanceof Function) {
                return '<function>';
            }
            return val;
        })
    });

    if (setupCalled) {
        console.warn(`setup_called_multiple_times`);
    }

    setupCalled = true;

    reset();

    if (window.I10C) {
        logInfo(`instart`);
    }

    if (config.paypalUrls[options.environment]) {
        if (options.environment !== config.env) {
            config.env = options.environment;
            setupBridge(config.env, config.bridgeUrl);
        }
    } else {
        options.environment = config.env;
    }

    if (options.locale) {
        let [ lang, country ] = options.locale.split('_');

        config.customCountry = true;

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
                listenClick(options.environment, el, options.click, options.condition);
            });
        } else {
            logWarning(`button_element_not_found`, { element: JSON.stringify(options.button) });
        }
    }

    return renderButtons(id, options).then(buttons => {
        buttons.forEach(button => {
            logInfo(`listen_click_paypal_button`);
            listenClick(options.environment, button.el, button.click, button.condition);
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

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_initxo');
    }

    if (!isICEligible()) {
        return logDebug(`ineligible_initxo`);
    }

    reset();

    let { url, paymentToken } = getPaymentTokenAndUrl();

    logInfo(`init_paypal_checkout_initxo`);

    renderPayPalCheckout({ url, paymentToken });
}


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(item, opts) {
    logDebug(`startflow`, { item });

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_startflow');
    }

    if (opts) {
        logWarning(`startflow_with_options`, { opts: JSON.stringify(opts) });
    }

    let { paymentToken, url } = matchUrlAndPaymentToken(item);

    if (!isICEligible()) {
        logDebug(`ineligible_startflow_global`, { url });
        return redirect(url);
    }

    logInfo(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({ url, paymentToken });
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
    window.PAYPAL.apps.Checkout = window.paypal.checkout;
}


/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

let readyCalled = false;

function invokeReady(method) {

    if (readyCalled) {
        logWarning(`ready_called_multiple_times`);
    }

    if (setupCalled) {
        logWarning(`ready_called_after_setup`);
    }

    readyCalled = true;

    onDocumentReady(() => {
        logDebug(`paypal_checkout_ready`);
        method();
    });
}


if (window.paypalCheckoutReady instanceof Function) {
    logDebug(`paypal_checkout_ready_preset`);
    invokeReady(window.paypalCheckoutReady);
}

try {
    delete window.paypalCheckoutReady;

    Object.defineProperty(window, 'paypalCheckoutReady', {

        set(method) {
            logDebug(`paypal_checkout_ready_setter`);
            invokeReady(method);
        },

        get() {
            logWarning(`paypal_checkout_ready_getter`);
        }
    });
} catch (err) {
    logWarning('paypal_checkout_ready_setter_error', { error: err.stack || err.toString() });
}
