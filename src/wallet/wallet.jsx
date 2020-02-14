/* @flow */
/** @jsx h */

import { h, render } from 'preact';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getBody } from '../lib';
import { approveOrder } from '../api';

import type { CheckoutSession, FundingOptionType } from './types';
import { getProps, type WalletProps } from './props';
import { Wallet, Page } from './components';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

export function fallbackToWebCheckout() : ZalgoPromise<void> {
    throw new Error(`Not implemented`);
}

export function submitWalletPayment(props : WalletProps, { checkoutSession, buyerAccessToken } : { checkoutSession : CheckoutSession, buyerAccessToken : string }) : ZalgoPromise<void> {
    const { createOrder, onApprove } = props;
    const planID = checkoutSession.fundingOptions[0].allPlans[0].id;

    return createOrder().then(orderID => {
        return approveOrder({ orderID, planID, buyerAccessToken });
    }).then(({ payerID }) => {
        return onApprove({ payerID }, { restart: fallbackToWebCheckout });
    });
}

export function setupWalletPayment(props : WalletProps, { checkoutSession, buyerAccessToken } : { checkoutSession : CheckoutSession, buyerAccessToken : string }) : ZalgoPromise<void> {
    const { setup } = props;

    return setup({}, {
        submit: () => submitWalletPayment(props, { checkoutSession, buyerAccessToken })
    });
}

type SetupOptions = {|
    facilitatorAccessToken : string,
    buyerAccessToken : string,
    cspNonce : string,
    checkoutSession : CheckoutSession
|};

export function setupWallet({ facilitatorAccessToken, buyerAccessToken, cspNonce, checkoutSession } : SetupOptions) {
    const props = getProps({ facilitatorAccessToken });
    setupWalletPayment(props, { checkoutSession, buyerAccessToken });
    render(
        <Page>
            <Wallet cspNonce={ cspNonce } checkoutSession={ checkoutSession } />
        </Page>,
        getBody()
    );
}
