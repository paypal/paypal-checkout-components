/* @flow */

import { getPayPalDomain } from '@paypal/sdk-client/src';
import { ENV } from '@paypal/sdk-constants/src';

export const SESSION_LIFETIME = 5 * 60 * 1000;

const URI = __TEST__

    ? {
        CHECKOUT: `/base/test/integration/windows/checkout/index.htm?checkouturl=true`,
        BUTTON:   `/base/test/integration/windows/button/index.htm`,
        CARD:     `/base/test/integration/windows/card-fields/index.htm`
    }

    : {
        CHECKOUT: (__ENV__ === ENV.LOCAL) ? `/webapps/hermes?ul=0` : `/checkoutnow`,
        BUTTON:   `/smart/buttons`,
        CARD:     `/smart/card-fields`
    };

export function getCheckoutUrl() : string {
    return `${ getPayPalDomain() }${ URI.CHECKOUT }`;
}

export function getButtonUrl() : string {
    return `${ getPayPalDomain() }${ URI.BUTTON }`;
}

export function getCardUrl() : string {
    return `${ getPayPalDomain() }${ URI.CARD }`;
}

export const DEFAULT_POPUP_SIZE = {
    WIDTH:  450,
    HEIGHT: 535
};
