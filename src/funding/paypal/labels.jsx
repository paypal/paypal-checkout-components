/* @flow */
/** @jsx jsxToHTML */
/* eslint max-lines: 0 */

import { type LocaleType } from 'paypal-sdk-constants/src';
import { placeholderToJSX, jsxToHTML, type JsxChildrenType } from 'belter/src';

import { LOGO_COLOR, CLASS } from '../../constants';

import { PPLogo, PayPalLogo } from './logo';
import { componentContent } from './content';

function contentToJSX(key : string, locale : LocaleType, { logoColor, period, nonce } : { logoColor : $Values<typeof LOGO_COLOR>, period? : number, nonce : string } = {}) : JsxChildrenType {
    const { lang } = locale;
    const text = componentContent[lang][key];

    return placeholderToJSX(text, {
        text:   (token) => <span class={ CLASS.TEXT }>{ token }</span>,
        pp:     ()      => <PPLogo nonce={ nonce } logoColor={ logoColor } />,
        paypal: ()      => <PayPalLogo nonce={ nonce } logoColor={ logoColor } />,
        br:     ()      => <br />,
        period: ()      => { return period ? period.toString() : ''; }
    });
}

export function Checkout({ locale, logoColor, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, nonce : string }) : JsxChildrenType {
    return contentToJSX('checkout', locale, { logoColor, nonce });
}

export function Pay({ locale, logoColor, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, nonce : string }) : JsxChildrenType {
    return contentToJSX('pay', locale, { logoColor, nonce });
}

export function Installment({ locale, logoColor, period, nonce } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, period? : number, nonce : string }) : JsxChildrenType {
    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor, period, nonce });
}

export function SaferTag({ locale } : { locale : LocaleType }) : JsxChildrenType {
    return contentToJSX('safer_tag', locale);
}

export function DualTag({ locale } : { locale : LocaleType }) : JsxChildrenType {
    const { lang } = locale;

    return componentContent[lang].dual_tag
        ? contentToJSX('dual_tag', locale)
        : contentToJSX('safer_tag', locale);
}
