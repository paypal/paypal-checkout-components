/* @flow */
/* @jsx jsxToHTML */
/* eslint max-lines: 0 */

import { type LocaleType } from 'paypal-braintree-web-client/src';
import { placeholderToJSX, jsxToHTML, Fragment, type JsxHTMLNode, type PropsType, type ChildrenType } from 'belter/src'; // eslint-disable-line no-unused-vars

import { LOGO_COLOR, CLASS } from '../../constants';

import { PPLogo, PayPalLogo } from './logo';
import { componentContent } from './content';

function contentToJSX(key : string, locale : LocaleType, { logoColor, period } : { logoColor? : $Values<typeof LOGO_COLOR>, period? : number } = {}) : Array<JsxHTMLNode | string> {
    let { lang } = locale;
    let text = componentContent[lang][key];

    return placeholderToJSX(text, {
        text:   (token) => <span class={ CLASS.TEXT }>{ token }</span>,
        pp:     ()      => <PPLogo logoColor={ logoColor } />,
        paypal: ()      => <PayPalLogo logoColor={ logoColor } />,
        br:     ()      => <br />,
        period: ()      => { return period ? period.toString() : ''; }
    });
}

export function Checkout({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : Array<string | JsxHTMLNode> {
    return contentToJSX('checkout', locale, { logoColor });
}

export function Pay({ locale, logoColor } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR> }) : Array<string | JsxHTMLNode> {
    return contentToJSX('pay', locale, { logoColor });
}

export function Installment({ locale, logoColor, period } : { locale : LocaleType, logoColor : $Values<typeof LOGO_COLOR>, period? : number }) : Array<string | JsxHTMLNode> {
    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor, period });
}

export function SaferTag({ locale } : { locale : LocaleType }) : Array<string | JsxHTMLNode> {
    return contentToJSX('safer_tag', locale);
}

export function DualTag({ locale } : { locale : LocaleType }) : Array<string | JsxHTMLNode> {
    let { lang } = locale;

    return componentContent[lang].dual_tag
        ? contentToJSX('dual_tag', locale)
        : contentToJSX('safer_tag', locale);
}
