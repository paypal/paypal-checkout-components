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
    cspNonce : ?string,
    paymentMethodNonce? : ?string,
    branded? : ?boolean
|};

const DEFAULT_AMOUNT = '0.00';

type GetSmartWallet = (GetSmartWalletOptions) => ZalgoPromise<Wallet>;

export const getSmartWallet : GetSmartWallet = memoize(({ env, clientID, merchantID, currency, amount = DEFAULT_AMOUNT, clientMetadataID, userIDToken, vetted = true, cspNonce, paymentMethodNonce, branded }) => {
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
                $paymentMethodNonce: String
                $branded: Boolean
            ) {
                smartWallet(
                    clientId: $clientID
                    merchantId: $merchantID
                    currency: $currency
                    amount: $amount
                    userIdToken: $userIDToken
                    vetted: $vetted
                    paymentMethodNonce: $paymentMethodNonce
                    branded: $branded
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
            variables: { clientID, merchantID, currency, amount, userIDToken, vetted, paymentMethodNonce, branded },
            headers:   {
                [HEADERS.CLIENT_METADATA_ID]: clientMetadataID
            }
        }).then(({ smartWallet }) => {
            return smartWallet;
        });
    });
});
