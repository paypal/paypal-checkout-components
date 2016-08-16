
import $logger from 'beaver-logger/client';

import { PayPalCheckout } from '../components';
import xcomponent from 'xcomponent/src';
import { isEligible } from './eligibility';
import { loadScript } from '../lib';
import { config } from '../config';

const PROD_BASE_URL = 'https://www.paypal.com/checkoutnow';
const BUTTON_JS_URL = '//www.paypalobjects.com/api/button.js';

let buttonJS;

/*  Global State
    ------------

    The legacy integration used global window.paypal.checkout.* methods which kept (essentially) global state
    regarding open windows, component, etc.

    Since we're emulating that integration, we have to store a little bit of global state, including the currently
    active component and any config that needs to be persisted from the setup() call.
*/

let env = 'production';

let LOG_PREFIX = `ppxo_legacy`;

function logDebug(event, payload = {}) {
    $logger.debug(`${LOG_PREFIX}_${event}`, payload);
}

function logInfo(event, payload = {}) {
    $logger.info(`${LOG_PREFIX}_${event}`, payload);
}

function logWarning(event, payload = {}) {
    $logger.warn(`${LOG_PREFIX}_${event}`, payload);
}

function logError(event, payload = {}) {
    $logger.error(`${LOG_PREFIX}_${event}`, payload);
}


function loadButtonJS() {

    if (buttonJS) {
        return buttonJS;
    }

    logDebug(`buttonjs_load`);

    buttonJS = loadScript(BUTTON_JS_URL);

    return buttonJS.then(result => {
        logDebug(`buttonjs_load_success`);
        return result;
    }).catch(err => {
        logError(`buttonjs_load_error`, { error: err.stack || err.toString() });
        throw err;
    });
}



function redirect(url) {
    logInfo(`redirect`, { url });
    window.location = url;
}


function matchToken(token) {
    return token && token.match(/^(EC-)?[A-Z0-9]{17}$/);
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
}


function getFullpageRedirectUrl(token) {
    let baseUrl = env && PayPalCheckout.envUrls[env] || PROD_BASE_URL;
    let url = matchToken(token) ? `${baseUrl}?token=${token}` : token;
    return url;
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

function getPaymentToken(resolve, reject) {

    function reset() {

        // Once our callback has been called, we can set the global methods to their original values

        window.paypal.checkout.initXO = initXO;
        window.paypal.checkout.startFlow = startFlow;
        window.paypal.checkout.closeFlow = closeFlow;
    }

    // We don't want initXO to do anything during this process. We've already opened the window so we're good to go.

    window.paypal.checkout.initXO = function() {
        logDebug(`paymenttoken_initxo`);
    };

    // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

    window.paypal.checkout.startFlow = (token) => {
        logDebug(`paymenttoken_startflow`, { token });

        reset();

        let ecToken = parseToken(token);

        if (!ecToken) {
            logError(`paymenttoken_startflow_notoken`, { token });
            throw new Error(`Expected "${token}" passed to window.paypal.checkout.startFlow to contain express-checkout payment token`);
        }

        if (!isEligible()) {
            logDebug(`paymenttoken_startflow_ineligible`, { token: ecToken });
            return redirect(getFullpageRedirectUrl(token));
        }

        if (matchToken(token)) {
            logDebug(`paymenttoken_startflow_tokenpassed`, { token });
        } else {
            logDebug(`paymenttoken_startflow_urlpassed`, { token });
            this.updateProps({
                url: token
            });
        }

        resolve(ecToken);
    };

    // closeFlow is our 'error' case - we can call our callback with an error

    window.paypal.checkout.closeFlow = () => {
        logWarning(`paymenttoken_closeflow`);

        reset();

        reject(new Error('Close Flow Called'));

        // We also want to close the component at this point, to preserve the original legacy behavior

        this.close();
    };
}


function renderButton(id, container, options) {

    let buttonDom = window.paypal.button.create(id, {
        lc:    options.locale || `${config.locale.lang}_${config.locale.country}`,
        color: options.color  || 'gold',
        shape: options.shape  || 'pill',
        size:  options.size   || 'small'
    }, {
        label: 'checkout',
        type: 'button'
    });

    document.getElementById(container).appendChild(buttonDom.el);

    handleClick(buttonDom.el.childNodes[0], options);
}


function renderButtons(id, options) {

    return loadButtonJS().then(() => {

        if (options.container) {

            if (options.container instanceof Array) {
                options.container.forEach(container => {
                    renderButton(id, container, options);
                });

            } else {
                renderButton(id, options.container, options);
            }
        }

        if (options.buttons instanceof Array) {

            options.buttons.forEach(button => {
                renderButton(id, button.container, button);
            });
        }
    });
}


function urlWillRedirectPage(url) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}


