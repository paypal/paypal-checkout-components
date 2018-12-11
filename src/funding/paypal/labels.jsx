/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { type LocaleType } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';
import { regexTokenize } from 'belter/src';
import { PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { CLASS } from '../../constants';

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

function contentToJSX(key : string, locale : LocaleType, { logoColor, period } : { logoColor : $Values<typeof LOGO_COLOR>, period? : number } = {}) : $ReadOnlyArray<ElementNode | string> {
    const { lang } = locale;
    const text = componentContent[lang][key];

    return placeholderToJSX(text, {
        text:   (token) => <span class={ CLASS.TEXT }>{ token }</span>,
        pp:     ()      => <PPLogo logoColor={ logoColor } />,
        paypal: ()      => <PayPalLogo logoColor={ logoColor } />,
        br:     ()      => <br />,
        period: ()      => { return period ? period.toString() : null; }
    });
}

export function Checkout({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX('checkout', locale, { logoColor });
}

export function Pay({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX('pay', locale, { logoColor });
}

export function Installment({ locale, logoColor, period } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, period? : number }) : $ReadOnlyArray<ElementNode | string> {
    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor, period });
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
