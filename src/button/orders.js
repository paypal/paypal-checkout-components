/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, FUNDING, CURRENCY, ENV, FPTI_KEY, SDK_SETTINGS } from '@paypal/sdk-constants/src';
import { stringifyError, stringifyErrorMessage } from 'belter/src';

import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW, FPTI_CONTEXT_TYPE, FTPI_CUSTOM_KEY } from '../constants';
import { updateClientConfig, getSupplementalOrderInfo } from '../api';
import { getLogger, isEmailAddress } from '../lib';
import { ORDER_VALIDATION_WHITELIST, SANDBOX_ORDER_VALIDATION_WHITELIST } from '../config';

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

type Payee = {|
    merchantId? : string,
    email? : {|
        stringValue? : string
    |}
|};

// check whether each merchantIdsOrEmails is in payees and each payee is in merchantIds
// merchantIdsOrEmails is an arry of mixed merchant id and emails
// payees is an array of payee object {merchant_id, email}
function isValidMerchantIDs(merchantIDs : $ReadOnlyArray<string>, payees : $ReadOnlyArray<Payee>) : boolean {
    if (merchantIDs.length !== payees.length) {
        return false;
    }

    // split merchantIds into 2 arrays, one for emails and one for merchant ids
    const merchantEmails = [];
    const merchantIds = [];

    merchantIDs.forEach(id => {
        if (isEmailAddress(id)) {
            merchantEmails.push(id.toLowerCase());
        } else {
            merchantIds.push(id);
        }
    });

    const foundEmail = merchantEmails.every(email => {
        return payees.some(payee => {
            return email === (payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase());
        });
    });

    const foundMerchantId = merchantIds.every(id => {
        return payees.some(payee => {
            return (id === payee.merchantId);
        });
    });

    // if the id or email is not in payees
    if (!foundEmail || !foundMerchantId) {
        return false;
    }

    // now check payees
    // each payer should either has merchant_id in merchantIds or has email in merchantEmails
    const foundPayee = payees.every(payee => {
        return (merchantIds.indexOf(payee.merchantId) > -1 || merchantEmails.indexOf(payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase()) > -1);
    });
    return foundPayee;
}

export function validateOrder(orderID : string, { env, clientID, merchantID, expectedCurrency, expectedIntent } : ValidateOptions) : ZalgoPromise<void> {
    // eslint-disable-next-line complexity
    return getSupplementalOrderInfo(orderID).then(order => {
        const cart = order.checkoutSession.cart;
        const intent = (cart.intent.toLowerCase() === 'sale') ? INTENT.CAPTURE : cart.intent.toLowerCase();
        const currency = cart.amounts && cart.amounts.total.currencyCode;

        if (intent !== expectedIntent) {
            throw new Error(`Expected intent from order api call to be ${ expectedIntent }, got ${ intent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ intent } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
        }

        if (currency && currency !== expectedCurrency) {
            throw new Error(`Expected currency from order api call to be ${ expectedCurrency }, got ${ currency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ currency } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
        }

        if (!merchantID || merchantID.length === 0) {
            throw new Error(`Could not determine correct merchant id`);
        }

        const payees = order.checkoutSession.payees;

        if (!payees) {
            return getLogger().warn(`supplemental_order_missing_payees`).flush();
        }

        if (!payees.length) {
            return getLogger().warn(`supplemental_order_payees_empty`).flush();
        }

        // find and remove duplicated payees
        const dict = {};
        const uniquePayees = [];

        for (const payee of payees) {
            if (!payee.merchantId && (!payee.email || !payee.email.stringValue)) {
                return getLogger().warn(`supplemental_order_payees_missing_value`, { payees: JSON.stringify(payees) }).flush();
            }

            if (payee.merchantId) {
                if (!dict[payee.merchantId]) {
                    dict[payee.merchantId] = 1;
                    uniquePayees.push(payee);
                }
            } else if (payee.email && payee.email.stringValue) {
                if (!dict[payee.email.stringValue]) {
                    dict[payee.email.stringValue] = 1;
                    uniquePayees.push(payee);
                }
            }
        }

        const payeesStr = uniquePayees.map(payee => {
            if (payee.merchantId) {
                return payee.merchantId;
            }

            if (payee.email && payee.email.stringValue) {
                return payee.email.stringValue;
            }

            throw new Error(`Invalid payee state: ${ JSON.stringify(uniquePayees) }`);
        }).join(',');

        const xpropMerchantID = window.xprops.merchantID;

        if (xpropMerchantID && xpropMerchantID.length) {
            
            // Validate merchant-id value(s) passed explicitly to SDK
            if (!isValidMerchantIDs(xpropMerchantID, uniquePayees)) {
                getLogger().warn(`explicit_payee_transaction_mismatch`, { payees: JSON.stringify(uniquePayees), merchantID: JSON.stringify(merchantID) }).flush();

                if (uniquePayees.length === 1) {
                    throw new Error(`Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ payeesStr } or ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue) ? uniquePayees[0].email.stringValue : 'payee@merchant.com' } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
                } else {
                    throw new Error(`Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=* to the sdk url and ${ SDK_SETTINGS.MERCHANT_ID }="${ payeesStr }" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
                }
            }
        } else {

            // Validate merchant-id value derived from client id
            if (!isValidMerchantIDs(merchantID, uniquePayees)) {
                getLogger().warn(`derived_payee_transaction_mismatch`, { payees: JSON.stringify(uniquePayees), merchantID: JSON.stringify(merchantID) }).flush();

                if (uniquePayees.length === 1) {
                    if (env === ENV.SANDBOX) {
                        getLogger().warn(`derived_payee_transaction_mismatch_sandbox`, { payees: JSON.stringify(payees), merchantID: JSON.stringify(merchantID) }).flush();
                    }

                    // eslint-disable-next-line no-console
                    console.warn(`Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ payeesStr } or ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue) ? uniquePayees[0].email.stringValue : 'payee@merchant.com' } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
                } else {
                    throw new Error(`Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=* to the sdk url and ${ SDK_SETTINGS.MERCHANT_ID }="${ payeesStr }" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`);
                }
            }
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
            // eslint-disable-next-line no-console
            console.error(stringifyError(err));
            throw err;
        } else {
            // eslint-disable-next-line no-console
            console.warn(stringifyError(err));
        }
    });
}
