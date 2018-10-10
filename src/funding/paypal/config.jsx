/* @flow */
/* @jsx jsxToHTML */

import { COUNTRY, type LocaleType } from 'paypal-sdk-constants/src';
import { jsxToHTML, Fragment, type JsxHTMLNode, SVG } from 'belter/src'; // eslint-disable-line no-unused-vars

import { getCheckoutUrl } from '../../config';
import { BUTTON_LABEL, LOGO_COLOR, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

import { Checkout, Pay, Installment, SaferTag, DualTag } from './labels';
import { PPLogo, PayPalLogo } from './logo';

export const PAYPAL_CONFIG : FundingSourceConfig = {
    ...DEFAULT_FUNDING_CONFIG,

    url: getCheckoutUrl,

    defaultLabel: BUTTON_LABEL.PAYPAL,

    labels: {
        [ BUTTON_LABEL.PAYPAL ]: {
            ...DEFAULT_LABEL_CONFIG,

            defaultColor: BUTTON_COLOR.GOLD,

            Label({ logoColor, nonce } : { logoColor : $Values<typeof LOGO_COLOR>, nonce : string }) : JsxHTMLNode {
                return (
                    <Fragment>
                        <PPLogo nonce={ nonce } logoColor={ logoColor } /> <PayPalLogo nonce={ nonce } logoColor={ logoColor } />
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

            defaultColor: BUTTON_COLOR.GOLD,

            Label: ({ locale, logoColor, nonce }) => {
                return (
                    <Checkout nonce={ nonce } locale={ locale } logoColor={ logoColor } />
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

            defaultColor: BUTTON_COLOR.GOLD,

            Label: ({ locale, logoColor, nonce }) => {
                return (
                    <Pay nonce={ nonce } locale={ locale } logoColor={ logoColor } />
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

            defaultColor: BUTTON_COLOR.GOLD,

            allowedCountries: [ COUNTRY.BR, COUNTRY.MX ],

            allowedPeriods: {
                [ COUNTRY.BR ]: [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
                [ COUNTRY.MX ]: [ 3, 6, 9, 12 ]
            },

            Label: ({ locale, logoColor, period, nonce }) => {
                return (
                    <Installment nonce={ nonce } locale={ locale } logoColor={ logoColor } period={ period } />
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
