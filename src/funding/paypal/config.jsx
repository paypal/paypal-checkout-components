/* @flow */
/* @jsx jsxToHTML */

import { COUNTRY, type LocaleType } from 'paypal-braintree-web-client/src';
import { jsxToHTML, Fragment, type JsxHTMLNode, SVG } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { BUTTON_LABEL, LOGO_COLOR } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

import { componentContent } from './content';
import { PPLogo, PayPalLogo } from './logo';

export const PAYPAL_CONFIG = {
    url: URLS.CHECKOUT,

    defaultLabel: BUTTON_LABEL.PAYPAL,

    labels: {
        [ BUTTON_LABEL.PAYPAL ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label({ logoColor } : { logoColor : $Values<typeof LOGO_COLOR> }) : JsxHTMLNode {
                return (
                    <Fragment>
                        <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />
                    </Fragment>
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                let { DualTag, SaferTag } = componentContent[locale.country][locale.lang];

                return (multiple && DualTag)
                    ? <DualTag />
                    : <SaferTag />;
            },

            allowPrimary: true
        },

        [ BUTTON_LABEL.CHECKOUT ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: ({ locale, logoColor }) => {
                let { Checkout } = componentContent[locale.country][locale.lang];
                return (
                    <Checkout logoColor={ logoColor } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                let { DualTag, SaferTag } = componentContent[locale.country][locale.lang];

                return (multiple && DualTag)
                    ? <DualTag />
                    : <SaferTag />;
            },

            allowPrimary: true
        },

        [ BUTTON_LABEL.PAY ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: ({ locale, logoColor }) => {
                let { Pay } = componentContent[locale.country][locale.lang];
                return (
                    <Pay logoColor={ logoColor } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                let { DualTag, SaferTag } = componentContent[locale.country][locale.lang];

                return (multiple && DualTag)
                    ? <DualTag />
                    : <SaferTag />;
            },

            allowPrimary: true
        },

        [ BUTTON_LABEL.INSTALLMENT ]: {
            ...DEFAULT_LABEL_CONFIG,

            allowedCountries: [ COUNTRY.BR, COUNTRY.MX ],

            allowedPeriods: {
                [ COUNTRY.BR ]: [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
                [ COUNTRY.MX ]: [ 3, 6, 9, 12 ]
            },

            Label: ({ locale, logoColor, period }) => {
                let { Installment } = componentContent[locale.country][locale.lang];
                return (
                    <Installment logoColor={ logoColor } period={ period } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                let { DualTag, SaferTag } = componentContent[locale.country][locale.lang];

                return (multiple && DualTag)
                    ? <DualTag />
                    : <SaferTag />;
            },

            allowPrimary: true
        }
    }
};
