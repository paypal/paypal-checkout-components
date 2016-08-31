
import { config } from './config';
import { request } from './lib';


export function createToken(clientID, paymentDetails) {

    paymentDetails = { ...paymentDetails };
    paymentDetails.intent = paymentDetails.intent || 'sale';
    paymentDetails.redirect_urls = paymentDetails.redirect_urls || {};
    paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || `${window.location.protocol}://${window.location.host}`;
    paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || `${window.location.protocol}://${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';

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
            throw new Error(`Authorization failed: access token not found in auth api response`);
        }

        return request({
            method: 'post',
            url: config.paymentApiUrl,
            headers: {
                'Authorization': `Bearer ${res.access_token}`
            },
            body: JSON.stringify(paymentDetails)
        });

    }).then(res => {

        if (res && res.links && res.links.length) {
            let links = res.links;

            for (var i = 0, len = links.length; i < len; i++) {
                if (links[i].method === 'REDIRECT') {
                    let match = links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
                    if (match) {
                        return match[1];
                    }
                    break;
                }
            }
        }

        throw new Error(`Payment token not found in payment api response`);
    });
}
