/* @flow */

import { onClick as onElementClick, noop } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, ProxyWindow, PersonalizationType } from '../types';
import { setupLogger, sendBeacon, fixClickFocus, type FirebaseConfig } from '../lib';
import { createAccessToken } from '../api';
import { initCheckout, setupCheckout, isVaultCaptureEligible, isCardFieldsEligible, initVault, initCardFields } from '../payment-flows';
import { DATA_ATTRIBUTES } from '../constants';
import { isPopupBridgeEligible, initPopupBridge, setupPopupBridge } from '../payment-flows/popup-bridge';
import { isNativeEligible, initNative, setupNative } from '../payment-flows/native';

import { getGlobalProps, getButtonCallbackProps } from './props';
import { getSelectedFunding, enableLoadingSpinner, getButtons, disableLoadingSpinner } from './dom';
import { updateButtonClientConfig, validateOrder } from './orders';
import { setupButtonLogs } from './logs';
import { setupRemember } from './remember';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry? : ?$Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    personalization? : PersonalizationType,
    isCardFieldsExperimentEnabled? : boolean,
    firebaseConfig? : FirebaseConfig
|};

type PayOptions = {|
    button : HTMLElement,
    win? : ?ProxyWindow,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    paymentMethodID? : ?string
|};

export function setupButton({ fundingEligibility, buyerCountry: buyerGeoCountry, cspNonce: serverCSPNonce, merchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig } : ButtonOpts) : ZalgoPromise<void> {
    if (!window.paypal) {
        throw new Error(`PayPal SDK not loaded`);
    }

    const xprops = window.xprops;

    const {
        env, stageHost, apiStageHost, buttonSessionID, style,
        vault, commit, clientAccessToken, buyerCountry, locale, cspNonce, platform,
        sessionID, clientID, partnerAttributionID, correlationID, enableThreeDomainSecure,
        merchantDomain, getPopupBridge, getPrerenderDetails, getPageUrl, rememberFunding,
        onError, onInit, enableStandardCardFields, enableNativeCheckout, onClick
    } = getGlobalProps({ xprops, buyerGeoCountry, cspNonce: serverCSPNonce });

    setupLogger({ env, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });

    const { initPromise, isEnabled } = onInit();

    let buttonProcessing = false;
    let popupBridge;

    const pay = ({ button, win, fundingSource, card, paymentMethodID } : PayOptions) => {
        return ZalgoPromise.try(() => {
            if (buttonProcessing) {
                return;
            }

            buttonProcessing = true;

            const validationPromise = onClick({ fundingSource });

            const {
                createOrder, createBillingAgreement, createSubscription,
                onApprove, onCancel, onShippingChange
            } = getButtonCallbackProps({ xprops, validationPromise });

            if (!isEnabled()) {
                return win ? win.close() : null;
            }

            const isCardFields = isCardFieldsEligible({ win, vault, onShippingChange, fundingSource, isCardFieldsExperimentEnabled, enableStandardCardFields });
            const isVaultCapture = isVaultCaptureEligible({ win, paymentMethodID, onShippingChange });
            const isPopupBridge = isPopupBridgeEligible({ win, onShippingChange });
            const isNative = isNativeEligible({ win, platform, fundingSource, onShippingChange, createBillingAgreement, createSubscription, enableNativeCheckout, firebaseConfig });
            const isCheckout = !isCardFields && !isVaultCapture && !isPopupBridge && !isNative;

            const { start, close, triggerError } = (() => {
                if (isCheckout) {
                    return initCheckout({
                        clientID, win, buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                        onShippingChange, cspNonce, locale, commit, onError, vault,
                        clientAccessToken, fundingEligibility, createBillingAgreement, createSubscription
                    });
                }

                if (isVaultCapture) {
                    enableLoadingSpinner(button);

                    return initVault({
                        clientID, createOrder, paymentMethodID, onApprove, clientAccessToken, enableThreeDomainSecure,
                        buttonSessionID, partnerAttributionID
                    });
                }

                if (isCardFields) {
                    return initCardFields({
                        clientID, buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                        onShippingChange, cspNonce, locale, commit, onError, vault,
                        clientAccessToken, fundingEligibility, createBillingAgreement, createSubscription
                    });
                }

                if (isPopupBridge) {
                    enableLoadingSpinner(button);

                    return initPopupBridge({
                        clientID, popupBridge, fundingSource, createOrder, onApprove, onCancel, commit
                    });
                }

                if (isNative) {
                    if (!firebaseConfig) {
                        throw new Error(`Firebase config required`);
                    }

                    return initNative({
                        createOrder, onApprove, onCancel, onError, commit, fundingSource,
                        clientID, getPageUrl, env, stageHost, apiStageHost, win, buttonSessionID, card, buyerCountry,
                        onShippingChange, cspNonce, locale, vault, firebaseConfig,
                        clientAccessToken, fundingEligibility, createBillingAgreement, createSubscription
                    });
                }

                throw new Error(`No valid flow found`);
            })();

            return validationPromise.then(valid => {
                if (!valid) {
                    return ZalgoPromise.all([
                        close(),
                        win && win.close()
                    ]).then(noop);
                }

                createOrder().then(orderID =>
                    updateButtonClientConfig({ orderID, fundingSource, isCardFields }));

                return start()
                    .then(() => createOrder())
                    .then(orderID => validateOrder(orderID, { clientID, merchantID }))
                    .catch(err => {
                        return ZalgoPromise.all([
                            triggerError(err),
                            close()
                        ]);
                    });

            });
        }).finally(() => {
            buttonProcessing = false;
            disableLoadingSpinner(button);
        });
    };

    getButtons().forEach(button => {
        fixClickFocus(button);

        const { fundingSource, card, paymentMethodID } = getSelectedFunding(button);

        onElementClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            const payPromise = pay({ button, fundingSource, card, paymentMethodID });
            // $FlowFixMe
            button.payPromise = payPromise;

            if (personalization && personalization.tagline) {
                sendBeacon(personalization.tagline.tracking.click);
            }
        });
    });

    const setupPrerenderTask = initPromise.then(() => {
        return getPrerenderDetails().then((prerenderDetails) => {
            if (prerenderDetails) {
                const { win, fundingSource, card } = prerenderDetails;
                const button = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }=${ fundingSource }]`);

                if (!button) {
                    throw new Error(`Can not find button element`);
                }

                return pay({ button, win, fundingSource, card });
            }
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });
    const setupButtonLogsTask = setupButtonLogs({ style });

    const setupCheckoutFlow = setupCheckout();
    const setupPopupBridgeFlow = setupPopupBridge({ getPopupBridge });
    const setupNativeFlow = setupNative();

    const createFacilitatorAccessToken = createAccessToken(clientID);

    return ZalgoPromise.hash({
        initPromise, createFacilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupCheckoutFlow, setupNativeFlow, setupPopupBridgeFlow
    }).then(noop);
}
