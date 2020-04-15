/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { inlineMemoize, base64encode, request, noop } from 'belter/src';

import { AUTH_API_URL } from '../config';
import { getLogger } from '../lib';
import { HEADERS } from '../constants';

import { callGraphQL } from './api';

export function createAccessToken (clientID : string) : ZalgoPromise<string> {
    return inlineMemoize(createAccessToken, () => {

        getLogger().info(`rest_api_create_access_token`);

        const basicAuth = base64encode(`${ clientID }:`);

        return request({

            method:  `post`,
            url:     AUTH_API_URL,
            headers: {
                Authorization: `Basic ${ basicAuth }`
            },
            data: {
                grant_type: `client_credentials`
            }

        }).then(({ body }) => {

            if (body && body.error === 'invalid_client') {
                throw new Error(`Auth Api invalid client id: ${ clientID }:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            if (!body || !body.access_token) {
                throw new Error(`Auth Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            return body.access_token;
        });
    }, [ clientID ]);
}

export function getFirebaseSessionToken(sessionUID : string) : ZalgoPromise<string> {
    return callGraphQL({
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

export function upgradeFacilitatorAccessToken(facilitatorAccessToken : string, { buyerAccessToken, orderID } : {| buyerAccessToken : string, orderID : string |}) : ZalgoPromise<void> {
    return callGraphQL({
        headers: {
            [ HEADERS.ACCESS_TOKEN ]: buyerAccessToken
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
    }).then(noop);
}

export function exchangeAccessTokenForIDToken(buyerAccessToken : string) : ZalgoPromise<string> {
    return callGraphQL({
        query: `
            query ExchangeIDToken(
                $buyerAccessToken: String!
            ) {
                identity(
                    accessToken: $buyerAccessToken
                ) {
                    idToken
                }
            }
        `,
        variables: { buyerAccessToken }
    }).then(({ identity }) => {
        return identity.idToken;
    });
}
