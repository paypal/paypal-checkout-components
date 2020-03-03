/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import { Style } from '../style';

import styles from './style.scoped.scss';

export const CreditBanner = () : Node => {

    return (
        <Style css={ styles }>
            <div>
                This is where the credit messaging goes...
            </div>
        </Style>
    );
};
