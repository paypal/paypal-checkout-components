/* @flow */

import '../../tests/common';

if (window.location.href.indexOf('version=test_minor') === -1) {
    throw new Error(`Expected url to have version`);
}

let rememberedFunding = localStorage.getItem('rememberedFunding');

window.paypal.postRobot.sendToParent('meta', {
    locale:               'en_US',
    iframeEligible:       false,
    iframeEligibleReason: 'test',
    rememberedFunding:    rememberedFunding ? JSON.parse(rememberedFunding) : []
});
