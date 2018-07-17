/* @flow */

import { config } from '../config';
import { FUNDING } from '../constants';

export function determineUrl(env : string, fundingSource : ?string) : string {

    if (fundingSource === FUNDING.CARD || fundingSource === FUNDING.ELV) {
        return config.urls.guest;
    }

    if (fundingSource === FUNDING.IDEAL || fundingSource === FUNDING.BANCONTACT || fundingSource === FUNDING.GIROPAY ||
        fundingSource === FUNDING.SOFORT || fundingSource === FUNDING.EPS || fundingSource === FUNDING.MYBANK) {
        return config.urls.altpay;
    }

    return config.urls.checkout;
}
