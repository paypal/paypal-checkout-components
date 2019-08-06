/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { prefix, flush as flushLogs } from 'beaver-logger/client';
import formSerialize from 'form-serialize';

import { Checkout } from '../checkout';
import { config } from '../config';
import { ENV, FPTI } from '../constants';
import { supportsPopups, once, safeJSON, extendUrl, stringifyError, request } from '../lib';

import { setupPostBridge } from './postBridge';
import { isLegacyEligible } from './eligibility';
import { LOG_PREFIX } from './constants';
import { renderButtons, getHijackTargetElement } from './button';
import { redirect, logRedirect, parseToken } from './util';
import { normalizeOptions, setupConfig } from './options';

const { info, debug, warn, error, track } = prefix(LOG_PREFIX);

export const checkout = {};
export const apps = { checkout, Checkout: checkout };

export function reset() {

    debug('reset');

    // Once our callback has been called, we can set the global methods to their original values

    checkout.initXO    = initXO;    // eslint-disable-line no-use-before-define
    checkout.startFlow = startFlow; // eslint-disable-line no-use-before-define
    checkout.closeFlow = closeFlow; // eslint-disable-line no-use-before-define
}

checkout.reset = reset;

// $FlowFixMe
Object.defineProperty(checkout, 'urlPrefix', {
    get() : string {
        return `${ config.checkoutUrl }${ config.checkoutUrl.indexOf('?') === -1 ? '?' : '&' }token=`;
    }
});

