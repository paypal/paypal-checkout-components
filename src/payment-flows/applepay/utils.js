/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';

import type { ApplePayError, ApplePayPaymentContact, ApplePayShippingMethod, ShippingAddress, ShippingMethod, Shipping_Address } from '../types';

export function isZeroAmount(value : string) : boolean {
    return parseFloat(value).toFixed(2) === '0.00';
}

export function getApplePayShippingMethods(shippingMethods : $ReadOnlyArray<ShippingMethod> = []) : $ReadOnlyArray<ApplePayShippingMethod> {
    return [ ...shippingMethods ].sort(method => {
        return method.selected ? -1 : 0;
    }).map((method) => {
        return {
            amount:     method?.amount?.currencyValue || '0.00',
            detail:     method.type,
            identifier: method?.id || '',
            label:      method.label
        };
    });
}

export function isJSON(json : Object) : boolean {
    try {
        JSON.parse(JSON.stringify(json));
        return true;
    } catch {
        return false;
    }
}

type ShippingContactValidation = {|
    errors : $ReadOnlyArray<ApplePayError>,
    shipping_address : Shipping_Address
|};

export function validateShippingContact(contact : ?ApplePayPaymentContact) : ShippingContactValidation {
    const errors : Array<ApplePayError> = [];

    if (!contact?.locality) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'locality',
            message:        'City is invalid'
        });
    }

    const country_code : ?$Values<typeof COUNTRY> = contact?.countryCode ? COUNTRY[contact.countryCode.toUpperCase()] : null;
    if (!country_code) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'countryCode',
            message:        'Country code is invalid'
        });
    }

    if (country_code === COUNTRY.US && !contact?.administrativeArea) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'administrativeArea',
            message:        'State is invalid'
        });
    }

    if (!contact?.postalCode) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalCode',
            message:        'Postal code is invalid'
        });
    }

    const shipping_address = {
        city:         contact?.locality,
        state:        contact?.administrativeArea,
        country_code,
        postal_code:  contact?.postalCode
    };

    return { errors, shipping_address };
}

export const INVALID_SESSION_PAYLOAD = {
    displayName: '',
    domainName: '',
    epochTimestamp: 1,
    expiresAt: 1,
    merchantIdentifier: '',
    merchantSessionIdentifier: '',
    nonce: '',
    operationalAnalyticsIdentifier: '',
    retries: 0,
    signature: ''
}

export function getShippingContactFromAddress(shippingAddress : ?ShippingAddress) : ApplePayPaymentContact {
    if (!shippingAddress) {
        return {
            givenName:          '',
            familyName:         '',
            addressLines:       [],
            locality:           '',
            administrativeArea: '',
            postalCode:         '',
            country:            '',
            countryCode:        ''
        };
    }

    const { firstName, lastName, line1, line2, city, state, postalCode, country } = shippingAddress;

    return {
        givenName:    firstName,
        familyName:   lastName,
        addressLines: [
            line1,
            line2
        ],
        locality:           city,
        administrativeArea: state,
        postalCode,
        country,
        countryCode:        country
    };
}