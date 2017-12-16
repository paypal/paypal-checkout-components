/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src/promise';

import { noop } from '../../lib';

import { Checkout } from './component';

function type(field : HTMLInputElement, chars : string, interval : number = 50) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        field.value = field.value || '';
        field.value = field.value += chars.slice(0, 1);

        chars = chars.slice(1);

        if (chars) {
            return ZalgoPromise.delay(interval)
                .then(() => type(field, chars, interval));
        }
    });
}

function waitForPageLoad() : ZalgoPromise<Object> {
    return new ZalgoPromise(resolve => {

        let count = 1;

        let interval = setInterval(() => {

            count += 1;
            if (count >= 50) {
                return clearInterval(interval);
            }

            if (window.injector) {
                clearInterval(interval);
                return resolve(window.injector);
            }

        }, 500);

    }).then(injector => {

        if (!injector.get('$loader').isLoading()) {
            return;
        }

        return new ZalgoPromise(resolve =>
            injector.get('$event').on('allLoaded', resolve));
    });
}

export function prefillSandboxLogin(emailText : string, passwordText : string) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        if (!Checkout.isChild()) {
            return;
        }

        if (window.location.href.indexOf('sandbox.paypal.com') === -1) {
            return;
        }

        return waitForPageLoad().then(() => {
            
            if (!window.root || !window.root.token || !window.$CheckoutPayeeModel) {
                return;
            }

            if (window.$CheckoutPayeeModel.instance(window.root.token).merchant.id !== 'YQZCHTGHUK5P8') {
                return;
            }

            let win = window.injectedUl || window;

            let email = win.document.querySelector('#email');
            let password = win.document.querySelector('#password');

            if (!email || !password) {
                return;
            }

            email.value = '';
            password.value = '';

            return ZalgoPromise
                .try(() => type(email, emailText))
                .then(() => type(password, passwordText))
                .catch(noop);
        });
    });
}

try {
    prefillSandboxLogin('sandbox-user@paypal.com', 'passw0rd').catch(noop);
} catch (err) {
    // pass
}


