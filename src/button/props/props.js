/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';

import { getNonce } from '../dom';

import type { XProps, GlobalProps, ButtonCallbackProps } from './types';
import { getOnInit } from './onInit';
import { getCreateOrder } from './createOrder';
import { getOnApprove } from './onApprove';
import { getOnCancel } from './onCancel';
import { getOnShippingChange } from './onShippingChange';
import { getOnClick } from './onClick';
import { getOnAuth } from './onAuth';
import { getCreateBillingAgreement } from './createBillingAgreement';
import { getCreateSubscription } from './createSubscription';

export function getGlobalProps({ xprops, buyerGeoCountry, cspNonce } : {| xprops : XProps, buyerGeoCountry : ?$Values<typeof COUNTRY>, cspNonce : ?string |}) : GlobalProps {

    const {
        env,
        vault,
        commit,
        locale,
        sessionID,
        buttonSessionID,
        clientID,
        merchantID,
        partnerAttributionID,
        correlationID,
        getParentDomain,
        clientAccessToken,
        buyerCountry = buyerGeoCountry || COUNTRY.US,
        getPopupBridge,
        getPrerenderDetails,
        enableThreeDomainSecure,
        remember: rememberFunding,
        onError
    } = xprops;

    cspNonce = cspNonce || getNonce();
    const onInit = getOnInit(xprops);
    const merchantDomain = getParentDomain();

    return {
        env,

        vault,
        commit,

        clientAccessToken,
        buyerCountry,
        locale,
        cspNonce,

        sessionID,
        buttonSessionID,
        clientID,
        merchantID,
        partnerAttributionID,
        correlationID,
        merchantDomain,

        getPopupBridge,
        getPrerenderDetails,
        rememberFunding,
        enableThreeDomainSecure,

        onInit,
        onError
    };
}

export function getButtonCallbackProps({ xprops } : {| xprops : XProps |}) : ButtonCallbackProps {

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
    const createSubscription = getCreateSubscription(xprops);
    const createOrder = getCreateOrder(xprops, { createBillingAgreement, createSubscription });

    const onApprove = getOnApprove(xprops, { createOrder });
    const onCancel = getOnCancel(xprops, { createOrder });
    const onShippingChange = getOnShippingChange(xprops, { createOrder });
    const onClick = getOnClick(xprops);
    const onAuth = getOnAuth();

    return {
        createOrder,
        createBillingAgreement,
        createSubscription,
        onApprove,
        onCancel,
        onClick,
        onAuth,
        onShippingChange
    };
}
