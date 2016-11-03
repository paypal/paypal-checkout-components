
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

        return using(res.data, payment => ({
            id: payment.id,
            intent: payment.intent,
            state:  payment.state,
            cart:   payment.cart,

            payer: using(payment.payer, payer => ({
                payment_method: payer.payment_method,
                status:         payer.status,

                payer_info: using(payer.payer_info, payerinfo => ({
                    email:        payerinfo.email,
                    salutation:   payerinfo.salutation,
                    first_name:   payerinfo.first_name,
                    middle_name:  payerinfo.first_name,
                    last_name:    payerinfo.last_name,
                    suffix:       payerinfo.suffix,
                    payer_id:     payerinfo.payer_id,
                    country_code: payerinfo.country_code,

                    shipping_address: using(payerinfo.shipping_address, address => ({
                        recipient_name: address.recipient_name,
                        line1:          address.line1,
                        line2:          address.line2,
                        city:           address.city,
                        state:          address.state,
                        postal_code:    address.postal_code,
                        country_code:   address.country_code,
                        phone:          address.phone
                    }))
                }))
            })),

            transactions: map(payment.transactions, transaction => ({

                amount: using(transaction.amount, amount => ({
                    total:    amount.total,
                    currency: amount.currency,

                    details: using(amount.details, details => ({
                        subtotal:          details.subtotal,
                        tax:               details.tax,
                        shipping:          details.shipping,
                        handling_fee:      details.handling_fee,
                        insurance:         details.insurance,
                        shipping_discount: details.shipping_discount
                    }))
                })),

                item_list: using(transaction.item_list, itemlist => ({
                    items: map(itemlist.items, item => ({
                        name:        item.name,
                        sku:         item.sku,
                        price:       item.price,
                        currency:    item.currency,
                        quantity:    item.quantity,
                        description: item.description,
                        tax:         item.tax
                    }))
                }))
            }))
        }));

    });
}

export function executePayment(token, payerID, restartFlow) {

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

        // processor decline use case, we re-render the flow.
        if (err && err.message === 'CC_PROCESSOR_DECLINED') {
            return restartFlow();
        }

        throw new Error('Payment could not be executed ');
    });
}
