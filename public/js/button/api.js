
import { $Api } from 'squid-core/dist/api';
import { $util } from 'squid-core/dist/util';
import { $meta } from 'squid-core/dist/config';

export let $authApi = new $Api({
    uri: '/api/auth'
});

export let $checkoutSessionApi = new $Api({
    uri: '/api/checkout/:id/session'
});

export let $paymentApi = new $Api({
    uri: '/api/payment/:id'
});

export let $localeApi = new $Api({
    uri: '/api/locale'
});

export function getLocale() {
    return $localeApi.retrieve({
        params: {
            ipCountry: $meta.ipcountry,
            localeTestUrlParam: $util.param('locale.test'),
            countryParam: $util.param('country.x'),
            localeParam: $util.param('locale.x')
        }
    }).then(res => res.data);
}

export function getAuth() {
    return $authApi.retrieve().then(res => res.data);
}

export function getPayment(paymentID) {
    return $paymentApi.retrieve({
        model: {
            id: paymentID
        }
    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Execute payment failed');
        }
        
        return res.data;
    });
}

export function executePayment(paymentID, payerID) {
    return $paymentApi.action('execute', {

        model: {
            id: paymentID
        },

        data: {
            payer_id: payerID
        }

    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Execute payment failed');
        }

        return res.data;
    });
}
