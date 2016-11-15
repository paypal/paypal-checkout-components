
import xcomponent from 'xcomponent/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import logger from 'beaver-logger/client';

import { Checkout } from '../components';
import { isLegacyEligible } from './eligibility';
import { config } from '../config';
import { setupBridge } from '../compat';
import { supportsPopups, getElements, onDocumentReady, once } from '../lib';
import { LOG_PREFIX } from './constants';
import { renderButtons } from './button';
import { normalizeLocale } from './common';

let $logger = logger.prefix(LOG_PREFIX);

const REDIRECT_DELAY = 1;

let inClick = false;

let ifNotClickMethods = [];

function registerClick() {
    inClick = true;

    ifNotClickMethods = [];

    setTimeout(() => {
        inClick = false;
    }, 1);
}

onDocumentReady(() => {
    if (window.document && window.document.body) {
        window.document.body.addEventListener('click', function() {
            registerClick();
        });
    }
});

let ifNotClickTimeout;

function ifNotClick(method) {

    if (inClick) {
        return;
    }

    ifNotClickMethods.push(method);

    ifNotClickTimeout = ifNotClickTimeout || setTimeout(() => {
        ifNotClickTimeout = null;
        ifNotClickMethods.forEach(meth => meth());
        ifNotClickMethods = [];
    }, 1);
}



function before(method, wrapper) {
    return function() {
        wrapper();
        return method.apply(this, arguments);
    };
}

function getUrlPrefix() {
    return `${config.checkoutUrl}?token=`;
}



if (window.xchild && !window.paypalCheckout) {
    window.paypalCheckout = window.xchild;
}


let redirected = false;

function logRedirect(location) {

    if (redirected) {
        $logger.warn(`multiple_redirects`);
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

    $logger.flush();
}

function redirect(url) {

    logRedirect(url);

    reset();

    setTimeout(function() {
        $logger.info(`redirect`, { url });
        window.location = url;
    }, REDIRECT_DELAY);
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

    token = decodeURIComponent(decodeURIComponent(token));

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
        $logger.error(`startflow_no_url_or_token`, { item });
        throw new Error(`startflow_no_url_or_token`);
    }

    let paymentToken = item && parseToken(item);
    let url = (item && item !== paymentToken) ? item : null;

    if (url && !url.match(/^https?:\/\/|^\//)) {
        $logger.warn(`startflow_relative_url`, { url });

        if (url.toLowerCase().indexOf('ec-') === 0 && paymentToken) {
            url = `${getUrlPrefix()}${url}`;
        }
    }

    if (url && paymentToken) {

        if (url.indexOf('.paypal.com') !== -1) {
            $logger.debug(`startflow_paypalurl_with_token`, { item });
        } else {
            $logger.debug(`startflow_url_with_token`, { item });
        }

    } else if (url) {
        $logger.debug(`startflow_url_with_no_token`, { item });
        paymentToken = xcomponent.CONSTANTS.PROP_DEFER_TO_URL;
    } else if (paymentToken) {
        $logger.debug(`startflow_with_token`, { item });
        url = getFullpageRedirectUrl(paymentToken);
    }

    let paypalUrls = config.paypalUrls;

    for (let env of Object.keys(paypalUrls)) {
        let paypalUrl = paypalUrls[env];

        if (env === 'test') {
            continue;
        }

        if (env !== config.env) {
            if (url.indexOf(paypalUrl) === 0 || url.indexOf(paypalUrl.replace('//www.', '//')) === 0) {
                $logger.warn(`mismatched_env_startflow_url`, { env: config.env, url });
                throw new Error(`Env "${env}" does not match url ${url}`);
            }
        }
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

        window.paypal.checkout.initXO = () => {
            $logger.warn(`gettoken_initxo`);

            if (window.ppCheckpoint) {
                window.ppCheckpoint('flow_initxo');
            }
        };

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        window.paypal.checkout.startFlow = once((item, opts) => {
            $logger.debug(`gettoken_startflow`, { item });

            if (window.ppCheckpoint) {
                window.ppCheckpoint('flow_startflow');
            }

            if (opts) {
                $logger.warn(`startflow_with_options`, { opts: JSON.stringify(opts) });
            }

            let urlAndPaymentToken;

            try {
                urlAndPaymentToken = matchUrlAndPaymentToken(item);
            } catch (err) {
                return reject(err);
            }

            let { url, paymentToken } = urlAndPaymentToken;

            return resolve({ url, paymentToken });
        });
    });

    let url          = paymentTokenAndUrl.then(result => result.url);
    let paymentToken = paymentTokenAndUrl.then(result => result.paymentToken);

    return { url, paymentToken };
}


/*  Init PayPal Checkout
    --------------------

    Initialize the Checkout component with some standard props:

    - Pass in env from global state (saved during setup() call)
    - Return to success url on payment authorize
    - Return to cancel url on cancel
*/

