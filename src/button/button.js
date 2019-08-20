/* @flow */

import { onClick as onElementClick, noop } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { FundingEligibilityType, ProxyWindow, PersonalizationType } from '../types';
import { setupLogger, sendBeacon } from '../lib';
import { initCheckout, setupCheckout, isVaultCaptureEligible, isCardFieldsEligible, initVault, initCardFields } from '../payment-flows';
import { DATA_ATTRIBUTES, CLASS } from '../constants';
import { isPopupBridgeEligible, initPopupBridge } from '../payment-flows/popup-bridge';

import { getGlobalProps, getButtonCallbackProps } from './props';
import { getSelectedFunding, enableLoadingSpinner, getButtons, disableLoadingSpinner } from './dom';
import { updateButtonClientConfig, validateOrder } from './orders';
import { triggerButtonLogs } from './logs';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry? : ?$Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    personalization? : PersonalizationType,
    isCardFieldsExperimentEnabled? : boolean
|};


export function setupButton({ fundingEligibility, buyerCountry: buyerGeoCountry, cspNonce: serverCSPNonce, merchantID, personalization, isCardFieldsExperimentEnabled } : ButtonOpts) : ZalgoPromise<void> {
    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    const {
        env,
        buttonSessionID,

        vault,
        commit,

        clientAccessToken,
        buyerCountry,
        locale,
        cspNonce,

        sessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        enableThreeDomainSecure,
        merchantDomain,

        getPopupBridge,
        getPrerenderDetails,
        rememberFunding,

        onError,
        onInit
    } = getGlobalProps({ xprops: window.xprops, buyerGeoCountry, cspNonce: serverCSPNonce });

    // eslint-disable-next-line prefer-const
    let init;

    setupLogger({ env, sessionID, clientID, partnerAttributionID, commit,
        correlationID, locale, merchantID, buttonSessionID, merchantDomain });

    let buttonProcessing = false;
    let popupBridge;

    const pay = ({ button, win, fundingSource, card, paymentMethodID } : { button : HTMLElement, win? : ?ProxyWindow, fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD>, paymentMethodID? : ?string }) => {
        return ZalgoPromise.try(() => {
            if (buttonProcessing) {
                return;
            }

            buttonProcessing = true;

            const {
                createOrder,
                createBillingAgreement,
                onApprove,
                onCancel,
                onClick,
                onAuth,
                onShippingChange,
                createSubscription
            } = getButtonCallbackProps({ xprops: window.xprops });

            const validationPromise = onClick({ fundingSource });

            if (!init || !init.isEnabled()) {
                return win ? win.close() : null;
            }

            const isCardFields = isCardFieldsEligible({ win, vault, onShippingChange, fundingSource, isCardFieldsExperimentEnabled });
            const isVaultCapture = isVaultCaptureEligible({ win, paymentMethodID, onShippingChange });
            const isPopupBridge = isPopupBridgeEligible({ win, popupBridge, onShippingChange });

            if (isVaultCapture || isPopupBridge) {
                enableLoadingSpinner(button);
            }

            const { start, close, triggerError } = (() => {
                if (isVaultCapture) {
                    return initVault({
                        createOrder, paymentMethodID, onApprove, clientAccessToken, enableThreeDomainSecure
                    });
                }

                if (isCardFields) {
                    return initCardFields({
                        buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                        onAuth, onShippingChange, cspNonce, locale, commit, onError, vault,
                        clientAccessToken, fundingEligibility, createBillingAgreement, createSubscription
                    });
                }

                if (isPopupBridge) {
                    return initPopupBridge({
                        popupBridge, fundingSource, createOrder, onApprove, onCancel, commit
                    });
                }

                return initCheckout({
                    win, buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                    onAuth, onShippingChange, cspNonce, locale, commit, onError, vault,
                    clientAccessToken, fundingEligibility, validationPromise, createBillingAgreement, createSubscription
                });
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

    const tasks = {};

    getButtons().forEach(button => {
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

        button.addEventListener('mousedown', () => {
            button.classList.add(CLASS.CLICKED);
        });

        button.addEventListener('focus', (event : Event) => {
            if (button.classList.contains(CLASS.CLICKED)) {
                event.preventDefault();
                button.blur();
                button.classList.remove(CLASS.CLICKED);
            }
        });
    });

    tasks.remember = ZalgoPromise.try(() => {
        if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) {
            return rememberFunding([ FUNDING.VENMO ]);
        }
    });

    tasks.getPopupBridge = ZalgoPromise.try(() => {
        if (getPopupBridge) {
            return getPopupBridge().then(bridge => {
                popupBridge = bridge;
            });
        }
    });

    triggerButtonLogs();

    tasks.setupCheckout = setupCheckout();

    init = onInit();
    tasks.onInit = init.promise;

    tasks.prerender = tasks.onInit.then(() => {
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

    return ZalgoPromise.hash(tasks).then(noop);
}
