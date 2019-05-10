/* @flow */

import { onClick as onElementClick, noop } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupLogger } from '../lib';
import { initCheckout, setupCheckout, isVaultCaptureEligible, isCardFieldsEligible, initVault, initCardFields } from '../payment-flows';
import { DATA_ATTRIBUTES, CLASS } from '../constants';
import type { FundingEligibilityType, ProxyWindow } from '../types';
import { isPopupBridgeEligible, initPopupBridge } from '../payment-flows/popup-bridge';

import { getGlobalProps, getButtonCallbackProps } from './props';
import { getSelectedFunding, enableLoadingSpinner, getButtons, disableLoadingSpinner } from './dom';
import { updateButtonClientConfig, validateOrder } from './orders';
import { triggerButtonLogs } from './logs';

export function setupButton(opts : { fundingEligibility : FundingEligibilityType, buyerCountry? : ?$Values<typeof COUNTRY>, cspNonce? : string }) : ZalgoPromise<void> {
    
    // $FlowFixMe
    if (opts.paypal) {
        // $FlowFixMe
        opts = { fundingEligibility: opts };
    }

    const { fundingEligibility, buyerCountry: buyerGeoCountry, cspNonce: serverCSPNonce } = opts;

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    const {
        env,

        vault,
        commit,

        clientAccessToken,
        buyerCountry,
        locale,
        cspNonce,

        sessionID,
        clientID,
        merchantID,
        partnerAttributionID,
        correlationID,

        getPopupBridge,
        getPrerenderDetails,
        rememberFunding,

        onError,
        onInit
    } = getGlobalProps({ xprops: window.xprops, buyerGeoCountry, cspNonce: serverCSPNonce });

    // eslint-disable-next-line prefer-const
    let init;

    setupLogger({ env, sessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID });

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
                onShippingChange
            } = getButtonCallbackProps({ xprops: window.xprops });

            const validationPromise = onClick();

            if (!init || !init.isEnabled()) {
                return win ? win.close() : null;
            }

            const isCardFields = isCardFieldsEligible({ win, vault, onShippingChange, fundingSource });
            const isVaultCapture = isVaultCaptureEligible({ win, paymentMethodID, onShippingChange });
            const isPopupBridge = isPopupBridgeEligible({ win, popupBridge, onShippingChange });

            if (isVaultCapture || isPopupBridge) {
                enableLoadingSpinner(button);
            }

            const { start, close, triggerError } = (() => {
                if (isVaultCapture) {
                    return initVault({
                        createOrder, paymentMethodID, onApprove, clientAccessToken
                    });
                }

                if (isCardFields) {
                    return initCardFields({
                        fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                        onAuth, onShippingChange, cspNonce, locale, commit, onError, vault,
                        clientAccessToken, fundingEligibility, createBillingAgreement
                    });
                }

                if (isPopupBridge) {
                    return initPopupBridge({
                        popupBridge, createOrder, onApprove, onCancel
                    });
                }

                return initCheckout({
                    win, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
                    onAuth, onShippingChange, cspNonce, locale, commit, onError, vault,
                    clientAccessToken, fundingEligibility, validationPromise, createBillingAgreement
                });
            })();

            return validationPromise.then(valid => {
                if (!valid) {
                    return ZalgoPromise.all([
                        close(),
                        win && win.close()
                    ]).then(noop);
                }

                createOrder().then(orderID => {
                    return updateButtonClientConfig({ orderID, fundingSource, isCardFields });
                });

                return start()
                    .then(() => createOrder())
                    .then((orderID) => validateOrder(orderID))
                    .catch(err => {
                        // $FlowFixMe
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
            pay({ button, fundingSource, card, paymentMethodID });
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
