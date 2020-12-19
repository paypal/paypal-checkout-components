/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

type PostRobot = {|
    // eslint-disable-next-line no-undef
    send : <D, R>(CrossDomainWindowType, string, D, {| domain : string |}) => ZalgoPromise<R>
|};

type PayPal = {|
    postRobot : PostRobot,
    version : string
|};

export function getPayPal() : PayPal {
    if (!window.paypal) {
        throw new Error(`paypal not found`);
    }

    return window.paypal;
}

export function getPostRobot() : PostRobot {
    const paypal = getPayPal();

    if (!paypal.postRobot) {
        throw new Error(`paypal.postRobot not found`);
    }

    return paypal.postRobot;
}

export function getSDKVersion() : string {
    return getPayPal().version;
}
