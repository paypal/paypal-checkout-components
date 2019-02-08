/* @flow */


import { getPaymentOptions, addPaymentOptions } from '../../../src/api';

describe('paypal hacks api', () => {

    it('should call the supplement, add payment options API, and store shipping options', () => {
        addPaymentOptions('PAY-123', {
            transactions: [
                {
                    item_list: {
                        shipping_options: [
                            {
                                id:     '1',
                                label:  'Foo',
                                type:   'SHIPPING',
                                amount: {
                                    currency: 'USD',
                                    value:    '5.00'
                                }
                            }
                        ]
                    }
                }
            ]
        });

        const paymentOptions = getPaymentOptions('PAY-123') || {};
        const transaction = (paymentOptions.transactions || [])[0];

        const hasShippingOptions = transaction && transaction.item_list && transaction.item_list.shipping_options;

        if (!hasShippingOptions) {
            throw new Error(`Expected options to be stored for PAY-123`);
        }
        
        const option = transaction.item_list.shipping_options[0];
        if (option.id !== '1'
            || option.label !== 'Foo'
            || option.type !== 'SHIPPING'
            || option.amount.value !== '5.00') {
            throw new Error('Expected all of the shipping option data to be passed through');
        }
    });

    it('should call the supplement, add payment options API, and store legacy shipping options as new', () => {
        addPaymentOptions('PAY-123', {
            transactions: [
                {
                    item_list: {
                        shipping_options: [
                            {
                                id:     '1',
                                label:  'SHIP_TO_HOME',
                                type:   'SHIP_TO_HOME'
                            }
                        ]
                    }
                }
            ]
        });

        const paymentOptions = getPaymentOptions('PAY-123') || {};
        const transaction = (paymentOptions.transactions || [])[0];

        const hasShippingOptions = transaction && transaction.item_list && transaction.item_list.shipping_options;

        if (!hasShippingOptions) {
            throw new Error(`Expected options to be stored for PAY-123`);
        }
        
        const option = transaction.item_list.shipping_options[0];
        if (option.id !== '1'
            || option.label !== 'Ship to your address'
            || option.type !== 'SHIPPING'
            || option.amount.value !== '0.00') {
            throw new Error('Expected all of the legacy shipping option data to be passed through as new');
        }
    });
});
