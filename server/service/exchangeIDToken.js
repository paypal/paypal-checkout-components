/* @flow */

import { type GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType, RiskData } from '../types';

const EXCHANGE_ID_TOKEN_QUERY = `
    query ExchangeIDToken(
        $userIDToken: String!
        $riskData: String
    ) {
        auth(
            idToken: $userIDToken
            riskData: $riskData
        ) {
            accessToken
        }
    }
`;

export type ExchangeIDTokenOptions = {|
    logger : LoggerType,
    userIDToken : string,
    clientMetadataID : string,
    riskData : ?RiskData
|};

export async function exchangeIDToken(req : ExpressRequest, gqlBatch : GraphQLBatch, exchangeIDTokenOptions : ExchangeIDTokenOptions) : Promise<?string> {
    const { logger, userIDToken, clientMetadataID, riskData } = exchangeIDTokenOptions;

    try {
        const result = await gqlBatch({
            query:     EXCHANGE_ID_TOKEN_QUERY,
            variables: {
                userIDToken,
                riskData: JSON.stringify(riskData)
            },
            clientMetadataID
        });

        const buyerAccessToken = result.auth && result.auth.accessToken;
        return buyerAccessToken;

    } catch (err) {
        logger.error(req, 'exchange_id_token_error', { err: err.stack ? err.stack : err.toString() });
    }
}
