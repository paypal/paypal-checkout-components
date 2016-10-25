
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
    }).then(res => res.data);
}

export function executePayment(token, payerID) {

    // TODO: Execute payment for WPS (inventory, etc.)

    return $checkoutSessionApi.action('createpayment', {

        model: {
            id: token
        },

        data: {
            payer_id: payerID,
            intent: 'sale'
        }

    }).then(result => {
        return;
    }).catch(err => { // eslint-disable-line
        throw new Error('Payment could not be executed');
    });
}
