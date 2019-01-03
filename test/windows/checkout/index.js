/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CONTEXT } from 'zoid/src';

import { createTestContainer, createElement } from '../../tests/common';

const { action, onRender, onInit } = window.xprops.test;

const actions = {
    close() {
        window.close();
    }
};

const hash = window.location.hash ? `&hash=${ window.location.hash.slice(1) }` : '';

if (action === 'checkout') {

    window.xprops.payment().then(orderID => {

        return ZalgoPromise.try(() => {

            if (window.xprops.init) {
                return window.xprops.init({
                    orderID,
                    cancelUrl: `#cancel?token=${ orderID }${ hash }`
                });
            }

        }).then(() => {

            if (window.xprops.onAuth) {
                return window.xprops.onAuth('xxxyyy');
            }

        }).then(() => {

            window.xprops.onAuthorize({
                orderID,
                intent:     'commit',
                payerID:    'YYYYYYYYYYYYY',
                cancelUrl:  `#cancel?token=${ orderID }${ hash }`,
                returnUrl:  `#return?token=${ orderID }&PayerID=YYYYYYYYYYYYY${ hash }`,
                currentUrl: window.location.href
            });
        });
    });

} else if (action === 'cancel') {

    window.xprops.payment().then(orderID => {

        window.xprops.onCancel({
            orderID,
            cancelUrl: `#cancel?token=${ orderID }${ hash }`
        });
    });

} else if (action === 'popout') {

    createTestContainer();

    const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

    testButton.addEventListener('click', () => {
        window.paypal.Checkout({
            payment:          window.xprops.payment,
            onAuthorize:      window.xprops.onAuthorize,
            onCancel:         window.xprops.onCancel,
            onError:          window.xprops.onError
        }).renderTo(window.opener ? window.opener.parent : window.parent, 'body', CONTEXT.POPUP);
    });

    testButton.click();

} else if (action === 'error') {

    window.xprops.payment().then(() => {
        window.xprops.onError(new Error('something went wrong'));
    });

} else if (action === 'init') {
    
    window.xprops.payment().then(() => {
        if (onInit) {
            return onInit(actions);
        }
    });
}

if (onRender) {
    onRender(actions);
}
