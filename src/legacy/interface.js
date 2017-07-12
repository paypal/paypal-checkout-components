/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import * as logger from 'beaver-logger/client';

import { Checkout } from '../components';
import { isLegacyEligible } from './eligibility';
import { config, ENV, FPTI } from '../config';
import { setupPostBridge } from './postBridge';
import { supportsPopups, once, safeJSON, extendUrl } from '../lib';
import { LOG_PREFIX } from './constants';
import { renderButtons, getHijackTargetElement } from './button';
import { redirect, logRedirect, parseToken } from './util';
import { onAuthorizeListener } from './listener';
import { normalizeOptions, setupConfig } from './options';

let $logger = logger.prefix(LOG_PREFIX);

export let checkout = {};
export let apps = { checkout, Checkout: checkout };

export function reset() {

    $logger.debug('reset');

    // Once our callback has been called, we can set the global methods to their original values

    checkout.initXO    = initXO;    // eslint-disable-line
    checkout.startFlow = startFlow; // eslint-disable-line
    checkout.closeFlow = closeFlow; // eslint-disable-line
}

checkout.reset = reset;

// $FlowFixMe
Object.defineProperty(checkout, 'urlPrefix', {
    get() : string {
        return `${config.checkoutUrl}${ config.checkoutUrl.indexOf('?') === -1 ? '?' : '&' }token=`;
    }
});

if (window.xchild && !window.paypalCheckout) {
    window.paypalCheckout = window.xchild;
}

