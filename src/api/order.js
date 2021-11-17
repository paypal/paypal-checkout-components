/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY, FPTI_KEY, FUNDING, WALLET_INSTRUMENT, INTENT } from '@paypal/sdk-constants/src';
import { request, noop, memoize, uniqueID, stringifyError } from 'belter/src';

import { SMART_API_URI, ORDERS_API_URL, VALIDATE_PAYMENT_METHOD_API } from '../config';
import { getLogger, setBuyerAccessToken } from '../lib';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, HEADERS, SMART_PAYMENT_BUTTONS,
    INTEGRATION_ARTIFACT, ITEM_CATEGORY, USER_EXPERIENCE_FLOW, PRODUCT_FLOW, PREFER, ORDER_API_ERROR } from '../constants';
import type { ShippingMethod, ShippingAddress } from '../payment-flows/types';

import { callSmartAPI, callGraphQL, callRestAPI, getResponseCorrelationID, getErrorResponseCorrelationID } from './api';
import { getLsatUpgradeError, getLsatUpgradeCalled } from './auth';
import { retriggerFraudnet } from './fraudnet';


export type OrderCreateRequest = {|
    intent? : 'CAPTURE' | 'AUTHORIZE',
        purchase_units : $ReadOnlyArray<{|
            amount : {|
                currency_code : string,
                value : string
            |},
            payee? : {|
                merchant_id? : string
            |}
        |}>
|};

export type OrderResponse = {||};
export type OrderCaptureResponse = {||};
export type OrderConfirmResponse = {||};
export type OrderGetResponse = {||};
export type OrderAuthorizeResponse = {||};

type OrderAPIOptions = {|
    facilitatorAccessToken : string,
    buyerAccessToken? : ?string,
    partnerAttributionID : ?string,
    forceRestAPI? : boolean
|};

export function createOrderID(order : OrderCreateRequest, { facilitatorAccessToken, partnerAttributionID } : OrderAPIOptions) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_order_id`);
    return callRestAPI({
        accessToken: facilitatorAccessToken,
        method:      'post',
        url:         `${ ORDERS_API_URL }`,
        eventName:   'v2_checkout_orders_create',
        data:        order,
        headers:     {
            [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID || '',
            [ HEADERS.PREFER ]:                 PREFER.REPRESENTATION
        }
    }).then((body) : string => {

        const orderID = body && body.id;

        if (!orderID) {
            throw new Error(`Order Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }

        getLogger().track({
            [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CREATE_ORDER,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
            [FPTI_KEY.TOKEN]:        orderID,
            [FPTI_KEY.CONTEXT_ID]:   orderID
        });

        return orderID;
    });
}

