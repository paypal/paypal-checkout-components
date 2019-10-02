/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, CheckoutFlowType, CardFieldsFlowType, ThreeDomainSecureFlowType, PersonalizationType } from '../../types';
import { createAccessToken, type FirebaseConfig } from '../../api';
import { getNonce } from '../dom';

import type { XProps, Props } from './types';
import { getOnInit } from './onInit';
import { getCreateOrder } from './createOrder';
import { getOnApprove } from './onApprove';
import { getOnCancel } from './onCancel';
import { getOnShippingChange } from './onShippingChange';
import { getOnClick } from './onClick';
import { getCreateBillingAgreement } from './createBillingAgreement';
import { getCreateSubscription } from './createSubscription';

export function getProps({ facilitatorAccessTokenPromise } : { facilitatorAccessTokenPromise : ZalgoPromise<string> }) : Props {

    const xprops : XProps = window.xprops;

    const {
        env,
        vault,
        commit,
        locale,
        platform,
        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        getParentDomain,
        clientAccessToken,
        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout = false,
        remember: rememberFunding,
        onError,
        stageHost,
        apiStageHost,
        style,
        getParent,
        currency
    } = xprops;

    const onInit = getOnInit(xprops);
    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';

    const onClick = getOnClick(xprops);

    if (xprops.createBillingAgreement) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createBillingAgreement and createOrder`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createBillingAgreement`);
        }
    }

    if (xprops.createSubscription) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createOrder`);
        }

        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createBillingAgreement`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createSubscription`);
        }
    }

    const createBillingAgreement = getCreateBillingAgreement(xprops);
    const createSubscription = getCreateSubscription(xprops, { facilitatorAccessTokenPromise });
    
    const createOrder = getCreateOrder(xprops, { facilitatorAccessTokenPromise, createBillingAgreement, createSubscription });

    const onApprove = getOnApprove(xprops, { facilitatorAccessTokenPromise, createOrder });
    const onCancel = getOnCancel(xprops, { facilitatorAccessTokenPromise, createOrder });
    const onShippingChange = getOnShippingChange(xprops, { facilitatorAccessTokenPromise, createOrder });

    return {
        env,
        style,

        vault,
        commit,

        clientAccessToken,
        locale,

        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        merchantDomain,
        platform,
        currency,

        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        rememberFunding,
        getParent,

        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout,

        onClick,
        onInit,
        onError,
        stageHost,
        apiStageHost,

        createOrder,
        createBillingAgreement,
        createSubscription,
        onApprove,
        onCancel,
        onShippingChange
    };
}

export type Components = {|
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType
|};

export function getComponents() : Components {
    const { Checkout, CardFields, ThreeDomainSecure } = window.paypal;
    return { Checkout, CardFields, ThreeDomainSecure };
}

export type Config = {|
    version : string,
    cspNonce : ?string,
    firebase : ?FirebaseConfig
|};

export function getConfig({ serverCSPNonce, firebaseConfig } : { serverCSPNonce : ?string, firebaseConfig : ?FirebaseConfig }) : Config {
    const cspNonce = serverCSPNonce || getNonce();
    const version = window.paypal.version;
    
    return {
        version,
        cspNonce,
        firebase: firebaseConfig
    };
}

export type ServiceData = {|
    merchantID : $ReadOnlyArray<string>,
    buyerCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    personalization : PersonalizationType,
    facilitatorAccessTokenPromise : ZalgoPromise<string>,
    eligibility : {
        cardFields : boolean,
        native : boolean
    }
|};

type ServiceDataOptions = {|
    facilitatorAccessToken : ?string,
    clientID : ?string,
    buyerGeoCountry : $Values<typeof COUNTRY>,
    isCardFieldsExperimentEnabled : boolean,
    fundingEligibility : FundingEligibilityType,
    personalization : PersonalizationType,
    serverMerchantID : $ReadOnlyArray<string>,
    eligibility : ?{
        native : boolean,
        cardFields : boolean
    }
|};

export function getServiceData({ facilitatorAccessToken, clientID, buyerGeoCountry, isCardFieldsExperimentEnabled, fundingEligibility, personalization, serverMerchantID, eligibility } : ServiceDataOptions) : ServiceData {
    
    let facilitatorAccessTokenPromise : ZalgoPromise<string>;

    if (facilitatorAccessToken) {
        facilitatorAccessTokenPromise = ZalgoPromise.resolve(facilitatorAccessToken);
    } else if (clientID) {
        facilitatorAccessTokenPromise = createAccessToken(clientID);
    } else {
        // $FlowFixMe
        facilitatorAccessToken = ZalgoPromise.asyncReject(new Error(`No access token found`));
    }
    
    return {
        merchantID:   serverMerchantID,
        buyerCountry: buyerGeoCountry || COUNTRY.US,
        fundingEligibility,
        personalization,
        // $FlowFixMe
        facilitatorAccessTokenPromise,
        eligibility:  {
            cardFields: isCardFieldsExperimentEnabled,
            native:     eligibility ? eligibility.native : false
        }
    };
}
