/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState } from 'preact/hooks';

import type { FundingOptionType } from '../../types';
import { WalletItem } from '../wallet-item';
import { Style } from '../style/component';

import css from './style.scoped.scss';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

type WalletProps = {|
    checkoutSession : CheckoutSessionType
|};

export function Wallet({ checkoutSession } : WalletProps) : Node {
    const { fundingOptions } = checkoutSession;
    
    // implement logic to select either the preferred one or to the first option available
    const isSelected = fundingOptions[0];
    
    const [ listOpen, setListOpen ] = useState(false);
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(isSelected);
    
    return (
        <Style css={ css }>
            <div class='wallet'>
                <WalletItem
                    fundingOption={ selectedWalletItem } selectWalletItemHandler={ setSelectedWalletItem }
                    listOpen={ listOpen } listOpenHandler={ setListOpen } />
                
                {
                    listOpen &&
                        fundingOptions.map(option => (
                            <WalletItem
                                fundingOption={ option }
                                selectWalletItemHandler={ setSelectedWalletItem }
                                listOpen={ listOpen }
                                listOpenHandler={ setListOpen }
                            />
                        ))
                }
            </div>
        </Style>
    );
}
