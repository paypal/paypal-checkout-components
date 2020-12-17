/* @flow */

import { config } from '../config';
import { FUNDING, PAYMENT_TYPE } from '../constants';

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

    const paymentType = getPaymentType(payment);

    if (paymentType === PAYMENT_TYPE.BA_TOKEN) {
        return config.billingUrls[env];
    }

    if (fundingSource === FUNDING.IDEAL || fundingSource === FUNDING.BANCONTACT || fundingSource === FUNDING.GIROPAY ||
        fundingSource === FUNDING.SOFORT || fundingSource === FUNDING.EPS || fundingSource === FUNDING.MYBANK ||
        fundingSource === FUNDING.P24 || fundingSource === FUNDING.BLIK || fundingSource === FUNDING.MAXIMA ||
        fundingSource === FUNDING.BOLETO || fundingSource === FUNDING.OXXO || fundingSource === FUNDING.MERCADOPAGO) {
        return config.altpayUrls[env];
    }

    return config.checkoutUrls[env];
}
