/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { CheckoutSession } from '../../types';
import { Wallet } from '../wallet';
import { Style } from '../style';

import styles from './style.scss';

type PageProps = {|
    checkoutSession : CheckoutSession
|};

export const Page = ({ checkoutSession } : PageProps) : Node => (
    <Style css={ styles }>
        <Wallet checkoutSession={ checkoutSession } />
    </Style>
);
