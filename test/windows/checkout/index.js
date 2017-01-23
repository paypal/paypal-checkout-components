/* @flow */

import paypal from 'src/index';
import { createTestContainer, createElement } from '../../tests/common';

import postRobot from 'post-robot/src/index';

if (window.xprops.testAction === 'checkout') {

    window.xprops.payment().then(paymentToken => {

        let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

        return paypal.Promise.try(() => {

            if (window.xprops.init) {
                return window.xprops.init({
                    paymentToken,
                    cancelUrl: `#cancel?token=${paymentToken}${ hash }`
                });
            }

        }).then(() => {

            if (window.xprops.onAuth) {
                return window.xprops.onAuth('xxxyyy');
            }

        }).then(() => {

            window.xprops.onAuthorize({
                paymentToken,
                cancelUrl: `#cancel?token=${paymentToken}${ hash }`,
                returnUrl: `#return?token=${paymentToken}&PayerID=YYYYYYYYYYYYY${ hash }`,
                currentUrl: window.location.href
            });
        });
    });

} else if (window.xprops.testAction === 'cancel') {

    window.xprops.payment().then(paymentToken => {

        let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

        window.xprops.onCancel({
            paymentToken,
            cancelUrl: `#cancel?token=${paymentToken}${ hash }`
        });
    });

} else if (window.xprops.testAction === 'popout') {

    createTestContainer();

    let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

    testButton.addEventListener('click', (event : Event) => {
        window.xchild.hide();

        paypal.Checkout.renderPopupTo(window.top.frames[0], {

            url:              window.location.href,
            payment:          window.xprops.payment,
            onAuthorize:      window.xprops.onAuthorize,
            onCancel:         window.xprops.onCancel,
            onError:          window.xprops.onError
        });
    });

    testButton.click();

} else if (window.xprops.testAction === 'fallback') {

    let parent = window.xchild.getParentComponentWindow();

    window.xprops.payment().then(paymentToken => {
        window.xprops.fallback(`#fallbackUrl?token=${paymentToken}`).then(() => {

            createTestContainer();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                let win;

                if (window.opener) {
                    win = window;
                } else {
                    win = window.open('', `fallbackWindow${Math.random()}`);
                }

                win.location = '/base/test/windows/fallback/index.htm';

                if (postRobot.winutil.isSameDomain(parent) && parent.watchForLegacyFallback) {
                    return parent.watchForLegacyFallback(win);
                }

                for (let frame of postRobot.winutil.getFrames(parent)) {
                    if (postRobot.winutil.isSameDomain(frame) && frame.watchForLegacyFallback) {
                        return frame.watchForLegacyFallback(win);
                    }
                }

                throw new Error('Can not find frame to watch for fallback');
            });

            testButton.click();
        });
    });

} else if (window.xprops.testAction === 'error') {

    window.xprops.payment().then(paymentToken => {

        let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

        return paypal.Promise.try(() => {

            if (window.xprops.init) {
                return window.xprops.init({
                    paymentToken,
                    cancelUrl: `#cancel?token=${paymentToken}${ hash }`
                });
            }

        }).then(() => {

            window.xprops.onError(new Error('something went wrong'));
        });
    });
}


