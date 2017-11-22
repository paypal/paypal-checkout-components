/* @flow */

import { destroyAll as _destroyAll } from 'xcomponent/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import * as _postRobot from 'post-robot/src'; // eslint-disable-line import/no-namespace

import { isPayPalDomain } from './lib';
import {  Checkout as _Checkout, Login as _Login, enableCheckoutIframe as _enableCheckoutIframe } from './components';

export const postRobot = _postRobot;
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export { PopupOpenError } from 'xcomponent/src';

export { rest } from './api';
export { Button, allowIframe as forceIframe, allowIframe as isWebView, allowIframe } from './components';
export { setup } from './setup';
export { config, ENV, USERS, SOURCE, FUNDING, CARD } from './config';
export { request, isEligible, isFundingRemembered } from './lib';
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
export let Login;
export let destroyAll;
export let enableCheckoutIframe;

if (isPayPalDomain() || __TEST__) {
    Checkout = _Checkout;
    PayPalCheckout = _Checkout;
    Login = _Login;
    enableCheckoutIframe = _enableCheckoutIframe;
    destroyAll = _destroyAll;
}