export function getOrder(orderID : string, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI = false } : OrderAPIOptions) : ZalgoPromise<OrderResponse> {
    getLogger().info(`get_order_lsat_upgrade_${ getLsatUpgradeCalled() ? 'called' : 'not_called' }`);
    getLogger().info(`get_order_lsat_upgrade_${ getLsatUpgradeError() ? 'errored' : 'did_not_error' }`, { err: stringifyError(getLsatUpgradeError()) });

    if (forceRestAPI && !getLsatUpgradeError()) {
        return callRestAPI({
            accessToken: facilitatorAccessToken,
            url:         `${ ORDERS_API_URL }/${ orderID }`,
            eventName:   'v2_checkout_orders_get',
            headers:     {
                [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID || '',
                [ HEADERS.PREFER ]:                 PREFER.REPRESENTATION
            }
        }).catch(err => {
            const restCorrID = getErrorResponseCorrelationID(err);
            getLogger().warn(`get_order_call_rest_api_error`, { restCorrID, orderID, err: stringifyError(err) });

            return callSmartAPI({
                accessToken: buyerAccessToken,
                url:         `${ SMART_API_URI.ORDER }/${ orderID }`,
                eventName:   'order_get',
                headers:     {
                    [HEADERS.CLIENT_CONTEXT]: orderID
                }
            }).then((res) => {
                const smartCorrID = getResponseCorrelationID(res);
                getLogger().info(`get_order_smart_fallback_success`, { smartCorrID, restCorrID, orderID });
                return res.data;
            }).catch(smartErr => {
                const smartCorrID = getErrorResponseCorrelationID(err);
                getLogger().error(`get_order_smart_fallback_error`, { smartCorrID, restCorrID, orderID, err: stringifyError(smartErr) });
                throw smartErr;
            });
        });
    }

    return callSmartAPI({
        accessToken: buyerAccessToken,
        url:         `${ SMART_API_URI.ORDER }/${ orderID }`,
        eventName:   'order_get',
        headers:     {
            [HEADERS.CLIENT_CONTEXT]:         orderID
        }
    }).then(({ data }) => {
        return data;
    });
}

export function isProcessorDeclineError(err : mixed) : boolean {
    // $FlowFixMe
    return Boolean(err?.response?.body?.data?.details?.some(detail => {
        return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
    }));
}

export function captureOrder(orderID : string, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI = false } : OrderAPIOptions) : ZalgoPromise<OrderResponse> {
    getLogger().info(`capture_order_lsat_upgrade_${ getLsatUpgradeCalled() ? 'called' : 'not_called' }`);
    getLogger().info(`capture_order_lsat_upgrade_${ getLsatUpgradeError() ? 'errored' : 'did_not_error' }`, { err: stringifyError(getLsatUpgradeError()) });

    if (forceRestAPI && !getLsatUpgradeError()) {
        return callRestAPI({
            accessToken: facilitatorAccessToken,
            method:      'post',
            eventName:   'v2_checkout_orders_capture',
            url:         `${ ORDERS_API_URL }/${ orderID }/capture`,
            headers:     {
                [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID || '',
                [ HEADERS.PREFER ]:                 PREFER.REPRESENTATION,
                [ HEADERS.PAYPAL_REQUEST_ID ]:      orderID
            }
        }).catch(err => {
            const restCorrID = getErrorResponseCorrelationID(err);
            getLogger().warn(`capture_order_call_rest_api_error`, { restCorrID, orderID, err: stringifyError(err) });

            if (isProcessorDeclineError(err)) {
                throw err;
            }

            return callSmartAPI({
                accessToken: buyerAccessToken,
                method:      'post',
                eventName:   'order_capture',
                url:         `${ SMART_API_URI.ORDER }/${ orderID }/capture`,
                headers:     {
                    [HEADERS.CLIENT_CONTEXT]: orderID
                }
            }).then((res) => {
                const smartCorrID = getResponseCorrelationID(res);
                getLogger().info(`capture_order_smart_fallback_success`, { smartCorrID, restCorrID, orderID });
                return res.data;
            }).catch(smartErr => {
                const smartCorrID = getErrorResponseCorrelationID(err);
                getLogger().info(`capture_order_smart_fallback_error`, { smartCorrID, restCorrID, orderID, err: stringifyError(smartErr) });
                throw smartErr;
            });
        });
    }

    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      'post',
        eventName:   'order_capture',
        url:         `${ SMART_API_URI.ORDER }/${ orderID }/capture`,
        headers:     {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    }).then(({ data }) => {
        return data;
    });
}

