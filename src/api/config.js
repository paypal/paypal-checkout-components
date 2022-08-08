/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { callGraphQL } from './api';

export type ApplepayConfigResponse = {|
    applepayConfig: {|
        merchantCountry: string,
        supportedNetworks: $ReadOnlyArray<string>
    |}
|};

type GetApplepayConfigPayload = {|
    buyerCountry: string, 
    clientId: string, 
    merchantId: $ReadOnlyArray<string>
|}

export type GetApplepayConfig = (payload: GetApplepayConfigPayload) => ZalgoPromise<ApplepayConfigResponse>;

export const getApplepayConfig : GetApplepayConfig = ({ buyerCountry, clientId, merchantId }: GetApplepayConfigPayload) => {

    return callGraphQL({
        name:  'GetApplepayConfig',
        query: `
        query GetApplepayConfig(
            $buyerCountry: CountryCodes!
            $clientId: String!
            $merchantId: [String]!
          ) {
            applepayConfig(
              buyerCountry: $buyerCountry
              clientId: $clientId
              merchantId: $merchantId
            ) {
              merchantCountry,
              supportedNetworks
            }
          }
        `,
        variables: { buyerCountry, clientId, merchantId }
    });
    
};
