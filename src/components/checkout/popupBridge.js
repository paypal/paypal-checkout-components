/* @flow */

import { once, noop } from 'xcomponent/src/lib';
import { ZalgoPromise } from 'zalgo-promise/src';
import { error } from 'beaver-logger/client';

import { extendUrl, redirect, awaitKey, stringifyError } from '../../lib';
import { config, FUNDING } from '../../config';

import { determineParameterFromToken, determineUrl } from './util';

function ternary(condition, truthyResult, falsyResult) : ZalgoPromise<*> {
    return ZalgoPromise.resolve(condition).then(result => {
        return result ? truthyResult() : falsyResult();
    });
}

export function getPopupBridgeOpener(popupBridge : ?Object = window.popupBridge) : ?Function {

    if (popupBridge) {

        popupBridge.opener = popupBridge.opener || ((url, callback) => {

            if (!popupBridge) {
                throw new Error(`Popup Bridge not available`);
            }

            popupBridge.onComplete = callback;
            popupBridge.open(extendUrl(url, { redirect_uri: popupBridge.getReturnUrlPrefix() }));
        });

        return popupBridge.opener;
    }

    if (window.xprops && window.xprops.popupBridge && window.xprops.popupBridge.open) {
        return window.xprops.popupBridge.open;
    }
}

export function awaitPopupBridgeOpener() : ZalgoPromise<Function> {

    if (window.xprops && window.xprops.popupBridge) {
        return window.xprops.popupBridge.awaitOpener().then(opener => {

            window.popupBridge = window.popupBridge || {};
            window.popupBridge.opener = opener;

            return opener;
        });
    }

    return awaitKey(window, 'popupBridge').then(popupBridge => {
        let opener = getPopupBridgeOpener(popupBridge);

        if (opener) {
            return opener;
        }

        throw new Error(`Expected opener to be present`);
    });
}

function renderThroughPopupBridge(props : Object, openBridge : Function) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        if (!props.payment && !props.url) {
            throw new Error(`Expected props.payment or props.url to be passed`);
        }

        if (!props.onAuthorize) {
            throw new Error(`Expected props.onAuthorize to be passed`);
        }

        if (props.env && !config.checkoutUrls[props.env]) {
            throw new Error(`Invalid props.env: ${ props.env }`);
        }

        let env = props.env = props.env || config.env;

        let onAuthorize = once(props.onAuthorize);
        let onCancel = once(props.onCancel || noop);

        let awaitUrl = ternary(props.url, () => props.url, () => ZalgoPromise.try(props.payment, { props }).then(token => {
            if (token) {
                return extendUrl(determineUrl(env, FUNDING.PAYPAL, token), {
                    [ determineParameterFromToken(token) ]: token,

                    useraction: props.commit ? 'commit' : '',
                    native_xo:  '1'
                });
            }
        }));

        return awaitUrl.then(url => {

            return new ZalgoPromise((resolve, reject) => {
                openBridge(url, (err, payload) => {

                    if (err) {
                        return reject(err);
                    }

                    if (!payload) {
                        return reject(new Error('No payload passed in popupBridge.onComplete'));
                    }

                    let query = payload.queryItems;

                    let data : Object = {
                        paymentToken: query.token,
                        billingToken: query.ba_token,
                        paymentID:    query.paymentId,
                        payerID:      query.payerId,
                        intent:       query.intent
                    };

                    let actions : Object = {
                        close() {
                            // pass
                        },
                        closeComponent() {
                            // pass
                        }
                    };

                    if (query.opType === 'payment') {

                        data.returnUrl = query.return_uri;

                        actions.redirect = (win : CrossDomainWindowType = window, redirectUrl : string = data.returnUrl) : ZalgoPromise<void> => {
                            return redirect(win, redirectUrl);
                        };

                        onAuthorize(data, actions);
                        resolve();

                    } else if (query.opType === 'cancel') {

                        data.cancelUrl = query.cancel_uri;

                        actions.redirect = (win : CrossDomainWindowType = window, redirectUrl : string = data.cancelUrl) : ZalgoPromise<void> => {
                            return redirect(win, redirectUrl);
                        };

                        onCancel(data, actions);
                        resolve();

                    } else {

                        return reject(new Error(`Did not find opType in popup bridge returned query params`));
                    }
                });
            });
        });
    });
}


export function setupPopupBridgeProxy(Checkout : Object) {

    function doRender(props, original) : ZalgoPromise<void> {
        let openBridge = getPopupBridgeOpener();
        return openBridge ? renderThroughPopupBridge(props, openBridge).catch((err) => {
            error(`popup_bridge_error`, { err: stringifyError(err) });
            return original();
        }) : original();
    }

    let render = Checkout.render;
    Checkout.render = function popupBridgeRender(props : Object) : ZalgoPromise<void> {
        return doRender(props, () => render.apply(this, arguments));
    };

    let renderTo = Checkout.renderTo;
    Checkout.renderTo = function popupBridgeRenderTo(win : CrossDomainWindowType, props : Object) : ZalgoPromise<void> {
        return doRender(props, () => renderTo.apply(this, arguments));
    };

    let init = Checkout.init;
    Checkout.init = function popupBridgeInit(props) : Object {
        let instance = init.apply(this, arguments);

        let _render = instance.render;
        instance.render = function popupBridgeInstanceRender() : ZalgoPromise<void> {
            return doRender(props, () => _render.apply(this, arguments));
        };

        let _renderTo = instance.renderTo;
        instance.renderTo = function popupBridgeInstanceRenderTo() : ZalgoPromise<void> {
            return doRender(props, () => _renderTo.apply(this, arguments));
        };

        return instance;
    };
}