/*  Init PayPal Checkout
    --------------------

    Initialize the PayPalCheckout component with some standard props:

    - Pass in env from global state (saved during setup() call)
    - Return to success url on payment authorize
    - Return to cancel url on cancel
*/

function initPayPalCheckout(props = {}) {

    logInfo(`init_checkout`);

    PayPalCheckout.autocloseParentTemplate = false;

    return PayPalCheckout.init({

        env,

        paymentToken: getPaymentToken,

        onPaymentAuthorize({ returnUrl }) {

            logInfo(`payment_authorized`);

            if (!urlWillRedirectPage(returnUrl)) {
                this.closeParentTemplate();
            }

            return redirect(returnUrl);
        },

        onPaymentCancel({ cancelUrl }) {

            logInfo(`payment_canceled`);

            if (!urlWillRedirectPage(cancelUrl)) {
                logInfo(`hash_change_close_overlay`);
                this.closeParentTemplate();
            }

            return redirect(cancelUrl);
        },

        fallback(url) {
            logInfo(`fallback`, { url });
            redirect(url);
        },

        ...props
    });
}


function handleClick(button, options) {

    if (!isEligible()) {
        return;
    }

    button.addEventListener('click', event => {

        if (options.condition instanceof Function && !options.condition.call()) {
            logDebug(`button_click_condition_disabled`);
            return;
        }

        logInfo(`button_click`);

        if (options.click) {
            logDebug(`button_clickhandler`);

            event.preventDefault();
            initPayPalCheckout().render();
            options.click.call();

        } else {
            logDebug(`button_hijack`);

            initPayPalCheckout({
                paymentToken: xcomponent.CONSTANTS.PROP_DEFER_TO_URL
            }).renderHijack(button.form);
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
    logInfo(`setup`);

    env = options.environment;

    renderButtons(id, options);
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

    initPayPalCheckout().render();
}


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(token) {

    logDebug(`startflow`, { token });

    let ecToken = parseToken(token);

    if (!ecToken) {
        logWarning(`startflow_notoken`);
        throw new Error(`Expected "${token}" passed to window.paypal.checkout.startFlow to contain express-checkout payment token`);
    }

    if (!isEligible()) {
        logDebug(`startflow_ineligible`);
        return redirect(getFullpageRedirectUrl(token));
    }

    initPayPalCheckout({
        url: matchToken(token) ? null : token,
        paymentToken: ecToken
    }).render();
}


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow() {
    logDebug(`closeflow`);

    console.warn('Checkout is not open, can not be closed');
}



/*  On Document Ready
    -----------------

    Call the callback when the document is ready, or immediately if the document has already loaded
*/

let documentLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

function onDocumentReady(method) {

    if (documentLoaded) {
        return method();
    }

    return document.addEventListener('DOMContentLoaded', event => {
        documentLoaded = true;
        return method();
    });
}


/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

if (window.paypalCheckoutReady instanceof Function) {
    logDebug(`paypal_checkout_ready_passed`);
    onDocumentReady(() => {
        logDebug(`paypal_checkout_ready`);
        window.paypalCheckoutReady();
    });
}


/*  Scan for buttons
    ----------------

    Scan for any buttons on the page with a data-paypal-button attribute and auto-attach the PaypalCheckout component to them
*/

onDocumentReady(() => {

    if (!isEligible()) {
        return;
    }

    let buttons = Array.prototype.slice.call(document.querySelectorAll('[data-paypal-button]'));

    if (buttons && buttons.length) {
        logDebug(`data_paypal_button`, { number: buttons.length });
    }

    for (let button of buttons) {

        let buttonEnv = button.attributes['data-env'] && button.attributes['data-env'].value;

        if (!env && button.attributes['data-sandbox']) {
            buttonEnv = 'sandbox';
        }

        initPayPalCheckout({
            env: buttonEnv,
            paymentToken: xcomponent.CONSTANTS.PROP_DEFER_TO_URL
        }).hijackButton(button);
    }
});


/*  paypal.checkout
    ---------------

    Set paypal.checkout global functions to support legacy integrations
*/

window.paypal = window.paypal || {};
window.paypal.checkout = window.paypal.checkout || {};

window.paypal.checkout.setup = setup;
window.paypal.checkout.initXO = initXO;
window.paypal.checkout.startFlow = startFlow;
window.paypal.checkout.closeFlow = closeFlow;
