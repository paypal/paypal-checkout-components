/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { send } from '@krakenjs/post-robot/src';

import { generateOrderID } from '../../tests/common';

window.paypal.Buttons({

    createOrder() : ZalgoPromise<string> {
        return ZalgoPromise.resolve(generateOrderID());
    },

    onApprove() {
        send(window.top.frames[0], 'onApprove');
    },

    onShippingChange() {
        send(window.top.frames[0], 'onShippingChange');
    }

}).render(document.body).then(button => {
    button.window.document.querySelector('button').click();
});
