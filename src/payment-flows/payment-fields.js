/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { memoize, querySelectorAll, debounce, noop, stringifyError } from '@krakenjs/belter/src';
import { getParent, getTop } from '@krakenjs/cross-domain-utils/src';

import { DATA_ATTRIBUTES, TARGET_ELEMENT, CONTEXT } from '../constants';
import { unresolvedPromise, promiseNoop, getLogger } from '../lib';
import { getConfirmOrder } from '../props';
import type { ConfirmData } from '../api';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from './types';
import { getDimensions } from "./checkout";

function setupPaymentField() {
    // pass
}
const canRenderTop = false;
function getRenderWindow() : Object {
    const top = getTop(window);
    if (canRenderTop && top) {
        return top;
    } else if (getParent()) {
        return getParent();
    } else {
        return window;
    }
}

let paymentFieldsOpen = false;
function isPaymentFieldsEligible({ props, serviceData } : IsEligibleOptions) : boolean {
    const { vault, onShippingChange } = props;
    const { eligibility } = serviceData;
    const componentsList = window.xprops.components || [];

    if (vault) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    if (componentsList.includes('marks')){
        return false;
    }

    return eligibility.paymentFields.isInlineEnabled;
}

function isPaymentFieldsPaymentEligible({ payment, serviceData } : IsPaymentEligibleOptions) : boolean {
    const { win, fundingSource } = payment || {};
    const { eligibility } = serviceData;
    const inlineEligibleAPMs = eligibility.paymentFields.inlineEligibleAPMs || [];

    if (win) {
        return false;
    }

    if (fundingSource && !inlineEligibleAPMs.includes(fundingSource)) {
        return false;
    }

    return true;
}

function highlightFundingSource(fundingSource : ?$Values<typeof FUNDING>) {
    if (!fundingSource) {
        return;
    }
    querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).forEach(el => {
        if (el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE) === fundingSource.toLowerCase()) {
            el.style.opacity = '1';
        } else {
            el.style.display = 'none';
            if (el.parentElement) {
                // $FlowFixMe
                el.parentElement.style.display = 'none';
            }
            el.style.opacity = '0.1';
        }
    });
}

function unhighlightFundingSources() {
    querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).forEach(el => {
        el.style.opacity = '1';
        if (el.parentElement) {
            // $FlowFixMe
            el.parentElement.style.display = '';
        }
        el.style.display = '';
    })
}

