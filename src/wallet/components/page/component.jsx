/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { CheckoutSession } from '../../types';
import { Style } from '../style/component';
import { Wallet } from '../wallet';

import css from './style.scss';

type PageProps = {|
    checkoutSession : CheckoutSession
|};

export function Page({ checkoutSession } : PageProps) : Node {
    return (
        <Style css={ css }>
            <Wallet
                checkoutSession={ checkoutSession }
            />
        </Style>
    );
}
