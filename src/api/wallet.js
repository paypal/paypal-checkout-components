/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY, ENV } from '@paypal/sdk-constants/src';
import { memoize, noop } from 'belter/src';

import type { Wallet } from '../types';
import { HEADERS } from '../constants';

import { callGraphQL } from './api';
import { loadFraudnet } from './fraudnet';

type GetSmartWalletOptions = {|
    env : $Values<typeof ENV>,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    amount : ?string,
    clientMetadataID : string,
    userIDToken : string,
    vetted? : boolean,
    cspNonce : ?string
|};

const DEFAULT_AMOUNT = '0.00';

export const getSmartWallet = memoize(({ env, clientID, merchantID, currency, amount = DEFAULT_AMOUNT, clientMetadataID, userIDToken, vetted = true, cspNonce } : GetSmartWalletOptions) : ZalgoPromise<Wallet> => {
    return loadFraudnet({ env, clientMetadataID, cspNonce }).catch(noop).then(() => {
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
    });
});
