/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { CURRENCY } from '@paypal/sdk-constants/src';
import { memoize } from '@krakenjs/belter/src';

import type { Wallet } from '../types';
import { HEADERS } from '../constants';

import { callGraphQL } from './api';

type GetSmartWalletOptions = {|
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    amount : ?string,
    clientMetadataID : string,
    userIDToken : string,
    vetted? : boolean,
    paymentMethodToken? : ?string,
    branded? : ?boolean,
    allowBillingPayments? : ?boolean
|};

const DEFAULT_AMOUNT = '0.00';

type GetSmartWallet = (GetSmartWalletOptions) => ZalgoPromise<Wallet>;

export const getSmartWallet : GetSmartWallet = memoize(({ clientID, merchantID, currency, amount = DEFAULT_AMOUNT, clientMetadataID, userIDToken, vetted = true, paymentMethodToken, branded, allowBillingPayments = true }) => {
    return callGraphQL({
        name:  'GetSmartWallet',
        query: `
            query GetSmartWallet(
                $clientID: String!
                $merchantID: [String!]
                $currency: String
                $amount: String
                $userIDToken: String
                $vetted: Boolean
                $paymentMethodToken: String
                $branded: Boolean,
                $allowBillingPayments: Boolean
            ) {
                smartWallet(
                    clientId: $clientID
                    merchantId: $merchantID
                    currency: $currency
                    amount: $amount
                    userIdToken: $userIDToken
                    vetted: $vetted
                    paymentMethodNonce: $paymentMethodToken
                    branded: $branded,
                    allowBillingPayments: $allowBillingPayments
                ) {
                    paypal {
                        instruments {
                            type
                            label
                            logoUrl
                            instrumentID
                            tokenID
                            vendor
                            oneClick
                            accessToken
                        }
                    }
                    credit {
                        instruments {
                            type
                            label
                            logoUrl
                            instrumentID
                            tokenID
                            vendor
                            oneClick
                            accessToken
                        }
                    }
                    card {
                        instruments {
                            type
                            label
                            logoUrl
                            instrumentID
                            tokenID
                            vendor
                            oneClick
                        }
                    }
                }
            }
        `,
        variables: { clientID, merchantID, currency, amount, userIDToken, vetted, paymentMethodToken, branded, allowBillingPayments },
        headers:   {
            [HEADERS.CLIENT_METADATA_ID]: clientMetadataID
        }
    }).then(({ smartWallet }) => {
        return smartWallet;
    });
});
