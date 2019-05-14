/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { SDK_QUERY_KEYS, UNKNOWN, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { request, noop } from 'belter/src';

import { API_URI, ORDERS_API_URL, VALIDATE_PAYMENT_METHOD_API } from '../config';
import { getLogger } from '../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE, HEADERS } from '../constants';

import { callSmartAPI, callGraphQL } from './api';

export type OrderCreateRequest = {|
    intent? : 'CAPTURE' | 'AUTHORIZE',
        purchase_units : $ReadOnlyArray<{
            amount : {
                currency_code : string,
                value : string
            },
            payee? : {
                merchant_id? : string
            }
        }>
|};

export type OrderResponse = {||};
export type OrderCaptureResponse = {||};
export type OrderGetResponse = {||};
export type OrderAuthorizeResponse = {||};

export function createOrderID(accessToken : string, order : OrderCreateRequest) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_order_token`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    const currency = window.xprops.currency;
    const intent = window.xprops.intent;
    const merchantID = window.xprops.merchantID;

    order = { ...order };

    if (order.intent && order.intent.toLowerCase() !== intent) {
        throw new Error(`Unexpected intent: ${ order.intent } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.INTENT }=${ order.intent.toLowerCase() } in the paypal script tag.`);
    }

    // $FlowFixMe
    order = { ...order, intent: intent.toUpperCase() };

    order.purchase_units = order.purchase_units.map(unit => {
        if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
            throw new Error(`Unexpected currency: ${ unit.amount.currency_code } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.CURRENCY }=${ unit.amount.currency_code } in the paypal script tag.`);
        }

        let payee = unit.payee;

        if (payee) {
            if (!merchantID) {
                throw new Error(`Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=XYZ in the paypal script tag. Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ UNKNOWN } if you do not have access to the merchant id`);
            }

            if (payee.merchant_id && merchantID[0] !== UNKNOWN && payee.merchant_id !== merchantID) {
                throw new Error(`Expected payee.merchant_id to be "${ merchantID[0] }"`);
            }
        }

        if (merchantID && merchantID[0] !== UNKNOWN) {
            payee = {
                ...payee,
                merchant_id: merchantID[0]
            };
        }

        return { ...unit, payee, amount: { ...unit.amount, currency_code: currency } };
    });

    order.application_context = order.application_context || {};

    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': window.xprops.partnerAttributionID
    };

    return request({
        method: `post`,
        url:    ORDERS_API_URL,
        headers,
        json:   order
    }).then(({ body }) : string => {

        if (!body || !body.id) {
            throw new Error(`Order Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }

        getLogger().track({
            [FPTI_KEY.STATE]:        FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CREATE_ORDER,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
            [FPTI_KEY.TOKEN]:        body.id,
            [FPTI_KEY.CONTEXT_ID]:   body.id
        });

        return body.id;
    });
}

export function getOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        url: `${ API_URI.ORDER }/${ orderID }`
    });
}

export function captureOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/capture`
    });
}

export function authorizeOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/authorize`
    });
}

export function patchOrder(orderID : string, patch : []) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/patch`,
        json:   { data: { patch } }
    });
}

export type ValidatePaymentMethodOptions = {|
    clientAccessToken : string,
    orderID : string,
    paymentMethodID : string,
    enableThreeDomainSecure : boolean
|};

const VALIDATE_CONTINGENCIES = {
    THREE_DOMAIN_SECURE: '3D_SECURE'
};

export type ValidatePaymentMethodResponse = {|
    links? : $ReadOnlyArray<{|
        rel : string
    |}>
|};

type PaymentSource = {|
    token : {|
        id : string,
        type : 'NONCE'
    |},
    contingencies? : $ReadOnlyArray<$Values<typeof VALIDATE_CONTINGENCIES>>
|};

export function validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure } : ValidatePaymentMethodOptions) : ZalgoPromise<{ status : number, body : ValidatePaymentMethodResponse, headers : { [string] : string } }> {
    getLogger().info(`rest_api_create_order_token`);

    const headers : Object = {
        [HEADERS.AUTHORIZATION]:            `Bearer ${ clientAccessToken }`,
        [ HEADERS.PARTNER_ATTRIBUTION_ID ]: window.xprops.partnerAttributionID,
        [ HEADERS.CLIENT_METADATA_ID ]:     window.xprops.buttonSessionID
    };

    const paymentSource : PaymentSource = {
        token: {
            id:   paymentMethodID,
            type: 'NONCE'
        }
    };

    if (enableThreeDomainSecure) {
        paymentSource.contingencies = [ VALIDATE_CONTINGENCIES.THREE_DOMAIN_SECURE ];
    }

    const json = {
        payment_source: paymentSource
    };

    return request({
        method: `post`,
        url:    `${ ORDERS_API_URL }/${ orderID }/${ VALIDATE_PAYMENT_METHOD_API }`,
        headers,
        json
    });
}

export function billingTokenToOrderID(billingToken : string) : ZalgoPromise<string> {
    return callSmartAPI({
        method: 'post',
        url:    `${ API_URI.PAYMENT }/${ billingToken }/ectoken`
    }).then(data => {
        return data.token;
    });
}

export function subscriptionIdToCartId(subscriptionID : string) : ZalgoPromise<string> {
    return callSmartAPI({
        method: 'post',
        url:    `${ API_URI.SUBSCRIPTION }/${ subscriptionID }/cartid`
    }).then(data => {
        return data.token;
    });
}

export function enableVault({ orderID, clientAccessToken } : { orderID : string, clientAccessToken : string }) : ZalgoPromise<mixed> {
    return callGraphQL({
        query: `
            mutation EnableVault(
                $orderID : String!
            ) {
                enableVault(
                    token: $orderID
                )
            }
        `,
        variables: {
            orderID
        },
        headers: {
            [ HEADERS.ACCESS_TOKEN ]: clientAccessToken
        }
    });
}

type ClientConfig = {|
    orderID : string,
    fundingSource : $Values<typeof FUNDING>,
    integrationArtifact : string,
    userExperienceFlow : string,
    productFlow : string
|};

export function updateClientConfig({ orderID, fundingSource, integrationArtifact, userExperienceFlow, productFlow } : ClientConfig) : ZalgoPromise<void> {
    return callGraphQL({
        query: `
            mutation UpdateClientConfig(
                $orderID : String!,
                $fundingSource : ButtonFundingSourceType!,
                $integrationArtifact : IntegrationArtifactType!,
                $userExperienceFlow : UserExperienceFlowType!,
                $productFlow : ProductFlowType!
            ) {
                updateClientConfig(
                    token: $orderID,
                    fundingSource: $fundingSource,
                    integrationArtifact: $integrationArtifact,
                    userExperienceFlow: $userExperienceFlow,
                    productFlow: $productFlow
                )
            }
        `,
        variables: { orderID, fundingSource, integrationArtifact, userExperienceFlow, productFlow }
    }).then(noop);
}
