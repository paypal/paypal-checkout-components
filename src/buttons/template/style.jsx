/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';

import { type ButtonStyle } from '../props';
import { getFundingConfig } from '../../funding';

import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    locale : LocaleType,
    nonce : string
|};

function getCardNumber(locale : LocaleType) : number {
    const cardConfig = getFundingConfig()[FUNDING.CARD];
    const vendors = cardConfig && cardConfig.vendors;
    let maxCards = 4;

    if (cardConfig && cardConfig.maxCards && cardConfig.maxCards[locale.country]) {
        maxCards = cardConfig.maxCards[locale.country];
    }

    if (vendors) {
        const numCards = Object.keys(vendors).length;
        return Math.min(numCards, maxCards);
    } else {
        return maxCards;
    }
}

export function Style({ style, locale, nonce } : StyleProps) : ElementNode {

    const { height } = style;
    const cardNumber = getCardNumber(locale);
    const css = componentStyle({ height, cardNumber });

    const styleTag = (
        <style nonce={ nonce } innerHTML={ css } />
    );

    try {
        styleTag.render(html());
        return styleTag;

    } catch (err) {
        return (
            <style nonce={ nonce }>{ css }</style>
        );
    }
}
