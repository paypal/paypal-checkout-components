/* @flow */

import type { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { CURRENCY, FPTI_KEY } from '@paypal/sdk-constants/src';

import { PAYMENTS_API_URL, PAYMENTS_CAPTURE_URL } from '../config';
import { getLogger } from '../lib';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, HEADERS } from '../constants';
import type { ApplePayPayment } from '../payment-flows/types';

import { callGraphQL, callRestAPI } from './api';
import { getOrder } from './order';

type PaymentAPIOptions = {|
    facilitatorAccessToken : string,
    buyerAccessToken? : ?string,
    partnerAttributionID : ?string
|};

export type PaymentCreateRequest = {|
    
|};

export type PaymentResponse = {|
    id : string,
    links : $ReadOnlyArray<{|
        method : string,
        rel : string,
        href : string
    |}>
|};

export function createPayment(payment : PaymentCreateRequest, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<PaymentResponse> {
    getLogger().info(`rest_api_create_payment_id`);

    return callRestAPI({
        accessToken: facilitatorAccessToken,
        method:      'post',
        eventName:   'v1_payments_payment_create',
        url:         `${ PAYMENTS_API_URL }`,
        data:        payment,
        headers:     {
            [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || ''
        }
    }).then(body => {

        const paymentID = body && body.id;

        if (!paymentID) {
            throw new Error(`Payment Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }

        getLogger().track({
            [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CREATE_PAYMENT,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.PAYMENT_ID,
            [FPTI_KEY.TOKEN]:        paymentID,
            [FPTI_KEY.CONTEXT_ID]:   paymentID
        });

        return body;
    });
}

export function createPaymentID(payment : PaymentCreateRequest, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<string> {
    return createPayment(payment, { facilitatorAccessToken, partnerAttributionID })
        .then(res => res.id);
}

export function createPaymentToken(payment : PaymentCreateRequest, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<string> {
    return createPayment(payment, { facilitatorAccessToken, partnerAttributionID })
        .then(res => {
            if (res.links && res.links.length) {
                for (let i = 0; i < res.links.length; i++) {
                    if (res.links[i].method === 'REDIRECT' && res.links[i].rel === 'approval_url') {
                        const match = res.links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
                        if (match) {
                            return match[1];
                        }
                    }
                }
            }

            throw new Error(`Could not find payment token`);
        });
}

export function getPayment(paymentID : string, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<PaymentResponse> {
    return callRestAPI({
        accessToken: facilitatorAccessToken,
        eventName:   'v1_payments_payment_get',
        url:         `${ PAYMENTS_API_URL }/${ paymentID }`,
        headers:     {
            [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || ''
        }
    });
}

export function executePayment(paymentID : string, payerID : string, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<PaymentResponse> {
    return callRestAPI({
        accessToken: facilitatorAccessToken,
        method:      'post',
        eventName:   'v1_payments_payment_execute',
        url:         `${ PAYMENTS_API_URL }/${ paymentID }/execute`,
        headers:     {
            [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || ''
        },
        data: {
            payer_id: payerID
        }
    });
}

type PatchData = {|
    
|};

export function patchPayment(paymentID : string, data : PatchData, { facilitatorAccessToken, partnerAttributionID } : PaymentAPIOptions) : ZalgoPromise<PaymentResponse> {
    const patchData = Array.isArray(data) ? { patch: data } : data;

    return callRestAPI({
        accessToken: facilitatorAccessToken,
        method:      'patch',
        eventName:   'v1_payments_payment_patch',
        url:         `${ PAYMENTS_API_URL }/${ paymentID }`,
        data:        patchData,
        headers:     {
            [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || ''
        }
    });
}

export type AuthorizationCaptureData = {|
    amount: {|
        currency_code : $Values<typeof CURRENCY>,
        value : string
    |},
    final_capture : boolean,
    invoice_id : string,
    note_to_payer? : string,
    soft_descriptor? : string
|};

export type AuthorizationCaptureOptions = {|
    orderID : string,
    facilitatorAccessToken : string,
    buyerAccessToken? : ?string,
    partnerAttributionID : ?string,
    forceRestAPI? : boolean
|};

export type AuthorizationCaptureResponse = {|
    id : string,
    status : string
|};

export function captureAuthorization(data : AuthorizationCaptureData, { orderID, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI } : AuthorizationCaptureOptions) : ZalgoPromise<AuthorizationCaptureResponse> {
    getLogger().info(`rest_api_capture_authorization`);
    return getOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }).then(order => {
        // $FlowFixMe
        const id = order?.purchase_units[0]?.payments?.authorizations[0]?.id || null;

        if (!id) {
            throw new Error(`Could not find authorization id to capture authorization.`);
        }
        
        if (!data) {
            throw new Error(`Must pass data into capture in order to complete payment for intent=authorize.`);
        }

        return callRestAPI({
            accessToken: facilitatorAccessToken,
            method:      'post',
            eventName:   'v2_payments_authorizations_capture',
            url:         `${ PAYMENTS_CAPTURE_URL }/${ id }/capture`,
            data,
            headers:     {
                [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || ''
            }
        }).then(body => {
    
            const captureID = body && body.id;
    
            if (!captureID) {
                throw new Error(`Payment Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }
    
            getLogger().track({
                [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CAPTURE_AUTHORIZATION,
                [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.PAYMENT_ID,
                [FPTI_KEY.TOKEN]:        captureID,
                [FPTI_KEY.CONTEXT_ID]:   captureID
            });
    
            return body;
        });
    });
}

export function approveApplePayPayment(orderID : string, clientID : string, applePayPayment : ApplePayPayment) : ZalgoPromise<void> {
    const { token, billingContact, shippingContact } = applePayPayment;

    return callGraphQL({
        name:    'ApproveApplePayPayment',
        query: `
            mutation ApproveApplePayPayment(
                $token: ApplePayPaymentToken!
                $orderID: String!
                $clientID : String!
                $billingContact: ApplePayPaymentContact!
                $shippingContact: ApplePayPaymentContact
            ) {
                approveApplePayPayment(
                    token: $token
                    orderID: $orderID
                    clientID: $clientID
                    billingContact: $billingContact
                    shippingContact: $shippingContact
                )
            }
        `,
        variables: { token, orderID, clientID, billingContact, shippingContact }
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.approveApplePayPayment) {
            throw new Error(`GraphQL GetApplePayPayment returned no applePayment object`);
        }
        return gqlResult.approveApplePayPayment;
    });
}
