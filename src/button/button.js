/* @flow */

import { onClick as onElementClick, querySelectorAll, noop, stringifyErrorMessage, stringifyError, preventClickFocus } from '@krakenjs/belter/src';
import { COUNTRY, FPTI_KEY, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import type { ContentType, Wallet, PersonalizationType } from '../types';
import { getLogger, getSmartFieldsByFundingSource } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES, BUYER_INTENT } from '../constants';
import { type Payment } from '../payment-flows';

import { getButtonProps, getConfig, getComponents, getServiceData, type ButtonProps } from './props';
import { getSelectedFunding, getButtons, getMenuButton } from './dom';
import { setupButtonLogger } from './logger';
import { setupRemember } from './remember';
import { setupPaymentFlows, initiatePaymentFlow, initiateMenuFlow } from './pay';
import { prerenderButtonSmartMenu, clearButtonSmartMenu } from './menu';
import { validateProps } from './validation';
import { setupExports } from './exports';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    firebaseConfig? : FirebaseConfig,
    facilitatorAccessToken : string,
    content : ContentType,
    sdkMeta : string,
    wallet : ?Wallet,
    buyerAccessToken : ?string,
    eligibility : {|
        cardFields : boolean
    |},
    correlationID? : string,
    cookies : string,
    personalization : PersonalizationType,
    brandedDefault? : boolean | null
|};

try {
    if (!window.paypal) {
        const script = querySelectorAll('script').find(el => el.getAttribute('data-namespace'));

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

    const { facilitatorAccessToken, eligibility, fundingEligibility, buyerCountry: buyerGeoCountry, sdkMeta, buyerAccessToken, wallet, cookies,
        cspNonce: serverCSPNonce, merchantID: serverMerchantID, firebaseConfig, content, personalization, correlationID: buttonCorrelationID = '',
        brandedDefault = null } = opts;

    const clientID = window.xprops.clientID;

    const serviceData = getServiceData({
        eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility, cookies,
        sdkMeta, buyerAccessToken, wallet, content, personalization });
    const { merchantID, buyerCountry } = serviceData;

    const props = getButtonProps({ facilitatorAccessToken, brandedDefault, paymentSource: null });
    const { env, sessionID, partnerAttributionID, commit, sdkCorrelationID, locale, onShippingChange,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding, getQueriedEligibleFunding,
        style, fundingSource, intent, createBillingAgreement, createSubscription, stickinessID } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { sdkVersion } = config;
    
    const components = getComponents();

    const { initPromise, isEnabled } = onInit({ correlationID: buttonCorrelationID });

    let paymentProcessing = false;

    function initiatePayment({ payment, props: paymentProps } : {| props : ButtonProps, payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            const { win, fundingSource: paymentFundingSource } = payment;
            const { onClick } = paymentProps;

            const smartFields = getSmartFieldsByFundingSource(paymentFundingSource);
            
            if (smartFields) {
                if (!smartFields.isValid()) {
                    if (win) {
                        win.close();
                    }
                    return;
                }
            }

            if (onClick) {
                onClick({ fundingSource: paymentFundingSource });
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

    clearButtonSmartMenu();
    
    getButtons().forEach(button => {
        const menuToggle = getMenuButton(button);
        const { fundingSource: paymentFundingSource, card, paymentMethodID, instrumentID, instrumentType } = getSelectedFunding(button);

        const payment = { button, menuToggle, fundingSource: paymentFundingSource, card, paymentMethodID, instrumentID, instrumentType, isClick: true, buyerIntent: BUYER_INTENT.PAY };

        preventClickFocus(button);
        onElementClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            const paymentProps = getButtonProps({ facilitatorAccessToken, brandedDefault, paymentSource: paymentFundingSource });

            const payPromise = initiatePayment({ payment, props: paymentProps });
            const { onError } = paymentProps;

            payPromise.catch(err => {
                getLogger().warn('click_initiate_payment_reject', { err: stringifyError(err) }).flush();
                onError(err);
            });

            // $FlowFixMe
            button.payPromise = payPromise;
        });

        if (menuToggle) {
            prerenderButtonSmartMenu({ props, components });

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

            const { win, fundingSource: paymentFundingSource, card } = prerenderDetails;
            const button = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }=${ paymentFundingSource }]`);

            if (!button) {
                throw new Error(`Can not find button element`);
            }

            const paymentProps = getButtonProps({ facilitatorAccessToken, brandedDefault, paymentSource: paymentFundingSource });
            const payment = { win, button, fundingSource: paymentFundingSource, card, buyerIntent: BUYER_INTENT.PAY };
            const payPromise = initiatePayment({ payment, props: paymentProps });
            const { onError } = paymentProps;

            payPromise.catch(err => {
                getLogger().error('prerender_initiate_payment_reject', { err: stringifyError(err) }).flush();
                onError(err);
            });

            // $FlowFixMe
            button.payPromise = payPromise;
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });

    const setupButtonLogsTask = setupButtonLogger({
        style, env, sdkVersion, sessionID, clientID, partnerAttributionID, commit, sdkCorrelationID,
        stickinessID, buttonCorrelationID, locale, merchantID, buttonSessionID, merchantDomain,
        fundingSource, getQueriedEligibleFunding, buyerCountry, onShippingChange });
    const setupPaymentFlowsTask = setupPaymentFlows({ props, config, serviceData, components });
    const setupExportsTask = setupExports({ props, isEnabled, facilitatorAccessToken, fundingEligibility, merchantID });

    const validatePropsTask = setupButtonLogsTask.then(() => validateProps({ env, clientID, intent, createBillingAgreement, createSubscription }));

    return ZalgoPromise.hash({
        initPromise, facilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask, validatePropsTask, setupExportsTask
    }).then(noop);
}
