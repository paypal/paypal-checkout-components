/* @flow */
import { supportsPopups as userAgentSupportsPopups, isAndroid, isChrome, isIos, isSafari, isSFVC, type Experiment, isDevice, isTablet, getElement, isLocalStorageEnabled } from '@krakenjs/belter/src';
import { COUNTRY, CURRENCY, ENV, FPTI_KEY, FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { getEnableFunding, getDisableFunding, getLogger, createExperiment, getFundingEligibility, getPlatform, getComponents, getEnv, type FundingEligibilityType } from '@paypal/sdk-client/src';
import { getRefinedFundingEligibility } from '@paypal/funding-components/src';

import type { Experiment as EligibilityExperiment } from '../../types';
import { BUTTON_FLOW, BUTTON_SIZE, BUTTON_LAYOUT } from '../../constants';
import type { ApplePaySessionConfigRequest, CreateBillingAgreement, CreateSubscription, ButtonProps } from '../../ui/buttons/props';
import { determineEligibleFunding } from '../../funding';
import { BUTTON_SIZE_STYLE } from '../../ui/buttons/config';

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
        return createExperiment('enable_venmo_desktop', 90);
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

export function getVenmoAppLabelExperiment() : EligibilityExperiment  {
    const isEnvForTest = getEnv() === ENV.LOCAL || getEnv() === ENV.TEST || getEnv() === ENV.STAGE;

    let isEnabledForTest = false;

    if (isLocalStorageEnabled() && isEnvForTest) {
        isEnabledForTest = window.localStorage.getItem('enable_venmo_app_label');
    }

    return {
        enableVenmoAppLabel: isEnabledForTest
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
            return {
                ...update,
                errors: (update.errors || []).map(error => new window.ApplePayError(error.code, error.contactField, error.message))
            };
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

            // eslint-disable-next-line unicorn/prefer-add-event-listener
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

export function getButtonExperiments (fundingSource : ?$Values<typeof FUNDING>) : EligibilityExperiment {
    return {
        ...getVenmoExperiment(),
        ...getNoPaylaterExperiment(fundingSource),
        ...getVenmoAppLabelExperiment()
    };
}

export function getButtonSize (props : ButtonProps, container : string | HTMLElement | void) : string | void {
    if (!container) {
        return;
    }

    let containerWidth = 0;

    if (typeof container === 'string') {
        const containerElement = document.querySelector(container);
        containerWidth = containerElement?.offsetWidth || 0;
    } else {
        containerWidth = getElement(container)?.offsetWidth;
    }

    const layout = props?.style?.layout || BUTTON_LAYOUT.HORIZONTAL;
    const numButtonsRendered = props?.renderedButtons?.length || 1;
    const {
        tiny,
        small,
        medium,
        large,
        huge
    } = BUTTON_SIZE_STYLE;

    if (containerWidth) {
        let buttonWidth = Math.min(containerWidth, 750);
        const spaceBetweenHorizontalButtons = 8;
        if (layout === BUTTON_LAYOUT.HORIZONTAL && numButtonsRendered === 2) {
            buttonWidth = (buttonWidth - spaceBetweenHorizontalButtons) / 2;
        }

        if (tiny.minWidth <= buttonWidth && buttonWidth <= tiny.maxWidth) {
            return BUTTON_SIZE.TINY;
        }

        if (small.minWidth < buttonWidth && buttonWidth <= small.maxWidth) {
            return BUTTON_SIZE.SMALL;
        }

        if (medium.minWidth < buttonWidth && buttonWidth <= medium.maxWidth) {
            return BUTTON_SIZE.MEDIUM;
        }

        if (large.minWidth < buttonWidth && buttonWidth <= large.maxWidth) {
            return BUTTON_SIZE.LARGE;
        }

        if (huge.minWidth < buttonWidth) {
            return BUTTON_SIZE.HUGE;
        }
    }
}

type InlineCheckoutEligibilityProps = {|
    commit : boolean,
    createBillingAgreement? : Function,
    currency : string,
    disableFunding : $ReadOnlyArray<$Values<typeof FUNDING>>,
    fundingEligibility : FundingEligibilityType,
    layout : $Values<typeof BUTTON_LAYOUT>,
    locale : LocaleType,
    merchantID? : $ReadOnlyArray<string>,
    vault : boolean
|};

export function isInlineXOEligible({ props } : {| props : InlineCheckoutEligibilityProps |}) : boolean {
    const { commit, currency, createBillingAgreement, disableFunding, fundingEligibility, layout, locale, merchantID, vault } = props;

    const isEligible = (
        locale.country === COUNTRY.US &&
        commit === true &&
        !createBillingAgreement &&
        currency === CURRENCY.USD &&
        (disableFunding?.indexOf(FUNDING.CARD) === -1) &&
        (fundingEligibility?.card?.eligible || false) &&
        layout === BUTTON_LAYOUT.VERTICAL &&
        merchantID?.length === 0 &&
        vault === false
    );

    getLogger()
        .info('isInlineXOEligible props', { props: JSON.stringify(props) })
        .info('isInlineXOEligible eligible', { eligible: String(isEligible) })
        .track({
            [ FPTI_KEY.TRANSITION ]: `inline_xo_eligibility_${ String(isEligible) }`
        }).flush();

    return isEligible;
}
