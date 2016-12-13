
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import logger from 'beaver-logger/client';

import { Checkout } from '../components';
import { isLegacyEligible } from './eligibility';
import { config, ENV } from '../config';
import { setupBridge } from '../compat';
import { supportsPopups, getElements, once, checkpoint, safeJSON } from '../lib';
import { LOG_PREFIX } from './constants';
import { renderButtons, getHijackTargetElement } from './button';
import { normalizeLocale } from './common';
import { checkThrottle } from './throttle';
import { redirect, logRedirect, parseToken } from './util';

let $logger = logger.prefix(LOG_PREFIX);

export let checkout = {};

let ppApps = (window.paypal && window.paypal.apps) || (window.PAYPAL && window.PAYPAL.apps) || {};

export let apps = {
    ...ppApps,
    checkout,
    Checkout: checkout
};

export function reset() {

    $logger.debug('reset');

    // Once our callback has been called, we can set the global methods to their original values

    checkout.initXO    = initXO;    // eslint-disable-line
    checkout.startFlow = startFlow; // eslint-disable-line
    checkout.closeFlow = closeFlow; // eslint-disable-line
}

checkout.reset = reset;

Object.defineProperty(checkout, 'urlPrefix', {
    get() {
        return `${config.checkoutUrl}?token=`;
    }
});

