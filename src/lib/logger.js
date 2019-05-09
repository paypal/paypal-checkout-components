/* @flow */

import { getLogger } from '@paypal/sdk-client/src';
import { getQueryParam } from 'belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { FPTI_CONTEXT_TYPE } from '../constants';

import { getButtonSessionID } from './session';

function getRefererDomain() : string {
    return (window.xprops && window.xprops.getParentDomain)
        ? window.xprops.getParentDomain()
        : window.location.host;
}

function getOrderID() : ?string {
    if (window.root && window.root.token) {
        return window.root.token;
    }

    const queryToken = getQueryParam('token');

    if (queryToken) {
        return queryToken;
    }
}

export function setupLogger() {
    getLogger().addTrackingBuilder(() => {
        const orderID = getOrderID();
        const buttonSessionID = getButtonSessionID();

        return {
            [FPTI_KEY.CONTEXT_TYPE]:       orderID ? FPTI_CONTEXT_TYPE.ORDER_ID : FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID,
            [FPTI_KEY.CONTEXT_ID]:         orderID ? orderID : buttonSessionID,
            [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
            [FPTI_KEY.TOKEN]:              orderID,
            [FPTI_KEY.REFERER]:            getRefererDomain()
        };
    });
}
