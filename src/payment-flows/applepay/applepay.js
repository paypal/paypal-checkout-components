/* @flow */
/* eslint max-lines: off, max-nested-callbacks: off */

import { cleanup, memoize, stringifyError, stringifyErrorMessage, noop } from '@krakenjs/belter/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { getDetailedOrderInfo, approveApplePayPayment, getApplePayMerchantSession } from '../../api';
import { getLogger, promiseNoop, unresolvedPromise } from '../../lib';
import { FPTI_CUSTOM_KEY, FPTI_STATE, FPTI_TRANSITION } from '../../constants';
import type { ApplePayLineItem, ApplePayPaymentContact, ApplePayShippingMethod, ApplePayShippingMethodUpdate, ApplePayShippingContactUpdate, PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from '../types';

import { createApplePayRequest, isJSON, validateShippingContact, isZeroAmount } from './utils';

const SUPPORTED_VERSION = 4;

let clean;
function setupApplePay() : ZalgoPromise<void> {
    return ZalgoPromise.resolve();
}

function isApplePayEligible({ serviceData } : IsEligibleOptions) : boolean {
    const { fundingEligibility } = serviceData;

    return fundingEligibility &&
           fundingEligibility[FUNDING.APPLEPAY] &&
           fundingEligibility[FUNDING.APPLEPAY].eligible ?
        fundingEligibility[FUNDING.APPLEPAY].eligible :
        false;
}

function isApplePayPaymentEligible({ payment } : IsPaymentEligibleOptions) : boolean {
    return payment.fundingSource === FUNDING.APPLEPAY;
}

function initApplePay({ props, payment, serviceData } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, onClick, onShippingChange, locale, clientID, merchantDomain, currency, applePay, partnerAttributionID } = props;
    const { facilitatorAccessToken } = serviceData;
    const { fundingSource } = payment;

    if (clean) {
        clean.all();
    }

    clean = cleanup();
    const close = memoize(() => {
        return clean.all();
    });

    const validate = memoize(() => {
        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        });
    });

    function logApplePayEvent(event, payload) {
        const data = isJSON(payload) ? payload : {};
        getLogger().info(`${ FPTI_TRANSITION.APPLEPAY_EVENT }_${ event }`, data)
            .track({
                [FPTI_KEY.TRANSITION]:      `${ FPTI_TRANSITION.APPLEPAY_EVENT }_${ event }`,
                [FPTI_CUSTOM_KEY.INFO_MSG]: JSON.stringify(data)
            })
            .flush();
    }

    function handleApplePayError(eventName, error) : ZalgoPromise<void> {
        getLogger().info(eventName)
            .track({
                [FPTI_KEY.TRANSITION]:      eventName,
                [FPTI_CUSTOM_KEY.ERR_DESC]: `Error: ${ stringifyError(error) }`
            })
            .flush();
        return close().then(() => {
            return onError(error);
        });
    }

    // eslint-disable-next-line flowtype/no-mutable-array
    function updateNewLineItems({ subtotal, tax, shipping, shippingLabel, shippingIdentifier } : {| subtotal : string, tax : string, shipping : string, shippingLabel : ?string, shippingIdentifier : ?string |}) : Array<ApplePayLineItem> {
        const newLineItems = [];

        if (subtotal && !isZeroAmount(subtotal)) {
            newLineItems.push({
                label:  'Subtotal',
                amount: subtotal
            });
        }
        
        if (tax && !isZeroAmount(tax)) {
            newLineItems.push({
                label:  'Sales Tax',
                amount: tax
            });
        }

        const isPickup = shippingIdentifier === 'PICKUP';

        if ((shipping && !isZeroAmount(shipping)) || isPickup) {
            newLineItems.push({
                label:  shippingLabel || 'Shipping',
                amount: shipping
            });
        }

        return newLineItems;
    }

    function initApplePaySession() : ZalgoPromise<void> {
        let currentTotalAmount;
        let currentSubtotalAmount;
        let currentTaxAmount;
        let currentShippingAmount;
        let currentShippingContact;
        let currentShippingMethod;

        const onShippingChangeCallback = <T>({ orderID, shippingContact, shippingMethod = null } : {| orderID : string, shippingContact : ApplePayPaymentContact, shippingMethod? : ?ApplePayShippingMethod |}) : ZalgoPromise<T> => {

            if (!onShippingChange) {
                const update = {
                    newTotal: {
                        label:  'Total',
                        amount: currentTotalAmount
                    },
                    newLineItems: []
                };

                update.newLineItems = updateNewLineItems(
                    {
                        shipping:           currentShippingAmount,
                        subtotal:           currentSubtotalAmount,
                        tax:                currentTaxAmount,
                        shippingLabel:      currentShippingMethod?.label,
                        shippingIdentifier: currentShippingMethod?.identifier
                    }
                );

                // $FlowFixMe
                return ZalgoPromise.resolve(update);
            }

            const { errors, shipping_address } = validateShippingContact(shippingContact);
            
            if (errors && errors.length) {
                const update = {
                    errors,
                    newTotal: {
                        label:  'Total',
                        amount: currentTotalAmount
                    },
                    newLineItems: []
                };
                update.newLineItems = updateNewLineItems(
                    {
                        shipping:           currentShippingAmount,
                        subtotal:           currentSubtotalAmount,
                        tax:                currentTaxAmount,
                        shippingLabel:      currentShippingMethod?.label,
                        shippingIdentifier: currentShippingMethod?.identifier
                    }
                );

                // $FlowFixMe
                return ZalgoPromise.resolve(update);
            }

            const data = {
                amount: {
                    currency_code: currency,
                    value:         '0.00'
                },
                orderID,
                shipping_address
            };

            if (shippingMethod) {
                // $FlowFixMe
                data.selected_shipping_option = {
                    label:  shippingMethod.label || currentShippingMethod?.label || 'Shipping',
                    // $FlowFixMe
                    type:   shippingMethod.identifier,
                    amount: {
                        currency_code: currency,
                        value:         shippingMethod.amount
                    }
                };
            } else {
                // $FlowFixMe
                data.selected_shipping_option = {
                    label:  'Shipping',
                    // $FlowFixMe
                    type:   currentShippingMethod?.identifier,
                    amount: {
                        currency_code: currency,
                        value:         currentShippingAmount
                    }
                };
            }

            const actions = {
                resolve: () => {
                    return ZalgoPromise.resolve();
                },
                reject: (err) => {
                    return ZalgoPromise.reject(err);
                }
            };

            // $FlowFixMe
            return onShippingChange({ ...data, facilitatorAccessToken, partnerAttributionID, forceRestAPI: true }, actions)
                .then(() => {
                    currentShippingContact = shippingContact;

                    if (shippingMethod) {
                        currentShippingMethod = shippingMethod;
                    }

                    return getDetailedOrderInfo(orderID, locale.country).then(updatedOrder => {
                        const {
                            cart: {
                                amounts: {
                                    tax: {
                                        currencyValue: updatedTaxValue
                                    },
                                    subtotal: {
                                        currencyValue: updatedSubtotalValue
                                    },
                                    total: {
                                        currencyValue: updatedTotalValue
                                    }
                                }
                            }
                        } = updatedOrder.checkoutSession;

                        currentShippingAmount = currentShippingMethod?.amount || currentShippingAmount || '0.00';
                        currentTaxAmount = updatedTaxValue === '0.00' ? currentTaxAmount : updatedTaxValue;
                        currentSubtotalAmount = updatedSubtotalValue === '0.00' ? currentSubtotalAmount : updatedSubtotalValue;
                        currentTotalAmount = updatedTotalValue;

                        const update = {
                            newTotal: {
                                label:  'Total',
                                amount: updatedTotalValue
                            },
                            newLineItems: []
                        };
                        update.newLineItems = updateNewLineItems(
                            {
                                shipping:           currentShippingAmount,
                                subtotal:           currentSubtotalAmount,
                                tax:                currentTaxAmount,
                                shippingLabel:      currentShippingMethod?.label,
                                shippingIdentifier: currentShippingMethod?.identifier
                            }
                        );

                        // $FlowFixMe
                        return ZalgoPromise.resolve(update);
                    });
                });
        };

        const validatePromise = validate().then(valid => {
            if (!valid) {
                getLogger().info(`applepay_onclick_invalid`).track({
                    [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.APPLEPAY_ON_CLICK_INVALID
                }).flush();
            }

            return valid;
        });

        const orderPromise = validatePromise.then(valid => {
            if (valid) {
                return createOrder();
            }

            return unresolvedPromise();
        });

        const setupApplePaySession = () => {
            return orderPromise.then(orderID => {
                const country = locale.country;

                return getDetailedOrderInfo(orderID, country).then(order => {
                    // set order details into ApplePayRequest
                    const applePayRequest = createApplePayRequest(country, order);
                    
                    // create Apple Pay Session
                    const {
                        cart: {
                            amounts: {
                                shippingAndHandling: {
                                    currencyValue: shippingValue
                                },
                                tax: {
                                    currencyValue: taxValue
                                },
                                subtotal: {
                                    currencyValue: subtotalValue
                                },
                                total: {
                                    currencyValue: totalValue
                                }
                            }
                        }
                    } = order.checkoutSession;
 
                    currentShippingAmount = shippingValue;
                    currentShippingMethod = applePayRequest.shippingMethods && applePayRequest.shippingMethods.length ? applePayRequest.shippingMethods[0] : null;
                    currentTaxAmount = taxValue;
                    currentSubtotalAmount = subtotalValue;
                    currentTotalAmount = totalValue;

                    return applePay(SUPPORTED_VERSION, applePayRequest).then(response => {
                        const {
                            begin,
                            addEventListener,
                            completeMerchantValidation,
                            completeShippingContactSelection,
                            completePaymentMethodSelection,
                            completeShippingMethodSelection,
                            completePayment
                        } = response;

                        function validateMerchant({ validationURL }) {
                            logApplePayEvent('validatemerchant', { validationURL });

                            getApplePayMerchantSession({ url: validationURL, clientID, orderID, merchantDomain })
                                .then(merchantSession => {
                                    try {
                                        const session = atob(merchantSession.session);
                                        completeMerchantValidation(JSON.parse(session));
                                    } catch (err) {
                                        handleApplePayError(FPTI_TRANSITION.APPLEPAY_MERCHANT_VALIDATION_COMPLETION_ERROR, err);
                                    }
                                })
                                .catch(err => {
                                    handleApplePayError(FPTI_TRANSITION.APPLEPAY_MERCHANT_VALIDATION_ERROR, err);
                                });
                        }

                        function paymentMethodSelected({ paymentMethod }) {
                            logApplePayEvent('paymentmethodselected', paymentMethod);

                            const update = {
                                newTotal: {
                                    label:  'Total',
                                    amount: currentTotalAmount
                                },
                                newLineItems: []
                            };
                            update.newLineItems = updateNewLineItems(
                                {
                                    shipping:           currentShippingAmount,
                                    subtotal:           currentSubtotalAmount,
                                    tax:                currentTaxAmount,
                                    shippingLabel:      currentShippingMethod?.label,
                                    shippingIdentifier: currentShippingMethod?.identifier
                                }
                            );

                            completePaymentMethodSelection(update);
                        }
                        
                        function shippingMethodSelected({ shippingMethod }) {
                            logApplePayEvent('shippingmethodselected');

                            // patch updated amount
                            onShippingChangeCallback<ApplePayShippingMethodUpdate>({ orderID, shippingContact: currentShippingContact, shippingMethod })
                                .then(update => {
                                    currentShippingMethod = shippingMethod;
                                    completeShippingMethodSelection(update);
                                })
                                .catch(() => {
                                    const update = {
                                        newTotal: {
                                            label:  'Total',
                                            amount: currentTotalAmount
                                        },
                                        newLineItems: []
                                    };
                                    update.newLineItems = updateNewLineItems(
                                        {
                                            shipping:           currentShippingAmount,
                                            subtotal:           currentSubtotalAmount,
                                            tax:                currentTaxAmount,
                                            shippingLabel:      shippingMethod?.label,
                                            shippingIdentifier: currentShippingMethod?.identifier
                                        }
                                    );

                                    completeShippingMethodSelection(update);
                                });
                        }

                        function shippingContactSelected({ shippingContact }) {
                            logApplePayEvent('shippingcontactselected', shippingContact);

                            // patch updated shipping contact information
                            onShippingChangeCallback<ApplePayShippingContactUpdate>({ orderID, shippingContact, shippingMethod: currentShippingMethod })
                                .then(update => {
                                    completeShippingContactSelection(update);
                                })
                                .catch(err => {
                                    handleApplePayError('shippingContactSelected', err);
                                });
                        }

                        function paymentAuthorized({ payment: applePayPayment }) {
                            logApplePayEvent('paymentauthorized');

                            if (!applePayPayment) {
                                throw new Error('No payment received from Apple.');
                            }
                            
                            // For some reason country code comes back as lowercase from Apple
                            if (applePayPayment.shippingContact && applePayPayment.shippingContact.countryCode) {
                                applePayPayment.shippingContact.countryCode = applePayPayment.shippingContact.countryCode.toUpperCase();
                            }

                            if (applePayPayment.billingContact && applePayPayment.billingContact.countryCode) {
                                applePayPayment.billingContact.countryCode = applePayPayment.billingContact.countryCode.toUpperCase();
                            }

                            // call graphQL mutation passing in token, billingContact and shippingContact
                            approveApplePayPayment(orderID, clientID, applePayPayment)
                                .then(validatedPayment => {
                                    if (validatedPayment) {
                                        completePayment({
                                            status: window.ApplePaySession.STATUS_SUCCESS
                                        });

                                        const data = {};
                                        const actions = { restart: () => ZalgoPromise.try(setupApplePaySession) };
                                        
                                        return ZalgoPromise.all([
                                            onApprove(data, actions),
                                            close()
                                        ]).then(noop);
                                    }
                                })
                                .catch(err => {
                                    completePayment({
                                        status: window.ApplePaySession.STATUS_FAILURE
                                    });
                                    handleApplePayError(FPTI_TRANSITION.APPLEPAY_PAYMENT_ERROR, err);
                                });
                        }

                        function cancel() {
                            logApplePayEvent('cancel');

                            if (onCancel) {
                                onCancel();
                            }
                        }

                        ZalgoPromise.all([
                            addEventListener('validatemerchant', validateMerchant),
                            addEventListener('paymentmethodselected', paymentMethodSelected),
                            addEventListener('shippingmethodselected', shippingMethodSelected),
                            addEventListener('shippingcontactselected', shippingContactSelected),
                            addEventListener('paymentauthorized', paymentAuthorized),
                            addEventListener('cancel', cancel)
                        ]).then(() => {
                            begin();
                        });
                    }).catch(err => {
                        handleApplePayError(FPTI_TRANSITION.APPLEPAY_GET_DETAILS_ERROR, err);
                    });
                });
            }).catch(err => {
                handleApplePayError(FPTI_TRANSITION.APPLEPAY_CREATE_ORDER_ERROR, err);
            });
        };

        return setupApplePaySession();
    }

    const click = () => {
        return ZalgoPromise.try(() => {
            return initApplePaySession();
        }).catch(err => {
            return close().then(() => {
                getLogger().error(`applepay_flow_error`, { err: stringifyError(err) }).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.APPLEPAY_FLOW_ERROR,
                    [FPTI_KEY.ERROR_CODE]: 'applepay_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                }).flush();

                throw err;
            });
        });
    };
    const start = promiseNoop;

    return {
        click,
        start,
        close
    };
}

export const applepay : PaymentFlow = {
    name:              'applepay',
    setup:             setupApplePay,
    isEligible:        isApplePayEligible,
    isPaymentEligible: isApplePayPaymentEligible,
    init:              initApplePay,
    spinner:           true
};
