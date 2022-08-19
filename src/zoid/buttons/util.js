/* @flow */
import { supportsPopups as userAgentSupportsPopups, isAndroid, isChrome, isIos, isIOS14, isSafari, isSFVC, type Experiment, isDevice, isTablet, getElement, isLocalStorageEnabled, isStandAlone, once } from '@krakenjs/belter/src';
import { CURRENCY, ENV, FUNDING } from '@paypal/sdk-constants/src';
import { getEnableFunding, getLogger, createExperiment, getFundingEligibility, getPlatform, getComponents, getEnv, type FundingEligibilityType } from '@paypal/sdk-client/src';
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

/**
 * log information about screen to debug. currently in use to test if sfvc logic triggers
 *
 * @param {string} key for logging
 */
const logNativeScreenInformation = once((key = 'screenInformation') => {
  if (window) {
    const height = window.innerHeight;
    const outerHeight = window.outerHeight;
    const scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
    const computedHeight = Math.round(height * scale);
    const ios14 = isIOS14();
    const standAlone = isStandAlone();

    const screenInformation = { computedHeight, height, ios14, outerHeight, scale, standAlone };

    getLogger()
      // $FlowFixMe - object is mixed values when this expects all of the same value types
      .info(key, screenInformation)
  }
});

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
        logNativeScreenInformation('sfvcScreenInformation');
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
            return createExperiment('enable_venmo_ios', 100);
        }

        if (isAndroid() && isChrome()) {
            return createExperiment('enable_venmo_android', 100);
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
    const { fundingSource, onShippingChange, onShippingAddressChange, onShippingOptionsChange, style = {}, fundingEligibility = getRefinedFundingEligibility(),
        experiment = getVenmoExperiment(), applePaySupport, supportsPopups = userAgentSupportsPopups(),
        supportedNativeBrowser = isSupportedNativeBrowser(), createBillingAgreement, createSubscription } = props;

    const flow               = determineFlow({ createBillingAgreement, createSubscription });
    const { layout }         = style;
    const remembered         = [];
    const platform           = getPlatform();
    const components         = getComponents();

    const renderedButtons = determineEligibleFunding({ fundingSource, remembered, layout, platform, fundingEligibility, components, onShippingChange, onShippingAddressChange, onShippingOptionsChange, flow, applePaySupport, supportsPopups, supportedNativeBrowser, experiment });
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

            // eslint-disable-next-line  unicorn/prefer-add-event-listener
            session.oncancel = () => {
                listeners.oncancel();
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
                begin: () => session.begin(),
                abort: () => session.abort()
            };
        };
    } catch (e) {
        return undefined;
    }
}

export function getButtonExperiments () : EligibilityExperiment {
    return {
        ...getVenmoExperiment(),
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
    merchantID? : $ReadOnlyArray<string>,
    onComplete : Function,
    custom? : ?{|
        css? : {|
            [string] : string
        |},
        label? : string
    |},
    vault : boolean
|};

export function isInlineXOEligible({ props } : {| props : InlineCheckoutEligibilityProps |}) : boolean {
    const { commit, currency, custom, createBillingAgreement, disableFunding, fundingEligibility, layout, onComplete, vault } = props;

    const isEligible = (
        custom?.label && custom.label.length > 0,
        onComplete &&
        commit === true &&
        !createBillingAgreement &&
        currency === CURRENCY.USD &&
        (disableFunding?.indexOf(FUNDING.CARD) === -1) &&
        (fundingEligibility?.card?.eligible || false) &&
        layout === BUTTON_LAYOUT.VERTICAL &&
        vault === false
    );

    return isEligible;
}
