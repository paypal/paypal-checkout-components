/* @flow */

import { debug, info, warn, error, track, flush } from 'beaver-logger/client';
import { destroyAll as _destroyAll } from 'zoid/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import * as _postRobot from 'post-robot/src'; // eslint-disable-line import/no-namespace

import { isPayPalDomain } from './lib';
import { Checkout as _Checkout } from './checkout';
import { BillingPage as _BillingPage } from './billing';
import { ThreeDomainSecure as _ThreeDomainSecure } from './threeDomainSecure';

import './hacks'; // eslint-disable-line import/no-unassigned-import

export const postRobot = _postRobot;
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export { PopupOpenError } from 'zoid/src';

export { rest } from './api';
export { Button } from './button';
export { Card } from './card';
export { setup } from './setup';
export { config } from './config';
export { ENV, USERS, SOURCE, FUNDING, CARD } from './constants';
export { request, isEligible, isFundingRemembered, allowIframe as forceIframe, allowIframe as isWebView, allowIframe } from './lib';
export { logExperimentTreatment } from './experiments';
export { logFundingEligibility } from './funding';

export const onPossiblyUnhandledException = ZalgoPromise.onPossiblyUnhandledException;

export const version = __PAYPAL_CHECKOUT__.__MINOR_VERSION__;

export let checkout;
export let apps;

if (__PAYPAL_CHECKOUT__.__LEGACY_SUPPORT__) {
    const legacy = require('./legacy');
    checkout = legacy.checkout;
    apps = legacy.apps;
}

// -------------------------------------------------------------

export let Checkout;
export let BillingPage;
export let PayPalCheckout;
export let destroyAll;
export let enableCheckoutIframe;
export let logger;
export let ThreeDomainSecure;

function _enableCheckoutIframe() {
    _Checkout.contexts.iframe = true;
}

if (isPayPalDomain() || __TEST__) {
    Checkout = _Checkout;
    BillingPage = _BillingPage;
    ThreeDomainSecure = _ThreeDomainSecure;
    PayPalCheckout = _Checkout;
    enableCheckoutIframe = _enableCheckoutIframe;
    destroyAll = _destroyAll;
    logger = { debug, info, warn, error, track, flush };
}