if (window.xchild && !window.paypalCheckout) {
    window.paypalCheckout = window.xchild;
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
            url = `${config.checkoutUrl}${url}`;
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
        paymentToken = '';
    } else if (paymentToken) {
        $logger.debug(`startflow_with_token`, { item });
        url = getFullpageRedirectUrl(paymentToken);
    }

    let paypalUrls = config.paypalUrls;

    for (let env of Object.keys(paypalUrls)) {
        let paypalUrl = paypalUrls[env];

        if (env === ENV.TEST) {
            continue;
        }

        if (env !== config.env) {
            if (url.indexOf(paypalUrl) === 0 || url.indexOf(paypalUrl.replace('//www.', '//')) === 0) {
                $logger.warn(`mismatched_env_startflow_url`, { env: config.env, url });
                // throw new Error(`${url} is not a ${config.env} url`);
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

function awaitPaymentTokenAndUrl() {

    let paymentTokenAndUrl = new Promise((resolve, reject) => {

        checkout.initXO = () => {
            $logger.warn(`gettoken_initxo`);
        };

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        checkout.startFlow = once((item, opts) => {
            $logger.debug(`gettoken_startflow`, { item });

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

            if (!checkThrottle(paymentToken, true)) {
                $logger.warn(`throttle_failed_on_startflow`);
                return redirect(url);
            }

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
let closeFlowCalled = false;

function initPayPalCheckout(props = {}) {

    $logger.info(`init_checkout`);

    if (paypalCheckoutInited) {
        $logger.warn(`multiple_init_paypal_checkout`);
    }

    if (closeFlowCalled) {
        $logger.debug(`init_after_closeflow`);
    }

    paypalCheckoutInited = true;

    checkpoint('flow_start');

    let paymentToken;

    let paypalCheckout = Checkout.init({

        uid: window.pp_uid,

        init(data) {
            paymentToken = data.paymentToken;
        },

        onAuthorize(data, actions) {
            $logger.info(`payment_authorized`);
            logRedirect(data.returnUrl);
            return actions.redirect(window);
        },

        onCancel(data, actions) {
            $logger.info(`payment_canceled`);
            return actions.redirect(window);
        },

        onError(err) {
            $logger.error(`error_handler`, { error: err.stack || err.toString() });

            if (props.url) {
                $logger.debug(`error_handler_redir_url_prop`);
                return Promise.resolve(props.url).then(url => {
                    $logger.debug(`error_handler_redir_url_prop_success`, { url });
                    return redirect(url);
                });
            }

            if (paymentToken) {
                $logger.debug(`error_handler_redir_init_token`, { paymentToken });
                return redirect(getFullpageRedirectUrl(paymentToken));
            }

            if (props.payment) {
                $logger.debug(`error_handler_redir_token_prop`);
                return props.payment().then(payToken => {
                    $logger.debug(`error_handler_redir_token_prop_success`, { payToken });
                    redirect(getFullpageRedirectUrl(payToken));
                });
            }

            $logger.error(`error_handler_no_redirect_url`);
        },

        fallback(url) {
            $logger.error(`fallback_handler`);
            redirect(url);
        },

        ...props
    });

    checkout.closeFlow = (closeUrl) => {
        $logger.warn(`closeflow`);

        closeFlowCalled = true;

        reset();

        try {
            paypalCheckout.destroy();
        } catch (err) {
            $logger.warn(`destroy_error`, { error: err.stack || err.toString() });
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

    let paypalCheckout;

    if (hijackTarget) {

        let propUrl = props.url;
        delete props.url;

        paypalCheckout = initPayPalCheckout(props);

        paypalCheckout.hijack(hijackTarget);
        paypalCheckout.runTimeout();

        propUrl.then(url => {
            $logger.warn(`hijack_then_url_passed`);
            paypalCheckout.loadUrl(url);
        });

    } else {

        paypalCheckout = initPayPalCheckout(props);
    }

    let render = paypalCheckout.render(null, !hijackTarget);

    checkout.win = paypalCheckout.window;

    return render;
}


function handleClick(clickHandler, event) {
    $logger.debug(`button_click_handler`);

    try {
        clickHandler.call(null, event);
    } catch (err) {
        $logger.error(`click_handler_error`, { error: err.stack || err.toString() });
    }
}

function handleClickHijack(button) {

    let targetElement = getHijackTargetElement(button);

    if (!targetElement) {
        return;
    }

    $logger.info(`init_paypal_checkout_hijack`);

    let { url, paymentToken } = awaitPaymentTokenAndUrl();

    let token;

    paymentToken.then(result => {
        token = result;
    });

    renderPayPalCheckout({ url, payment: () => Promise.resolve(token) }, targetElement);
}



function listenClick(container, button, clickHandler, condition) {

    let element = (container.tagName.toLowerCase() === 'a') ? container : button;

    checkpoint('flow_listenclick');

    let isClick  = (clickHandler instanceof Function);

    if (element.hasAttribute('data-paypal-click-listener')) {
        return $logger.warn(`button_already_has_paypal_click_listener`);
    }

    element.setAttribute('data-paypal-click-listener', true);

    element.addEventListener('click', event => {

        checkpoint('flow_buttonclick');

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

        if (!isClick) {

            if (!isLegacyEligible()) {
                return $logger.debug(`ineligible_listenclick`);
            }

            if (!checkThrottle(null, true)) {
                return;
            }
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

    checkpoint('flow_setup');

    id = id || 'merchant';

    $logger.info(`setup`, {
        id,
        env: options.environment,
        options: safeJSON(options)
    });

    if (setupCalled) {
        $logger.debug(`setup_called_multiple_times`);
    }

    setupCalled = true;

    if (options.environment) {

        if (options.environment === 'live') {
            options.environment = ENV.PRODUCTION;
        }

        if (config.paypalUrls[options.environment]) {
            config.env = options.environment;
        } else {
            options.environment = config.env;
            $logger.warn('invalid_env', { badenv: options.environment });
        }
    }

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

        if (options.container) {
            $logger.warn(`button_and_container_passed`, { button: options.button, container: options.container });

            if (Array.isArray(options.button)) {
                options.button = options.button.concat(options.container);
            } else {
                options.button = [ options.button ].concat(options.container);
            }

            delete options.container;
        }

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

    return Promise.all([

        setupBridge(config.env),

        renderButtons(id, options).then(buttons => {
            buttons.forEach(button => {
                $logger.info(`listen_click_paypal_button`);
                listenClick(button.container, button.button, button.click, button.condition);
            });
        })
    ]);
}

checkout.setup = setup;

/*  Init XO
    -------

    Emulate paypal.checkout.initXO

    Normally this would be used only to open the checkout page. But here we can just kick off the whole flow, since
    getToken will handle loading the token into the window for us.
*/

function initXO() {

    $logger.debug(`initxo`);

    if (!isLegacyEligible()) {
        return $logger.debug(`ineligible_initxo`);
    }

    if (!checkThrottle()) {
        return;
    }

    let { url, paymentToken } = awaitPaymentTokenAndUrl();

    $logger.info(`init_paypal_checkout_initxo`);

    renderPayPalCheckout({ url, payment: () => paymentToken });
}

checkout.initXO = initXO;


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(item, opts) {
    $logger.debug(`startflow`, { item });

    if (opts) {
        $logger.warn(`startflow_with_options`, { opts: JSON.stringify(opts) });
    }

    let { paymentToken, url } = matchUrlAndPaymentToken(item);

    if (!isLegacyEligible(paymentToken)) {
        $logger.debug(`ineligible_startflow_global`, { url });
        return redirect(url);
    }

    if (!checkThrottle(paymentToken, true)) {
        return redirect(url);
    }

    $logger.info(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({ url, payment: () => paymentToken });
}

checkout.startFlow = startFlow;


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow(closeUrl) {
    $logger.warn(`closeflow_not_opened`);

    if (closeUrl) {
        $logger.warn(`closeflow_with_url`, { closeUrl });
        return redirect(closeUrl);
    }

    console.warn('Checkout is not open, can not be closed');
}

checkout.closeFlow = closeFlow;
