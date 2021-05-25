/* @flow */


import { extendUrl, getUserAgent, isDevice } from 'belter/src';
import { ENV, FUNDING } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

import { WEB_CHECKOUT_URI } from '../../config';
import { isIOSSafari } from '../../lib';
import { USER_ACTION } from '../../constants';
import { HASH } from '../../native/popup/constants';
import type { FirebaseConfig } from '../../api';
import type { ButtonProps, ServiceData } from '../../button/props';
import type { NativePopupInputParams } from '../../../server/components/native/params';

import { isNativeOptedIn } from './eligibility';
import { NATIVE_DOMAIN, NATIVE_POPUP_DOMAIN, NATIVE_CHECKOUT_URI, NATIVE_CHECKOUT_POPUP_URI, NATIVE_CHECKOUT_FALLBACK_URI } from './config';

export function getNativeDomain({ props } : {| props : ButtonProps |}) : string {
    const { env } = props;

    if (env === ENV.SANDBOX && isNativeOptedIn({ props }) && !(window.xprops && window.xprops.useCorrectNativeSandboxDomain)) {
        return 'https://www.paypal.com';
    }

    return NATIVE_DOMAIN[env];
}

export function getNativePopupDomain({ props } : {| props : ButtonProps |}) : string {
    const { env } = props;

    if (env === ENV.SANDBOX && isNativeOptedIn({ props }) && !(window.xprops && window.xprops.useCorrectNativeSandboxDomain)) {
        return 'https://www.sandbox.paypal.com';
    }

    return NATIVE_POPUP_DOMAIN[env];
}

type GetWebCheckoutUrlOptions = {|
    orderID : string,
    fundingSource : $Values<typeof FUNDING>,
    facilitatorAccessToken : string,
    props : ButtonProps
|};

export function getWebCheckoutUrl({ orderID, props, fundingSource, facilitatorAccessToken } : GetWebCheckoutUrlOptions) : string {
    const { commit } = props;

    return extendUrl(`${ getNativeDomain({ props }) }${ WEB_CHECKOUT_URI }`, {
        query: {
            fundingSource,
            facilitatorAccessToken,
            token:         orderID,
            useraction:    commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
            native_xo:     '1'
        }
    });
}

type GetNativeUrlOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    firebaseConfig : FirebaseConfig,
    fundingSource : $Values<typeof FUNDING>,
    sessionUID : string,
    pageUrl : string,
    orderID : string,
    stickinessID : string
|};

type NativeUrlQuery = {|
    channel : string,
    sdkMeta : string,
    sessionUID : string,
    orderID : string,
    facilitatorAccessToken : string,
    pageUrl : string,
    clientID : string,
    commit : string,
    webCheckoutUrl : string,
    stickinessID : string,
    userAgent : string,
    buttonSessionID : string,
    env : string,
    stageHost : string,
    apiStageHost : string,
    forceEligible : boolean,
    fundingSource : string,
    enableFunding : string,
    domain : string,
    rtdbInstanceID : string
|};

const CHANNEL = {
    DESKTOP: 'desktop-web',
    MOBILE:  'mobile-web'
};

function getNativeUrlQueryParams({ props, serviceData, fundingSource, sessionUID, firebaseConfig, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : NativeUrlQuery {
    const { env, clientID, commit, buttonSessionID, stageHost, apiStageHost, enableFunding, merchantDomain } = props;
    const { facilitatorAccessToken, sdkMeta } = serviceData;

    const webCheckoutUrl = getWebCheckoutUrl({ orderID, props, fundingSource, facilitatorAccessToken });
    const userAgent = getUserAgent();
    const forceEligible = isNativeOptedIn({ props });
    const channel = isDevice() ? CHANNEL.MOBILE : CHANNEL.DESKTOP;

    return {
        channel,
        sdkMeta,
        sessionUID,
        orderID,
        facilitatorAccessToken,
        pageUrl,
        clientID,
        commit:         String(commit),
        webCheckoutUrl: isIOSSafari() ? webCheckoutUrl : '',
        stickinessID,
        userAgent,
        buttonSessionID,
        env,
        stageHost:      stageHost || '',
        apiStageHost:   apiStageHost || '',
        forceEligible,
        fundingSource,
        enableFunding:  enableFunding.join(','),
        domain:         merchantDomain,
        rtdbInstanceID: firebaseConfig.databaseURL
    };
}

export function getNativeUrl({ props, serviceData, fundingSource, firebaseConfig, sessionUID, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : string {
    const queryParams = getNativeUrlQueryParams({ props, serviceData, fundingSource, sessionUID, firebaseConfig, pageUrl, orderID, stickinessID });
    
    return extendUrl(`${ getNativeDomain({ props }) }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
        // $FlowFixMe
        query: queryParams
    });
}

export function getNativeFallbackUrl({ props, serviceData, fundingSource, firebaseConfig, sessionUID, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : string {
    const queryParams = getNativeUrlQueryParams({ props, serviceData, fundingSource, sessionUID, firebaseConfig, pageUrl, orderID, stickinessID });

    return extendUrl(`${ getNativeDomain({ props }) }${ NATIVE_CHECKOUT_FALLBACK_URI[fundingSource] }`, {
        // $FlowFixMe
        query: queryParams
    });
}

type GetNativePopupUrlOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>
|};

const getNativePopupQueryParams = ({ props, serviceData } : GetNativePopupUrlOptions) : NativePopupInputParams => {
    const { buttonSessionID, env, clientID, sessionID, sdkCorrelationID } = props;
    const { sdkMeta, buyerCountry } = serviceData;
    const parentDomain = getDomain();
    return {
        sdkMeta, buttonSessionID, parentDomain, env, clientID, sessionID, sdkCorrelationID, buyerCountry
    };
};

export function getNativePopupUrl({ props, serviceData, fundingSource } : GetNativePopupUrlOptions) : string {
    const queryParams = getNativePopupQueryParams({ props, serviceData, fundingSource });

    const baseURL = extendUrl(`${ getNativePopupDomain({ props }) }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
        // $FlowFixMe
        query: queryParams
    });

    return `${ baseURL }#${ HASH.INIT }`;
}
