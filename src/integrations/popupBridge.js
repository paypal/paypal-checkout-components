/* @flow */

import { once, noop } from 'zoid/src/lib';
import { ZalgoPromise } from 'zalgo-promise/src';
import { error } from 'beaver-logger/client';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { extendUrl, redirect, awaitKey, stringifyError } from '../lib';
import { config } from '../config';
import { FUNDING } from '../constants';

import { determineParameterFromToken, determineUrl } from './checkout';

const OPTYPE = {
    PAYMENT: 'payment',
    CANCEL:  'cancel'
};

const CONTINGENCY = {
    PAYMENT_CANCELLED: 'PAYMENT_CANCELLED'
};

type PopupBridge = {|
    open : (string) => ZalgoPromise<Object>
|};

function wrapPopupBridge(popupBridge : Object) : PopupBridge {
    return {
        open(url : string) : ZalgoPromise<Object> {
            return new ZalgoPromise((resolve, reject) => {

                popupBridge.onComplete = (err, result) => {
                    if (!result) {
                        return reject(new Error('No payload passed in popupBridge.onComplete'));
                    }

                    return err ? reject(err) : resolve(result);
                };

                popupBridge.onCancel = () => {
                    const err = new Error(CONTINGENCY.PAYMENT_CANCELLED);
                    // $FlowFixMe
                    err.code = CONTINGENCY.PAYMENT_CANCELLED;
                    return reject(err);
                };

                popupBridge.open(extendUrl(url, { redirect_uri: popupBridge.getReturnUrlPrefix() }));
            });
        }
    };
}

function validateCheckoutProps(props) {
    if (!props.payment) {
        throw new Error(`Expected props.payment to be passed`);
    }

    if (!props.onAuthorize) {
        throw new Error(`Expected props.onAuthorize to be passed`);
    }

    if (props.env && !config.checkoutUrls[props.env]) {
        throw new Error(`Invalid props.env: ${ props.env }`);
    }
}

function normalizeCheckoutProps(props : Object) : { env : string, payment : Function, onAuthorize : Function, onCancel : Function } {
    const env = props.env = props.env || config.env;

    const payment = props.payment;
    const onAuthorize = once(props.onAuthorize);
    const onCancel = once(props.onCancel || noop);

    return { env, payment, onAuthorize, onCancel };
}

function getUrl(props : { env : string, payment : Function, onAuthorize : Function, onCancel? : Function, commit? : boolean }) : ZalgoPromise<string> {

    const { env, payment } = normalizeCheckoutProps(props);

    return ZalgoPromise.try(payment, { props }).then(token => {
        if (!token) {
            throw new Error(`Expected props.payment to return a payment id or token`);
        }

        return extendUrl(determineUrl(env, FUNDING.PAYPAL, token), {
            [determineParameterFromToken(token)]: token,

            useraction: props.commit ? 'commit' : '',
            native_xo:  '1'
        });
    });
}

function extractDataFromQuery(query : Object) : Object {

    const data : Object = {
        paymentToken: query.token,
        billingToken: query.ba_token,
        paymentID:    query.paymentId,
        payerID:      query.PayerID,
        intent:       query.intent
    };
    
    const { opType, return_uri, cancel_uri } = query;

    if (opType === OPTYPE.PAYMENT) {
        data.returnUrl = return_uri;

    } else if (opType === OPTYPE.CANCEL) {
        data.cancelUrl = cancel_uri;
    }

    return data;
}

function buildActions(query : Object) : Object {
    
    const actions : Object = {
        close:          noop,
        closeComponent: noop
    };

    const { opType, return_uri, cancel_uri } = query;

    if (opType === OPTYPE.PAYMENT) {
        actions.redirect = (win : CrossDomainWindowType = window, redirectUrl : string = return_uri) : ZalgoPromise<void> => {
            return redirect(win, redirectUrl);
        };

    } else if (opType === OPTYPE.CANCEL) {
        actions.redirect = (win : CrossDomainWindowType = window, redirectUrl : string = cancel_uri) : ZalgoPromise<void> => {
            return redirect(win, redirectUrl);
        };
    }

    return actions;
}

function renderThroughPopupBridge(props : Object, popupBridge : PopupBridge) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        validateCheckoutProps(props);

    }).then(() => {

        return getUrl(props);
        
    }).then(url => {

        return popupBridge.open(url);

    }).then(payload => {

        const { opType } = payload.queryItems;
        const { onAuthorize, onCancel } = normalizeCheckoutProps(props);

        const data    = extractDataFromQuery(payload.queryItems);
        const actions = buildActions(payload.queryItems);
        
        if (opType === OPTYPE.PAYMENT) {
            return onAuthorize(data, actions);

        } else if (opType === OPTYPE.CANCEL) {
            return onCancel(data, actions);
 
        } else {
            throw new Error(`Invalid opType: ${ opType }`);
        }

    }).catch(err => {

        if (err && err.code === CONTINGENCY.PAYMENT_CANCELLED) {
            const { onCancel } = normalizeCheckoutProps(props);
            return onCancel({}, {});
        }

        throw err;
    });
}

export function awaitPopupBridge(Button : Object) : ZalgoPromise<PopupBridge> {
    if (Button.xprops && Button.xprops.awaitPopupBridge) {
        return Button.xprops.awaitPopupBridge();
    }

    return awaitKey(window, 'popupBridge').then(popupBridge => {
        return wrapPopupBridge(popupBridge);
    });
}

export function setupPopupBridgeProxy(Checkout : Object, Button : Object) {

    let popupBridge;

    awaitPopupBridge(Button).then(bridge => {
        popupBridge = bridge;
    });

    function doRender(props, original) : ZalgoPromise<void> {
        if (!popupBridge) {
            return original();
        }
        
        return renderThroughPopupBridge(props, popupBridge)
            .catch(err => {
                error(`popup_bridge_error`, { err: stringifyError(err) });
                return original();
            });
    }

    const render = Checkout.render;
    Checkout.render = function popupBridgeRender(props : Object) : ZalgoPromise<void> {
        return doRender(props, () => render.apply(this, arguments));
    };

    const renderTo = Checkout.renderTo;
    Checkout.renderTo = function popupBridgeRenderTo(win : CrossDomainWindowType, props : Object) : ZalgoPromise<void> {
        return doRender(props, () => renderTo.apply(this, arguments));
    };

    const renderPopupTo = Checkout.renderPopupTo;
    Checkout.renderPopupTo = function popupBridgeRenderPopupTo(win : CrossDomainWindowType, props : Object) : ZalgoPromise<void> {
        return doRender(props, () => renderPopupTo.apply(this, arguments));
    };
}
