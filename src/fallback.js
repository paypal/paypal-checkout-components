
import postRobot from 'post-robot/src';

function match(str, pattern) {
    let regmatch = str.match(pattern);
    if (regmatch) {
        return regmatch[1];
    }
}

function onLegacyFallback(win) {

    let onLegacyPaymentAuthorize;

    window.onLegacyPaymentAuthorize = function(method) {
        onLegacyPaymentAuthorize = method;
    };

    postRobot.once('onLegacyPaymentAuthorize', { window: window.parent }).then(data => {
        onLegacyPaymentAuthorize = data.method;
    });

    let interval = setInterval(() => {
        try {

            let isLegacy = (win.document.body.innerHTML.indexOf('merchantpaymentweb') !== -1 ||
                            win.document.body.innerHTML.indexOf('wapapp') !== -1);

            if (!isLegacy) {
                return;
            }

            clearInterval(interval);

            let send = win.XMLHttpRequest.prototype.send;

            win.XMLHttpRequest.prototype.send = function () {

                if (this._patched) {
                    return send.apply(this, arguments);
                }

                this._patched = true;

                let self = this;
                let onload = this.onload;

                function listener() {

                    if (self.readyState === self.DONE && self.status === 200 && self.responseText) {

                        try {
                            let response = JSON.parse(self.responseText.replace('while (1);', ''));

                            if (response.type === 'redirect' && response.url && onLegacyPaymentAuthorize) {

                                let url = response.url;

                                onLegacyPaymentAuthorize({
                                    returnUrl:    url,
                                    paymentToken: match(url, /token=((EC-)?[A-Z0-9]+)/),
                                    billingToken: match(url, /ba_token=((BA-)?[A-Z0-9]+)/),
                                    payerID:      match(url, /PayerID=([A-Z0-9]+)/),
                                    paymentID:    match(url, /paymentId=((PAY-)?[A-Z0-9]+)/)
                                });

                                if (win.PAYPAL && win.PAYPAL.Checkout && win.PAYPAL.Checkout.XhrResponse && win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES) {
                                    Object.defineProperty(win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES, 'Redirect', {
                                        get() {
                                            return Math.random();
                                        }
                                    });
                                }

                                if (win.mob && win.mob.Xhr && win.mob.Xhr.prototype._xhrOnReady) {
                                    win.mob.Xhr.prototype._xhrOnReady = function() {};
                                }

                                setTimeout(() => {
                                    if (!win.closed) {
                                        win.close();
                                    }
                                }, 500);

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

                        Object.defineProperty(this, 'onload', {
                            get() {
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
    }, 1000);
}

if (window.location.href.indexOf('paypal.com') !== -1) {
    window.onLegacyFallback = onLegacyFallback;
}
