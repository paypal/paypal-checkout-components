/* @flow */

import { onClick as onElementClick, noop } from 'belter/src';
import { COUNTRY, FPTI_KEY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, PersonalizationType } from '../types';
import { setupLogger, sendBeacon, fixClickFocus, getLogger, promiseNoop } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES, FPTI_STATE, FPTI_TRANSITION } from '../constants';
import { type Payment } from '../payment-flows';

import { getProps, getConfig, getComponents, getServiceData } from './props';
import { getSelectedFunding, getButtons, enableLoadingSpinner, disableLoadingSpinner } from './dom';
import { setupButtonLogs } from './logs';
import { setupRemember } from './remember';
import { setupPaymentFlows, getPaymentFlow } from './pay';
import { validateOrder, updateButtonClientConfig } from './orders';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    personalization : PersonalizationType,
    isCardFieldsExperimentEnabled : boolean,
    firebaseConfig? : FirebaseConfig,
    facilitatorAccessToken : string,
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

    const serviceData = getServiceData({ eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility, personalization, isCardFieldsExperimentEnabled });
    const { merchantID } = serviceData;

    let props = getProps({ facilitatorAccessToken });
    const { env, sessionID, partnerAttributionID, commit, correlationID, locale,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding,
        style } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { version } = config;
    
    const components = getComponents();
    
    setupLogger({ env, version, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });

    const { initPromise, isEnabled } = onInit();

    const sendPersonalizationBeacons = () => {
        if (personalization && personalization.tagline && personalization.tagline.tracking) {
            sendBeacon(personalization.tagline.tracking.click);
        }

        if (personalization && personalization.buttonText && personalization.buttonText.tracking) {
            sendBeacon(personalization.buttonText.tracking.click);
        }
    };

    let paymentProcessing = false;

    const handleButtonClick = (payment : Payment) => {
        const { button, win, fundingSource } = payment;

        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            paymentProcessing = true;

            props = getProps({ facilitatorAccessToken });
            const { onClick, createOrder } = props;

            if (!isEnabled()) {
                if (win) {
                    win.close();
                }

                if (onClick) {
                    onClick({ fundingSource });
                }

                return;
            }

            sendPersonalizationBeacons();

            getLogger().info('button_click').track({
                [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.BUTTON_CLICK,
                [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
                [FPTI_KEY.CHOSEN_FUNDING]:     fundingSource
            }).flush();

            const { init, inline, spinner } = getPaymentFlow({ props, payment, config, components, serviceData });
            const { click = promiseNoop, start, close } = init({ props, config, serviceData, components, payment });

            const clickPromise = click();

            // $FlowFixMe
            button.payPromise = ZalgoPromise.hash({
                valid: onClick ? onClick({ fundingSource }) : true
            }).then(({ valid }) => {
                if (!valid) {
                    return;
                }
        
                if (spinner) {
                    enableLoadingSpinner(button);
                }
            
                createOrder().then(orderID =>
                    updateButtonClientConfig({ orderID, fundingSource, inline }));
            
                return start()
                    .then(() => createOrder())
                    .then(orderID => validateOrder(orderID, { clientID, merchantID }))
                    .then(() => clickPromise)
                    .catch(err => {
                        return ZalgoPromise.all([
                            close(),
                            ZalgoPromise.reject(err)
                        ]);
                    }).then(noop);
            });

            return button.payPromise;
            
        }).finally(() => {
            paymentProcessing = false;
            disableLoadingSpinner(button);
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
        initPromise, facilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask
    }).then(noop);
}
