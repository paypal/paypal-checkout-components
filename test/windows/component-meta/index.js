/* @flow */

import { sendToParent } from 'post-robot/src';

import '../../tests/common';

let rememberedFunding = localStorage.getItem('rememberedFunding');

sendToParent('meta', {
    locale:               'en_US',
    iframeEligible:       false,
    iframeEligibleReason: 'test',
    rememberedFunding:    rememberedFunding ? JSON.parse(rememberedFunding) : []
});
