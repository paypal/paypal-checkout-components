/* @flow */

import { onClick as onElementClick, noop, stringifyErrorMessage, stringifyError } from 'belter/src';
import { COUNTRY, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, PersonalizationType, ContentType } from '../types';
import { fixClickFocus, getLogger } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES, BUYER_INTENT } from '../constants';
import { type Payment } from '../payment-flows';

import { getProps, getConfig, getComponents, getServiceData } from './props';
import { getSelectedFunding, getButtons } from './dom';
import { setupButtonLogger } from './logger';
import { setupRemember } from './remember';
import { setupPaymentFlows, initiatePaymentFlow } from './pay';
import { renderButtonDropdown } from './menu';

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
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [$Values<typeof FUNDING> ] : ?boolean
        }
    |}
|};

export function setupButton(opts : ButtonOpts) : ZalgoPromise<void> {
    if (!window.paypal) {
        throw new Error(`PayPal SDK not loaded`);
    }

    const { facilitatorAccessToken, eligibility, fundingEligibility, buyerCountry: buyerGeoCountry, content, sdkMeta,
        cspNonce: serverCSPNonce, merchantID: serverMerchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig } = opts;

    const clientID = window.xprops.clientID;

    const serviceData = getServiceData({ eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility, personalization, isCardFieldsExperimentEnabled, sdkMeta });
    const { merchantID } = serviceData;

    let props = getProps({ facilitatorAccessToken });
    const { env, sessionID, partnerAttributionID, commit, correlationID, locale,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding,
        style } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { version } = config;
    
    const components = getComponents();

    const { initPromise, isEnabled } = onInit();

    let paymentProcessing = false;

    function initiatePayment({ payment } : {| payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            props = getProps({ facilitatorAccessToken });

            const { win, fundingSource } = payment;
            const { onClick } = props;

            if (onClick) {
                onClick({ fundingSource });
            }

            if (isEnabled()) {
                paymentProcessing = true;

                return initiatePaymentFlow({ payment, config, serviceData, components, props }).finally(() => {
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

    getButtons().forEach(button => {
        const { fundingSource, card, paymentMethodID } = getSelectedFunding(button);
        const payment = { button, fundingSource, card, paymentMethodID, isClick: true, buyerIntent: BUYER_INTENT.PAY };
        
        fixClickFocus(button);
        renderButtonDropdown({ props, payment, content, initiatePayment });
        
        onElementClick(button, event => {
            event.preventDefault();
            event.stopPropagation();
            
            const payPromise = initiatePayment({ payment });

            // $FlowFixMe
            button.payPromise = payPromise;
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

            const payment = { win, button, fundingSource, card, buyerIntent: BUYER_INTENT.PAY };
            const payPromise = initiatePayment({ payment });

            // $FlowFixMe
            button.payPromise = payPromise;
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });
    const setupButtonLogsTask = setupButtonLogger({
        style, env, version, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });
    const setupPaymentFlowsTask = setupPaymentFlows({ props, config, serviceData, components });

    return ZalgoPromise.hash({
        initPromise, facilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask
    }).then(noop);
}
