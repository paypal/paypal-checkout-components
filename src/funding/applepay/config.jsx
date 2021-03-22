/* @flow */
/** @jsx node */

import { PLATFORM } from '@paypal/sdk-constants/src';
import { getUserAgent, isIOS, isSafari } from 'belter';
import { ApplePayLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getApplePayConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        requiresPopupSupport:             false,
        requiresSupportedNativeBrowser:   false,
        shippingChange:                   true,

        platforms: [
            PLATFORM.DESKTOP,
            PLATFORM.MOBILE
        ],

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => ApplePayLogo({ logoColor, optional }),

        colors: [
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLACK ]:  LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  LOGO_COLOR.BLACK
        },

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,

            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.BLUE
        },

        eligible: ({ fundingEligibility }) => {
            const eligibility = fundingEligibility.card;
            const branded = Boolean(eligibility && eligibility.branded);

            const ua = getUserAgent();
            const isIosSafari = isIOS() && isSafari();
            const isMacOS = ua ? Boolean(ua.match(/Macintosh.*AppleWebKit/i)) : false;
            const isMacSafari = isMacOS && isSafari();
            const isValidMobileVersion = ua ? Boolean(ua.match(/.*iPhone.*1[0-9]_[0-9]/i)) : false; // iOS 10+
            const isValidMacVersion = ua ? Boolean(ua.match(/.*Macintosh.*OS.*?1[0-9]_/i)) : false; // macOS 10.12+

            if (!branded && ((isIosSafari && isValidMobileVersion) || (isMacSafari && isValidMacVersion)) && window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
                return true;
            }

            return false;
        }
    };
}
