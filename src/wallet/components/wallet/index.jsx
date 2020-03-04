/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState } from 'preact/hooks';

import type { FundingOptionType } from '../../types';
import { WalletItem } from '../walletItem';
import { CreditBanner } from '../credit';
import { buildWalletItemDetails } from '../../util';
import { Style } from '../style';

import styles from './style.scoped.scss';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

type WalletProps = {|
    checkoutSession : CheckoutSessionType
|};

export const Wallet = ({ checkoutSession } : WalletProps) : Node => {
    const
        { fundingOptions } = checkoutSession,
        [ listOpen, setListOpen ] = useState(false),
        [ selectedWalletItem, setSelectedWalletItem ] = useState(fundingOptions[0]);

    const changeSelectedWalletItem = (itemId) => {
        const newItem = fundingOptions.find(option => option.id === itemId);
        setSelectedWalletItem(newItem);
    };

    const renderSelectedWalletItem = () => {
        return (listOpen)
            ? ''
            : <WalletItem
                selected={ true }
                details={ buildWalletItemDetails(selectedWalletItem) }
                selectWalletItemHandler={ changeSelectedWalletItem }
                listOpen={ listOpen }
                listOpenHandler={ setListOpen }
            />;
    };

    const renderWalletOptions = () => {
        return (listOpen)
            ? (
                <div>
                    {
                        fundingOptions.map((option) => (
                            <WalletItem
                                selected={ option.id === selectedWalletItem.id }
                                details={ buildWalletItemDetails(option) }
                                selectWalletItemHandler={ changeSelectedWalletItem }
                                listOpen={ listOpen }
                                listOpenHandler={ setListOpen }
                            />
                        ))
                    }
                    <CreditBanner checkoutSession={ checkoutSession } />
                    <div className="add-card-button">
                        <a href="#">Add debit or credit card</a>
                    </div>
                </div>
            ) : '';
    };

    return (
        <Style css={ styles }>
            <div className='wallet'>
                { renderSelectedWalletItem() }
                { renderWalletOptions() }
            </div>
        </Style>
    );
};
