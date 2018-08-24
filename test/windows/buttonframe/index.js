/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { generateOrderID } from '../../tests/common';

let client = window.paypal.client();

client.Button.render({

    createOrder() : ZalgoPromise<string> {
        return ZalgoPromise.resolve(generateOrderID());
    },

    onApprove() {
        send(window.top.frames[0], 'onApprove');
    }

}, document.body).then(button => {

    button.window.paypal.client().Checkout.contexts.iframe = (window.location.hash === '#iframe');
    button.window.document.querySelector('button').click();
});
