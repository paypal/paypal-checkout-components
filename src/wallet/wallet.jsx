/* @flow */
/** @jsx h */

// eslint-disable-next-line import/no-named-as-default
import renderToString from 'preact-render-to-string';
import { h, render } from 'preact';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getBody } from '../lib';
import { approveOrder } from '../api';

import type { CheckoutSession } from './types';
import { getProps, type WalletProps } from './props';
import { StyleSheet, Page } from './components';

function fallbackToWebCheckout() : ZalgoPromise<void> {
    throw new Error(`Not implemented`);
}

function submitWalletPayment(props : WalletProps, { checkoutSession, buyerAccessToken } : {| checkoutSession : CheckoutSession, buyerAccessToken : string |}) : ZalgoPromise<void> {
    const { createOrder, onApprove } = props;
    const planID = checkoutSession.fundingOptions[0].allPlans[0].id;

    return createOrder().then(orderID => {
        return approveOrder({ orderID, planID, buyerAccessToken });
    }).then(({ payerID }) => {
        return onApprove({ payerID }, { restart: fallbackToWebCheckout });
    });
}

function setupWalletPayment(props : WalletProps, { checkoutSession, buyerAccessToken } : {| checkoutSession : CheckoutSession, buyerAccessToken : string |}) : ZalgoPromise<void> {
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

type AppProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSession
|};

export function App({ cspNonce, checkoutSession } : AppProps) : Node {
    return (
        <StyleSheet cspNonce={ cspNonce }>
            <Page checkoutSession={ checkoutSession } />
        </StyleSheet>
    );
}

export function renderWallet(props : {| cspNonce : string, checkoutSession : CheckoutSession |}) : string {
    return renderToString(<App { ...props } />);
}

export function setupWallet({ facilitatorAccessToken, buyerAccessToken, cspNonce, checkoutSession } : SetupOptions) {
    const props = getProps({ facilitatorAccessToken });
    setupWalletPayment(props, { checkoutSession, buyerAccessToken });
    render(
        <App cspNonce={ cspNonce } checkoutSession={ checkoutSession } />,
        getBody().querySelector('#wallet-container')
    );
}
