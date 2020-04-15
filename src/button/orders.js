/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, FUNDING, CURRENCY, ENV, FPTI_KEY } from '@paypal/sdk-constants/src';
import { stringifyError, stringifyErrorMessage } from 'belter/src';

import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW, FPTI_CONTEXT_TYPE, FTPI_CUSTOM_KEY } from '../constants';
import { updateClientConfig, getPayee, getSupplementalOrderInfo } from '../api';
import { getLogger } from '../lib';
import { CLIENT_ID_PAYEE_NO_MATCH, ORDER_VALIDATION_WHITELIST, SANDBOX_ORDER_VALIDATION_WHITELIST } from '../config';

export function updateButtonClientConfig({ orderID, fundingSource, inline = false } : {| orderID : string, fundingSource : $Values<typeof FUNDING>, inline : boolean | void |}) : ZalgoPromise<void> {
    return updateClientConfig({
        orderID,
        fundingSource,
        integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
        userExperienceFlow:  inline ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT,
        productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
    });
}

type ValidateOptions = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    merchantID : $ReadOnlyArray<string>,
    expectedIntent : $Values<typeof INTENT>,
    expectedCurrency : $Values<typeof CURRENCY>
|};

export function validateOrder(orderID : string, { env, clientID, merchantID, expectedCurrency, expectedIntent } : ValidateOptions) : ZalgoPromise<void> {
    return ZalgoPromise.hash({
        order: getSupplementalOrderInfo(orderID),
        payee: getPayee(orderID)
    }).then(({ order, payee }) => {
        const cart = order.checkoutSession.cart;

        const intent = (cart.intent.toLowerCase() === 'sale') ? INTENT.CAPTURE : cart.intent.toLowerCase();
        const currency = cart.amounts && cart.amounts.total.currencyCode;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ intent } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
        }

        if (currency && currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ currency } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
        }

        const payeeMerchantID = payee && payee.merchant && payee.merchant.id;
        const actualMerchantID = merchantID && merchantID.length && merchantID[0];

        if (!actualMerchantID) {
            throw new Error(`Could not determine correct merchant id`);
        }

        if (!payeeMerchantID) {
            throw new Error(`No payee found in transaction. Expected ${ actualMerchantID }`);
        }

        if (payeeMerchantID !== actualMerchantID) {
            if (clientID && CLIENT_ID_PAYEE_NO_MATCH.indexOf(clientID) === -1) {
                getLogger().info(`client_id_payee_no_match_${ clientID }`).flush();
                // throw new Error(`Payee passed in transaction does not match expected merchant id: ${ actualMerchantID }`);
            }
        }

        const xpropMerchantID = window.xprops.merchantID && window.xprops.merchantID[0];
        if (xpropMerchantID && payeeMerchantID !== xpropMerchantID) {
            throw new Error(`Payee passed in transaction does not match expected merchant id: ${ xpropMerchantID }`);
        }
    }).catch(err => {
        const isSandbox = (env === ENV.SANDBOX);
        const isWhitelisted = isSandbox
            ? (clientID && SANDBOX_ORDER_VALIDATION_WHITELIST.indexOf(clientID) !== -1)
            : (clientID && ORDER_VALIDATION_WHITELIST.indexOf(clientID) !== -1);

        getLogger()
            .warn(`${ isSandbox ? 'sandbox_' : '' }order_validation_error${ isWhitelisted ? '_whitelist' : '' }`, { err: stringifyError(err) })
            .warn(`${ isSandbox ? 'sandbox_' : '' }order_validation_error${ isWhitelisted ? '_whitelist' : '' }_${ clientID || 'unknown' }`, { err: stringifyError(err) })
            .track({
                [ FPTI_KEY.TRANSITION ]:                  'process_order_validate',
                [ FPTI_KEY.CONTEXT_TYPE ]:                FPTI_CONTEXT_TYPE.ORDER_ID,
                [ FPTI_KEY.TOKEN ]:                       orderID,
                [ FPTI_KEY.CONTEXT_ID ]:                  orderID,
                [ FTPI_CUSTOM_KEY.INTEGRATION_ISSUE ]:    stringifyErrorMessage(err),
                [FTPI_CUSTOM_KEY.INTEGRATION_WHITELIST ]: isWhitelisted ? 'true' : 'false'
            })
            .flush();

        if (!isWhitelisted) {
            throw err;
        }
    });
}
