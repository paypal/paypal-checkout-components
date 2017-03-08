/* @flow */

import { getter, memoize, once, noop } from 'xcomponent/src/lib';
import { SyncPromise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';

import { extendUrl, redirect } from '../../lib';
import { determineParameterFromToken, determineUrlFromToken } from './util';
import { config } from '../../config';
import { getBridgeOpen } from '../common';

function ternary(condition, truthyResult, falsyResult) : SyncPromise<*> {
    return SyncPromise.resolve(condition).then(result => {
        return result ? truthyResult : falsyResult;
    });
}

function renderBridge(props : Object, openBridge : Function) : SyncPromise<void> {
    return SyncPromise.try(() => {

        if (!props.payment) {
            throw new Error(`Expected props.payment to be passed`);
        }

        if (!props.onAuthorize) {
            throw new Error(`Expected props.onAuthorize to be passed`);
        }

        if (props.env && !config.checkoutUrls[props.env]) {
            throw new Error(`Invalid props.env: ${props.env}`);
        }

        let env = props.env = props.env || config.env;

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

            return new SyncPromise((resolve, reject) => {
                openBridge(url, (err, payload) => {

                    if (err) {
                        return reject(err);
                    }

                    if (!payload) {
                        return reject(new Error('No payload passed in popupBridge.onComplete'));
                    }

                    let query = payload.queryItems;

                    let data = {
                        paymentToken: query.token,
                        billingToken: query.billingToken,
                        paymentID:    query.paymentId,
                        payerID:      query.payerID,
                        returnUrl:    query.returnUrl,
                        cancelUrl:    query.cancelUrl
                    };

                    let actions : Object = {
                        close() {
                            // pass
                        }
                    };

                    if (query.opType === 'payment') {

                        actions.redirect = (win : any = window, redirectUrl : string = data.returnUrl) : SyncPromise<void> => {
                            return redirect(win, redirectUrl);
                        };

                        onAuthorize(data, actions);
                        resolve();

                    } else if (query.opType === 'cancel') {

                        actions.redirect = (win : any = window, redirectUrl : string = data.cancelUrl) : SyncPromise<void> => {
                            return redirect(win, redirectUrl);
                        };

                        onCancel(data, actions);
                        resolve();
                    }
                });
            });
        });
    });
}


export function setupBridgeProxy(Checkout : Object) {

    function doRender(props, original) : SyncPromise<void> {
        let openBridge = getBridgeOpen();
        return openBridge ? renderBridge(props, openBridge).catch((err) => {
            $logger.error(`render_bridge_error`, { err: err.stack || err.toString() });
            return original();
        }) : original();
    }

    let render = Checkout.render;
    Checkout.render = function(props : Object) : SyncPromise<void> {
        return doRender(props, () => render.apply(this, arguments));
    };

    let renderTo = Checkout.renderTo;
    Checkout.renderTo = function(win : any, props : Object) : SyncPromise<void> {
        return doRender(props, () => renderTo.apply(this, arguments));
    };

    let init = Checkout.init;
    Checkout.init = function(props) : Object {
        let instance = init.apply(this, arguments);

        let _render = instance.render;
        instance.render = function() : SyncPromise<void> {
            return doRender(props, () => _render.apply(this, arguments));
        };

        let _renderTo = instance.renderTo;
        instance.renderTo = function() : SyncPromise<void> {
            return doRender(props, () => _renderTo.apply(this, arguments));
        };

        return instance;
    };
}
