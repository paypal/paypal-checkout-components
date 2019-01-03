/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { generateOrderID } from '../../tests/common';

window.paypal.Buttons({

    createOrder() : ZalgoPromise<string> {
        return ZalgoPromise.resolve(generateOrderID());
    },

    onApprove() {
        send(window.top.frames[0], 'onApprove');
    }

}).render(document.body).then(button => {
    button.window.document.querySelector('button').click();
});
