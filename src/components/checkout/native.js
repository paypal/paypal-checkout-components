/* @flow */

import { getter, memoize, once, noop } from 'xcomponent/src/lib';
import { SyncPromise } from 'sync-browser-mocks/src/promise';

import { extendUrl, redirect } from '../../lib';
import { determineParameterFromToken, determineUrlFromToken, parseParamsFromUrl } from './util';
import { config } from '../../config';

function ternary(condition, truthyResult, falsyResult) : SyncPromise<*> {
    return SyncPromise.resolve(condition).then(result => {
        return result ? truthyResult : falsyResult;
    });
}

function renderNative(props : Object) : SyncPromise<void> {

    if (!props.payment) {
        throw new Error(`Expected props.payment to be passed`);
    }

    if (!props.onAuthorize) {
        throw new Error(`Expected props.onAuthorize to be passed`);
    }

    if (props.env && !config.checkoutUrls[props.env]) {
        throw new Error(`Invalid props.env: ${props.env}`);
    }

    let env = props.env || config.env;

    let payment = memoize(getter(props.payment.bind({ props })));
    let onAuthorize = once(props.onAuthorize);
    let onCancel = once(props.onCancel || noop);

    let awaitUrl = ternary(props.url, props.url, payment().then(token => {
        if (token) {
            return extendUrl(determineUrlFromToken(env, token), {
                [ determineParameterFromToken(token) ]: token,
                useraction: props.commit ? 'commit' : ''
            });
        }
    }));

    return awaitUrl.then(url => {

        console.warn(url);

        window.ppnativexo.start(url, {

            onAuthorize(returnUrl : string) {

                let data = parseParamsFromUrl(returnUrl);
                data.returnUrl = returnUrl;

                onAuthorize(data, {

                    close() {
                        // pass
                    },

                    redirect(win : typeof window = window, redirectUrl : string = returnUrl) : SyncPromise<void> {
                        return redirect(win, redirectUrl);
                    }
                });
            },

            onCancel(cancelUrl : string) {

                let data = parseParamsFromUrl(cancelUrl);
                data.cancelUrl = cancelUrl;

                onCancel(data, {

                    close() {
                        // pass
                    },

                    redirect(win : typeof window = window, redirectUrl : string = cancelUrl) : SyncPromise<void> {
                        return redirect(win, redirectUrl);
                    }
                });
            }
        });
    });
}


export function setupNativeProxy(Checkout : Object) {

    function branchNative(props : Object, original : Function) : SyncPromise<void> {

        if (!window.ppnativexo || Checkout.contexts.lightbox) {
            return original();
        }

        return renderNative(props);
    }

    let render = Checkout.render;
    Checkout.render = function(props : Object) : SyncPromise<void> {
        return branchNative(props, () => render.apply(this, arguments));
    };

    let renderTo = Checkout.renderTo;
    Checkout.renderTo = function(win : typeof window, props : Object) : SyncPromise<void> {
        return branchNative(props, () => renderTo.apply(this, arguments));
    };

    let init = Checkout.init;
    Checkout.init = function(props) : Object {
        let instance = init.apply(this, arguments);

        let _render = instance.render;
        instance.render = function() : SyncPromise<void> {
            return branchNative(props, () => _render.apply(this, arguments));
        };

        let _renderTo = instance.renderTo;
        instance.renderTo = function() : SyncPromise<void> {
            return branchNative(props, () => _renderTo.apply(this, arguments));
        };

        return instance;
    };
}
