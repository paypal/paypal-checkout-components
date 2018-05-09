/* @flow */

import '../../tests/common';

let rememberedFunding = localStorage.getItem('rememberedFunding');

window.paypal.postRobot.sendToParent('meta', {
    locale:               'en_US',
    iframeEligible:       false,
    iframeEligibleReason: 'test',
    rememberedFunding:    rememberedFunding ? JSON.parse(rememberedFunding) : []
});
