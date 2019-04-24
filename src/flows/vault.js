/* @flow */

import { noop, memoize } from 'belter/src';
import { FUNDING, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { validatePaymentMethod, type OrderResponse } from '../api';
import { buildApproveActions } from '../orders';
import { CONTEXT } from '../constants';

import { initCheckout } from './checkout';

export function isVaultSetupEligible({ clientAccessToken, fundingEligibility, fundingSource } : { clientAccessToken : ?string, fundingEligibility : Object, fundingSource : $Values<typeof FUNDING> }) : boolean {
    if (!clientAccessToken) {
        return false;
    }
    
    if (window.xprops.vault) {
        return true;
    }
    
    const fundingConfig = fundingEligibility[fundingSource];
    if (fundingConfig.eligible && fundingConfig.vaultable) {
        return true;
    }

    return false;
}

export function isVaultCaptureEligible({ paymentMethodID } : { paymentMethodID : ?string }) : boolean {
    if (!paymentMethodID) {
        return false;
    }

    if (window.xprops.onShippingChange) {
        return false;
    }

    return true;
}

type VaultInstance = {|
    start : () => ZalgoPromise<mixed>,
    close : () => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>
|};

type VaultProps = {|
    createOrder : () => ZalgoPromise<string>,
    fundingSource : $Values<typeof FUNDING>,
    buyerCountry : $Values<typeof COUNTRY>,
    paymentMethodID : string
|};

export function initVault(props : VaultProps) : VaultInstance {
    
    const { createOrder, paymentMethodID, fundingSource, buyerCountry } = props;

    const restart = memoize(() : ZalgoPromise<OrderResponse> => {
        return ZalgoPromise.try(() => {
            return initCheckout({
                fundingSource,
                createOrder,
                buyerCountry,
                context: CONTEXT.IFRAME
            }).start();
        }).catch(noop).then(() => {
            return new ZalgoPromise(noop);
        });
    });

    const onApprove = ({ orderID }) => {
        const actions = {
            restart,
            ...buildApproveActions(orderID, fundingSource, restart)
        };

        return window.xprops.onApprove({ orderID }, actions).catch(err => {
            return window.xprops.onError(err);
        });
    };

    return {
        start: () => {
            return createOrder().then(orderID => {
                return validatePaymentMethod(window.xprops.clientAccessToken, orderID, paymentMethodID)
                    .then(() => onApprove({ orderID }));
            });
        },
        close:   () => ZalgoPromise.resolve(),
        onError: err => {
            throw err;
        }
    };
}
