
import { config } from './config';
import { request, isPayPalDomain } from './lib';
import { messageBridge } from './bridge';


export function createAccessToken(env, clientID) {

    if (!config.cors && !isPayPalDomain()) {
        return messageBridge('createAccessToken', { clientID });
    }

    let basicAuth = window.btoa(`${clientID}:`);

    return request({

        method: 'post',
        url: config.authApiUrls[env],
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type':  `application/x-www-form-urlencoded; charset=utf-8`
        },
        body: `grant_type=client_credentials`

    }).then(res => {

        if (!res || !res.access_token) {
            throw new Error(`Auth Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
        }

        return res.access_token;
    });
}



export function createCheckoutToken(env, clientID, paymentDetails) {

    if (!config.cors && !isPayPalDomain()) {
        return messageBridge('createCheckoutToken', { clientID, paymentDetails });
    }

    paymentDetails = { ...paymentDetails };
    paymentDetails.intent = paymentDetails.intent || 'sale';
    paymentDetails.redirect_urls = paymentDetails.redirect_urls || {};
    paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';

    return createAccessToken(env, clientID).then(accessToken => {

        return request({
            method: 'post',
            url: config.paymentApiUrls[env],
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(paymentDetails)
        });

    }).then(res => {

        if (res && res.links && res.links.length) {
            let links = res.links;

            for (let i = 0, len = links.length; i < len; i++) {
                if (links[i].method === 'REDIRECT') {
                    let match = links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
                    if (match) {
                        return match[1];
                    }
                    break;
                }
            }
        }

        throw new Error(`Payment Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
    });
}

export function createBillingToken(env, clientID, billingDetails) {

    if (!config.cors && !isPayPalDomain()) {
        return messageBridge('createBillingToken', { clientID, billingDetails });
    }

    billingDetails = { ...billingDetails };
    billingDetails.plan = billingDetails.plan || {};
    billingDetails.plan.merchant_preferences = billingDetails.plan.merchant_preferences || {};
    billingDetails.plan.merchant_preferences.return_url = billingDetails.plan.merchant_preferences.return_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.plan.merchant_preferences.cancel_url = billingDetails.plan.merchant_preferences.cancel_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.payer = billingDetails.payer || {};
    billingDetails.payer.payment_method = billingDetails.payer.payment_method || 'paypal';


    return createAccessToken(env, clientID).then(accessToken => {

        return request({
            method: 'post',
            url: config.billingApiUrls[env],
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(billingDetails)
        });

    }).then(res => {

        if (res && res.token_id) {
            return res.token_id;
        }

        throw new Error(`Billing Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
    });
}