const getElements = (fundingSource : ?$Values<typeof FUNDING>) : {| buttonsContainer : HTMLElement, fundingSourceButtonsContainer : HTMLElement, paymentFieldsContainer : HTMLElement |} => {
    const buttonsContainer = document.querySelector('#buttons-container');
    let fundingSourceButtonsContainer;
    if (fundingSource) {
        fundingSourceButtonsContainer = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }="${ fundingSource }"]`);
    }
    const paymentFieldsContainer = document.querySelector('#payment-fields-container');

    if (!buttonsContainer || !fundingSourceButtonsContainer || !paymentFieldsContainer) {
        throw new Error(`Did not find payment fields elements`);
    }

    return { buttonsContainer, fundingSourceButtonsContainer, paymentFieldsContainer };
};

let resizeListener;

const slideUpButtons = (fundingSource : ?$Values<typeof FUNDING>) => {
    const { buttonsContainer, fundingSourceButtonsContainer, paymentFieldsContainer } = getElements(fundingSource);

    if (!buttonsContainer || !fundingSourceButtonsContainer || !paymentFieldsContainer) {
        throw new Error(`Required elements not found`);
    }

    paymentFieldsContainer.style.minHeight = '0px';
    paymentFieldsContainer.style.display = 'block';

    const recalculateMargin = () => {
        buttonsContainer.style.marginTop = `${ buttonsContainer.offsetTop - fundingSourceButtonsContainer.offsetTop }px`;
    };

    resizeListener = debounce(() => {
        buttonsContainer.style.transitionDuration = '0s';
        recalculateMargin();
    });
    window.addEventListener('resize', resizeListener);

    recalculateMargin();
};

const slideDownButtons = (fundingSource : ?$Values<typeof FUNDING>) => {
    const { buttonsContainer } = getElements(fundingSource);
    unhighlightFundingSources();
    window.removeEventListener('resize', resizeListener);
    buttonsContainer.style.removeProperty('transition-duration');
    buttonsContainer.style.removeProperty('margin-top');
};

function initPaymentFields({ props, components, payment, serviceData, config } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, locale, commit, onError, sessionID, partnerAttributionID, buttonSessionID, onAuth, stickinessID,
        onShippingChange, onShippingAddressChange, onShippingOptionsChange, clientMetadataID, enableFunding, onComplete } = props;

    const { PaymentFields, Checkout } = components;
    const { fundingSource, card } = payment;
    const { cspNonce } = config;
    const { buyerCountry, sdkMeta } = serviceData;
    paymentFieldsOpen = false;

    getLogger().info('spb_payment_flow_init_payment_fields', {
        buttonSessionID,
        fundingSource
    });

    if (paymentFieldsOpen) {
        return {
            start: promiseNoop,
            close: promiseNoop
        };
    }

    let instance;
    let approved = false;
    let forceClosed = false;

    const restart = memoize(() : ZalgoPromise<void> => {
        // eslint-disable-next-line no-use-before-define
        return close().finally(() => {
            return initPaymentFields({ props, components, serviceData, config, payment: { ...payment }, restart })
                .start().finally(unresolvedPromise);
        });
    });

    const onClose = () => {
        paymentFieldsOpen = false;
    };

    let buyerAccessToken;
    const { render, close: closePaymentFields } = PaymentFields({
        createOrder,
        fundingSource,
        onContinue: (data : ConfirmData) => {
            return createOrder().then(orderID => {
                return getConfirmOrder({
                    orderID, payload: data, partnerAttributionID
                }, {
                    facilitatorAccessToken: serviceData.facilitatorAccessToken
                }).then(() => {
                    getLogger().info('spb_payment_fields_rendering_checkout_instance', {
                        orderID
                    });
                    instance = Checkout({
                        onClose: () => {
                            if (!forceClosed && !approved) {
                                // eslint-disable-next-line no-use-before-define
                                return close().then(() => {
                                    return onCancel();
                                });
                            }
                        },
                        onApprove: ({ payerID, paymentID, billingToken }) => {
                            approved = true;
                            // eslint-disable-next-line no-use-before-define
                            return close().then(() => {
                                return onApprove({ payerID, paymentID, billingToken, buyerAccessToken }, { restart }).catch(noop);
                            });
                        },
                        branded: false,
                        standaloneFundingSource: fundingSource,
                        inlinexo: false,
                        onCancel: () => {
                            // eslint-disable-next-line no-use-before-define
                            return close().then(() => {
                                return onCancel();
                            });
                        },
                        onAuth: ({ accessToken }) => {
                            const access_token = accessToken ? accessToken : buyerAccessToken;
                            return onAuth({ accessToken: access_token }).then(token => {
                                buyerAccessToken = token;
                            });
                        },
                        buttonSessionID,
                        stickinessID,
                        onComplete : () => onComplete({ buyerAccessToken })
                            // eslint-disable-next-line no-use-before-define
                            .finally(() => close().then(noop))
                            .catch(noop),
                        onShippingChange,
                        onShippingAddressChange,
                        onShippingOptionsChange,
                        restart,
                        createOrder,
                        card,
                        clientMetadataID,
                        enableFunding,
                        dimensions : getDimensions(fundingSource),
                        onError,
                        sessionID,
                        fundingSource,
                        buyerCountry,
                        locale,
                        commit,
                        cspNonce,
                        smokeHash : ''
                    });
                    instance.renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, CONTEXT.POPUP);
                })
                .catch(err => {
                    getLogger().error('payment_fields_confirm_order_error', { err: stringifyError(err) });
                    throw err;
                });
            });
        },
        onFieldsClose: () => {
            return closePaymentFields().then(() => {
                paymentFieldsOpen = false;
                slideDownButtons(fundingSource);
            })
        },
        onError,
        onClose,
        showActionButtons: true,
        sdkMeta,
        sessionID,
        buttonSessionID,
        buyerCountry,
        locale,
        commit,
        cspNonce
    });
    const start = () => {
        paymentFieldsOpen = true;
        const renderPromise = render('#payment-fields-container');
        slideUpButtons(fundingSource);
        highlightFundingSource(fundingSource);
        return renderPromise;
    };
    const close = () => {
        return closePaymentFields().then(() => {
            forceClosed = true;
            paymentFieldsOpen = false;
            if (instance) {
                instance.close();
            }
            slideDownButtons(fundingSource);
        });
    };

    return { start, close };
}
export const paymentFields : PaymentFlow = {
    name:              'payment_fields',
    setup:             setupPaymentField,
    isEligible:        isPaymentFieldsEligible,
    isPaymentEligible: isPaymentFieldsPaymentEligible,
    init:              initPaymentFields,
    inline:            true
};
