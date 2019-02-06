/* @flow */
/** @jsx node */

import { type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment, type ElementNode } from 'jsx-pragmatic/src';
import { PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { getCheckoutUrl } from '../../config';
import { BUTTON_LABEL, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

import { Checkout, Pay, Installment, SaferTag, DualTag } from './labels';

export function getPayPalConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getCheckoutUrl,
    
        defaultLabel: BUTTON_LABEL.PAYPAL,
    
        labels: {
            [ BUTTON_LABEL.PAYPAL ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                defaultColor: BUTTON_COLOR.GOLD,
    
                Label({ logoColor } : { logoColor : $Values<typeof LOGO_COLOR> }) : ElementNode {
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
    
                defaultColor: BUTTON_COLOR.GOLD,
    
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
    
                defaultColor: BUTTON_COLOR.GOLD,
    
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
    
                defaultColor:   BUTTON_COLOR.GOLD,
    
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
}
