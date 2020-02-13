/* @flow */
/** @jsx h */

import { h, render, Fragment, type Node } from 'preact';
import { useState } from 'preact/hooks';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getBody } from '../lib';
import { approveOrder } from '../api';

import { CLASS } from './constants';
import { Item, type FundingOptionType } from './item';
import { Style } from './style';
import { getProps, type WalletProps } from './props';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};
type WalletComponentProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSessionType
|};

export function Wallet({ cspNonce, checkoutSession } : WalletComponentProps) : Node {
    const { fundingOptions } = checkoutSession;
    
    // implement logic to select either the preferred one or to the first option available
    const isSelected = fundingOptions[0];
    
    const [ listOpen, setListOpen ] = useState(false);
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(isSelected);
    
    return (
        <Fragment>
            <Style nonce={ cspNonce } />
            <div class={ CLASS.WRAPPER }>
                <div class={ CLASS.WALLET_SELECTED_FI }>
                    <Item
                        fundingOption={ selectedWalletItem } selectWalletItemHandler={ setSelectedWalletItem }
                        listOpen={ listOpen } listOpenHandler={ setListOpen } />
                </div>
                {listOpen && (
                    <div class={ CLASS.WALLET_MENU }>
                        {
                            fundingOptions.map(option => {
                                return (
                                    <Item
                                        fundingOption={ option } selectWalletItemHandler={ setSelectedWalletItem }
                                        listOpen={ listOpen } listOpenHandler={ setListOpen } />
                                );
                            })
                        }
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export function fallbackToWebCheckout() : ZalgoPromise<void> {
    throw new Error(`Not implemented`);
}

type CheckoutSession = {|
    fundingOptions : $ReadOnlyArray<{|
        allPlans : $ReadOnlyArray<{|
            id : string
        |}>
    |}>
|};

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
    render(<Wallet cspNonce={ cspNonce } checkoutSession={ checkoutSession } />, getBody());
}
