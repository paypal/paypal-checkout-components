/* @flow */

import { on, send, bridge } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType, SameDomainWindowType } from 'cross-domain-utils/src';

import { isPayPalDomain, noop, getScriptVersion, extendUrl } from '../lib';
import { config } from '../config';

function match(str : string, pattern : RegExp) : ?string {
    const regmatch : ?$ReadOnlyArray<string> = str.match(pattern);
    if (regmatch) {
        return regmatch[1];
    }
}

let onAuthorize : ?Function;

// Post-Bridge

if (isPayPalDomain()) {
    on('onLegacyPaymentAuthorize', { window: window.parent }, ({ data } : { data : { method : Function } }) => {
        onAuthorize = data.method;
    });
}

// Button / Merchant

export function onLegacyPaymentAuthorize(method : Function) : ZalgoPromise<void> {
    onAuthorize = method;

    return ZalgoPromise.try(() => {
        if (bridge && !isPayPalDomain()) {
            return bridge.openBridge(extendUrl(config.postBridgeUrl, { version: getScriptVersion() }), config.postBridgeDomain).then((postBridge : CrossDomainWindowType) => {
                return send(postBridge, 'onLegacyPaymentAuthorize', { method }, { domain: config.paypalDomain })
                    .then(noop);
            });
        }
    });
}

window.onLegacyPaymentAuthorize = onLegacyPaymentAuthorize;

// Post-Bridge / Button

window.watchForLegacyFallback = (win : SameDomainWindowType) => {
    const interval = setInterval(() => {
        try {
            const isLegacy = (win.document.body.innerHTML.indexOf('merchantpaymentweb') !== -1 ||
                            win.document.body.innerHTML.indexOf('wapapp') !== -1);

            if (!isLegacy || win.ppxoWatching || win.closed) {
                return;
            }

            win.ppxoWatching = true;

            const XMLHttpRequestsend = win.XMLHttpRequest.prototype.send;

            win.XMLHttpRequest.prototype.send = function overrideXMLHttpRequestSend() : void {

                if (this._patched) {
                    return XMLHttpRequestsend.apply(this, arguments);
                }

                this._patched = true;

                const self = this;
                let onload = this.onload;

                function listener() : void {

                    if (self.readyState === self.DONE && self.status === 200 && self.responseText) {

                        try {
                            const response = JSON.parse(self.responseText.replace('while (1);', ''));

                            if (response.type === 'redirect' && response.url && onAuthorize) {

                                const url = response.url;

                                clearInterval(interval);
                                win.close();

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
                        this.addEventListener('load', listener);

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

                return XMLHttpRequestsend.apply(this, arguments);
            };

        } catch (err) {
            // pass
        }
    }, 100);
};

window.onLegacyFallback = window.watchForLegacyFallback;
