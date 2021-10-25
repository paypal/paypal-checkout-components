/* @flow */


import { extendUrl, isDevice } from 'belter/src';
import { COUNTRY, ENV, FUNDING } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

import { WEB_CHECKOUT_URI } from '../../config';
import { createExperiment, isIOSSafari } from '../../lib';
import { USER_ACTION } from '../../constants';
import { HASH } from '../../native/popup/constants';
import { CHANNEL } from '../../../server/components/native/constants';
import type { ButtonProps, ServiceData, Config } from '../../button/props';
import type { NativePopupInputParams } from '../../../server/components/native/params';

import { isNativeOptedIn } from './eligibility';
import { NATIVE_DOMAIN, HISTORY_NATIVE_POPUP_DOMAIN, MOBILE_NATIVE_POPUP_DOMAIN, NATIVE_CHECKOUT_URI, NATIVE_CHECKOUT_POPUP_URI, NATIVE_CHECKOUT_FALLBACK_URI } from './config';

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

    const experimentOptions = {
        sample: 0
    };
    const isMobileNativePopupDomainEnabled = createExperiment('enable_mobile_native_popup_domain', experimentOptions).isEnabled();

    const nativePopupDomain = isMobileNativePopupDomainEnabled ?
        MOBILE_NATIVE_POPUP_DOMAIN :
        HISTORY_NATIVE_POPUP_DOMAIN;
        
    return nativePopupDomain[env];
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
    config : Config,
    fundingSource : $Values<typeof FUNDING>,
    sessionUID : string,
    pageUrl : string,
    orderID : string,
    stickinessID : string
|};

type NativeUrlQuery = {|
    channel : string,
    sdkMeta? : string,
    sessionUID : string,
    orderID : string,
    facilitatorAccessToken : string,
    pageUrl : string,
    clientID : string,
    commit : string,
    webCheckoutUrl : string,
    stickinessID : string,
    buttonSessionID : string,
    env : string,
    stageHost : string,
    apiStageHost : string,
    forceEligible : boolean,
    fundingSource : string,
    enableFunding : string,
    domain : string,
    rtdbInstanceID : string,
    buyerCountry : $Values<typeof COUNTRY>,
    sdkVersion : string
|};

function getNativeUrlQueryParams({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : NativeUrlQuery {
    const { env, clientID, commit, buttonSessionID, stageHost, apiStageHost, enableFunding, merchantDomain } = props;
    const { facilitatorAccessToken, sdkMeta, buyerCountry } = serviceData;
    const { sdkVersion, firebase } = config;

    const webCheckoutUrl = getWebCheckoutUrl({ orderID, props, fundingSource, facilitatorAccessToken });
    const forceEligible = isNativeOptedIn({ props });
    const channel = isDevice() ? CHANNEL.MOBILE : CHANNEL.DESKTOP;

    if (!firebase) {
        throw new Error(`Can not find firebase config`);
    }
    const queryParams = {
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
        buttonSessionID,
        env,
        stageHost:      stageHost || '',
        apiStageHost:   apiStageHost || '',
        forceEligible,
        fundingSource,
        enableFunding:  enableFunding.join(','),
        domain:         merchantDomain,
        rtdbInstanceID: firebase.databaseURL,
        buyerCountry,
        sdkVersion
    };

    if (queryParams.channel === CHANNEL.DESKTOP) {
        delete queryParams.sdkMeta;
    }

    return queryParams;
}

export function getNativeUrl({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : string {
    const queryParams = getNativeUrlQueryParams({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID });

    return extendUrl(`${ getNativeDomain({ props }) }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
        // $FlowFixMe
        query: queryParams
    });
}

export function getNativeFallbackUrl({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID } : GetNativeUrlOptions) : string {
    const queryParams = getNativeUrlQueryParams({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID });

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
    const channel = isDevice() ? CHANNEL.MOBILE : CHANNEL.DESKTOP;
    const queryParams = {
        buttonSessionID,
        buyerCountry,
        clientID,
        channel,
        env,
        parentDomain,
        sdkCorrelationID,
        sdkMeta,
        sessionID
    };
    return queryParams;
};

export function getNativePopupUrl({ props, serviceData, fundingSource } : GetNativePopupUrlOptions) : string {
    const queryParams = getNativePopupQueryParams({ props, serviceData, fundingSource });

    const baseURL = extendUrl(`${ getNativePopupDomain({ props }) }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
        // $FlowFixMe
        query: queryParams
    });

    return `${ baseURL }#${ HASH.INIT }`;
}
