/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY } from '@paypal/sdk-constants/src';

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
    vetted? : boolean
|};

export function getSmartWallet({ clientID, merchantID, currency, amount, clientMetadataID, userIDToken, vetted = true } : GetSmartWalletOptions) : ZalgoPromise<Wallet> {
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
            ) {
                smartWallet(
                    clientId: $clientID
                    merchantId: $merchantID
                    currency: $currency
                    amount: $amount
                    userIdToken: $userIDToken
                    vetted: $vetted
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
        variables: { clientID, merchantID, currency, amount, userIDToken, vetted },
        headers:   {
            [HEADERS.CLIENT_METADATA_ID]: clientMetadataID
        }
    }).then(({ smartWallet }) => {
        return smartWallet;
    });
}
