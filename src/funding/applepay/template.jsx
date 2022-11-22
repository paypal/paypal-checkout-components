/* @flow */
/** @jsx node */

import { node, Style, type ChildType } from '@krakenjs/jsx-pragmatic/src';
import { ApplePayMark } from '@paypal/sdk-logos/src';

import styles from './style.scss';

export function Mark({ ...props } : {||}) : ChildType {
    return (
        <Style css={ styles._getCss() }>
            <ApplePayMark { ...props } />
        </Style>
    );
}
