/* @flow */

import postRobot from 'post-robot/src';

import { isPayPalDomain, noop } from '../lib';
import { config } from '../config';

function match(str : string, pattern : RegExp) : ?string {
    let regmatch : ?Array<string> = str.match(pattern);
    if (regmatch) {
        return regmatch[1];
    }
}

let onAuthorize : ?Function;

// Bridge

if (isPayPalDomain()) {
    postRobot.on('onLegacyPaymentAuthorize', { window: window.parent }, ({ data } : { data : { method : Function } }) => {
        onAuthorize = data.method;
    });
}

// Button / Merchant

window.onLegacyPaymentAuthorize = (method : Function) => {
    onAuthorize = method;

    if (!isPayPalDomain()) {
        return postRobot.openBridge(config.bridgeUrl, config.bridgeDomain).then((bridge : window) => {
            return postRobot.send(bridge, 'onLegacyPaymentAuthorize', { method }, { domain: config.paypalDomain })
                .then(noop);
        });
    }
};

// Bridge / Button

window.watchForLegacyFallback = (win : window) => {
    let interval = setInterval(() => {
        try {
            let isLegacy = (win.document.body.innerHTML.indexOf('merchantpaymentweb') !== -1 ||
                            win.document.body.innerHTML.indexOf('wapapp') !== -1);

            if (!isLegacy || win.ppxoMatching || win.closed) {
                return;
            }

            win.ppxoWatching = true;

            let send = win.XMLHttpRequest.prototype.send;

            win.XMLHttpRequest.prototype.send = function() : void {

                if (this._patched) {
                    return send.apply(this, arguments);
                }

                this._patched = true;

                let self = this;
                let onload = this.onload;

                function listener() : void {

                    if (self.readyState === self.DONE && self.status === 200 && self.responseText) {

                        try {
                            let response = JSON.parse(self.responseText.replace('while (1);', ''));

                            if (response.type === 'redirect' && response.url && onAuthorize) {

                                clearInterval(interval);

                                let url = response.url;

                                onAuthorize({
                                    returnUrl:    url,
                                    paymentToken: match(url, /token=((EC-)?[A-Z0-9]+)/),
                                    billingToken: match(url, /ba_token=((BA-)?[A-Z0-9]+)/),
                                    payerID:      match(url, /PayerID=([A-Z0-9]+)/),
                                    paymentID:    match(url, /paymentId=((PAY-)?[A-Z0-9]+)/)
                                });

                                onAuthorize = null;

                                if (win.PAYPAL && win.PAYPAL.Checkout && win.PAYPAL.Checkout.XhrResponse && win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES) {
                                    Object.defineProperty(win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES, 'Redirect', {
                                        value: Math.random().toString()
                                    });
                                }

                                if (win.mob && win.mob.Xhr && win.mob.Xhr.prototype._xhrOnReady) {
                                    win.mob.Xhr.prototype._xhrOnReady = noop;
                                }

                                setTimeout(() => {
                                    if (!win.closed) {
                                        win.close();
                                    }
                                }, 100);

                                return;
                            }

                        } catch (err) {
                            return;
                        }
                    }

                    if (onload) {
                        return onload.apply(this, arguments);
                    }
                }

                if (this.onload !== listener) {

                    try {

                        delete this.onload;
                        this.onload = listener;

                        // $FlowFixMe
                        Object.defineProperty(this, 'onload', {
                            get() : Function {
                                return listener;
                            },
                            set(handler) {
                                onload = handler;
                            }
                        });

                    } catch (err) {

                        // pass
                    }

                }

                return send.apply(this, arguments);
            };

        } catch (err) {
            // pass
        }
    }, 100);
};


window.onLegacyFallback = window.watchForLegacyFallback;
