/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';

export type Braintree = {
    client : {
        create : Function
    },
    paypalCheckout : {
        create : Function
    }
};

export type BraintreePayPalClient = {
    createPayment : Function,
    tokenizePayment : Function
};

export function awaitBraintreeClient(braintree : Braintree, authorization : string) : SyncPromise<BraintreePayPalClient> {
    return braintree.client.create({ authorization }).then(client => {
        return braintree.paypalCheckout.create({ client });
    });
}
