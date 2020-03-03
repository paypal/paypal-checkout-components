/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import type { FundingOptionType } from '../../types';
import { Style } from '../style';
import { Check } from '../../images/check';

import styles from './style.scoped.scss';

type ItemProps = {|
    selected : boolean,
    fundingOption : FundingOptionType,
    listOpen : boolean,
    selectWalletItemHandler : (item : FundingOptionType) => void,
    listOpenHandler : (listOpen : boolean) => void
|};

export const WalletItem = ({
    selected,
    fundingOption,
    selectWalletItemHandler,
    listOpen,
    listOpenHandler
} : ItemProps) : Node => {
    const
        [ fundingOptionIcon, setFundingOptionIcon ] = useState(''),
        [ fundingOptionTitle, setFundingOptionTitle ] = useState(''),
        [ instrumentSubType, setInstrumentSubType ] = useState(''),
        [ showPreferredText, setShowPreferredText ] = useState(''),
        [ lastDigits, setLastDigits ] = useState(''),
        [ showSelected, setShowSelected ] = useState(selected);

    useEffect(() => {
        const {
            fundingInstrument: {
                image,
                name,
                issuerProductDescription,
                instrumentSubType: subType,
                lastDigits: digits,
                isPreferred
            }
        } = fundingOption;

        const href = (image) ? image.url.href : '';

        setFundingOptionIcon(href);

        if (subType === 'PAYPAL') {
            setFundingOptionTitle('PayPal Credit');
            setInstrumentSubType('Pay overtime for your purchase');
            setLastDigits('');
        } else {
            setFundingOptionTitle(issuerProductDescription || name);
            setInstrumentSubType(subType);
            setLastDigits(`•••• ${ digits || '' }`);
        }

        setShowPreferredText(isPreferred);

    }, [ fundingOption ]);

    useEffect(() => {
        setShowSelected(selected);
    }, [ selected ]);

    const selectItem = (item) => {
        selectWalletItemHandler(item);
        listOpenHandler(!listOpen);
    };

    const renderPreferred = () => {
        return (showPreferredText)
            ? <div className='preferred'>PREFERRED</div>
            : '';
    };

    const renderSelected = () => {
        return (showSelected)
            ? <div className='selected'><Check /></div>
            : '';
    };

    return (
        <Style css={ styles } >
            <div className={ `wallet-item ${ (selected) ? 'selected-wallet-item' : '' }` } onClick={ () => selectItem(fundingOption) }>
                <div className='icon'>
                    <img src={ fundingOptionIcon } />
                </div>
                <div className='description'>
                    <div className='name'>{ fundingOptionTitle }</div>
                    <div className='details'>
                        <span className='type'>{ instrumentSubType } </span>
                        <span className='digits'>{ lastDigits }</span>
                    </div>
                </div>
                { renderPreferred() }
                <div className='flex-spacer' />
                { renderSelected() }
            </div>
        </Style>
    );
};
