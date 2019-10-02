/* @flow */

import { onClick as onElementClick, noop } from 'belter/src';
import { COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, PersonalizationType } from '../types';
import { setupLogger, sendBeacon, fixClickFocus } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES } from '../constants';
import { openPopup } from '../menu/popup';
import { CHECKOUT_POPUP_DIMENSIONS, type Payment } from '../payment-flows';

import { getProps, getConfig, getComponents, getServiceData } from './props';
import { getSelectedFunding, getButtons } from './dom';
import { setupButtonLogs } from './logs';
import { setupRemember } from './remember';
import { launchPaymentFlow, setupPaymentFlows, getPaymentFlow } from './pay';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    personalization : PersonalizationType,
    isCardFieldsExperimentEnabled : boolean,
    firebaseConfig? : FirebaseConfig,
    facilitatorAccessToken? : string,
    eligibility : ?{
        cardFields : boolean,
        native : boolean
    }
|};

export function setupButton({ facilitatorAccessToken, eligibility, fundingEligibility, buyerCountry: buyerGeoCountry, cspNonce: serverCSPNonce, merchantID: serverMerchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig } : ButtonOpts) : ZalgoPromise<void> {
    if (!window.paypal) {
        throw new Error(`PayPal SDK not loaded`);
    }

    const clientID = window.xprops.clientID;

    const serviceData = getServiceData({ clientID, eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility, personalization, isCardFieldsExperimentEnabled });
    const { merchantID, facilitatorAccessTokenPromise } = serviceData;

    const props = getProps({ facilitatorAccessTokenPromise });
    const { env, sessionID, partnerAttributionID, commit, correlationID, locale,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding,
        style, onClick } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { version } = config;
    
    const components = getComponents();
    
    setupLogger({ env, version, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });

    const { initPromise, isEnabled } = onInit();

    const handleButtonClick = (payment : Payment) => {
        return ZalgoPromise.try(() => {
            let { button, win, fundingSource } = payment;

            const flow = getPaymentFlow({ props, payment, config, components, serviceData });

            // Always call onClick if passed
            const clickPromise = onClick
                ? onClick({ fundingSource })
                : ZalgoPromise.resolve(true);

            // If flow has been disabled by merchant, halt and close any window
            if (!isEnabled()) {
                if (win) {
                    win.close();
                }

                return;
            }

            // If onClick was passed, immediately open a window
            if (onClick && flow.popup) {
                win = win || openPopup({ width: CHECKOUT_POPUP_DIMENSIONS.WIDTH, height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT });
            }

            // Wait for the result of merchant validation
            return clickPromise.then(valid => {

                // If not valid, halt and close any window
                if (!valid) {
                    if (win) {
                        win.close();
                    }

                    return;
                }

                // Launch the payment flow
                const payPromise = launchPaymentFlow({ flow, config, serviceData, components, payment });

                // $FlowFixMe
                button.payPromise = payPromise;

                if (personalization && personalization.tagline) {
                    sendBeacon(personalization.tagline.tracking.click);
                }

                if (personalization && personalization.buttonText) {
                    sendBeacon(personalization.buttonText.tracking.click);
                }
            });
        });
    };

    getButtons().forEach(button => {
        fixClickFocus(button);

        const { fundingSource, card, paymentMethodID } = getSelectedFunding(button);

        onElementClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            handleButtonClick({ button, fundingSource, card, paymentMethodID, isClick: true });
        });
    });

    const setupPrerenderTask = initPromise.then(() => {
        return ZalgoPromise.hash({ prerenderDetails: getPrerenderDetails(), initPromise }).then(({ prerenderDetails }) => {
            if (!prerenderDetails) {
                return;
            }

            const { win, fundingSource, card } = prerenderDetails;
            const button = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }=${ fundingSource }]`);

            if (!button) {
                throw new Error(`Can not find button element`);
            }

            handleButtonClick({ win, button, fundingSource, card });
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });
    const setupButtonLogsTask = setupButtonLogs({ style });
    const setupPaymentFlowsTask = setupPaymentFlows({ props, config, serviceData, components });

    return ZalgoPromise.hash({
        initPromise, facilitatorAccessTokenPromise,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask
    }).then(noop);
}
