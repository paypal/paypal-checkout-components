/* @flow */

import type { ExpressRequest } from '../types';

// $FlowFixMe
export type GraphQL = <V, R>(ExpressRequest, $ReadOnlyArray<{| query : string, variables : V |}>) => Promise<R>; // eslint-disable-line no-undef

// eslint-disable-next-line flowtype/require-exact-type
export type GraphQLBatch = {
    // eslint-disable-next-line no-undef
    <V, R>({| query : string, variables : V, accessToken? : ?string |}) : Promise<R>,
    flush : () => void
};

export function graphQLBatch(req : ExpressRequest, graphQL : GraphQL) : GraphQLBatch {
    const batch = [];
    let accessToken;

    const batchedGraphQL = async ({ query, variables, accessToken: callerAccessToken }) => {
        return await new Promise((resolve, reject) => {
            if (callerAccessToken) {
                if (accessToken && callerAccessToken !== accessToken) {
                    throw new Error(`Access token for graphql call already set`);
                }

                accessToken = callerAccessToken;
            }

            batch.push({ query, variables, resolve, reject });
        });
    };

    batchedGraphQL.flush = async () => {
        const payload = batch.map(({ query, variables }) => {
            return { query, variables };
        });

        let response : $ReadOnlyArray<Object>;
        let gqlError;

        try {
            response = await graphQL(req, payload, { accessToken });
        } catch (err) {
            gqlError = err;
        }
        
        for (let i = 0; i < batch.length; i++) {
            const { resolve, reject } = batch[i];

            if (gqlError) {
                reject(gqlError);
                continue;
            }

            const batchItem = response && response[i];

            if (!batchItem) {
                reject(new Error(`No response from gql`));
                continue;
            }

            const { result, error } = batchItem;

            if (gqlError || error) {
                reject(gqlError || error);
            } else {
                resolve(result);
            }
        }
    };

    return batchedGraphQL;
}
