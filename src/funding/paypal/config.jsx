/* @flow */
/** @jsx node */

import { type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment } from 'jsx-pragmatic/src';
import { LOGO_COLOR, PPLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_LAYOUT, CLASS } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig, Text } from '../common';

import { PayPal, Checkout, BuyNow, Pay, Installment, SaferTag, DualTag } from './labels';

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

    Tag: ({ multiple, locale } : { locale : LocaleType, multiple : boolean }) => {
        return (multiple)
            ? <DualTag locale={ locale } optional />
            : <SaferTag locale={ locale } optional />;
    }
};

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
                Label:      PayPal,
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
                Label: Checkout
            },
    
            [ BUTTON_LABEL.PAY ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: Pay
            },

            [ BUTTON_LABEL.BUYNOW ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: BuyNow
            },
    
            [ BUTTON_LABEL.INSTALLMENT ]: {
                ...DEFAULT_PAYPAL_LABEL,
                Label: Installment
            }
        }
    };
}
