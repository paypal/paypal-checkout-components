/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, FUNDING } from '@paypal/sdk-constants/src';

import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW } from '../constants';
import { updateClientConfig } from '../api';
import { callGraphQL } from '../api/api';

export function updateButtonClientConfig({ orderID, fundingSource, isCardFields } : { orderID : string, fundingSource : $Values<typeof FUNDING>, isCardFields : boolean }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (window.xprops.updateClientConfiguration) {
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

export function validateOrder(orderID : string) : ZalgoPromise<void> {
    return callGraphQL({
        query: `
            query GetCheckoutDetails($orderID: String!) {
                checkoutSession(token: $orderID) {
                    cart {
                        intent
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

        const expectedIntent = window.xprops.intent;
        const expectedCurrency = window.xprops.currency;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ intent } to the sdk`);
        }

        if (currency && currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ currency } to the sdk`);
        }
    });
}
