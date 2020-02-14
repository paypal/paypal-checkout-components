/* @flow */
/** @jsx h */

import { h, Fragment, type Node } from 'preact';

import type { FundingOptionType } from '../types';

import { Style } from './style';

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
        <Fragment>
            <Style>
                {`
                    .wallet-item  {
                        white-space: nowrap;
                        cursor: pointer;
                        margin-top: 5px;
                        border-bottom: 1px solid #eee;
                    }

                    .wallet-item:first-child {
                        margin-top: 0px;
                    }

                    .wallet-item:last-child {
                        border-bottom: 0;
                    }

                    @media only screen and (min-width: 0px) {
                        .wallet-item {
                            height: 50px;
                        }
                    }

                    @media only screen and (min-width: 600px) {
                        .wallet-item {
                            height: 60px;
                        }
                    }

                    .wallet-item-icon-container {
                        display: inline-block;
                        vertical-align: top;
                        text-align: center;
                        width: 50px;
                        margin-right: 20px;
                    }

                    .wallet-item-icon {
                        max-height: 90%;
                        max-width: 90%;
                    }

                    .wallet-item-description {
                        display: inline-block;
                        vertical-align: top;
                    }

                    .wallet-item-name {
                        font-size: .95em;
                        height: 50%;
                    }

                    .wallet-item-details {
                        height: 50%;
                        color: #6c7378;
                        font-size: .80em;
                    }
                `}
            </Style>
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
        </Fragment>
    );
}