export function authorizeOrder(orderID : string, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI = false } : OrderAPIOptions) : ZalgoPromise<OrderResponse> {
    getLogger().info(`authorize_order_lsat_upgrade_${ getLsatUpgradeCalled() ? 'called' : 'not_called' }`);
    getLogger().info(`authorize_order_lsat_upgrade_${ getLsatUpgradeError() ? 'errored' : 'did_not_error' }`, { err: stringifyError(getLsatUpgradeError()) });

    if (forceRestAPI && !getLsatUpgradeError()) {
        return callRestAPI({
            accessToken: facilitatorAccessToken,
            method:      'post',
            eventName:   'v2_checkout_orders_authorize',
            url:         `${ ORDERS_API_URL }/${ orderID }/authorize`,
            headers:     {
                [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID || '',
                [ HEADERS.PREFER ]:                 PREFER.REPRESENTATION
            }
        }).catch(err => {
            const restCorrID = getErrorResponseCorrelationID(err);
            getLogger().warn(`authorize_order_call_rest_api_error`, { restCorrID, orderID, err: stringifyError(err) });

            if (isProcessorDeclineError(err)) {
                throw err;
            }

            return callSmartAPI({
                accessToken: buyerAccessToken,
                method:      'post',
                eventName:   'order_authorize',
                url:         `${ SMART_API_URI.ORDER }/${ orderID }/authorize`,
                headers:     {
                    [HEADERS.CLIENT_CONTEXT]: orderID
                }
            }).then((res) => {
                const smartCorrID = getResponseCorrelationID(res);
                getLogger().info(`authorize_order_smart_fallback_success`, { smartCorrID, restCorrID, orderID });
                return res.data;
            }).catch(smartErr => {
                const smartCorrID = getErrorResponseCorrelationID(err);
                getLogger().info(`authorize_order_smart_fallback_error`, { smartCorrID, restCorrID, orderID, err: stringifyError(smartErr) });
                throw smartErr;
            });
        });
    }

    getLogger().info(`lsat_upgrade_false`);
    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      'post',
        eventName:   'order_authorize',
        url:         `${ SMART_API_URI.ORDER }/${ orderID }/authorize`,
        headers:     {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    }).then(({ data }) => {
        return data;
    });
}

type PatchData = {|

|};

export function patchOrder(orderID : string, data : PatchData, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI = false } : OrderAPIOptions) : ZalgoPromise<OrderResponse> {
    getLogger().info(`patch_order_lsat_upgrade_${ getLsatUpgradeCalled() ? 'called' : 'not_called' }`);
    getLogger().info(`patch_order_lsat_upgrade_${ getLsatUpgradeError() ? 'errored' : 'did_not_error' }`, { err: stringifyError(getLsatUpgradeError()) });

    if (forceRestAPI && !getLsatUpgradeError()) {
        return callRestAPI({
            accessToken: facilitatorAccessToken,
            method:      'PATCH',
            eventName:   'v2_checkout_orders_patch',
            url:         `${ ORDERS_API_URL }/${ orderID }`,
            data,
            headers:     {
                [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID || '',
                [ HEADERS.PREFER ]:                 PREFER.REPRESENTATION
            }
        }).catch(err => {
            const restCorrID = getErrorResponseCorrelationID(err);
            getLogger().warn(`patch_order_call_rest_api_error`, { restCorrID, orderID, err: stringifyError(err) });

            return callSmartAPI({
                accessToken: buyerAccessToken,
                method:      'post',
                eventName:   'order_patch',
                url:         `${ SMART_API_URI.ORDER }/${ orderID }/patch`,
                json:        { data: Array.isArray(data) ? { patch: data } : data },
                headers:     {
                    [HEADERS.CLIENT_CONTEXT]: orderID
                }
            }).then((res) => {
                const smartCorrID = getResponseCorrelationID(res);
                getLogger().info(`patch_order_smart_fallback_success`, { smartCorrID, restCorrID, orderID });
                return res.data;
            }).catch(smartErr => {
                const smartCorrID = getErrorResponseCorrelationID(err);
                getLogger().info(`patch_order_smart_fallback_error`, { smartCorrID, restCorrID, orderID, err: stringifyError(smartErr) });
                throw smartErr;
            });
        });
    }

    getLogger().info(`lsat_upgrade_false`);
    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      'post',
        eventName:   'order_patch',
        url:         `${ SMART_API_URI.ORDER }/${ orderID }/patch`,
        json:        { data: Array.isArray(data) ? { patch: data } : data },
        headers:     {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    }).then(({ data: patchData }) => {
        return patchData;
    });
}

export type ConfirmData = {|
    payment_source : {
        [$Values<typeof FUNDING>] : {|
            country_code? : string | null,
            name? : string | null,
            email? : string | null,
            bic? : string | null,
            bank_id? : string | null
        |}
      }
|};