function matchUrlAndPaymentToken(item) : { url : string, paymentToken : ?string } {

    if (!item || !item.trim()) {
        $logger.error(`startflow_no_url_or_token`, { item });
        throw new Error(`startflow_no_url_or_token`);
    }


    let paymentToken = parseToken(item);
    let url = (paymentToken && paymentToken === item) ? '' : item;

    if (url) {

        if (!url.match(/^https?:\/\/|^\//)) {
            if (paymentToken) {
                $logger.info(`startflow_relative_url_with_token`, {url});
            } else {
                $logger.info(`startflow_relative_url_no_token`, {url});
            }

            if (url.toLowerCase().indexOf('ec-') === 0 && paymentToken) {
                url = `${config.checkoutUrl}${url}`;
            }

        } else if (paymentToken) {
            if (url.indexOf('.paypal.com') !== -1) {
                $logger.debug(`startflow_paypalurl_with_token`, { url });
            } else {
                $logger.debug(`startflow_url_with_token`, { url });
            }

        } else {
            $logger.debug(`startflow_url_no_token`, { url });
        }

    } else {

        if (paymentToken) {
            url = extendUrl(config.checkoutUrl, { token: paymentToken });
            $logger.debug(`startflow_with_token`, { url });
        } else {
            $logger.error(`startflow_no_url_or_token`, { url });
            throw new Error(`Could not determine url or token from "${item}"`);
        }
    }

    return { paymentToken, url };
}

function checkUrlAgainstEnv(url : string) {

    let paypalUrls = config.paypalUrls;

    for (let env of Object.keys(paypalUrls)) {
        let paypalUrl = paypalUrls[env];

        if (env === ENV.TEST || env === ENV.DEMO) {
            continue;
        }

        if (env !== config.env) {
            if (url.indexOf(paypalUrl) === 0 || url.indexOf(paypalUrl.replace('//www.', '//')) === 0) {
                $logger.warn(`mismatched_env_startflow_url`, { env: config.env, url });
                redirect(url);
                throw new Error(`${url} is not a ${config.env} url`);
            }
        }
    }
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

function awaitPaymentTokenAndUrl() : { url : ZalgoPromise<string>, paymentToken : ZalgoPromise<?string> } {

    let paymentTokenAndUrl = new ZalgoPromise((resolve, reject) => {

        checkout.initXO = () => {
            $logger.warn(`gettoken_initxo`);
        };

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        checkout.startFlow = once((item, opts) => {
            $logger.debug(`gettoken_startflow`, { item });

            let { url, paymentToken } = matchUrlAndPaymentToken(item);

            checkUrlAgainstEnv(url);

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

function initPayPalCheckout(props = {}) : Object {

    $logger.info(`init_checkout`);

    if (paypalCheckoutInited && config.env !== ENV.TEST) {
        $logger.warn(`multiple_init_paypal_checkout`);
    }

    if (closeFlowCalled) {
        $logger.debug(`init_after_closeflow`);
    }

    paypalCheckoutInited = true;

    let paypalCheckout = Checkout.init({

        onAuthorize(data, actions) : ZalgoPromise<void> {
            $logger.info(`payment_authorized`);
            onAuthorizeListener.trigger(data.paymentToken);
            logRedirect(data.returnUrl);
            return actions.redirect(window);
        },

        onCancel(data, actions) : ZalgoPromise<void> {
            $logger.info(`payment_canceled`);
            logRedirect(data.cancelUrl);
            return actions.redirect(window);
        },

        fallback(url) : ZalgoPromise<void> {
            $logger.error(`fallback_handler`, { url });
            this.destroy();
            return redirect(url);
        },

        ...props
    });

    checkout.closeFlow = (closeUrl? : string) => {
        $logger.warn(`closeflow`);

        closeFlowCalled = true;

        reset();

        paypalCheckout.destroy();

        if (closeUrl) {
            $logger.warn(`closeflow_with_url`, { closeUrl });
            return redirect(closeUrl);
        }
    };

    return paypalCheckout;
}

function renderPayPalCheckout(props : Object = {}, hijackTarget? : ?Element) : ZalgoPromise<Object> {

    let urlProp = ZalgoPromise.resolve(props.url);

    let paymentToken = new ZalgoPromise(resolve => {
        props.init = (data) => {
            resolve(data.paymentToken);
        };
    });

    let errorHandler = once(err => {

        $logger.error(`component_error`, { error: err.stack || err.toString() });

        if (hijackTarget) {
            $logger.warn(`render_error_hijack_revert_target`);
            hijackTarget.removeAttribute('target');
        }

        urlProp.then(url => {
            $logger.warn(`render_error_redirect_using_url`);
            return redirect(url);
        });

        paymentToken.then(token => {
            logger.warn(`render_error_redirect_using_token`);
            return redirect(extendUrl(config.checkoutUrl, { token }));
        });
    });

    props.onError = errorHandler;

    let paypalCheckout;

    if (hijackTarget) {

        delete props.url;

        paypalCheckout = initPayPalCheckout(props);

        paypalCheckout.hijack(hijackTarget);
        paypalCheckout.runTimeout();

        urlProp.then(url => {
            $logger.warn(`hijack_then_url_passed`);
            paypalCheckout.loadUrl(url);
        });

    } else {

        paypalCheckout = initPayPalCheckout(props);
    }

    let render = paypalCheckout.render(null, !hijackTarget);

    checkout.win = paypalCheckout.window;

    return render.catch(errorHandler);
}


function handleClick(clickHandler, event) {
    $logger.debug(`button_click_handler`);

    try {
        clickHandler.call(null, event);
    } catch (err) {
        $logger.error(`click_handler_error`, { error: err.stack || err.toString() });
    }
}

function handleClickHijack(element) : void {

    let targetElement = getHijackTargetElement(element);

    if (!targetElement) {
        return $logger.error(`target_element_not_found`);
    }

    $logger.info(`init_paypal_checkout_hijack`);

    let { url, paymentToken } = awaitPaymentTokenAndUrl();

    let token;

    paymentToken.then(result => {
        token = result;
    });

    renderPayPalCheckout({ url, payment: () => ZalgoPromise.resolve(token) }, targetElement);
}



function listenClick(container, button, clickHandler, condition, track) : void {

    let element : HTMLElement = (container.tagName.toLowerCase() === 'a') ? container : button;

    let isClick  = (clickHandler instanceof Function);

    if (element.hasAttribute('data-paypal-click-listener')) {
        return $logger.warn(`button_already_has_paypal_click_listener`);
    }

    element.setAttribute('data-paypal-click-listener', '');

    let targetElement = getHijackTargetElement(element);

    if (targetElement && isClick) {
        $logger.info(`button_link_or_form`);
    }

    element.addEventListener('click', (event : Event) => {

        track();

        let eligible = isLegacyEligible();

        if (supportsPopups()) {
            $logger.debug(`click_popups_supported`);

            if (!eligible) {
                $logger.debug(`click_popups_supported_but_ineligible`);
            }
        } else {
            $logger.debug(`click_popups_not_supported`);

            if (eligible) {
                $logger.debug(`click_popups_not_supported_but_eligible`);
            }
        }

        if (!isClick) {

            if (!eligible) {
                return $logger.debug(`ineligible_listenclick`);
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
            return handleClickHijack(element);
        }
    });
}

function instrumentButtonRender(type : string) {
    $logger.track({
        [ FPTI.KEY.STATE ]:       FPTI.STATE.LOAD,
        [ FPTI.KEY.TRANSITION ]:  FPTI.TRANSITION.BUTTON_RENDER,
        [ FPTI.KEY.BUTTON_TYPE ]: type
    });
}

function instrumentButtonClick(type : string) {
    $logger.track({
        [ FPTI.KEY.STATE ]:       FPTI.STATE.LOAD,
        [ FPTI.KEY.TRANSITION ]:  FPTI.TRANSITION.BUTTON_CLICK,
        [ FPTI.KEY.BUTTON_TYPE ]: type
    });
    $logger.flush();
}


/*  Setup
    -----

    Emulate window.paypal.checkout.setup.

    The purpose of this method is to:

    - Set up configuration for the incontext flow
    - Render a button to initiate the checkout window
*/

let setupCalled = false;

export function setup(id : string, options : Object = {}) : ZalgoPromise<void> {

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

    normalizeOptions(options);
    setupConfig(options);

    setupPostBridge(config.env);

    return ZalgoPromise.try(() => {

        // If there are no buttons passed, can only assume there's a custom paypal button with a custom listener

        if (!options.buttons.length) {
            return instrumentButtonRender(FPTI.BUTTON_TYPE.CUSTOM);
        }

        // Otherwise render whatever buttons we were asked to, and listen for them to be clicked

        return renderButtons(id, options.buttons).then(buttons => {

            buttons.forEach(button => {
                instrumentButtonRender(button.type);

                listenClick(button.container, button.element, button.click, button.condition, () => {
                    instrumentButtonClick(button.type);
                });
            });
        });
    });
}

checkout.setup = setup;

/*  Init XO
    -------

    Emulate paypal.checkout.initXO

    Normally this would be used only to open the checkout page. But here we can just kick off the whole flow, since
    getToken will handle loading the token into the window for us.
*/

function initXO() : void {

    $logger.debug(`initxo`);

    if (!isLegacyEligible()) {
        return $logger.debug(`ineligible_initxo`);
    }

    let { url, paymentToken } = awaitPaymentTokenAndUrl();

    $logger.info(`init_paypal_checkout_initxo`);

    renderPayPalCheckout({ url, payment: paymentToken });
}

checkout.initXO = initXO;


/*  Start Flow
    ----------

    Emulate paypal.checkout.startFlow

    Normally this would be used to load the url into the browser after the window has already been opened. Again, we
    can just kick off the whole flow here, on the off chance that a merchant calls us on button click. Normally this
    method will have been patched over in getToken.
*/

function startFlow(item : string) {
    $logger.debug(`startflow`, { item });

    let { paymentToken, url } = matchUrlAndPaymentToken(item);

    checkUrlAgainstEnv(url);

    if (!isLegacyEligible()) {
        $logger.debug(`ineligible_startflow_global`, { url });
        redirect(url);
        return;
    }

    $logger.info(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({ url, payment: paymentToken });
}

checkout.startFlow = startFlow;


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow(closeUrl? : string) {
    $logger.warn(`closeflow_not_opened`);

    if (closeUrl) {
        $logger.warn(`closeflow_with_url`, { closeUrl });
        redirect(closeUrl);
        return;
    }

    console.warn('Checkout is not open, can not be closed');
}

checkout.closeFlow = closeFlow;
