
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

function using(data, method, def) {
    if (data) {
        return method(data);
    }
    return def;
}

function map(data, method, def) {
    if (data) {
        return data.map(method);
    }
    return def;
}

export function getPayment(paymentID) {

    return $paymentApi.retrieve({
        model: {
            id: paymentID
        }
    }).then(res => {
        return res.data;
    });
}

export function executePayment(paymentID, payerID) {

    // TODO: Execute payment for WPS (inventory, etc.)

    return $paymentApi.action('execute', {

        model: {
            id: paymentID
        },

        data: {
            payer_id: payerID
        }

    }).then(res => {

        return res.data;
    });
}
