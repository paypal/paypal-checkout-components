/* @flow */
/** @jsx node */

import { FUNDING } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';

import { type ButtonStyle } from '../../zoid/buttons/props';
import { getFundingConfig } from '../../funding';

import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    nonce : string
|};

function getCardNumber() : number {
    const cardConfig = getFundingConfig()[FUNDING.CARD];
    const vendors = cardConfig && cardConfig.vendors;
    const maxCards = 5;

    if (vendors) {
        const numCards = Object.keys(vendors).filter(vendor => {
            return vendors[vendor] && vendors[vendor].eligible;
        }).length;
        return Math.min(numCards, maxCards);
    } else {
        return maxCards;
    }
}

export function Style({ style, nonce } : StyleProps) : ElementNode {

    const { height } = style;
    const cardNumber = getCardNumber();
    const css = componentStyle({ height, cardNumber });

    return (
        <style nonce={ nonce } innerHTML={ css } />
    );
}
