/* @flow */

import type { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import type { ProxyWindow } from '@krakenjs/post-robot/src';
// eslint-disable-next-line no-duplicate-imports
import typeof { send, once, on, toProxyWindow as toProxyWindowType } from '@krakenjs/post-robot/src';
import type { CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';

type PostRobot = {|
    send : send,
    once : once,
    on : on,
    toProxyWindow : toProxyWindowType
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

export function toProxyWindow(win : CrossDomainWindowType | ProxyWindow) : ProxyWindow {
    return getPostRobot().toProxyWindow(win);
}

export function postRobotOnceProxy<T, D>(
    event : string,
    { proxyWin, domain } : {| proxyWin : ProxyWindow, domain : string |},
    handler : ({| data : T |}) => ZalgoPromise<D> | D
) : {| cancel : () => void |} {

    let cancelled = false;

    let cancel = () => {
        cancelled = true;
    };

    proxyWin.awaitWindow().then(win => {
        if (!cancelled) {
            cancel = getPostRobot().once(event, { window: win, domain }, ({ data }) => handler({ data })).cancel;
        }
    });

    return {
        cancel
    };
}

export function getSDKVersion() : string {
    return getPayPal().version;
}
