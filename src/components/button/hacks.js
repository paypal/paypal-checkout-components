
import * as $logger from 'beaver-logger/client';
import * as xcomponent from 'xcomponent/src';

import { Button } from './component';
import { Login } from '../login';
import { Checkout, forceIframe } from '../checkout';

import { config } from '../../config';
import { patchMethod, isIE, getDomainSetting, noop,
         extendUrl } from '../../lib';

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

    let checkoutRendered = false;
    let iframeEnabled = false;

    // $FlowFixMe
    Object.defineProperty(Checkout.contexts, 'iframe', {
        get() : boolean {
            return forceIframe() ? true : iframeEnabled;
        },
        set(value) {
            iframeEnabled = (checkoutRendered || window.xprops.prefetchLogin || __TEST__) ? value : false;
        }
    });

    patchMethod(Checkout, 'renderTo', ({ callOriginal }) => {
        checkoutRendered = true;
        return callOriginal();
    });

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
}
