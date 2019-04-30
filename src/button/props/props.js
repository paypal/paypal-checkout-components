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
        clientAccessToken,
        buyerCountry = buyerGeoCountry || COUNTRY.US,
        getPopupBridge,
        getPrerenderDetails,
        remember: rememberFunding,
        onError
    } = xprops;

    cspNonce = cspNonce || getNonce();
    const onInit = getOnInit(xprops);

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

        getPopupBridge,
        getPrerenderDetails,
        rememberFunding,

        onInit,
        onError
    };
}

export function getButtonCallbackProps({ xprops } : {| xprops : XProps |}) : ButtonCallbackProps {

    const createOrder = getCreateOrder(xprops);
    const onApprove = getOnApprove(xprops, { createOrder });
    const onCancel = getOnCancel(xprops, { createOrder });
    const onShippingChange = getOnShippingChange(xprops, { createOrder });
    const onClick = getOnClick(xprops);
    const onAuth = getOnAuth();

    return {
        createOrder,
        onApprove,
        onCancel,
        onClick,
        onAuth,
        onShippingChange
    };
}
