/* @flow */
/** @jsx node */

import { FUNDING } from '@paypal/sdk-constants/src';
import { node, Style } from 'jsx-pragmatic/src';
import { PPLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Text, Space } from '../../ui/text';

import css from './style.scoped.scss';

export function getPaylaterConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Label: ({ logo }) => logo,

        Logo: ({ logoColor, nonce, fundingEligibility }) => {
            const { paylater } = fundingEligibility;

            let label = <Text>Pay Later</Text>;

            if (paylater?.products?.paylater?.eligible && paylater?.products?.paylater?.variant === 'DE') {
                label = <Text>Später Bezahlen</Text>;
            }

            if (paylater?.products?.payIn4?.eligible) {
                label = <Text>Pay in 4</Text>;
            }

            if (paylater?.products?.payIn4?.eligible && paylater?.products?.payIn4?.variant === 'FR') {
                label = <Text>4X PayPal</Text>;
            }

            return (
                <Style css={ css } nonce={ nonce }>
                    <PPLogo logoColor={ logoColor } />
                    <Space />
                    { label }
                </Style>
            );
        },
    
        colors: [
            BUTTON_COLOR.WHITE,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.GOLD,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER
        ],

        secondaryColors: {
            [ DEFAULT ]:             BUTTON_COLOR.WHITE,
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.GOLD,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_COLOR.WHITE
        },

        logoColors: {
            [BUTTON_COLOR.GOLD]:   LOGO_COLOR.BLUE,
            [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
            [BUTTON_COLOR.BLUE]:   LOGO_COLOR.WHITE,
            [BUTTON_COLOR.BLACK]:  LOGO_COLOR.WHITE,
            [BUTTON_COLOR.WHITE]:  LOGO_COLOR.BLUE
        },
        
        labelText: `${ FUNDING.PAYPAL } ${ FUNDING.PAYLATER }`
    };
}
