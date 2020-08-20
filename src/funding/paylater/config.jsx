/* @flow */
/** @jsx node */

import { FUNDING } from '@paypal/sdk-constants/src';
import { node, Style, Fragment } from 'jsx-pragmatic/src';
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
            const paylaterEligibility = fundingEligibility.paylater;

            const products = (paylaterEligibility && paylaterEligibility.products && paylaterEligibility.products) || {};

            let text;

            if (products.payIn4 && products.payIn4.eligible) {
                text = <Text>Pay Later</Text>;
            } else if (products.flex && products.flex.eligible) {
                text = (
                    <Fragment>
                        <Text optional>PayPal </Text>
                        <Text>Flex</Text>
                    </Fragment>
                );
            } else {
                text = (
                    <Fragment>
                        <Text optional>PayPal </Text>
                        <Text>Flex</Text>
                    </Fragment>
                );
            }

            return (
                <Style css={ css } nonce={ nonce }>
                    <PPLogo optional logoColor={ logoColor } />
                    <Space />
                    { text }
                </Style>
            );
        },
    
        colors: [
            BUTTON_COLOR.WHITE
        ],

        secondaryColors: {
            [ DEFAULT ]:            BUTTON_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]: BUTTON_COLOR.BLACK
        },

        logoColors: {
            [ BUTTON_COLOR.WHITE ]: LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]: LOGO_COLOR.WHITE
        },
        
        labelText: `${ FUNDING.PAYPAL } ${ FUNDING.PAYLATER }`
    };
}
