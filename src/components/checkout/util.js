/* @flow */

import { info } from 'beaver-logger/client';

import { match } from '../../lib';
import { config } from '../../config';

export function determineParameterFromToken(token : string) : string {
    return (token && token.indexOf('BA-') === 0) ? 'ba_token' : 'token';
}

export function determineUrl(env : string, fundingSource : ?string, token : string) : string {

    if (token.indexOf('BA-') === 0) {
        info(`url_billing`);
        return config.billingUrls[env];
    } else if (token.indexOf('PAY-') === 0 || token.indexOf('PAYID-') === 0) {
        info(`url_payment`);
    } else if (token.indexOf('EC-') === 0) {
        info(`url_checkout`);
    } else {
        info(`url_default`);
    }

    /*

    if (fundingSource === FUNDING.CARD) {
        return config.guestUrls[env];
    }

    if (fundingSource === FUNDING.ELV) {
        return config.guestUrls[env];
    }

    */

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
