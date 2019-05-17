/* @flow */

import { info, warn, flush as flushLogs } from 'beaver-logger/client';
import { CONSTANTS } from 'zoid/src';
import { getParent, getTop } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config } from './config';
import { noop, isIE, getDomainSetting, extendUrl, patchMethod, once, extend } from './lib';
import { Button } from './button';
import { Checkout } from './checkout';
import { BUTTON_LABEL, BUTTON_SIZE, BUTTON_COLOR } from './constants';
import { rest } from './api';

if (isIE() && getDomainSetting('ie_full_page')) {
    // $FlowFixMe
    Checkout.renderTo = (win) => {
        info('force_ie_full_page');
        flushLogs();

        // $FlowFixMe
        const checkout = Checkout.init({
            onAuthorize: noop
        });

        checkout.delegate(win);

        checkout.openContainer().then(() => {
            checkout.event.triggerOnce(CONSTANTS.EVENTS.CLOSE);
            checkout.showContainer();
        });

        // $FlowFixMe
        Button.xprops.payment().then(token => {
            window.top.location = extendUrl(config.checkoutUrl, { token });
        }).catch(err => {
            checkout.error(err);
        });
    };
}

const parent = getParent(window);
const top = getTop(window);

if (top && parent) {
    let canRenderTop = (top === parent);

    if (!canRenderTop) {
        Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });

        patchMethod(Checkout, 'renderTo', ({ args: [ win, props, el ], original, context }) => {

            if (!canRenderTop) {
                win = getParent(window);
            }

            return original.call(context, win, props, el);
        });
    }
}

patchMethod(Checkout, 'renderTo', ({ callOriginal, args: [ , props ] }) => {
    if (getDomainSetting('allow_full_page_fallback')) {
        const handleError = once((err) => {
            try {
                // eslint-disable-next-line no-console
                console.error(err && err.stack);
            } catch (err2) {
                // pass
            }

            // $FlowFixMe
            return Button.xprops.payment().then(token => {
                window.top.location = extendUrl(config.checkoutUrl, { token });
            });
        });

        props.onError = handleError;
        return callOriginal().catch(handleError);
    }
    return callOriginal();
});

let debounce = false;

patchMethod(Checkout, 'renderTo', ({ callOriginal, args: [ , props ] }) => {

    if (debounce) {
        warn('button_mutliple_click_debounce');
        return new ZalgoPromise(noop);
    }

    debounce = true;

    for (const methodName of [ 'onAuthorize', 'onCancel', 'onError', 'onClose' ]) {
        const original = props[methodName];
        props[methodName] = function unDebounce() : mixed {
            debounce = false;
            if (original) {
                return original.apply(this, arguments);
            }
        };
    }

    return callOriginal();
});

patchMethod(rest.payment, 'create', ({ original: createOriginal, context: createContext, args: [ env, client, options, experience ] }) => {
    if (!options.payment) {
        options = { payment: options, experience };
    }
    return createOriginal.call(createContext, env, client, options);
});

patchMethod(Button.props.style, 'validate', ({ callOriginal, args: [ style ] }) => {

    if (!style) {
        return callOriginal();
    }

    if (style && style.color === 'creditblue') {
        style.color = BUTTON_COLOR.DARKBLUE;
    }

    if (style && style.label === 'generic') {
        style.label = BUTTON_LABEL.PAYPAL;
    }

    if (style && (!style.label || style.label === BUTTON_LABEL.CHECKOUT) && style.size === 'tiny') {
        warn(`unsupported_button_size_tiny`);
        style.size = BUTTON_SIZE.SMALL;
    }

    return callOriginal();
});

patchMethod(Button, 'render', ({ callOriginal, args: [ props ] }) => {

    if (props.billingAgreement) {
        props.payment = props.billingAgreement;
        delete props.billingAgreement;
    }

    return callOriginal();
});

patchMethod(Button.props.payment, 'decorate', ({ original, context, args: [ originalPayment ] }) => {
    return original.call(context, function payment(data : Object, actions : Object) : ZalgoPromise<string> {
        return new ZalgoPromise((resolve, reject) => {

            patchMethod(actions.payment, 'create', ({ original: createOriginal, context: createContext, args: [ options, experience ] }) => {
                if (!options.payment) {
                    options = { payment: options, experience };
                }
                return createOriginal.call(createContext, options);
            });

            function resolveData(token) {
                resolve(token);
            }

            function rejectActions(err) {
                reject(err);
            }

            extend(resolveData, data);
            extend(resolveData, actions);
            extend(rejectActions, actions);

            const ctx = {
                props: {
                    env:    this.props.env,
                    client: this.props.client
                }
            };

            let result;

            try {
                result = originalPayment.call(ctx, resolveData, rejectActions);
            } catch (err) {
                return reject(err);
            }

            if (result && typeof result.then === 'function') {
                return result.then(resolve, reject);
            }

            if (result !== undefined) {
                return resolve(result);
            }
        });
    });
});

if (Button.isChild()) {
    if (!window.Promise) {
        window.Promise = ZalgoPromise;
    }
}
