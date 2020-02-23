/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { FundingOptionType } from '../../types';
import { Style } from '../style/component';

import css from './style.scoped.scss';

type ItemProps = {|
    fundingOption : FundingOptionType,
    listOpen : boolean,
    selectWalletItemHandler : (item : FundingOptionType) => void,
    listOpenHandler : (listOpen : boolean) => void
|};

export function WalletItem({ fundingOption, selectWalletItemHandler, listOpen, listOpenHandler } : ItemProps) : Node {
    const selectItem = (item) => {
        selectWalletItemHandler(item);
        listOpenHandler(!listOpen);
    };

    const { fundingInstrument } = fundingOption;
    
    const fundingOptionIcon = fundingInstrument && fundingInstrument.image && fundingInstrument.image.url && fundingInstrument.image.url.href;
    const fundingOptionTitle = fundingInstrument && fundingInstrument.issuerProductDescription;
    const instrumentSubType = fundingInstrument && fundingInstrument.instrumentSubType;
    const lastDigits = fundingInstrument && fundingInstrument.lastDigits;

    return (
        <Style css={ css }>
            <div class='wallet-item' onClick={ () => selectItem(fundingOption) }>
                <div class='wallet-item-icon-container'>
                    <img src={ fundingOptionIcon } class='wallet-item-icon' />
                </div>
                <div class='wallet-item-description'>
                    <div class='wallet-item-name'>{ fundingOptionTitle }</div>
                    <div class='wallet-item-details'>
                        <span class='wallet-item-type'>{instrumentSubType} </span>
                        <span class='wallet-item-digits'>•••• {lastDigits}</span>
                    </div>
                </div>
            </div>
        </Style>
    );
}
