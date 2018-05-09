/* @flow */

import { send } from 'post-robot/src';

import { generateECToken } from '../../tests/common';

let client = window.paypal.client();

client.Button.render({

    payment() : string {
        return generateECToken();
    },

    onAuthorize() {
        send(window.top.frames[0], 'onAuthorize');
    }

}, document.body).then(button => {

    button.window.paypal.client().Checkout.contexts.iframe = (window.location.hash === '#iframe');
    button.window.document.querySelector('button').click();
});
