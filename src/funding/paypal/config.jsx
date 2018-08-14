/* @flow */
/* @jsx jsxToHTML */

import { COUNTRY, type LocaleType } from 'paypal-braintree-web-client/src';
import { jsxToHTML, Fragment, type JsxHTMLNode, SVG } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { BUTTON_LABEL, LOGO_COLOR } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

import { Checkout, Pay, Installment, SaferTag, DualTag } from './labels';
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
                return (multiple)
                    ? <DualTag locale={ locale } />
                    : <SaferTag locale={ locale } />;
            },

            allowPrimary: true
        },

        [ BUTTON_LABEL.CHECKOUT ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: ({ locale, logoColor }) => {
                return (
                    <Checkout locale={ locale } logoColor={ logoColor } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                return (multiple)
                    ? <DualTag locale={ locale } />
                    : <SaferTag locale={ locale } />;
            },

            allowPrimary: true
        },

        [ BUTTON_LABEL.PAY ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: ({ locale, logoColor }) => {
                return (
                    <Pay locale={ locale } logoColor={ logoColor } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                return (multiple)
                    ? <DualTag locale={ locale } />
                    : <SaferTag locale={ locale } />;
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
                return (
                    <Installment locale={ locale } logoColor={ logoColor } period={ period } />
                );
            },

            Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
                return (multiple)
                    ? <DualTag locale={ locale } />
                    : <SaferTag locale={ locale } />;
            },

            allowPrimary: true
        }
    }
};
