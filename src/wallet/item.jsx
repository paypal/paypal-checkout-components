/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import { BULLETS, CLASS } from './constants';

export type FundingInstrumentType = {|
    id : string,
    name : string,
    issuerProductDescription : string,
    instrumentSubType : string,
    lastDigits : string,
    image : {|
        url : {|
            href : string
        |},
        width : string,
        height : string
    |}
|};
export type FundingOptionType = {|
    id : string,
    fundingInstrument : FundingInstrumentType,
    isPreferred : boolean
|};
type ItemProps = {|
    fundingOption : FundingOptionType,
    listOpen : boolean,
    selectWalletItemHandler : (item : FundingOptionType) => void,
    listOpenHandler : (listOpen : boolean) => void
|};

export function Item({ fundingOption, selectWalletItemHandler, listOpen, listOpenHandler } : ItemProps) : Node {
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
        <div class={ CLASS.WALLET_ITEM } onClick={ () => selectItem(fundingOption) }>
            <div class={ CLASS.WALLET_FI_ICON_CONTAINER }>
                <img src={ fundingOptionIcon } class={ CLASS.WALLET_FI_ICON } />
            </div>
            <div class={ CLASS.WALLET_FI_DESCRIPTION_CONTAINER }>
                <div class={ CLASS.WALLET_FI_NAME }>{ fundingOptionTitle }</div>
                <div class={ CLASS.WALLET_FI_DETAILS }>
                    <span class={ CLASS.FI_TYPE }>{ instrumentSubType } </span>
                    <span class={ CLASS.FI_DIGITS }>{ BULLETS } { lastDigits }</span>
                </div>
            </div>
        </div>
    );
}
