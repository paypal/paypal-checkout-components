/* @flow */

import 'babel-polyfill';
import 'src/load';
import postRobot from 'post-robot/src/index';

import { generateECToken } from '../../tests/common';

window.paypal.Button.render({

    payment() : string {
        return generateECToken();
    },

    onAuthorize() {
        postRobot.send(window.top.frames[0], 'onAuthorize');
    }

}, document.body).then(button => {

    button.window.paypal.Checkout.contexts.lightbox = (window.location.hash === '#lightbox');
    button.window.document.querySelector('button').click();
});


