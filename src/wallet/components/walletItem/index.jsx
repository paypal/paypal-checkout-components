/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import type { WalletDetailsType } from '../../types';
import { Style } from '../style';
import { Check } from '../../images/check';

import styles from './style.scoped.scss';

type ItemProps = {|
    selected : boolean,
    details : WalletDetailsType,
    listOpen : boolean,
    selectWalletItemHandler : (itemId : string) => void,
    listOpenHandler : (listOpen : boolean) => void
|};

export const WalletItem = ({
    selected,
    details,
    selectWalletItemHandler,
    listOpen,
    listOpenHandler
} : ItemProps) : Node => {
    const
        [ showSelected, setShowSelected ] = useState(selected);

    useEffect(() => {
        setShowSelected(selected);
    }, [ selected ]);

    const selectItem = (item) => {
        selectWalletItemHandler(item);
        listOpenHandler(!listOpen);
    };

    const renderPreferred = () => {
        return (details.showPreferredText)
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
            <div className={ `wallet-item ${ (selected) ? 'selected-wallet-item' : '' }` } onClick={ () => selectItem(details.id) }>
                <div className='icon'>
                    <img src={ details.fundingOptionIcon } />
                </div>
                <div className='description'>
                    <div className='name'>{ details.fundingOptionTitle }</div>
                    <div className='details'>
                        <span className='type'>{ details.instrumentSubType } </span>
                        <span className='digits'>{ details.lastDigits }</span>
                    </div>
                </div>
                { renderPreferred() }
                <div className='flex-spacer' />
                { renderSelected() }
            </div>
        </Style>
    );
};
