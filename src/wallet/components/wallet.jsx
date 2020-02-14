/* @flow */
/** @jsx h */

import { h, Fragment, type Node } from 'preact';
import { useState } from 'preact/hooks';

import type { FundingOptionType } from '../types';

import { Style } from './style';
import { WalletItem } from './wallet-item';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

type WalletProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSessionType
|};

export function Wallet({ cspNonce, checkoutSession } : WalletProps) : Node {
    const { fundingOptions } = checkoutSession;
    
    // implement logic to select either the preferred one or to the first option available
    const isSelected = fundingOptions[0];
    
    const [ listOpen, setListOpen ] = useState(false);
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(isSelected);
    
    return (
        <Fragment>
            <Style cspNonce={ cspNonce }>
                {`
                    .wallet {
                        padding: 5px;
                    }
                `}
            </Style>
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
        </Fragment>
    );
}
