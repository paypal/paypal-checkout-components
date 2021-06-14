/* @flow */
import { supportsPopups, isAndroid, isChrome, isIos, isSafari, isSFVC, type Experiment, isDevice } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { getEnableFunding, createExperiment, getFundingEligibility } from '@paypal/sdk-client/src';

import type { Experiment as VenmoExperiment } from '../../types';
import { BUTTON_FLOW } from '../../constants';
import type { ApplePaySessionConfigRequest, ButtonProps } from '../../ui/buttons/props';

export function determineFlow(props : ButtonProps) : $Values<typeof BUTTON_FLOW> {

    if (props.createBillingAgreement) {
        return BUTTON_FLOW.BILLING_SETUP;
    } else if (props.createSubscription) {
        return BUTTON_FLOW.SUBSCRIPTION_SETUP;
    } else {
        return BUTTON_FLOW.PURCHASE;
    }
}

export function isSupportedNativeBrowser() : boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (isSFVC()) {
        return false;
    }

    if (isIos() && isSafari()) {
        return true;
    }

    if (isAndroid() && isChrome()) {
        return true;
    }

    return false;
}

export function createVenmoExperiment() : Experiment | void {
    const enableFunding = getEnableFunding();
    const isEnableFundingVenmo = enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;

    const fundingEligibility = getFundingEligibility();
    const isEligibleForVenmo = fundingEligibility && fundingEligibility[FUNDING.VENMO] && fundingEligibility[FUNDING.VENMO].eligible;

    // exclude buyers who are not eligible
    // exclude integrations using enable-funding=venmo
    if (!isEligibleForVenmo || isEnableFundingVenmo) {
        return;
    }

    if (isIos() && isSafari()) {
        return createExperiment('enable_venmo_ios', 90);
    }

    if (isAndroid() && isChrome()) {
        return createExperiment('enable_venmo_android', 90);
    }

    if (!isDevice()) {
        return createExperiment('enable_venmo_desktop', 0);
    }
}

export function getVenmoExperiment(experiment : ?Experiment) : VenmoExperiment {
    const enableFunding = getEnableFunding();
    const isEnableFundingVenmo = enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;
    const isExperimentEnabled = experiment && experiment.isEnabled();

    return {
        enableVenmo: Boolean(isExperimentEnabled || isEnableFundingVenmo)
    };
}

export function applePaySession() : ?ApplePaySessionConfigRequest {
    try {
        if (!window.ApplePaySession) {
            return;
        }

        const convertErrorsFromUpdate = (update) => {
            if (update.errors && update.errors.length) {
                // $FlowFixMe
                return update.errors.map(error => new window.ApplePayError(error.code, error.contactField, error.message));
            }

            return update;
        };

        return (version, request) => {
            const session = new window.ApplePaySession(version, request);
            const listeners = {};

            session.onvalidatemerchant = ({ validationURL }) => {
                listeners.validatemerchant({ validationURL });
            };

            session.onpaymentmethodselected = ({ paymentMethod }) => {
                listeners.paymentmethodselected({ paymentMethod });
            };

            session.onshippingmethodselected = ({ shippingMethod }) => {
                listeners.shippingmethodselected({ shippingMethod });
            };

            session.onshippingcontactselected = ({ shippingContact }) => {
                listeners.shippingcontactselected({ shippingContact });
            };

            session.onpaymentauthorized = ({ payment }) => {
                listeners.paymentauthorized({ payment });
            };

            session.oncancel = () => {
                listeners.cancel();
            };

            return {
                addEventListener: (name, handler) => {
                    listeners[name] = handler;
                },
                completeMerchantValidation: (validatedSession) => {
                    session.completeMerchantValidation(validatedSession);
                },
                completePaymentMethodSelection: (update) => {
                    session.completePaymentMethodSelection(update);
                },
                completeShippingMethodSelection: (update) => {
                    session.completeShippingMethodSelection(update);
                },
                completeShippingContactSelection: (update) => {
                    const newUpdate = convertErrorsFromUpdate(update);
                    session.completeShippingContactSelection(newUpdate);
                },
                completePayment: (update) => {
                    const newUpdate = convertErrorsFromUpdate(update);
                    session.completePayment(newUpdate);
                },
                begin: () => session.begin()
            };
        };
    } catch (e) {
        return undefined;
    }
}
