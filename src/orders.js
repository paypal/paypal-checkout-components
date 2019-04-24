/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, FUNDING } from '@paypal/sdk-constants/src';
import { memoize } from 'belter/src';

import { billingTokenToOrderID, callGraphQL, patchOrder, type OrderResponse, getOrder, captureOrder, authorizeOrder, createAccessToken, createOrder } from './api';
import { ORDER_ID_PATTERN, ERROR_URL, ORDER_API_ERROR, HEADERS } from './constants';

type CreateOrderActionsType = {|
    order : {
        create : (Object) => ZalgoPromise<string>
    }
|};

export function buildCreateOrderActions() : CreateOrderActionsType {
    const create = (data) => {
        return createAccessToken(window.xprops.clientID).then(accessToken => {
            return createOrder(accessToken, data);
        });
    };

    return {
        order: { create }
    };
}

type ShippingChangeActionsType = {|
    order : {
        patch : () => ZalgoPromise<OrderResponse>
    }
|};

export function buildShippingChangeActions(orderID : string) : ShippingChangeActionsType {

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    return {
        order: { patch }
    };
}

type ApproveActionsType = {|
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        patch : () => ZalgoPromise<OrderResponse>,
        get : () => ZalgoPromise<OrderResponse>
    }
|};

export function buildApproveActions(orderID : string, fundingSource : $Values<typeof FUNDING>, restart : () => ZalgoPromise<OrderResponse>) : ApproveActionsType {

    const handleProcessorError = (err : mixed) : ZalgoPromise<OrderResponse> => {
        // $FlowFixMe
        const isProcessorDecline = err && err.data && err.data.details && err.data.details.some(detail => {
            return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
        });

        if (isProcessorDecline) {
            return restart();
        }

        throw new Error('Order could not be captured');
    };

    const get = memoize(() =>
        getOrder(orderID));

    const capture = memoize(() => {
        if (window.xprops.intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return captureOrder(orderID)
            .catch(handleProcessorError)
            .finally(get.reset);
    });

    const authorize = memoize(() =>
        authorizeOrder(orderID)
            .catch(handleProcessorError)
            .finally(get.reset));

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    return {
        order: { capture, authorize, patch, get }
    };
}

export function createOrderOrBillingAgreement() : ZalgoPromise<string> {
    if (window.xprops.createBillingAgreement) {
        return window.xprops.createBillingAgreement().then(billingToken => {
            return billingTokenToOrderID(billingToken);
        });
    } else if (window.xprops.createOrder) {
        return window.xprops.createOrder({}, buildCreateOrderActions());
    } else {
        throw new Error(`No mechanism to create order`);
    }
}


function isOrderID(orderID : string) : boolean {
    return Boolean(orderID.match(/^[A-Z0-9]{17}$/));
}

export function validateOrder(orderID : string) : ZalgoPromise<void> {
    if (!orderID.match(ORDER_ID_PATTERN)) {
        throw new Error(`${ orderID } does not match pattern for order-id, ec-token or cart-id`);
    }

    return callGraphQL({
        query: `
            query GetCheckoutDetails($orderID: String!) {
                checkoutSession(token: $orderID) {
                    cart {
                        intent
                        returnUrl {
                            href
                        }
                        cancelUrl {
                            href
                        }
                        amounts {
                            total {
                                currencyCode
                            }
                        }
                    }
                }
            }
        `,
        variables: { orderID }
    }).then(res => {
        const cart = res.data.checkoutSession.cart;

        const intent = (cart.intent.toLowerCase() === 'sale') ? INTENT.CAPTURE : cart.intent.toLowerCase();
        const currency = cart.amounts && cart.amounts.total.currencyCode;
        const returnUrl = cart.returnUrl && cart.returnUrl.href;
        const cancelUrl = cart.cancelUrl && cart.cancelUrl.href;

        const expectedIntent = window.xprops.intent;
        const expectedCurrency = window.xprops.currency;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ intent } to the sdk`);
        }

        if (currency && currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ currency } to the sdk`);
        }

        if (isOrderID(orderID)) {
            if (returnUrl && returnUrl.indexOf(ERROR_URL) !== 0) {
                throw new Error(`Return url is forbidden for smart payment button integration.`);
            }

            if (cancelUrl && cancelUrl.indexOf(ERROR_URL) !== 0) {
                throw new Error(`Cancel url is forbidden for smart payment button integration.`);
            }
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

export function updateClientConfig({ orderID, fundingSource, integrationArtifact, userExperienceFlow, productFlow } : ClientConfig) : ZalgoPromise<mixed> {
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
