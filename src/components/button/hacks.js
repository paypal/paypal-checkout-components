
import * as $logger from 'beaver-logger/client';
import * as xcomponent from 'xcomponent/src';

import { Button } from './component';
import { Login } from '../login';
import { Checkout } from '../checkout';

import { BUTTON_LABEL, BUTTON_SIZE } from './constants';
import { config } from '../../config';
import { patchMethod, isIE, getDomainSetting, noop,
         extendUrl } from '../../lib';

patchMethod(Button, 'render', ({ original, context, args }) => {

    let [ props ] = args;
    let style = props.style;

    if (style && (!style.label || style.label === BUTTON_LABEL.CHECKOUT) && style.size === 'tiny') {
        $logger.warn(`unsupported_button_size_tiny`);
        style.size = BUTTON_SIZE.SMALL;
    }

    return original.apply(context, args);
});



if (Button.isChild()) {

    let debounce = false;

    patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {

        if (debounce) {
            $logger.warn('button_mutliple_click_debounce');
            return;
        }

        debounce = true;

        for (let methodName of [ 'onAuthorize', 'onCancel', 'onError', 'onClose' ]) {
            let original = props[methodName];
            props[methodName] = function() : mixed {
                debounce = false;
                if (original) {
                    return original.apply(this, arguments);
                }
            };
        }

        return callOriginal();
    });

    if (window.xprops.validate) {

        let enabled = true;

        window.xprops.validate({
            enable() {
                enabled = true;
            },

            disable() {
                enabled = false;
            }
        });

        patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {
            if (enabled) {
                return callOriginal();
            }
        });
    }

    if (isIE() && getDomainSetting('ie_full_page')) {
        Checkout.renderTo = (win, props) => {
            $logger.info('force_ie_full_page');
            $logger.flush();

            let checkout = Checkout.init({
                onAuthorize: noop
            });

            checkout.delegate(win);
            checkout.openContainer().then(() => {
                checkout.event.triggerOnce(xcomponent.CONSTANTS.EVENTS.CLOSE);
                checkout.showContainer();
            });

            window.xprops.payment().then(token => {
                window.top.location = extendUrl(config.checkoutUrl, { token });
            }).catch(err => {
                checkout.error(err);
            });
        };
    }

    if (getDomainSetting('allow_full_page_fallback')) {
        patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {
            return callOriginal().catch(err => {
                if (err instanceof xcomponent.PopupOpenError) {
                    window.xprops.payment().then(token => {
                        window.top.location = extendUrl(config.checkoutUrl, { token });
                    });
                } else {
                    throw err;
                }
            });
        });
    }

    patchMethod(Login, 'prerender', ({ callOriginal, args: [ props ] }) => {
        delete props.env;
        return callOriginal();
    });

    let buttonElement = document.querySelector('.paypal-button');

    if (buttonElement) {
        buttonElement.style.minWidth = '100px';
        buttonElement.style.minHeight = '24px';
    }

    if (window.xprops.style && window.xprops.style.tagline === false) {
        let taglineElement = document.querySelector('.paypal-button-tag-content');

        if (taglineElement) {
            taglineElement.style.display = 'none';
        }
    }
}
