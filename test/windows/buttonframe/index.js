
import paypal from 'src/index';
import postRobot from 'post-robot/src/index';

import { generateECToken } from '../../tests/common';

paypal.Button.render({

    payment() {
        return generateECToken();
    },

    onAuthorize() {
        postRobot.send(window.top.frames[0], 'onAuthorize');
    }

}, document.body).then(button => {

    button.window.paypal.Checkout.contexts.lightbox = (window.location.hash === '#lightbox');
    button.window.document.querySelector('button').click();
});