export function confirmOrderAPI(orderID : string, data : ConfirmData, { facilitatorAccessToken, partnerAttributionID } : OrderAPIOptions) : ZalgoPromise<OrderConfirmResponse> {
    return callRestAPI({
        accessToken: facilitatorAccessToken,
        method:      'post',
        eventName:   'order_confirm_payment_source',
        url:         `${ ORDERS_API_URL }/${ orderID }/confirm-payment-source`,
        data,
        headers:     {
            [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID || '',
            [HEADERS.PREFER]:                 PREFER.REPRESENTATION
        }
    }).then(({ data: orderData }) => {
        return orderData;
    });
}

export type ValidatePaymentMethodOptions = {|
    accessToken : string,
    orderID : string,
    paymentMethodID : string,
    enableThreeDomainSecure : boolean,
    partnerAttributionID : ?string,
    clientMetadataID : string,
    installmentPlan? : {|
        term : string,
        interval_duration : string
    |} | null
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
        type : 'NONCE',
        attributes? : {|
            installments? : {|
                term : string,
                interval_duration : string
            |}
        |}
    |},
    contingencies? : $ReadOnlyArray<$Values<typeof VALIDATE_CONTINGENCIES>>
|};

export function validatePaymentMethod({ accessToken, orderID, paymentMethodID, enableThreeDomainSecure, partnerAttributionID, clientMetadataID, installmentPlan } : ValidatePaymentMethodOptions) : ZalgoPromise<{| status : number, body : ValidatePaymentMethodResponse, headers : { [string] : string } |}> {
    getLogger().info(`rest_api_create_order_token`);

    const headers : Object = {
        [ HEADERS.AUTHORIZATION ]:          `Bearer ${ accessToken }`,
        [ HEADERS.PARTNER_ATTRIBUTION_ID ]: partnerAttributionID,
        [ HEADERS.CLIENT_METADATA_ID ]:     clientMetadataID,
        [ HEADERS.APP_NAME ]:               SMART_PAYMENT_BUTTONS,
        [ HEADERS.APP_VERSION ]:            __SMART_BUTTONS__.__MINOR_VERSION__
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

    if (installmentPlan) {
        paymentSource.token.attributes = {
            installments: {
                term:              installmentPlan.term,
                interval_duration: installmentPlan.interval_duration
            }
        };
    }

    const json = {
        payment_source: paymentSource
    };

    return request({
        method: 'post',
        url:    `${ ORDERS_API_URL }/${ orderID }/${ VALIDATE_PAYMENT_METHOD_API }`,
        headers,
        json
    });
}

export function billingTokenToOrderID(billingToken : string) : ZalgoPromise<string> {
    return callSmartAPI({
        authenticated: false,
        method:        'post',
        eventName:     'payment_ectoken',
        url:           `${ SMART_API_URI.PAYMENT }/${ billingToken }/ectoken`
    }).then(({ data }) => {
        return data.token;
    });
}

export function subscriptionIdToCartId(subscriptionID : string) : ZalgoPromise<string> {
    return callSmartAPI({
        authenticated: false,
        method:        'post',
        eventName:     'billagmt_subscriptions_cartid',
        url:           `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }/cartid`
    }).then(({ data }) => {
        return data.token;
    });
}

export function enableVault({ orderID, clientAccessToken } : {| orderID : string, clientAccessToken : string |}) : ZalgoPromise<mixed> {
    return callGraphQL({
        name:  'EnableVault',
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
            [ HEADERS.ACCESS_TOKEN ]:   clientAccessToken,
            [ HEADERS.CLIENT_CONTEXT ]: orderID
        }
    });
}

