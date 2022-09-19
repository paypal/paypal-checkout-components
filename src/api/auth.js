/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { inlineMemoize, base64encode, request, noop } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { ConnectOptions } from '../types';
import { AUTH_API_URL } from '../config';
import { getLogger } from '../lib';
import { HEADERS } from '../constants';

import { callGraphQL } from './api';

type GenerateAccessTokenOptions = {|
    targetSubject? : string
|};

export function createAccessToken(clientID : string, { targetSubject } : GenerateAccessTokenOptions = {}) : ZalgoPromise<string> {
    return inlineMemoize(createAccessToken, () => {

        getLogger().info(`rest_api_create_access_token`);

        const basicAuth = base64encode(`${ clientID || '' }:`);
        const data : Object = {
            grant_type: `client_credentials`
        };

        if (targetSubject) {
            data.target_subject = targetSubject;
        }

        return request({
            method:  `post`,
            url:     AUTH_API_URL,
            headers: {
                Authorization: `Basic ${ basicAuth }`
            },
            data
        }).then(({ body }) => {
            if (body && body.error === 'invalid_client') {
                const eventName = 'v1_oauth2_token_create';

                getLogger().warn(`rest_api_${ eventName }_error`, { err: 'invalid client id' });
                throw new Error(`Auth Api invalid client id: ${ clientID || '' }:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            if (!body || !body.access_token) {
                const eventName = 'v1_oauth2_token_create';

                getLogger().warn(`rest_api_${ eventName }_error`);
                throw new Error(`Auth Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            return body.access_token;
        });
    }, [ clientID, targetSubject ]);
}

export function getFirebaseSessionToken(sessionUID : string) : ZalgoPromise<string> {
    return callGraphQL({
        name:  'GetFireBaseSessionToken',
        query: `
            query GetFireBaseSessionToken($sessionUID: String!) {
                firebase {
                    auth(sessionUID: $sessionUID) {
                        sessionToken
                    }
                }
            }
        `,
        variables: { sessionUID }
    }).then(res => {
        return res.firebase.auth.sessionToken;
    });
}

let lsatUpgradeCalled : boolean = false;
let lsatUpgradeError : ?mixed;

export const onLsatUpgradeCalled = () => {
    lsatUpgradeCalled = false;
};

export const getLsatUpgradeCalled = () : boolean => {
    return lsatUpgradeCalled;
};

export const onLsatUpgradeError = (err : mixed) => {
    lsatUpgradeError = err;
};

export const getLsatUpgradeError = () : ?mixed => {
    return lsatUpgradeError;
};

export const clearLsatState = () => {
    lsatUpgradeCalled = false;
    lsatUpgradeError = null;
};

export function upgradeFacilitatorAccessToken(facilitatorAccessToken : string, { buyerAccessToken, orderID } : {| buyerAccessToken : string, orderID : string |}) : ZalgoPromise<void> {
    onLsatUpgradeCalled();

    return callGraphQL({
        name:    'UpgradeFacilitatorAccessToken',
        headers: {
            [ HEADERS.ACCESS_TOKEN ]:   buyerAccessToken,
            [ HEADERS.CLIENT_CONTEXT ]: orderID
        },
        query: `
            mutation UpgradeFacilitatorAccessToken(
                $orderID: String!
                $buyerAccessToken: String!
                $facilitatorAccessToken: String!
            ) {
                upgradeLowScopeAccessToken(
                    token: $orderID
                    buyerAccessToken: $buyerAccessToken
                    merchantLSAT: $facilitatorAccessToken
                )
            }
        `,
        variables: { facilitatorAccessToken, buyerAccessToken, orderID }
    }).then(noop).catch(err => {
        onLsatUpgradeError(err);
        throw err;
    });
}

export function exchangeAccessTokenForAuthCode(buyerAccessToken : string) : ZalgoPromise<string> {
    return callGraphQL({
        name:  'ExchangeAuthCode',
        query: `
            query ExchangeAuthCode(
                $buyerAccessToken: String!
            ) {
                auth(
                    accessToken: $buyerAccessToken
                ) {
                    authCode
                }
            }
        `,
        variables: { buyerAccessToken }
    }).then(({ auth }) => {
        return auth.authCode;
    });
}

type ConnectURLOptions = {|
    clientID : string,
    orderID : string,
    payerID : string,
    fundingSource : $Values<typeof FUNDING>,
    connect : ConnectOptions
|};

export function getConnectURL({ clientID, orderID, payerID, fundingSource, connect } : ConnectURLOptions) : ZalgoPromise<string> {
    const { scopes } = connect;

    return callGraphQL({
        name:  'GetConnectURL',
        query: `
            query GetConnectURL(
                $clientID: String!
                $orderID: String!
                $scopes: [String]!
                $fundingSource: String
                $payerID: String
            ) {
                auth(
                    clientId: $clientID
                ) {
                    connectUrl(
                        token: $orderID
                        scopes: $scopes
                        fundingSource: $fundingSource
                        payerId: $payerID
                    ) {
                        href
                    }
                }
            }
        `,
        variables: { clientID, orderID, payerID, scopes, fundingSource }
    }).then(({ auth }) => {
        return auth.connectUrl.href;
    });
}
