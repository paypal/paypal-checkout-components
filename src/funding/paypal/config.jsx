/* @flow */
/** @jsx node */

import { type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment } from 'jsx-pragmatic/src';
import { LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_LAYOUT, CLASS } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';
import { Text, Space } from '../../ui';

import { componentContent } from './content';

const DEFAULT_PAYPAL_LABEL = {
    ...DEFAULT_LABEL_CONFIG,

    colors: [
        BUTTON_COLOR.GOLD,
        BUTTON_COLOR.BLUE,
        BUTTON_COLOR.SILVER,
        BUTTON_COLOR.BLACK,
        BUTTON_COLOR.WHITE
    ],

    logoColors: {
        [BUTTON_COLOR.GOLD]:   LOGO_COLOR.BLUE,
        [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
        [BUTTON_COLOR.BLUE]:   LOGO_COLOR.WHITE,
        [BUTTON_COLOR.BLACK]:  LOGO_COLOR.WHITE,
        [BUTTON_COLOR.WHITE]:  LOGO_COLOR.BLUE
    },

    Tag: ({ multiple, locale: { lang } } : { locale : LocaleType, multiple : boolean }) => {
        const { DualTag, SaferTag } = componentContent[lang];

        return (multiple && DualTag)
            ? <DualTag optional />
            : <SaferTag  optional />;
    }
};

const PPPayPalLogo = ({ logoColor }) => <Fragment><PPLogo logoColor={ logoColor } /><Space /><PayPalLogo logoColor={ logoColor } /></Fragment>;

export function getPayPalConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,
        
        defaultLabel: BUTTON_LABEL.PAYPAL,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],
    
        labels: {
            [ BUTTON_LABEL.PAYPAL ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label:      ({ logoColor }) => {
                    return (
                        <Fragment>
                            <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />
                        </Fragment>
                    );
                },
                VaultLabel: ({ logoColor, label }) => {
                    return (
                        <Fragment>
                            <PPLogo logoColor={ logoColor } optional /> <Text className={ CLASS.VAULT_LABEL }>{ label }</Text>
                        </Fragment>
                    );
                }
            },
    
            [ BUTTON_LABEL.CHECKOUT ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: ({ locale: { lang }, logoColor }) => {
                    const { Checkout } = componentContent[lang];
                    return <Checkout logo={ <PPPayPalLogo logoColor={ logoColor } /> } />;
                }
            },
    
            [ BUTTON_LABEL.PAY ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: ({ locale: { lang }, logoColor }) => {
                    const { Pay } = componentContent[lang];
                    return <Pay logo={ <PayPalLogo logoColor={ logoColor } /> } />;
                }
            },

            [ BUTTON_LABEL.BUYNOW ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: ({ locale: { lang }, logoColor }) => {
                    const { BuyNow } = componentContent[lang];
                    return <BuyNow logo={ <PPPayPalLogo logoColor={ logoColor } /> } />;
                }
            },
    
            [ BUTTON_LABEL.INSTALLMENT ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: ({ locale: { lang }, logoColor, period }) => {
                    const { Installment } = componentContent[lang];

                    if (!Installment) {
                        throw new Error(`Could not find installment content for ${ lang }`);
                    }

                    return <Installment logo={ <PPPayPalLogo logoColor={ logoColor } /> } period={ period } />;
                }
            }
        }
    };
}
