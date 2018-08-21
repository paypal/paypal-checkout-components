/* @flow */

import { generateECToken } from '../../tests/common';

window.paypal.Button.render({

    payment() : string {
        return generateECToken();
    },

    onAuthorize() {
        window.paypal.postRobot.send(window.top.frames[0], 'onAuthorize');
    },

    onShippingChange() {
        window.paypal.postRobot.send(window.top.frames[0], 'onShippingChange');
    }

}, document.body).then(button => {

    button.window.paypal.Checkout.contexts.iframe = (window.location.hash === '#iframe');
    button.window.document.querySelector('button').click();
});
