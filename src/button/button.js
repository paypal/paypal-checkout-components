/* @flow */

import { onClick as onElementClick, noop, stringifyErrorMessage, stringifyError, preventClickFocus } from 'belter/src';
import { COUNTRY, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { FundingEligibilityType } from '@paypal/sdk-client/src';

import type { PersonalizationType, ContentType, Wallet } from '../types';
import { getLogger } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES, BUYER_INTENT } from '../constants';
import { type Payment } from '../payment-flows';

import { getProps, getConfig, getComponents, getServiceData, type ServerRiskData, type ButtonProps } from './props';
import { getSelectedFunding, getButtons } from './dom';
import { setupButtonLogger } from './logger';
import { setupRemember } from './remember';
import { setupPaymentFlows, initiatePaymentFlow, initiateMenuFlow } from './pay';
import { prerenderMenu, clearSmartMenu } from './menu';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    personalization : PersonalizationType,
    isCardFieldsExperimentEnabled : boolean,
    firebaseConfig? : FirebaseConfig,
    facilitatorAccessToken : string,
    content : ContentType,
    sdkMeta : string,
    wallet : ?Wallet,
    buyerAccessToken : ?string,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [$Values<typeof FUNDING> ] : ?boolean
        }
    |},
    serverRiskData : ?ServerRiskData
|};

try {
    if (!window.paypal) {
        const script = Array.prototype.slice.call(document.querySelectorAll('script')).find(el => el.getAttribute('data-namespace'));

        if (script) {
            window.paypal = window[script.getAttribute('data-namespace')];
        }
    }
} catch (err) {
    // pass
}

export function setupButton(opts : ButtonOpts) : ZalgoPromise<void> {
    if (!window.paypal) {
        throw new Error(`PayPal SDK not loaded`);
    }

    const { facilitatorAccessToken, eligibility, fundingEligibility, buyerCountry: buyerGeoCountry, sdkMeta, buyerAccessToken, wallet, serverRiskData,
        cspNonce: serverCSPNonce, merchantID: serverMerchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig, content } = opts;

    const clientID = window.xprops.clientID;

    const serviceData = getServiceData({
        eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility, personalization,
        isCardFieldsExperimentEnabled, sdkMeta, buyerAccessToken, wallet, content, serverRiskData });
    const { merchantID } = serviceData;

    const props = getProps({ facilitatorAccessToken });
    const { env, sessionID, partnerAttributionID, commit, correlationID, locale,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding,
        style, persistRiskData } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { version } = config;
    
    const components = getComponents();

    const { initPromise, isEnabled } = onInit();

    let paymentProcessing = false;

    function initiatePayment({ payment, props: paymentProps } : {| props : ButtonProps, payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            const { win, fundingSource } = payment;
            const { onClick } = paymentProps;

            if (onClick) {
                onClick({ fundingSource });
            }

            if (isEnabled()) {
                paymentProcessing = true;

                return initiatePaymentFlow({ payment, config, serviceData, components, props: paymentProps }).finally(() => {
                    paymentProcessing = false;
                });
            } else  {
                if (win) {
                    win.close();
                }
            }
        }).catch(err => {
            
            getLogger()
                .info('smart_buttons_payment_error', { err: stringifyError(err) })
                .track({
                    [FPTI_KEY.ERROR_CODE]: 'smart_buttons_payment_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                });

            throw err;
        });
    }

    function initiateMenu({ payment } : {| payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            if (isEnabled()) {
                return initiateMenuFlow({ payment, config, serviceData, components, props });
            }
        }).catch(err => {
            getLogger()
                .info('smart_buttons_payment_error', { err: stringifyError(err) })
                .track({
                    [FPTI_KEY.ERROR_CODE]: 'smart_buttons_payment_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                });

            throw err;
        });
    }

    clearSmartMenu();
    
    getButtons().forEach(button => {
        const { fundingSource, card, paymentMethodID, instrumentID, instrumentType } = getSelectedFunding(button);
        const payment = { button, fundingSource, card, paymentMethodID, instrumentID, instrumentType, isClick: true, buyerIntent: BUYER_INTENT.PAY };
        const menuToggle = button.querySelector(`[${ DATA_ATTRIBUTES.MENU }]`);

        preventClickFocus(button);
        onElementClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            const paymentProps = getProps({ facilitatorAccessToken });
            const payPromise = initiatePayment({ payment, props: paymentProps });

            // $FlowFixMe
            button.payPromise = payPromise;
        });

        if (menuToggle) {
            prerenderMenu({ props, components });

            onElementClick(menuToggle, (event) => {
                event.preventDefault();
                event.stopPropagation();

                const menuPromise = initiateMenu({ payment });

                // $FlowFixMe
                button.menuPromise = menuPromise;
            });
        }
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

            const paymentProps = getProps({ facilitatorAccessToken });
            const payment = { win, button, fundingSource, card, buyerIntent: BUYER_INTENT.PAY };
            const payPromise = initiatePayment({ payment, props: paymentProps });

            // $FlowFixMe
            button.payPromise = payPromise;
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });
    const setupButtonLogsTask = setupButtonLogger({
        style, env, version, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });
    const setupPaymentFlowsTask = setupPaymentFlows({ props, config, serviceData, components });
    const setupPersistRiskDataTask = (persistRiskData && serverRiskData) ? persistRiskData(serverRiskData) : null;

    return ZalgoPromise.hash({
        initPromise, facilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask, setupPersistRiskDataTask
    }).then(noop);
}
