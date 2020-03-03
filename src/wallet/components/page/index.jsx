/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { CheckoutSession } from '../../types';
import { CreditBanner } from '../credit';
import { Wallet } from '../wallet';
import { Style } from '../style';

import styles from './style.scss';

type PageProps = {|
    checkoutSession : CheckoutSession
|};

export const Page = ({ checkoutSession } : PageProps) : Node => (
    <Style css={ styles }>
        <Wallet checkoutSession={ checkoutSession } />
        <CreditBanner checkoutSession={ checkoutSession } />
    </Style>
);
