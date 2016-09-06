
import { config } from './config';
import { request } from './lib';


export function createAccessToken(clientID) {

    let basicAuth = window.btoa(`${clientID}:`);

    return request({

        method: 'post',
        url: config.authApiUrl,
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



export function createCheckoutToken(clientID, paymentDetails) {

    paymentDetails = { ...paymentDetails };
    paymentDetails.intent = paymentDetails.intent || 'sale';
    paymentDetails.redirect_urls = paymentDetails.redirect_urls || {};
    paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';

    return createAccessToken(clientID).then(accessToken => {

        return request({
            method: 'post',
            url: config.paymentApiUrl,
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

export function createBillingToken(clientID, paymentDetails) {

    paymentDetails = { ...paymentDetails };
    paymentDetails.plan = paymentDetails.plan || {};
    paymentDetails.plan.merchant_preferences = paymentDetails.plan.merchant_preferences || {};
    paymentDetails.plan.merchant_preferences.return_url = paymentDetails.plan.merchant_preferences.return_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.plan.merchant_preferences.cancel_url = paymentDetails.plan.merchant_preferences.cancel_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';


    return createAccessToken(clientID).then(accessToken => {

        return request({
            method: 'post',
            url: config.billingApiUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(paymentDetails)
        });

    }).then(res => {

        if (res && res.token_id) {
            return res.token_id;
        }

        throw new Error(`Billing Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
    });
}
