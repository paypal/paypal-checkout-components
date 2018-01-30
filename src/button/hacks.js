/* @flow */

import { warn } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { rest } from '../api';
import { patchMethod, extend } from '../lib';
import { BUTTON_LABEL, BUTTON_SIZE, BUTTON_COLOR } from '../constants';

import { Button } from './component';

patchMethod(rest.payment, 'create', ({ original : createOriginal, context : createContext, args : [ env, client, options, experience ] }) => {
    if (!options.payment) {
        options = { payment: options, experience };
    }
    return createOriginal.call(createContext, env, client, options);
});

patchMethod(Button.props.style, 'validate', ({ callOriginal, args: [ style ] }) => {

    if (!style) {
        return callOriginal();
    }

    if (style && style.color === 'creditblue') {
        style.color = BUTTON_COLOR.DARKBLUE;
    }

    if (style && style.label === 'generic') {
        style.label = BUTTON_LABEL.PAYPAL;
    }

    if (style && (!style.label || style.label === BUTTON_LABEL.CHECKOUT) && style.size === 'tiny') {
        warn(`unsupported_button_size_tiny`);
        style.size = BUTTON_SIZE.SMALL;
    }

    return callOriginal();
});

patchMethod(Button, 'render', ({ callOriginal, args : [ props ] }) => {

    if (props.billingAgreement) {
        props.payment = props.billingAgreement;
        delete props.billingAgreement;
    }

    return callOriginal();
});

patchMethod(Button.props.payment, 'decorate', ({ original, context, args: [ originalPayment ] }) => {
    return original.call(context, function payment(data : Object, actions : Object) : ZalgoPromise<string> {
        return new ZalgoPromise((resolve, reject) => {

            patchMethod(actions.payment, 'create', ({ original : createOriginal, context : createContext, args : [ options, experience ] }) => {
                if (!options.payment) {
                    options = { payment: options, experience };
                }
                return createOriginal.call(createContext, options);
            });

            function resolveData(token) {
                resolve(token);
            }

            function rejectActions(err) {
                reject(err);
            }

            extend(resolveData, data);
            extend(resolveData, actions);
            extend(rejectActions, actions);

            let ctx = {
                props: {
                    env:    this.props.env,
                    client: this.props.client
                }
            };

            let result;

            try {
                result = originalPayment.call(ctx, resolveData, rejectActions);
            } catch (err) {
                return reject(err);
            }

            if (result && typeof result.then === 'function') {
                return result.then(resolve, reject);
            }

            if (result !== undefined) {
                return resolve(result);
            }
        });
    });
});

if (Button.isChild()) {

    if (!window.Promise) {
        window.Promise = ZalgoPromise;
    }
}
