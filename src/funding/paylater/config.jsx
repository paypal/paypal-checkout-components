/* @flow */
/** @jsx node */

import { FUNDING } from '@paypal/sdk-constants/src';
import { node, Style } from 'jsx-pragmatic/src';
import { PPLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Text, Space } from '../../ui/text';
import { WalletLabel } from '../paypal/template';

import css from './style.scoped.scss';

export function getPaylaterConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, nonce }) => {
            return (
                <Style css={ css } nonce={ nonce }>
                    <PPLogo logoColor={ logoColor } />
                    <Space />
                    <Text className="message-small" optional>PayPal </Text>
                    <Text className="message-small">Flex</Text>
                    <Text className="message-large">Pay Later with Flex</Text>
                </Style>
            );
        },

        WalletLabel,
    
        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,
            [ DEFAULT ]: BUTTON_COLOR.DARKBLUE
        },

        logoColors: {
            [ DEFAULT ]:            LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]: LOGO_COLOR.BLUE
        },
        
        labelText: `${ FUNDING.PAYPAL } ${ FUNDING.PAYLATER }`
    };
}
