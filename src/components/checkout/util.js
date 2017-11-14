/* @flow */

import { match } from '../../lib';
import { config, FUNDING, PAYMENT_TYPE } from '../../config';

export function determineParameterFromToken(token : string) : string {
    return (token && token.indexOf('BA-') === 0) ? 'ba_token' : 'token';
}

export function getPaymentType(payment : string) : string {
    if (payment.indexOf('BA-') === 0) {
        return PAYMENT_TYPE.BA_TOKEN;
    } else if (payment.indexOf('PAY-') === 0 || payment.indexOf('PAYID-') === 0) {
        return PAYMENT_TYPE.PAY_ID;
    } else if (payment.indexOf('EC-') === 0) {
        return PAYMENT_TYPE.EC_TOKEN;
    }

    return PAYMENT_TYPE.EC_TOKEN;
}

export function determineUrl(env : string, fundingSource : ?string, payment : string) : string {

    let paymentType = getPaymentType(payment);

    if (paymentType === PAYMENT_TYPE.BA_TOKEN) {
        return config.billingUrls[env];
    }

    if (fundingSource === FUNDING.CARD || fundingSource === FUNDING.ELV) {
        return config.guestUrls[env];
    }
    
    return config.checkoutUrls[env];
}

export function parseParamsFromUrl(url : string) : { [key : string] : ?string } {
    return {
        paymentToken: match(url, /token=((EC-)?[A-Z0-9]+)/),
        billingToken: match(url, /ba_token=((BA-)?[A-Z0-9]+)/),
        payerID:      match(url, /PayerID=([A-Z0-9]+)/),
        paymentID:    match(url, /paymentId=((PAY-)?[A-Z0-9]+)/)
    };
}
