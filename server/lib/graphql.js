/* @flow */

import type { ExpressRequest } from '../types';

// $FlowFixMe
export type GraphQL = <V, R>(ExpressRequest, $ReadOnlyArray<{ query : string, variables : V }>) => Promise<R>; // eslint-disable-line no-undef

// eslint-disable-next-line flowtype/require-exact-type
export type GraphQLBatch = {
    // eslint-disable-next-line no-undef
    <V, R>({ query : string, variables : V }) : Promise<R>,
    flush : () => void
};

export function graphQLBatch(req : ExpressRequest, graphQL : GraphQL) : GraphQLBatch {
    const batch = [];

    const batchedGraphQL = async ({ query, variables }) => {
        return await new Promise((resolve, reject) => {
            batch.push({ query, variables, resolve, reject });
        });
    };

    batchedGraphQL.flush = async () => {
        const payload = batch.map(({ query, variables }) => {
            return { query, variables };
        });

        let response : $ReadOnlyArray<Object>;
        let error;

        try {
            response = await graphQL(req, payload);
        } catch (err) {
            error = err;
        }

        for (let i = 0; i < batch.length; i++) {
            const { resolve, reject } = batch[i];

            if (error) {
                reject(error);
            } else if (!response || !response[i]) {
                reject(new Error(`No response from gql`));
            } else {
                resolve(response[i]);
            }
        }
    };

    return batchedGraphQL;
}