let paypalCheckoutInited = false;

function initPayPalCheckout(props = {}) {

    $logger.info(`init_checkout`);

    if (paypalCheckoutInited) {
        $logger.warn(`multiple_init_paypal_checkout`);
    }

    if (!setupCalled) {
        $logger.warn(`init_without_setup`);
    }

    paypalCheckoutInited = true;

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_start');
    }

    let paypalCheckout = Checkout.init({

        uid: window.pp_uid,

        onAuthorize(data, actions) {

            $logger.info(`payment_authorized`);

            logRedirect(data.returnUrl);

            return Promise.delay(REDIRECT_DELAY).then(() => {
                return actions.redirect(window);
            });
        },

        onCancel(data, actions) {

            $logger.info(`payment_canceled`);

            return Promise.delay(REDIRECT_DELAY).then(() => {
                return actions.redirect(window);
            });
        },

        ...props
    });

    window.paypal.checkout.closeFlow = (closeUrl) => {
        $logger.warn(`closeflow`);

        reset();

        try {
            paypalCheckout.destroy();
        } catch (err) {
            console.error(err);
        }

        if (closeUrl) {
            $logger.warn(`closeflow_with_url`, { closeUrl });
            return redirect(closeUrl);
        }
    };

    return paypalCheckout;
}


function renderPayPalCheckout(props = {}, hijackTarget) {

    ifNotClick(() => {
        $logger.warn(`render_without_click`);
    });

    let paypalCheckout = initPayPalCheckout(props);

    if (hijackTarget) {

        paypalCheckout.hijack(hijackTarget);
        paypalCheckout.runTimeout();

        props.url.then(url => {
            paypalCheckout.loadUrl(url);
        });
    }

    let render = paypalCheckout.render(null, !hijackTarget).catch(err => {

        $logger.error(`error`, { error: err.stack || err.toString() });

        Promise.all([ props.url, props.payment ]).then(([ url, paymentToken ]) => {

            if (url) {
                return redirect(url);
            }

            if (paymentToken) {
                return redirect(getFullpageRedirectUrl(paymentToken));
            }
        });

        throw err;
    });

    checkout.win = paypalCheckout.window;

    return render;
}


