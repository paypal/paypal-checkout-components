/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, INTENT, COUNTRY, FUNDING, PLATFORM, CURRENCY } from '@paypal/sdk-constants/src';
import type { FundingEligibilityType } from '@paypal/sdk-client/src';

import type { CheckoutFlowType, PersonalizationType, LocaleType } from '../types';
import { getNonce, promiseNoop } from '../lib';
import { getCreateOrder } from '../props/createOrder';
import { getOnApprove } from '../props/onApprove';
import { getOnCancel } from '../props/onCancel';
import type {
    CreateOrder, XCreateOrder, OnApprove, XOnApprove, OnCancel, XOnCancel, XOnError, OnError,
    RememberFunding, GetPageURL
} from '../props';

export type WalletSetup = ({||}, {| submit : () => ZalgoPromise<void> |}) => ZalgoPromise<void>;

export type WalletStyle = {|
    
|};

export type WalletXProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : WalletStyle,

    setup : WalletSetup,

    sessionID : string,
    walletSessionID : string,
    clientID : ?string,
    partnerAttributionID : string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,
    merchantID : $ReadOnlyArray<string>,

    vault : boolean,
    commit : boolean,
    intent : $Values<typeof INTENT>,
    currency : $Values<typeof CURRENCY>,

    clientAccessToken : ?string,
    buyerCountry : $Values<typeof COUNTRY>,

    createOrder : ?XCreateOrder,

    remember : RememberFunding,
    getParentDomain : () => string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,

    stageHost : ?string,
    apiStageHost : ?string,
    
    onApprove : ?XOnApprove,
    onCancel : XOnCancel,
    onError : XOnError
|};

export type WalletProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : WalletStyle,

    setup : WalletSetup,

    sessionID : string,
    walletSessionID : string,
    clientID : ?string,
    partnerAttributionID : string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,

    vault : boolean,
    commit : boolean,
    currency : $Values<typeof CURRENCY>,

    clientAccessToken : ?string,

    rememberFunding : RememberFunding,
    merchantDomain : string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,

    stageHost : ?string,
    apiStageHost : ?string,

    onError : OnError,

    createOrder : CreateOrder,
    onApprove : OnApprove,
    onCancel : OnCancel
|};

function getXProps() : WalletXProps {
    if (window.xprops) {
        return window.xprops;
    }

    if (__LOCAL__ && __DEBUG__) {
        // $FlowFixMe
        return {
            env: __ENV__
        };
    }

    throw new Error(`No xprops found`);
}

export function getProps({ facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : WalletProps {

    const xprops = getXProps();

    const {
        env,
        vault,
        commit,
        locale,
        platform,
        sessionID,
        intent,
        walletSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        getParentDomain,
        clientAccessToken,
        getPageUrl,
        remember: rememberFunding,
        onError,
        stageHost,
        apiStageHost,
        style,
        getParent,
        currency,
        merchantID,
        setup = promiseNoop
    } = xprops;

    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';
    
    const createOrder = getCreateOrder({ createOrder: xprops.createOrder, currency, intent, merchantID, partnerAttributionID }, { facilitatorAccessToken });

    const onApprove = getOnApprove({ onApprove: xprops.onApprove, intent, onError, partnerAttributionID, upgradeLSAT: false }, { facilitatorAccessToken, createOrder });
    const onCancel = getOnCancel({ onCancel: xprops.onCancel, onError }, { createOrder });

    return {
        env,
        style,
        locale,

        sessionID,
        walletSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        platform,
        currency,
        commit,
        vault,
        merchantDomain,

        getPageUrl,
        rememberFunding,
        getParent,

        setup,

        clientAccessToken,

        onError,
        stageHost,
        apiStageHost,

        createOrder,
        onApprove,
        onCancel
    };
}

export type Components = {|
    Checkout : CheckoutFlowType
|};

export function getComponents() : Components {
    const { Checkout } = paypal;
    return { Checkout };
}

export type Config = {|
    version : string,
    cspNonce : ?string
|};

export function getConfig({ serverCSPNonce } : {| serverCSPNonce : ?string |}) : Config {
    const cspNonce = serverCSPNonce || getNonce();
    const { version } = paypal;
    
    return {
        version,
        cspNonce
    };
}

export type ServiceData = {|
    merchantID : $ReadOnlyArray<string>,
    buyerCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    personalization : PersonalizationType,
    facilitatorAccessToken : string,
    sdkMeta : string,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [ $Values<typeof FUNDING> ] : ?boolean
        }
    |}
|};

type ServiceDataOptions = {|
    facilitatorAccessToken : string,
    buyerGeoCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    personalization : PersonalizationType,
    serverMerchantID : $ReadOnlyArray<string>,
    sdkMeta : string,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [$Values<typeof FUNDING> ] : ?boolean
        }
    |}
|};

export function getServiceData({ facilitatorAccessToken, sdkMeta, buyerGeoCountry, fundingEligibility, personalization, serverMerchantID, eligibility } : ServiceDataOptions) : ServiceData {
    return {
        merchantID:   serverMerchantID,
        buyerCountry: buyerGeoCountry || COUNTRY.US,
        fundingEligibility,
        sdkMeta,
        personalization,
        facilitatorAccessToken,
        eligibility
    };
}