function matchUrlAndPaymentToken(item) : { url : string, paymentToken : ?string } {

    if (!item || !item.trim()) {
        error(`startflow_no_url_or_token`, { item });
        throw new Error(`startflow_no_url_or_token`);
    }


    const paymentToken = parseToken(item);
    let url = (paymentToken && paymentToken === item) ? '' : item;

    if (url) {

        if (!url.match(/^https?:\/\/|^\//)) {
            if (paymentToken) {
                info(`startflow_relative_url_with_token`, { url });
            } else {
                info(`startflow_relative_url_no_token`, { url });
            }

            if (url.toLowerCase().indexOf('ec-') === 0 && paymentToken) {
                url = `${ config.checkoutUrl }${ url }`;
            }

        } else if (paymentToken) {
            if (url.indexOf('.paypal.com') !== -1) {
                debug(`startflow_paypalurl_with_token`, { url });
            } else {
                debug(`startflow_url_with_token`, { url });
            }

        } else {
            debug(`startflow_url_no_token`, { url });
        }

    } else {

        if (paymentToken) {
            url = extendUrl(config.checkoutUrl, { token: paymentToken });
            debug(`startflow_with_token`, { url });
        } else {
            error(`startflow_no_url_or_token`, { url });
            throw new Error(`Could not determine url or token from "${ item }"`);
        }
    }

    return { paymentToken, url };
}

function checkUrlAgainstEnv(url : string) {

    const paypalUrls = config.paypalUrls;

    for (const env of Object.keys(paypalUrls)) {
        const paypalUrl = paypalUrls[env];

        if (env === ENV.TEST || env === ENV.DEMO) {
            continue;
        }

        if (env !== config.env) {
            if (url.indexOf(paypalUrl) === 0 || url.indexOf(paypalUrl.replace('//www.', '//')) === 0) {
                warn(`mismatched_env_startflow_url`, { env: config.env, url });
                redirect(url);
                throw new Error(`${ url } is not a ${ config.env } url`);
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

function awaitPaymentTokenAndUrl(event? : ?Event, targetElement? : ?HTMLElement) : { url : ZalgoPromise<string>, paymentToken : ZalgoPromise<?string> } {

    const paymentTokenAndUrl = new ZalgoPromise((resolve) => {

        if (event && targetElement && (Math.random() < 0.001 || window.enablev3ajax)) {
            let method;
            let url;
            let body;
            let contentType;

            info('gettoken_targetelement_start');
            flushLogs();
    
            if (targetElement.tagName.toLowerCase() === 'a') {
                method = 'get';
                url = targetElement.getAttribute('href');
            } else if (targetElement.tagName.toLowerCase() === 'form') {
                method = (targetElement.getAttribute('method') || 'get').toLowerCase();
                url = targetElement.getAttribute('action');
                body = formSerialize(targetElement);
                contentType = targetElement.getAttribute('enctype') || 'application/x-www-form-urlencoded';
            }
    
            if (method && url) {
                event.preventDefault();

                request({
                    method,
                    url,
                    body,
                    headers: {
                        'Accept':       'application/paypal-json-token',
                        'Content-type': contentType || ''
                    }
                }).then(json => {
                    const urlAndPaymentToken = matchUrlAndPaymentToken(json.token);
                    resolve(urlAndPaymentToken);
                    info('gettoken_targetelement_success', urlAndPaymentToken);
                    flushLogs();

                }).catch(err => {
                    warn('gettoken_targetelement_error', {
                        // $FlowFixMe
                        err: err.stack || err.toString()
                    });
                    flushLogs();
                });
                
            } else {
                warn('gettoken_targetelement_no_method_or_url');
                flushLogs();
            }
        }


        checkout.initXO = () => {
            warn(`gettoken_initxo`);
        };

        // startFlow is our 'success' case - we get a token, and we can pass it back to the caller

        checkout.startFlow = once((item) => {
            debug(`gettoken_startflow`, { item });

            const { url, paymentToken } = matchUrlAndPaymentToken(item);

            checkUrlAgainstEnv(url);

            return resolve({ url, paymentToken });
        });
    });

    const url          = paymentTokenAndUrl.then(result => result.url);
    const paymentToken = paymentTokenAndUrl.then(result => result.paymentToken);

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

    info(`init_checkout`);

    if (paypalCheckoutInited && config.env !== ENV.TEST) {
        warn(`multiple_init_paypal_checkout`);
    }

    if (closeFlowCalled) {
        debug(`init_after_closeflow`);
    }

    paypalCheckoutInited = true;

    const paypalCheckout = Checkout.init({

        onAuthorize(data, actions) : ZalgoPromise<void> {
            info(`payment_authorized`);
            logRedirect(data.returnUrl);
            return actions.redirect(window);
        },

        onCancel(data, actions) : ?ZalgoPromise<void> {
            if (data.cancelUrl) {
                info(`payment_canceled`);
                logRedirect(data.cancelUrl);
                return actions.redirect(window);
            }
        },

        fallback(url) : ZalgoPromise<void> {
            error(`fallback_handler`, { url });
            this.destroy();
            return redirect(url);
        },

        ...props
    });

    checkout.closeFlow = (closeUrl? : string) => {
        warn(`closeflow`);

        closeFlowCalled = true;

        reset();

        paypalCheckout.destroy();

        if (closeUrl) {
            warn(`closeflow_with_url`, { closeUrl });
            return redirect(closeUrl);
        }
    };

    return paypalCheckout;
}

function renderPayPalCheckout(props : Object = {}, hijackTarget? : ?Element) : ZalgoPromise<Object> {

    const urlProp = ZalgoPromise.resolve(props.url);

    const paymentToken = new ZalgoPromise(resolve => {
        props.init = (data) => {
            resolve(data.paymentToken);
        };
    });

    const errorHandler = once(err => {

        error(`component_error`, { error: stringifyError(err) });

        if (hijackTarget) {
            warn(`render_error_hijack_revert_target`);
            hijackTarget.removeAttribute('target');
        }

        // eslint-disable-next-line promise/no-promise-in-callback
        urlProp.then(url => {
            warn(`render_error_redirect_using_url`);
            return redirect(url);
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        paymentToken.then(token => {
            warn(`render_error_redirect_using_token`);
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
            warn(`hijack_then_url_passed`);
            paypalCheckout.loadUrl(url);
        });

    } else {

        paypalCheckout = initPayPalCheckout(props);
    }

    const render = paypalCheckout.render(null, !hijackTarget);

    checkout.win = paypalCheckout.window;

    return render.catch(errorHandler);
}


function handleClick(clickHandler, event) {
    debug(`button_click_handler`);

    try {
        clickHandler(event);
    } catch (err) {
        error(`click_handler_error`, { error: stringifyError(err) });
    }
}

function handleClickHijack(event, element) : void {

    const targetElement = getHijackTargetElement(element);

    if (!targetElement) {
        return error(`target_element_not_found`);
    }

    info(`init_paypal_checkout_hijack`);

    const { url, paymentToken } = awaitPaymentTokenAndUrl(event, targetElement);

    let token;
    
    paymentToken.then(result => {
        token = result;
    });

    renderPayPalCheckout({ url, payment: () => ZalgoPromise.resolve(token) }, targetElement);
}

function listenClick(container, button, clickHandler, condition, tracker) : void {

    const element : HTMLElement = (container.tagName.toLowerCase() === 'a') ? container : button;

    const isClick  = (typeof clickHandler === 'function');

    if (element.hasAttribute('data-paypal-click-listener')) {
        return warn(`button_already_has_paypal_click_listener`);
    }

    element.setAttribute('data-paypal-click-listener', '');

    const targetElement = getHijackTargetElement(element);

    if (targetElement && isClick) {
        info(`button_link_or_form`);
    }

    element.addEventListener('click', (event : Event) => {

        tracker();

        const eligible = isLegacyEligible();

        if (supportsPopups()) {
            debug(`click_popups_supported`);

            if (!eligible) {
                debug(`click_popups_supported_but_ineligible`);
            }
        } else {
            debug(`click_popups_not_supported`);

            if (eligible) {
                debug(`click_popups_not_supported_but_eligible`);
            }
        }

        if (!isClick) {

            if (!eligible) {
                return debug(`ineligible_listenclick`);
            }
        }

        info(`button_click`);

        if (typeof condition === 'function') {
            if (condition.call()) {
                info(`button_click_condition_enabled`);
            } else {
                return info(`button_click_condition_disabled`);
            }
        }

        if (isClick) {
            return handleClick(clickHandler, event);

        } else {
            return handleClickHijack(event, element);
        }
    });
}

function instrumentButtonRender(type : string) {
    info(`render_${ type }_button`);

    track({
        [ FPTI.KEY.STATE ]:       FPTI.STATE.LOAD,
        [ FPTI.KEY.TRANSITION ]:  FPTI.TRANSITION.BUTTON_RENDER,
        [ FPTI.KEY.BUTTON_TYPE ]: type
    });

    flushLogs();
}

function instrumentButtonClick(type : string) {
    track({
        [ FPTI.KEY.STATE ]:       FPTI.STATE.LOAD,
        [ FPTI.KEY.TRANSITION ]:  FPTI.TRANSITION.BUTTON_CLICK,
        [ FPTI.KEY.BUTTON_TYPE ]: type
    });
    flushLogs();
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

    info(`setup`, {
        id,
        env:     options.environment,
        options: safeJSON(options)
    });

    if (setupCalled) {
        debug(`setup_called_multiple_times`);
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

    debug(`initxo`);

    if (!isLegacyEligible()) {
        return debug(`ineligible_initxo`);
    }

    const { url, paymentToken } = awaitPaymentTokenAndUrl();

    info(`init_paypal_checkout_initxo`);

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

function startFlow(item : string) {
    debug(`startflow`, { item });

    const { paymentToken, url } = matchUrlAndPaymentToken(item);

    checkUrlAgainstEnv(url);

    if (!isLegacyEligible()) {
        debug(`ineligible_startflow_global`, { url });
        redirect(url);
        return;
    }

    info(`init_paypal_checkout_startflow`);

    renderPayPalCheckout({ url, payment: () => ZalgoPromise.resolve(paymentToken) });
}

checkout.startFlow = startFlow;


/*  Close Flow
    ----------

    Emulate paypal.checkout.closeFlow

    Close the component in case of any error on the merchant side.
*/

function closeFlow(closeUrl? : string) {
    warn(`closeflow_not_opened`);

    if (closeUrl) {
        warn(`closeflow_with_url`, { closeUrl });
        redirect(closeUrl);

    }
}

checkout.closeFlow = closeFlow;
