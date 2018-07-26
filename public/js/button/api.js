
import { $Api } from 'squid-core/dist/api';
import { $util } from 'squid-core/dist/util';
import { $meta } from 'squid-core/dist/config';

export let $authApi = new $Api({
    uri: '/api/auth'
});

export let $checkoutAppDataApi = new $Api({
    uri: '/api/checkout/:id/appData'
});

export let $checkoutCartApi = new $Api({
    uri: '/api/checkout/:id/cart'
});


export let $checkoutSessionApi = new $Api({
    uri: '/api/checkout/:id/session'
});

export let $paymentApi = new $Api({
    uri: '/api/payment/:id'
});

export let $orderApi = new $Api({
    uri: '/api/order/:id'
});

export let $localeApi = new $Api({
    uri: '/api/locale'
});

export let $buttonFundingApi = new $Api({
    uri: '/api/button/funding'
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

export function getButtonFunding() {
    return getLocale().then(locale => {
        return $buttonFundingApi.retrieve({
            params: {
                country: locale.country
            }
        }).then(res => res.data);
    });
}

export function getPayment(paymentID) {
    return $paymentApi.retrieve({
        model: {
            id: paymentID
        }
    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Get payment failed');
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

export function getOrder(orderID) {
    return $orderApi.retrieve({
        model: {
            id: orderID
        }
    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Get order failed');
        }

        return res.data;
    });
}

export function captureOrder(orderID) {
    return $orderApi.action('capture', {

        model: {
            id: orderID
        }

    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Capture order failed');
        }

        return res.data;
    });
}

export function authorizeOrder(orderID) {
    return $orderApi.action('authorize', {

        model: {
            id: orderID
        }

    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Authorize order failed');
        }

        return res.data;
    });
}

export function mapToToken(id) {
    return $paymentApi.action('ectoken', {

        model: {
            id
        }

    }).then(res => {

        if (res.ack !== 'success') {
            throw new Error('Map payment failed');
        }

        return res.data.token;
    });
}

export function getCheckoutAppData(token) {
    return $checkoutAppDataApi.retrieve({
        model: {
            id: token
        }
    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Get payment failed');
        }

        return res.data;
    });
}

export function getCheckoutCart(token) {
    return $checkoutCartApi.retrieve({
        model: {
            id: token
        }
    }).then(res => {
        if (res.ack !== 'success') {
            throw new Error('Get payment failed');
        }

        return res.data;
    });
}
