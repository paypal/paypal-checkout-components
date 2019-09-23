/* @flow */

import { getPayPalDomain } from '@paypal/sdk-client/src';

export function getCheckoutUrl() : string {
    return `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__CHECKOUT__ }`;
}

export function getButtonUrl() : string {
    return `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__BUTTONS__ }`;
}

export function getCardUrl() : string {
    return `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__CARD_FIELDS__ }`;
}

export function getMenuUrl() : string {
    return `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__MENU__ }`;
}

export const DEFAULT_POPUP_SIZE = {
    WIDTH:  450,
    HEIGHT: 535
};