function handleClick(clickHandler, event) {
    $logger.debug(`button_click_handler`);

    let initXOCalled = false;
    let startFlowCalled = false;
    let closeFlowCalled = false;

    window.paypal.checkout.initXO = before(window.paypal.checkout.initXO, () => {
        initXOCalled = true;
    });

    window.paypal.checkout.startFlow = before(window.paypal.checkout.startFlow, () => {
        startFlowCalled = true;
    });

    window.paypal.checkout.closeFlow = before(window.paypal.checkout.closeFlow, () => {
        closeFlowCalled = true;
    });

    try {
        if (clickHandler.toString().match(/^function\s*\w*\s*\(err(or)?\)\ *\{/)) {
            $logger.warn(`click_function_expects_err`);
            clickHandler.call(null);
        } else {
            clickHandler.call(null, event);
        }
    } catch (err) {
        $logger.error('click_handler_error', { error: err.stack || err.toString() });
    }

    if (!initXOCalled && !startFlowCalled && !closeFlowCalled) {
        $logger.debug(`button_click_handler_no_initxo_startflow`);

        setTimeout(() => {
            if (!initXOCalled && !startFlowCalled && !closeFlowCalled) {
                $logger.debug(`button_click_event_no_initxo_startflow`);
            }
        }, 1);
    }
}

function getHijackTargetElement(button) {

    if (button && button.form) {
        $logger.debug(`target_element_button_form`);
        return button.form;
    }

    if (button && button.tagName && button.tagName.toLowerCase() === 'a') {
        $logger.debug(`target_element_link`);
        return button;
    }

    if (button && button.tagName && (button.tagName.toLowerCase() === 'img' || button.tagName.toLowerCase() === 'button') && button.parentNode && button.parentNode.tagName.toLowerCase() === 'a') {
        $logger.debug(`target_element_parent_link`);
        return button.parentNode;
    }

    if (button && button.tagName && button.tagName.toLowerCase() === 'button' && button.parentNode && button.parentNode.parentNode && button.parentNode.parentNode.tagName.toLowerCase() === 'a') {
        $logger.debug(`target_element_parent_parent_link`);
        return button.parentNode.parentNode;
    }

    $logger.error(`target_element_not_found`);
}

function handleClickHijack(button) {

    let targetElement = getHijackTargetElement(button);

    if (!targetElement) {
        return;
    }

    $logger.info(`init_paypal_checkout_hijack`);

    let { url, paymentToken } = getPaymentTokenAndUrl();

    let token = xcomponent.CONSTANTS.PROP_DEFER_TO_URL;

    paymentToken.then(result => {
        token = result;
    });

    let payment = () => token;

    renderPayPalCheckout({ url, payment }, targetElement);
}



function listenClick(container, button, clickHandler, condition) {

    let element = (container.tagName.toLowerCase() === 'a') ? container : button;

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_listenclick');
    }

    let isClick  = (clickHandler instanceof Function);

    if (element.hasAttribute('data-paypal-click-listener')) {
        return $logger.warn(`button_already_has_paypal_click_listener`);
    }

    element.setAttribute('data-paypal-click-listener', true);

    element.addEventListener('click', event => {

        registerClick();

        if (window.ppCheckpoint) {
            window.ppCheckpoint('flow_buttonclick');
        }

        if (supportsPopups()) {
            $logger.debug(`click_popups_supported`);

            if (!isLegacyEligible()) {
                $logger.debug(`click_popups_supported_but_ineligible`);
            }
        } else {
            $logger.debug(`click_popups_not_supported`);

            if (isLegacyEligible()) {
                $logger.debug(`click_popups_not_supported_but_eligible`);
            }
        }

        if (!isLegacyEligible() && !isClick) {
            return $logger.debug(`ineligible_listenclick`);
        }

        $logger.info(`button_click`);

        if (condition instanceof Function) {
            if (condition.call()) {
                $logger.info(`button_click_condition_enabled`);
            } else {
                return $logger.info(`button_click_condition_disabled`);
            }
        }

        if (isClick) {
            return handleClick(clickHandler, event);

        } else {
            return handleClickHijack(button);
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

    $logger.info(`setup`, {
        id,
        env: options.environment,
        options: JSON.stringify(options, (key, val) => {

            if (typeof val === 'function') {
                return '<function>';
            }

            try {
                JSON.stringify(val);
            } catch (err) {
                return '<unserializable>';
            }

            return val;
        })
    });

    if (setupCalled) {
        console.warn(`setup_called_multiple_times`);
    }

    setupCalled = true;

    reset();

    if (options.environment) {

        if (options.environment === 'live') {
            options.environment = 'production';
        }

        if (config.paypalUrls[options.environment]) {
            config.env = options.environment;
        } else {
            options.environment = config.env;
            $logger.warn('invalid_env', { badenv: options.environment });
        }
    }

    setupBridge(config.env, config.bridgeUrl);

    if (options.locale) {
        config.locale = normalizeLocale(options.locale);
        config.customCountry = true;
    }

    if (options.buttons) {
        if (getElements(options.buttons).length) {
            options.button = options.buttons;
            delete options.buttons;
        }
    }

    if (options.button && options.button.length !== 0) {
        let buttonElements = getElements(options.button);

        if (buttonElements.length) {
            buttonElements.forEach(el => {
                $logger.info(`listen_click_custom_button`);
                listenClick(el, el, options.click, options.condition);
            });
        } else {
            $logger.warn(`button_element_not_found`, { element: JSON.stringify(options.button) });
        }
    }

    return renderButtons(id, options).then(buttons => {
        buttons.forEach(button => {
            $logger.info(`listen_click_paypal_button`);
            listenClick(button.container, button.button, button.click, button.condition);
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

    $logger.debug(`initxo`);

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_initxo');
    }

    if (!isLegacyEligible()) {
        return $logger.debug(`ineligible_initxo`);
    }

    reset();

    let { url, paymentToken } = getPaymentTokenAndUrl();

    $logger.info(`init_paypal_checkout_initxo`);

    renderPayPalCheckout({ url, payment: paymentToken });
}


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(item, opts) {
    $logger.debug(`startflow`, { item });

    if (window.ppCheckpoint) {
        window.ppCheckpoint('flow_startflow');
    }

    if (opts) {
        $logger.warn(`startflow_with_options`, { opts: JSON.stringify(opts) });
    }

    let { paymentToken, url } = matchUrlAndPaymentToken(item);

    if (!isLegacyEligible()) {
        $logger.debug(`ineligible_startflow_global`, { url });
        return redirect(url);
    }

    $logger.info(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({ url, payment: paymentToken });
}


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow(closeUrl) {
    $logger.warn(`closeflow`);

    if (closeUrl) {
        $logger.warn(`closeflow_with_url`, { closeUrl });
        return redirect(closeUrl);
    }

    console.warn('Checkout is not open, can not be closed');
}

export function reset() {

    $logger.debug('reset');

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
        $logger.debug(`data_paypal_button`, { number: buttons.length });

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

export let checkout = {
    setup,
    initXO,
    startFlow,
    closeFlow,
    reset,
    get urlPrefix() {
        return getUrlPrefix();
    }
};

export let apps = {
    checkout,
    Checkout: checkout
};

