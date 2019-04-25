/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, FUNDING } from '@paypal/sdk-constants/src';

import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW, ORDER_ID_PATTERN, ERROR_URL } from '../constants';
import { CLIENT_CONFIG_ENABLED } from '../config';
import { updateClientConfig } from '../api';
import { callGraphQL } from '../api/api';

export function updateButtonClientConfig({ orderID, fundingSource, isCardFields } : { orderID : string, fundingSource : $Values<typeof FUNDING>, isCardFields : boolean }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (CLIENT_CONFIG_ENABLED) {
            return updateClientConfig({
                orderID,
                fundingSource,
                integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
                userExperienceFlow:  isCardFields ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT,
                productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
            });
        }
    });
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
