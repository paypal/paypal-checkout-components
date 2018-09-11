/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { generateOrderID } from '../../tests/common';

window.paypal.Button({

    createOrder() : ZalgoPromise<string> {
        return ZalgoPromise.resolve(generateOrderID());
    },

    onApprove() {
        send(window.top.frames[0], 'onApprove');
    }

}).render(document.body).then(button => {

    button.window.paypal.Checkout.contexts.iframe = (window.location.hash === '#iframe');
    button.window.document.querySelector('button').click();
});
