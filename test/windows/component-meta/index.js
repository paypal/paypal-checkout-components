/* @flow */

import '../../tests/common';

window.paypal.postRobot.sendToParent('meta', {
    locale: 'en_US',
    iframeEligible: false,
    iframeEligibleReason: 'test'
});
