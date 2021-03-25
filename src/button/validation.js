/* @flow */
/* eslint no-console: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT, SDK_QUERY_KEYS, CURRENCY, ENV, FPTI_KEY, SDK_SETTINGS, VAULT } from '@paypal/sdk-constants/src';

import type { CreateBillingAgreement, CreateSubscription } from '../props';
import { FPTI_CONTEXT_TYPE, FPTI_CUSTOM_KEY } from '../constants';
import { getSupplementalOrderInfo } from '../api';
import { getLogger, isEmailAddress } from '../lib';
import { ORDER_VALIDATION_WHITELIST, SANDBOX_ORDER_VALIDATION_WHITELIST } from '../config';

type OrderValidateOptions = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    merchantID : $ReadOnlyArray<string>,
    intent : $Values<typeof INTENT>,
    currency : $Values<typeof CURRENCY>,
    vault : boolean
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

type triggerIntegrationErrorOptions = {|
    error : string,
    message? : string,
    clientID : ?string,
    orderID? : string,
    env : $Values<typeof ENV>,
    loggerPayload? : {|
        [string] : ?(string | boolean)
    |},
    throwError? : boolean
|};

function triggerIntegrationError({ env, error, message = error, clientID, orderID, loggerPayload = {}, throwError = true } : triggerIntegrationErrorOptions) {

    const isSandbox = (env === ENV.SANDBOX);
    const isWhitelisted = isSandbox
        ? (clientID && SANDBOX_ORDER_VALIDATION_WHITELIST.indexOf(clientID) !== -1)
        : (clientID && ORDER_VALIDATION_WHITELIST.indexOf(clientID) !== -1);

    const shouldThrow = (throwError && !isWhitelisted);


    getLogger()
        .warn(error, loggerPayload)
        .track({
            [ FPTI_KEY.TRANSITION ]:                   'process_order_validate',
            [ FPTI_KEY.CONTEXT_TYPE ]:                 FPTI_CONTEXT_TYPE.ORDER_ID,
            [ FPTI_KEY.TOKEN ]:                        orderID,
            [ FPTI_KEY.CONTEXT_ID ]:                   orderID,
            [ FPTI_CUSTOM_KEY.INTEGRATION_ISSUE ]:     error,
            [ FPTI_CUSTOM_KEY.INTEGRATION_WHITELIST ]: shouldThrow ? 'false' : 'true',
            [ FPTI_KEY.ERROR_DESC ]:                   message
        }).flush();

    if (shouldThrow) {
        console.error(message);
        throw new Error(message);
    } else {
        console.warn(message);
    }
}

type ValidatePropsOptions = {|
    env : $Values<typeof ENV>,
    clientID : string,
    intent : $Values<typeof INTENT>,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription
|};

export function validateProps({ env, clientID, intent, createBillingAgreement, createSubscription } : ValidatePropsOptions) {
    const logger = getLogger();

    if (createBillingAgreement && intent !== INTENT.TOKENIZE) {
        triggerIntegrationError({
            error:         `smart_button_validation_error_expected_intent_tokenize`,
            message:       `Expected intent=${ INTENT.TOKENIZE } to be passed to SDK with createBillingAgreement, but got intent=${ intent }`,
            env, clientID,
            loggerPayload: { intent },
            throwError:    false
        });
    }

    if (createSubscription && intent !== INTENT.SUBSCRIPTION) {
        triggerIntegrationError({
            error:         `smart_button_validation_error_expected_intent_subscription`,
            message:       `Expected intent=${ INTENT.SUBSCRIPTION } to be passed to SDK with createSubscription, but got intent=${ intent }`,
            env, clientID,
            loggerPayload: { intent },
            throwError:    false
        });
    }

    logger.flush();
}

const VALIDATE_INTENTS = [
    INTENT.CAPTURE,
    INTENT.AUTHORIZE,
    INTENT.ORDER
];

export function validateOrder(orderID : string, { env, clientID, merchantID, currency, intent, vault } : OrderValidateOptions) : ZalgoPromise<void> {
    const logger = getLogger();
    
    // eslint-disable-next-line complexity
    return getSupplementalOrderInfo(orderID).then(order => {
        const cart = order.checkoutSession.cart;
        const cartIntent = (cart.intent.toLowerCase() === 'sale') ? INTENT.CAPTURE : cart.intent.toLowerCase();
        const cartCurrency = cart.amounts && cart.amounts.total.currencyCode;
        const cartAmount = cart.amounts && cart.amounts.total.currencyValue;
        const cartBillingType = cart.billingType;

        if (cartIntent !== intent && VALIDATE_INTENTS.indexOf(intent) !== -1) {
            triggerIntegrationError({
                error:         'smart_button_validation_error_incorrect_intent',
                message:       `Expected intent from order api call to be ${ intent }, got ${ cartIntent }. Please ensure you are passing ${ SDK_QUERY_KEYS.INTENT }=${ cartIntent } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                loggerPayload: { cartIntent, intent },
                env, clientID, orderID
            });
        }

        if (cartCurrency && cartCurrency !== currency) {
            triggerIntegrationError({
                error:         'smart_button_validation_error_incorrect_currency',
                message:       `Expected currency from order api call to be ${ currency }, got ${ cartCurrency }. Please ensure you are passing ${ SDK_QUERY_KEYS.CURRENCY }=${ cartCurrency } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                loggerPayload: { cartCurrency, currency },
                env, clientID, orderID
            });
        }

        if (!merchantID || merchantID.length === 0) {
            triggerIntegrationError({
                error:   'smart_button_validation_error_no_merchant_id',
                message: `Could not determine correct merchant id`,
                env, clientID, orderID
            });
        }

        if (cartBillingType && !vault) {
            triggerIntegrationError({
                error:         `smart_button_validation_error_billing_${ cartAmount ? 'with' : 'without' }_purchase_no_vault`,
                message:       `Expected ${ SDK_QUERY_KEYS.VAULT }=${ VAULT.TRUE.toString() } for a billing transaction`,
                env, clientID, orderID,
                loggerPayload: { cartBillingType, vault },
                throwError:    false
            });
        }

        if (vault && !cartBillingType && !window.xprops.createBillingAgreement && !window.xprops.createSubscription && !window.xprops.clientAccessToken && !window.xprops.userIDToken) {
            triggerIntegrationError({
                error:         `smart_button_validation_error_vault_passed_not_needed`,
                message:       `Expected ${ SDK_QUERY_KEYS.VAULT }=${ VAULT.FALSE.toString() } for a non-billing, non-subscription transaction`,
                env, clientID, orderID,
                loggerPayload: { vault, cartBillingType },
                throwError:    false
            });
        }

        if (cartBillingType && !cartAmount && intent !== INTENT.TOKENIZE) {
            triggerIntegrationError({
                error:         `smart_button_validation_error_billing_without_purchase_intent_tokenize_not_passed`,
                message:       `Expected ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.TOKENIZE } for a billing-without-purchase transaction`,
                env, clientID, orderID,
                loggerPayload: { vault, cartBillingType, cartAmount },
                throwError:    false
            });
        }

        const payees = order.checkoutSession.payees;

        if (!payees) {
            return triggerIntegrationError({
                error:      'smart_button_validation_error_supplemental_order_missing_payees',
                env, clientID, orderID,
                throwError: false
            });
        }

        if (!payees.length) {
            return triggerIntegrationError({
                error:      'smart_button_validation_error_supplemental_order_no_payees',
                env, clientID, orderID,
                throwError: false
            });
        }

        // find and remove duplicated payees
        const dict = {};
        const uniquePayees = [];

        for (const payee of payees) {
            if (!payee.merchantId && (!payee.email || !payee.email.stringValue)) {
                return triggerIntegrationError({
                    error:         'smart_button_validation_error_supplemental_order_missing_values',
                    env, clientID, orderID,
                    loggerPayload: { payees: JSON.stringify(payees) },
                    throwError:    false
                });
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

            triggerIntegrationError({
                error:         'smart_button_validation_error_invalid_payee_state',
                message:       `Invalid payee state: ${ JSON.stringify(uniquePayees) }`,
                loggerPayload: { uniquePayees: JSON.stringify(uniquePayees) },
                env, clientID, orderID
            });

            throw new Error('Payees Incorrect');
        }).join(',');

        const xpropMerchantID = window.xprops.merchantID;

        if (xpropMerchantID && xpropMerchantID.length) {
            
            // Validate merchant-id value(s) passed explicitly to SDK
            if (!isValidMerchantIDs(xpropMerchantID, uniquePayees)) {
                if (uniquePayees.length === 1) {
                    triggerIntegrationError({
                        error:      'smart_button_validation_error_payee_no_match',
                        message:    `Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ payeesStr } or ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue) ? uniquePayees[0].email.stringValue : 'payee@merchant.com' } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                        env, clientID, orderID
                    });
                } else {
                    triggerIntegrationError({
                        error:      'smart_button_validation_error_payee_no_match',
                        message:    `Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=* to the sdk url and ${ SDK_SETTINGS.MERCHANT_ID }="${ payeesStr }" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                        env, clientID, orderID
                    });
                }
            }
        } else {

            // Validate merchant-id value derived from client id
            if (!isValidMerchantIDs(merchantID, uniquePayees)) {
                logger.warn(`smart_button_validation_error_derived_payee_transaction_mismatch`, { payees: JSON.stringify(uniquePayees), merchantID: JSON.stringify(merchantID) });

                if (uniquePayees.length === 1) {
                    if (env === ENV.SANDBOX) {
                        logger.warn(`smart_button_validation_error_derived_payee_transaction_mismatch_sandbox`, { payees: JSON.stringify(payees), merchantID: JSON.stringify(merchantID) });
                    }

                    triggerIntegrationError({
                        error:      'smart_button_validation_error_payee_no_match',
                        message:    `Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ payeesStr } or ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue) ? uniquePayees[0].email.stringValue : 'payee@merchant.com' } to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                        env, clientID, orderID,
                        throwError: false
                    });
                } else {
                    triggerIntegrationError({
                        error:      'smart_button_validation_error_payee_no_match',
                        message:    `Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing ${ SDK_QUERY_KEYS.MERCHANT_ID }=* to the sdk url and ${ SDK_SETTINGS.MERCHANT_ID }="${ payeesStr }" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/`,
                        env, clientID, orderID
                    });
                }
            }
        }

    });
}
