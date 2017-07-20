/* @flow */

import * as _postRobot from 'post-robot/src';
export let postRobot = _postRobot;

export { PopupOpenError } from 'xcomponent/src';

import { ZalgoPromise } from 'zalgo-promise/src';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';

export { rest } from './api';
export { Button } from './components';
export { setup } from './setup';
export { config, ENV, USERS, SOURCE } from './config';
export { request, isEligible, isWebView, forceIframe, logExperimentTreatment } from './lib';

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

import { isPayPalDomain } from './lib';
import { Checkout as CheckoutComponent } from './components';
import { Login as LoginComponent } from './components';
import * as xcomponent from 'xcomponent/src';

export let Checkout;
export let PayPalCheckout;
export let Login;
export let destroyAll;

if (isPayPalDomain() || __TEST__) {
    Checkout = CheckoutComponent;
    PayPalCheckout = CheckoutComponent;
    Login = LoginComponent;
    destroyAll = xcomponent.destroyAll;
}
