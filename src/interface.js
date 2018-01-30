/* @flow */

import { destroyAll as _destroyAll } from 'xcomponent/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import * as _postRobot from 'post-robot/src'; // eslint-disable-line import/no-namespace

import { isPayPalDomain } from './lib';

export const postRobot = _postRobot;
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export { PopupOpenError } from 'xcomponent/src';

export { rest } from './api';
export { Button } from './button';
export { setup } from './setup';
export { config } from './config';
export { ENV, USERS, SOURCE, FUNDING, CARD } from './constants';
export { request, isEligible, isFundingRemembered, allowIframe as forceIframe, allowIframe as isWebView, allowIframe } from './lib';
export { logExperimentTreatment } from './experiments';

export let onPossiblyUnhandledException = ZalgoPromise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;

export let checkout;
export let apps;

if (__LEGACY_SUPPORT__) {
    let legacy = require('./legacy');
    checkout = legacy.checkout;
    apps = legacy.apps;
}


// -------------------------------------------------------------

export let Checkout;
export let PayPalCheckout;
export let destroyAll;
export let enableCheckoutIframe;

if (isPayPalDomain() || __TEST__) {

    let CheckoutPromise = import('./checkout').then(mod => mod.Checkout);

    Checkout = {

        render: (...args) =>
            CheckoutPromise.then(Result =>
                Result.render(...args)),

        renderTo: (...args) =>
            CheckoutPromise.then(Result =>
                Result.renderTo(...args)),

        renderPopupTo: (...args) =>
            CheckoutPromise.then(Result =>
                Result.renderPopupTo(...args)),

        renderIframeTo: (...args) =>
            CheckoutPromise.then(Result =>
                Result.renderIframeTo(...args)),

        contexts: {
            set iframe(enabled) {
                CheckoutPromise.then(Result => {
                    Result.contexts.iframe = enabled;
                });
            },
            set popup(enabled) {
                CheckoutPromise.then(Result => {
                    Result.contexts.popup = enabled;
                });
            }
        },

        props: {
            set timeout(timeout) {
                CheckoutPromise.then(Result => {
                    Result.props.timeout = timeout;
                });
            }
        }
    };

    enableCheckoutIframe = () => {
        CheckoutPromise.then(Result => {
            Result.contexts.iframe = true;
        });
    };

    destroyAll = _destroyAll;
}
