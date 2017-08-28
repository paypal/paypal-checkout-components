/* @flow */

import { isSameDomain, getFrames } from 'cross-domain-utils/src';
import { createTestContainer, createElement } from '../../tests/common';

let { action, onRender, onInit } = window.xprops.test;

let actions = {
    close() {
        window.close();
    }
};

let hash = window.location.hash ? `&hash=${ window.location.hash.slice(1) }` : '';

if (action === 'checkout') {

    // eslint-disable-next-line promise/catch-or-return
    window.xprops.payment().then(paymentToken => {

        return window.paypal.Promise.try(() => {

            if (window.xprops.init) {
                return window.xprops.init({
                    paymentToken,
                    cancelUrl: `#cancel?token=${ paymentToken }${ hash }`
                });
            }

        }).then(() => {

            if (window.xprops.onAuth) {
                return window.xprops.onAuth('xxxyyy');
            }

        }).then(() => {

            window.xprops.onAuthorize({
                paymentToken,
                paymentID:  paymentToken,
                payerID:    'YYYYYYYYYYYYY',
                cancelUrl:  `#cancel?token=${ paymentToken }${ hash }`,
                returnUrl:  `#return?token=${ paymentToken }&PayerID=YYYYYYYYYYYYY${ hash }`,
                currentUrl: window.location.href
            });
        });
    });

} else if (action === 'cancel') {

    // eslint-disable-next-line promise/catch-or-return
    window.xprops.payment().then(paymentToken => {

        window.xprops.onCancel({
            paymentToken,
            cancelUrl: `#cancel?token=${ paymentToken }${ hash }`
        });
    });

} else if (action === 'popout') {

    createTestContainer();

    let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

    testButton.addEventListener('click', () => {
        window.xchild.hide();

        window.paypal.Checkout.renderPopupTo(window.xchild.getParentRenderWindow(), {

            url:              window.location.href,
            payment:          window.xprops.payment,
            onAuthorize:      window.xprops.onAuthorize,
            onCancel:         window.xprops.onCancel,
            onError:          window.xprops.onError
        });
    });

    testButton.click();

} else if (action === 'fallback') {

    let parent = window.xchild.getParentComponentWindow();

    // eslint-disable-next-line promise/catch-or-return
    window.xprops.payment().then(paymentToken => {
        return window.xprops.fallback(`#fallbackUrl?token=${ paymentToken }`).then(() => {

            createTestContainer();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let win;

                if (window.opener) {
                    win = window;
                } else {
                    win = window.open('', `fallbackWindow${ Math.random() }`, 'width=500,height=500');
                }

                win.location = '/base/test/windows/fallback/index.htm';

                if (isSameDomain(parent) && parent.watchForLegacyFallback) {
                    return parent.watchForLegacyFallback(win);
                }

                for (let frame of getFrames(parent)) {
                    if (isSameDomain(frame) && frame.watchForLegacyFallback) {
                        return frame.watchForLegacyFallback(win);
                    }
                }

                throw new Error('Can not find frame to watch for fallback');
            });

            testButton.click();
        });
    });

} else if (action === 'error') {

    // eslint-disable-next-line promise/catch-or-return
    window.xprops.payment().then(paymentToken => {

        return window.paypal.Promise.try(() => {

            if (window.xprops.init) {
                return window.xprops.init({
                    paymentToken,
                    cancelUrl: `#cancel?token=${ paymentToken }${ hash }`
                });
            }

        }).then(() => {

            window.xchild.error(new Error('something went wrong'));
        });
    });
} else if (action === 'init') {

    // eslint-disable-next-line promise/catch-or-return
    window.xprops.payment().then(paymentToken => {
        if (window.xprops.init) {
            return window.xprops.init({
                paymentToken,
                cancelUrl: `#cancel?token=${ paymentToken }${ hash }`
            }).then(() => {

                if (onInit) {
                    return onInit(actions);
                }
            });
        }
    });
}

if (onRender) {
    onRender(actions);
}
