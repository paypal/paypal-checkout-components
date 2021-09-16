/* @flow */
import { supportsPopups as userAgentSupportsPopups, isAndroid, isChrome, isIos, isSafari, isSFVC, type Experiment, isDevice, isTablet } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { getEnableFunding, getDisableFunding, createExperiment, getFundingEligibility, getPlatform, getComponents } from '@paypal/sdk-client/src';
import { getRefinedFundingEligibility } from '@paypal/funding-components/src';

import type { Experiment as EligibilityExperiment } from '../../types';
import { BUTTON_FLOW, CLASS } from '../../constants';
import type { ApplePaySessionConfigRequest, CreateBillingAgreement, CreateSubscription, ButtonProps } from '../../ui/buttons/props';
import { determineEligibleFunding } from '../../funding';

type DetermineFlowOptions = {|
    createBillingAgreement : CreateBillingAgreement,
    createSubscription : CreateSubscription
|};

export function determineFlow(props : DetermineFlowOptions) : $Values<typeof BUTTON_FLOW> {

    if (props.createBillingAgreement) {
        return BUTTON_FLOW.BILLING_SETUP;
    } else if (props.createSubscription) {
        return BUTTON_FLOW.SUBSCRIPTION_SETUP;
    } else {
        return BUTTON_FLOW.PURCHASE;
    }
}

export function supportsQRPay(funding : $Values<typeof FUNDING>) : boolean {
    if (funding === FUNDING.VENMO && !isDevice()) {
        return true;
    }

    return false;
}

// eslint-disable-next-line no-undef
export function showButtonLoading (fundingSource : $Values<typeof FUNDING>, event : SyntheticInputEvent<HTMLInputElement>) : void {
    const buttonElement = event.target.ownerDocument.querySelector(`[data-funding-source="${ fundingSource }"]`);
    if (buttonElement) {
        const spinner = buttonElement.querySelector(`.${ CLASS.SPINNER }`);
        const label = buttonElement.querySelector(`.${ CLASS.BUTTON_LABEL }`);
        if (spinner) {
            spinner.setAttribute('style', 'display:block !important');
        }
        if (label) {
            label.setAttribute('style', 'display:none;');
        }
    }
}

export function isSupportedNativeBrowser() : boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if (!userAgentSupportsPopups()) {
        return false;
    }

    if (isSFVC()) {
        return false;
    }

    if (isTablet()) {
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

export function createVenmoExperiment() : ?Experiment {
    const enableFunding = getEnableFunding();
    const isEnableFundingVenmo = enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;

    const fundingEligibility = getFundingEligibility();
    const hasBasicVenmoEligibility = fundingEligibility && fundingEligibility[FUNDING.VENMO] && fundingEligibility[FUNDING.VENMO].eligible;
    const isEligibleForVenmoNative = isSupportedNativeBrowser() && !isEnableFundingVenmo;

    // basic eligibility must be true for venmo to be eligible for the experiments
    if (!hasBasicVenmoEligibility) {
        return;
    }

    if (isDevice()) {
        if (!isEligibleForVenmoNative) {
            return;
        }

        if (isIos() && isSafari()) {
            return createExperiment('enable_venmo_ios', 90);
        }

        if (isAndroid() && isChrome()) {
            return createExperiment('enable_venmo_android', 90);
        }
    } else {
        return createExperiment('enable_venmo_desktop', 100);
    }
}

export function getVenmoExperiment() : EligibilityExperiment {
    const experiment = createVenmoExperiment();

    const enableFunding = getEnableFunding();
    const isVenmoFundingEnabled = enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;
    const isNativeSupported = isSupportedNativeBrowser();
    const isExperimentEnabled = experiment && experiment.isEnabled();

    if (isDevice()) {
        return {
            enableVenmo: Boolean((isExperimentEnabled || isVenmoFundingEnabled) && isNativeSupported)
        };
    } else {
        return {
            enableVenmo: Boolean(isExperimentEnabled)
        };
    }
}

export function createNoPaylaterExperiment(fundingSource : ?$Values<typeof FUNDING>) : Experiment | void {
    const disableFunding = getDisableFunding();
    const isDisableFundingPaylater = disableFunding && disableFunding.indexOf(FUNDING.PAYLATER) !== -1;
    const enableFunding = getEnableFunding();
    const isEnableFundingPaylater = enableFunding && enableFunding.indexOf(FUNDING.PAYLATER) !== -1;

    const { paylater } = getFundingEligibility();
    const isEligibleForPaylater = paylater?.eligible;
    const isExperimentable = paylater?.products?.paylater?.variant === 'experimentable' || paylater?.products?.payIn4?.variant === 'experimentable';
    // No experiment because ineligible, already forced on or off
    if (!isEligibleForPaylater
        || !isExperimentable
        || isDisableFundingPaylater
        || isEnableFundingPaylater
        || fundingSource
    ) {
        return;
    }

    return createExperiment('disable_paylater', 0);
}

export function getNoPaylaterExperiment(fundingSource : ?$Values<typeof FUNDING>) : EligibilityExperiment {
    const experiment = createNoPaylaterExperiment(fundingSource);

    const disableFunding = getDisableFunding();
    const isDisableFundingPaylater = disableFunding && disableFunding.indexOf(FUNDING.PAYLATER) !== -1;
    const isExperimentEnabled = experiment && experiment.isEnabled();
    return {
        disablePaylater: Boolean((isExperimentEnabled || isDisableFundingPaylater))
    };
}

export function getRenderedButtons(props : ButtonProps) : $ReadOnlyArray<$Values<typeof FUNDING>> {
    const { fundingSource, onShippingChange, style = {}, fundingEligibility = getRefinedFundingEligibility(),
        experiment = getVenmoExperiment(), applePaySupport, supportsPopups = userAgentSupportsPopups(),
        supportedNativeBrowser = isSupportedNativeBrowser(), createBillingAgreement, createSubscription } = props;

    const flow               = determineFlow({ createBillingAgreement, createSubscription });
    const { layout }         = style;
    const remembered         = [];
    const platform           = getPlatform();
    const components         = getComponents();

    const renderedButtons = determineEligibleFunding({ fundingSource, remembered, layout, platform, fundingEligibility, components, onShippingChange, flow, applePaySupport, supportsPopups, supportedNativeBrowser, experiment });
    return renderedButtons;
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
