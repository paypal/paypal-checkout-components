/* @flow */
/** @jsx h */

import { h, render, Fragment, type Node } from 'preact';
import { useState } from 'preact/hooks';

import { getBody } from '../lib';

import { CLASS } from './constants';
import { Item, type FundingOptionType } from './item';
import { Style } from './style';


export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};
type WalletProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSessionType,
    styleOptions : {|
        height : string
    |}
|};

export function Wallet({ cspNonce, checkoutSession, styleOptions } : WalletProps) : Node {
    const { fundingOptions } = checkoutSession;
    
    // implement logic to select either the preferred one or to the first option available
    const isSelected = fundingOptions[0];
    
    const [ listOpen, setListOpen ] = useState(false);
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(isSelected);
    
    return (
        <Fragment>
            <Style
                nonce={ cspNonce }
                styleOptions={ styleOptions }
            />
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

type SetupOptions = {|
    cspNonce : string,
    checkoutSession : {},
    style : {}
|};

export function setupWallet({ cspNonce, checkoutSession, style } : SetupOptions) {
    render(<Wallet cspNonce={ cspNonce } checkoutSession={ checkoutSession } styleOptions={ style } />, getBody());
}
