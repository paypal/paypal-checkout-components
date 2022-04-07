/* @flow */

import type { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { ENV, FUNDING, PLATFORM } from '@paypal/sdk-constants/src';
import { supportsPopups, isIos, isAndroid } from '@krakenjs/belter/src';
import type { CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import type { ProxyWindow } from '@krakenjs/post-robot/src';

import { type NativeEligibility, getNativeEligibility } from '../../api';
import { enableAmplitude, getStorageState, isIOSSafari, isAndroidChrome, toProxyWindow } from '../../lib';
import { LSAT_UPGRADE_EXCLUDED_MERCHANTS } from '../../constants';
import type { ButtonProps, ServiceData } from '../../button/props';
import type { IsEligibleOptions, IsPaymentEligibleOptions } from '../types';

import { NATIVE_CHECKOUT_URI, NATIVE_CHECKOUT_POPUP_URI, NATIVE_CHECKOUT_FALLBACK_URI, SUPPORTED_FUNDING } from './config';

export function isTestGroup(nativeEligibility : NativeEligibility, fundingSource : $Values<typeof FUNDING>) : boolean {
    const fundingEligibility = nativeEligibility[fundingSource];

    if (fundingEligibility && fundingEligibility.eligibility) {
        return true;
    }

    return false;
}

export function isControlGroup(nativeEligibility : NativeEligibility, fundingSource : $Values<typeof FUNDING>) : boolean {
    const fundingEligibility = nativeEligibility[fundingSource];

    if (fundingEligibility && !fundingEligibility.eligibility && fundingEligibility.ineligibilityReason === 'experimentation_ineligibility') {
        return true;
    }

    return false;
}

export function isAnyTestOrControlGroup({ nativeEligibility } : {| nativeEligibility : NativeEligibility |}) : boolean {
    for (const fundingSource of SUPPORTED_FUNDING) {
        if (isTestGroup(nativeEligibility, fundingSource) || isControlGroup(nativeEligibility, fundingSource)) {
            return true;
        }
    }

    return false;
}

export function isNativeOptedIn({ props } : {| props : ButtonProps |}) : boolean {
    const { enableNativeCheckout } = props;

    if (enableNativeCheckout) {
        return true;
    }

    try {
        if (window.localStorage.getItem('__native_checkout__')) {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}

export function isNativeOptOut() : boolean {
    const now = Date.now();
    let optOutLifetime = 0;
    getStorageState(state => {
        const { nativeOptOutLifetime } = state;
        if (nativeOptOutLifetime && typeof nativeOptOutLifetime === 'number') {
            optOutLifetime = nativeOptOutLifetime;
        }
    });
    return optOutLifetime > now;
}

type PrefetchNativeEligibilityOptions = {|
    props : ButtonProps,
    serviceData : ServiceData
|};

let nativeEligibilityResults;

export function prefetchNativeEligibility({ props, serviceData } : PrefetchNativeEligibilityOptions) : ZalgoPromise<void> {
    const { clientID, onShippingChange, currency, platform, env,
        vault, buttonSessionID, enableFunding, merchantDomain } = props;
    const { merchantID, buyerCountry, cookies } = serviceData;
    const shippingCallbackEnabled = Boolean(onShippingChange);

    return getNativeEligibility({
        vault, platform, shippingCallbackEnabled, clientID, buyerCountry, currency, buttonSessionID, cookies, enableFunding,
        stickinessID: null,
        skipElmo:     true,
        merchantID:   merchantID[0],
        domain:       merchantDomain
    }).then(nativeEligibility => {
        nativeEligibilityResults = nativeEligibility;
 
        if (isAnyTestOrControlGroup({ nativeEligibility })) {
            enableAmplitude({ env });
        }
    });
}

export function canUsePopupAppSwitch({ fundingSource, win } : {| fundingSource : ?$Values<typeof FUNDING>, win? : ?(ProxyWindow | CrossDomainWindowType) |}) : boolean {
    if (!isIOSSafari() && !isAndroidChrome()) {
        return false;
    }

    if (fundingSource && fundingSource !== FUNDING.PAYPAL && fundingSource !== FUNDING.VENMO) {
        return false;
    }

    if (win && !toProxyWindow(win).getWindow()) {
        return false;
    }

    return true;
}

export function canUseNativeQRCode({ fundingSource, win } : {| fundingSource : ?$Values<typeof FUNDING>, win? : ?(ProxyWindow | CrossDomainWindowType) |}) : boolean {
    if (isIos() || isAndroid()) {
        return false;
    }

    if (fundingSource && fundingSource !== FUNDING.VENMO) {
        return false;
    }

    if (win) {
        return false;
    }

    return true;
}

export function isNativeEligible({ props, config, serviceData } : IsEligibleOptions) : boolean {
    const { clientID, fundingSource, onShippingChange, createBillingAgreement, createSubscription, env, platform } = props;
    const { firebase: firebaseConfig } = config;
    const { cookies, merchantID, fundingEligibility } = serviceData;
    const isVenmoEligible = fundingEligibility?.venmo?.eligible;

    if (!firebaseConfig) {
        return false;
    }

    // If Desktop and venmo not eligible, native payment flow is not eligible
    if (platform && platform === PLATFORM.DESKTOP && !isVenmoEligible) {
        return false;
    }

    if (!canUsePopupAppSwitch({ fundingSource }) && !canUseNativeQRCode({ fundingSource })) {
        return false;
    }

    if (isNativeOptOut()) {
        return false;
    }
    
    if (isNativeOptedIn({ props })) {
        return true;
    }

    if (!cookies && fundingSource === FUNDING.PAYPAL) {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    if (createBillingAgreement || createSubscription) {
        return false;
    }

    if (env === ENV.LOCAL || env === ENV.STAGE) {
        return false;
    }

    if (merchantID.length > 1) {
        return false;
    }

    if (LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID) !== -1) {
        return false;
    }

    return true;
}

export function isNativePaymentEligible({ props, payment } : IsPaymentEligibleOptions) : boolean {

    const { platform } = props;
    const { fundingSource, win } = payment;

    if (!NATIVE_CHECKOUT_URI[fundingSource] || !NATIVE_CHECKOUT_POPUP_URI[fundingSource] || !NATIVE_CHECKOUT_FALLBACK_URI[fundingSource]) {
        return false;
    }

    if (!canUsePopupAppSwitch({ fundingSource, win }) && !canUseNativeQRCode({ fundingSource, win })) {
        return false;
    }

    // For Venmo desktop
    if (platform && platform === PLATFORM.DESKTOP) {
        return nativeEligibilityResults && nativeEligibilityResults[fundingSource]
            ? nativeEligibilityResults[fundingSource].eligibility
            : false;
    }

    if (win && !toProxyWindow(win).getWindow()) {
        return false;
    }
    
    return true;
}

export type NativeFallbackOptions = {|
    type? : string,
    skip_native_duration? : number,
    fallback_reason? : string
|};

export function getDefaultNativeFallbackOptions() : NativeFallbackOptions {
    // $FlowFixMe
    return {};
}

export function setNativeOptOut(fallbackOptions : NativeFallbackOptions) : boolean {
    const NATIVE_OPT_OUT = 'native_opt_out';
    const { type, skip_native_duration } = fallbackOptions;

    if (type && type === NATIVE_OPT_OUT) {

        // Opt-out 6 weeks from native experience as default
        let OPT_OUT_TIME = 6 * 7 * 24 * 60 * 60 * 1000;

        const parsedSkipDuration = parseInt(skip_native_duration, 10);

        if (parsedSkipDuration && typeof parsedSkipDuration === 'number') {
            OPT_OUT_TIME = parsedSkipDuration;
        }
        
        const now = Date.now();
        getStorageState(state => {
            state.nativeOptOutLifetime = now + OPT_OUT_TIME;
        });
        return true;
    }
    return false;
}
