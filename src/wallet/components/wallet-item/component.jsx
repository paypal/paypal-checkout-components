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
                <div class='icon'>
                    <img src={ fundingOptionIcon } />
                </div>
                <div class='description'>
                    <div class='name'>{ fundingOptionTitle }</div>
                    <div class='details'>
                        <span class='type'>{instrumentSubType} </span>
                        <span class='digits'>•••• {lastDigits}</span>
                    </div>
                </div>
            </div>
        </Style>
    );
}
