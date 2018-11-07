/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { type LocaleType } from 'paypal-sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';
import { regexTokenize } from 'belter/src';

import { LOGO_COLOR, CLASS } from '../../constants';

import { PPLogo, PayPalLogo } from './logo';
import { componentContent } from './content';

function placeholderToJSX(text : string, placeholders : { [string] : (?string) => ElementNode | string | null | void }) : $ReadOnlyArray<ElementNode | string> {
    return regexTokenize(text, /(\{[a-z]+\})|([^{}]+)/g)
        .map(token => {
            const match = token.match(/^{([a-z]+)}$/);
            if (match) {
                return placeholders[match[1]]();
            } else if (placeholders.text) {
                return placeholders.text(token);
            } else {
                return token;
            }
        }).filter(Boolean);
}

function contentToJSX(key : string, locale : LocaleType, { logoColor, period, nonce } : { logoColor : $Values<typeof LOGO_COLOR>, period? : number, nonce : string } = {}) : $ReadOnlyArray<ElementNode | string> {
    const { lang } = locale;
    const text = componentContent[lang][key];

    return placeholderToJSX(text, {
        text:   (token) => <span class={ CLASS.TEXT }>{ token }</span>,
        pp:     ()      => <PPLogo nonce={ nonce } logoColor={ logoColor } />,
        paypal: ()      => <PayPalLogo nonce={ nonce } logoColor={ logoColor } />,
        br:     ()      => <br />,
        period: ()      => { return period ? period.toString() : null; }
    });
}

export function Checkout({ locale, logoColor, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, nonce : string }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX('checkout', locale, { logoColor, nonce });
}

export function Pay({ locale, logoColor, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, nonce : string }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX('pay', locale, { logoColor, nonce });
}

export function Installment({ locale, logoColor, period, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, period? : number, nonce : string }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor, period, nonce });
}

export function SaferTag({ locale } : { locale : LocaleType }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX('safer_tag', locale);
}

export function DualTag({ locale } : { locale : LocaleType }) : $ReadOnlyArray<ElementNode | string> {
    const { lang } = locale;

    return componentContent[lang].dual_tag
        ? contentToJSX('dual_tag', locale)
        : contentToJSX('safer_tag', locale);
}