export function deleteVault({ paymentMethodID, clientAccessToken } : {| paymentMethodID : string, clientAccessToken : string |}) : ZalgoPromise<mixed> {
    return callGraphQL({
        name:  'DeleteVault',
        query: `
            mutation DeleteVault(
                $paymentMethodID : String!
            ) {
                deleteVault(
                    paymentMethodID: $paymentMethodID
                )
            }
        `,
        variables: {
            paymentMethodID
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
    productFlow : string,
    buttonSessionID : ?string
|};

export function updateClientConfig({ orderID, fundingSource, integrationArtifact, userExperienceFlow, productFlow, buttonSessionID } : ClientConfig) : ZalgoPromise<void> {
    return callGraphQL({
        name:  'UpdateClientConfig',
        query: `
            mutation UpdateClientConfig(
                $orderID : String!,
                $fundingSource : ButtonFundingSourceType!,
                $integrationArtifact : IntegrationArtifactType!,
                $userExperienceFlow : UserExperienceFlowType!,
                $productFlow : ProductFlowType!,
                $buttonSessionID : String
            ) {
                updateClientConfig(
                    token: $orderID,
                    fundingSource: $fundingSource,
                    integrationArtifact: $integrationArtifact,
                    userExperienceFlow: $userExperienceFlow,
                    productFlow: $productFlow,
                    buttonSessionID: $buttonSessionID
                )
            }
        `,
        variables: { orderID, fundingSource, integrationArtifact, userExperienceFlow, productFlow, buttonSessionID },
        headers:   {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    }).then(noop);
}

type ApproveOrderOptions = {|
    orderID : string,
    planID : string,
    buyerAccessToken : string
|};

type ApproveData = {|
    payerID : string
|};

export function approveOrder({ orderID, planID, buyerAccessToken } : ApproveOrderOptions) : ZalgoPromise<ApproveData> {
    return callGraphQL({
        name:  'ApproveOrder',
        query: `
            mutation ApproveOrder(
                $orderID : String!
                $planID : String!
            ) {
                approvePayment(
                    token: $orderID
                    selectedPlanId: $planID
                ) {
                    buyer {
                        userId
                        auth {
                            accessToken
                        }
                    }
                }
            }
        `,
        variables: { orderID, planID },
        headers:   {
            [ HEADERS.ACCESS_TOKEN ]:   buyerAccessToken,
            [ HEADERS.CLIENT_CONTEXT ]: orderID
        }
    }).then(({ approvePayment }) => {
        setBuyerAccessToken(approvePayment?.buyer?.auth?.accessToken);
        return {
            payerID: approvePayment.buyer.userId
        };
    });
}

type OneClickApproveOrderOptions = {|
    orderID : string,
    instrumentType : $Values<typeof WALLET_INSTRUMENT>,
    instrumentID : string,
    buyerAccessToken : string,
    clientMetadataID : ?string
|};

export function oneClickApproveOrder({ orderID, instrumentType, instrumentID, buyerAccessToken, clientMetadataID } : OneClickApproveOrderOptions) : ZalgoPromise<ApproveData> {
    // resend fraudnet data for one click checkout
    retriggerFraudnet();

    return callGraphQL({
        name:  'OneClickApproveOrder',
        query: `
            mutation OneClickApproveOrder(
                $orderID : String!
                $instrumentType : String!
                $instrumentID : String!
            ) {
                oneClickPayment(
                    token: $orderID
                    selectedInstrumentType : $instrumentType
                    selectedInstrumentId : $instrumentID
                ) {
                    userId
                }
            }
        `,
        variables: { orderID, instrumentType, instrumentID },
        headers:   {
            [HEADERS.ACCESS_TOKEN]:       buyerAccessToken,
            [HEADERS.CLIENT_CONTEXT]:     orderID,
            [HEADERS.CLIENT_METADATA_ID]: clientMetadataID || orderID
        }
    }).then(({ oneClickPayment }) => {
        return {
            payerID: oneClickPayment.userId
        };
    });
}

type SupplementalOrderInfo = {|
    checkoutSession : {|
        cart : {|
            billingType? : string,
            intent : $Values<typeof INTENT>,
            paymentId? : ?string,
            billingToken? : ?string,
            amounts : {|
                total : {|
                    currencyFormatSymbolISOCurrency : string,
                    currencyValue : string,
                    currencyCode : string
                |}
            |},
            supplementary? : {|
                initiationIntent? : string
            |},
            category? : $Values<typeof ITEM_CATEGORY>
        |},
        buyer? : {|
            userId? : string
        |},
        flags : {|
            isChangeShippingAddressAllowed? : boolean
        |},
        payees? : $ReadOnlyArray<{|
            merchantId? : string,
            email? : {|
                stringValue? : string
            |}
        |}>
    |}
|};

export type GetSupplementalOrderInfo = (string) => ZalgoPromise<SupplementalOrderInfo>;

export const getSupplementalOrderInfo : GetSupplementalOrderInfo = memoize(orderID => {
    return callGraphQL({
        name:  'GetCheckoutDetails',
        query: `
            query GetCheckoutDetails($orderID: String!) {
                checkoutSession(token: $orderID) {
                    cart {
                        billingType
                        intent
                        paymentId
                        billingToken
                        amounts {
                            total {
                                currencyValue
                                currencyCode
                                currencyFormatSymbolISOCurrency
                            }
                        }
                        supplementary {
                            initiationIntent
                        }
                        category
                    }
                    flags {
                        isChangeShippingAddressAllowed
                    }
                    payees {
                        merchantId
                        email {
                            stringValue
                        }
                    }
                }
            }
        `,
        variables: { orderID },
        headers:   {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    });
});

export type DetailedOrderInfo = {|
    checkoutSession : {|
        allowedCardIssuers : $ReadOnlyArray<string>,
        cart : {|
            amounts : {|
                shippingAndHandling : {|
                    currencyFormatSymbolISOCurrency : string,
                    currencyValue : string,
                    currencyCode : $Values<typeof CURRENCY>
                |},

                tax : {|
                    currencyFormatSymbolISOCurrency : string,
                    currencyValue : string,
                    currencyCode : $Values<typeof CURRENCY>
                |},
                
                subtotal : {|
                    currencyFormatSymbolISOCurrency : string,
                    currencyValue : string,
                    currencyCode : $Values<typeof CURRENCY>
                |},

                total : {|
                    currencyFormatSymbolISOCurrency : string,
                    currencyValue : string,
                    currencyCode : $Values<typeof CURRENCY>
                |}
            |},
            shippingAddress? : ShippingAddress,
            shippingMethods? : $ReadOnlyArray<ShippingMethod>
        |}
    |}
|};

export type GetDetailedOrderInfo = (string, string) => ZalgoPromise<DetailedOrderInfo>;

export const getDetailedOrderInfo : GetDetailedOrderInfo = (orderID, country) => {
    return callGraphQL({
        name:  'GetCheckoutDetails',
        query: `
            query GetCheckoutDetails($orderID: String!, $country: CountryCodes!) {
                checkoutSession(token: $orderID) {
                    allowedCardIssuers(country: $country)
                    cart {
                        amounts {
                            shippingAndHandling {
                                currencyValue
                                currencySymbol
                                currencyFormat
                            }
                            tax {
                                currencyValue
                                currencySymbol
                                currencyFormat
                            }
                            subtotal {
                                currencyValue
                                currencySymbol
                                currencyFormat
                            }
                            total {
                                currencyValue
                                currencyCode
                                currencyFormatSymbolISOCurrency
                            }
                        }
                        shippingAddress {
                            firstName
                            lastName
                            line1
                            line2
                            city
                            state
                            postalCode
                            country
                        }
                        shippingMethods {
                            amount {
                                currencyCode
                                currencyValue
                            }
                            label
                            selected
                            type
                        }
                    }
                }
            }
        `,
        variables: { orderID, country },
        headers:   {
            [HEADERS.CLIENT_CONTEXT]: orderID
        }
    });
};

type UpdateButtonClientConfigOptions = {|
    orderID : string,
    fundingSource : $Values<typeof FUNDING>,
    inline : boolean | void,
    userExperienceFlow? : string,
    buttonSessionID? : ?string
|};

export function updateButtonClientConfig({ orderID, fundingSource, inline = false, userExperienceFlow, buttonSessionID } : UpdateButtonClientConfigOptions) : ZalgoPromise<void> {
    const experienceFlow = inline ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT;
    return updateClientConfig({
        orderID,
        fundingSource,
        integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
        userExperienceFlow:  userExperienceFlow ? userExperienceFlow : experienceFlow,
        productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS,
        buttonSessionID
    });
}

type PayWithPaymentMethodTokenOptions = {|
    orderID : string,
    paymentMethodToken : string,
    clientID : string,
    branded : boolean,
    buttonSessionID : string,
    clientMetadataID : string
|};

export function payWithPaymentMethodToken({ orderID, paymentMethodToken, clientID, branded, buttonSessionID, clientMetadataID } : PayWithPaymentMethodTokenOptions) : ZalgoPromise<ApproveData> {
    getLogger().info(`pay_with_payment_method_token_input_params`, { orderID, paymentMethodToken, clientID, branded, buttonSessionID });
    return callGraphQL({
        name:  'approvePaymentWithNonce',
        query: `
            mutation ApprovePaymentWithNonce(
                $orderID : String!
                $clientID : String!
                $paymentMethodToken: String!
                $branded: Boolean!
                $buttonSessionID: String
            ) {
                approvePaymentWithNonce(
                    token: $orderID
                    clientID: $clientID
                    paymentMethodNonce: $paymentMethodToken
                    branded: $branded
                    buttonSessionID: $buttonSessionID
                ) {
                    buyer {
                        userId
                        auth {
                            accessToken
                        }
                    }
                }
            }
        `,
        variables: {
            orderID,
            clientID,
            paymentMethodToken,
            branded,
            buttonSessionID
        },
        headers: {
            [ HEADERS.CLIENT_CONTEXT ]:     orderID,
            [ HEADERS.CLIENT_METADATA_ID ]: clientMetadataID
        }
    }).then(({ approvePaymentWithNonce }) => {
        getLogger().info('pay_with_paymentMethodNonce', approvePaymentWithNonce?.buyer?.userId);
        setBuyerAccessToken(approvePaymentWithNonce?.buyer?.auth?.accessToken);
        return {
            payerID: approvePaymentWithNonce.buyer.userId
        };
    });
}

type TokenizeCardOptions = {|
    card : {|
        number : string,
        cvv? : string,
        expiry? : string
    |}
|};

type TokenizeCardResult = {|
    paymentMethodToken : string
|};

export function tokenizeCard({ card } : TokenizeCardOptions) : ZalgoPromise<TokenizeCardResult> {
    return ZalgoPromise.try(() => {
        // eslint-disable-next-line no-console
        console.info('Card Tokenize GQL mutation not yet implemented', { card });
        return {
            paymentMethodToken: uniqueID()
        };
    });
}

type ApproveCardPaymentOptions = {|
    orderID : string,
    vault : boolean,
    branded : boolean,
    clientID : string,
    card : {|
        cardNumber : string,
        expirationDate? : string,
        securityCode? : string,
        postalCode? : string
    |}
|};

export function approveCardPayment({ card, orderID, clientID, branded } : ApproveCardPaymentOptions) : ZalgoPromise<void> {
    return callGraphQL({
        name:    'ProcessPayment',
        query: `
            mutation ProcessPayment(
                $orderID: String!
                $clientID: String!
                $card: CardInput!
                $branded: Boolean!
            ) {
                processPayment(
                    clientID: $clientID
                    paymentMethod: { type: CARD, card: $card }
                    branded: $branded
                    orderID: $orderID
                    buttonSessionID: "f7r7367r4"
                )
            }
        `,
        variables:         { orderID, clientID, card, branded },
        returnErrorObject: true
    }).then((gqlResult) => {
        if (!gqlResult) {
            throw new Error('Error on GraphQL ProcessPayment mutation');
        }
        return gqlResult;
    });
}
