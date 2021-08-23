/* @flow */
/** @jsx node */

import { PLATFORM } from '@paypal/sdk-constants/src';
import { ApplePayLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

import { Mark } from './template';

export function getApplePayConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        requires: () => {
            return {
                applepay: true
            };
        },

        platforms: [
            PLATFORM.DESKTOP,
            PLATFORM.MOBILE
        ],

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => ApplePayLogo({ logoColor, optional }),
        Mark: ({ ...props }) => Mark({ ...props }),

        colors: [
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLACK ]:  LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  LOGO_COLOR.BLACK
        },

        shippingChange: true
    };
}
