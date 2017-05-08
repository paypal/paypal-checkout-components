
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

function mapPayment(data) {

    return using(data, payment => ({
        id: payment.id,

        intent: payment.intent,
        state:  payment.state,
        cart:   payment.cart,

        create_time: payment.create_time,

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
            custom: transaction.custom,

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
            })),

            related_resources: map(transaction.related_resources, resource => ({

                sale: using(resource.sale, sale => ({
                    id:                     sale.id,
                    state:                  sale.state,
                    payment_mode:           sale.payment_mode,
                    protection_eligibility: sale.protection_eligibility,
                    parent_payment:         sale.parent_payment,

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

                    transaction_fee: using(sale.transaction_fee, fee => ({
                        value:    fee.value,
                        currency: fee.currency
                    }))
                }))
            }))
        }))
    }));

}

export function getPayment(paymentID) {

    return $paymentApi.retrieve({
        model: {
            id: paymentID
        }
    }).then(res => {
        return mapPayment(res.data);
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

        return mapPayment(res.data);
    });
}
