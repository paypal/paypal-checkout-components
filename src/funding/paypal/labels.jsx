/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment, type ChildType, type NullableChildType } from 'jsx-pragmatic/src';
import { regexTokenize } from 'belter/src';
import { PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { CLASS } from '../../constants';

import { componentContent } from './content';

function placeholderToJSX(text : string, placeholders : { [string] : (?string) => NullableChildType }) : ChildType {
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

function contentToJSX(key : string, locale : LocaleType, { logoColor, period } : { logoColor : $Values<typeof LOGO_COLOR>, period? : number } = {}) : ChildType {
    const { lang } = locale;
    const Content = componentContent[lang][key];

    if (typeof Content === 'string') {
        return placeholderToJSX(Content, {
            text:   (token) => <span class={ CLASS.TEXT }>{token}</span>,
            pp:     () => <PPLogo logoColor={ logoColor } />,
            paypal: () => <PayPalLogo logoColor={ logoColor } />,
            br:     () => <br />,
            period: () => { return period ? period.toString() : null; }
        });
    }

    return <Content logoColor={ logoColor } period={ period } />;
}

export function PayPal({ logoColor } : { logoColor : $Values<typeof LOGO_COLOR> }) : ChildType {
    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />
        </Fragment>
    );
}

export function Checkout({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : ChildType {
    return contentToJSX('checkout', locale, { logoColor });
}

export function BuyNow({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : ChildType {
    return contentToJSX('buynow', locale, { logoColor });
}

export function Pay({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : ChildType {
    return contentToJSX('pay', locale, { logoColor });
}

export function Installment({ locale, logoColor, period } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, period? : number }) : ChildType {
    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor, period });
}

export function SaferTag({ locale } : { locale : LocaleType }) : ChildType {
    return contentToJSX('safer_tag', locale);
}

export function DualTag({ locale } : { locale : LocaleType }) : ChildType {
    const { lang } = locale;

    return componentContent[lang].dual_tag
        ? contentToJSX('dual_tag', locale)
        : contentToJSX('safer_tag', locale);
}
