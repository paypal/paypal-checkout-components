/* @flow */

import { params as gqlParams, query as gqlQuery, types as gqlTypes } from 'typed-graphqlify';
import { ENV } from '@paypal/sdk-constants';

import type { ExpressRequest } from '../types';
import { HTTP_HEADER } from '../config';

import { isDefined, isEmpty, promiseTimeout } from './util';

export type GraphQLBatchOptions = {|
    env : $Values<typeof ENV>
|};

export type GraphQLPayload = $ReadOnlyArray<{|
    query : string,
    variables : Object
|}>;

export type GraphQLOptions = {|
    accessToken? : string,
    clientMetadataID? : string
|};

export type GraphQL = (
    ExpressRequest,
    GraphQLPayload,
    opts? : GraphQLOptions
) => Promise<$ReadOnlyArray<{|
    result : Object
|}>>;

export type GraphQLBatchCallOptions = {|
    query : string,
    variables : { [string] : mixed },
    accessToken? : ?string,
    clientMetadataID? : string,
    timeout? : number
|};

// eslint-disable-next-line flowtype/require-exact-type
export type GraphQLBatchCall = {
    // eslint-disable-next-line no-undef
    <R>(GraphQLBatchCallOptions) : Promise<R>,
    flush : () => void
};

export function graphQLBatch(req : ExpressRequest, graphQL : GraphQL, opts? : GraphQLBatchOptions) : GraphQLBatchCall {
    const { env } = opts || {};

    // eslint-disable-next-line flowtype/no-mutable-array
    type Batch = Array<{|
        query : string,
        variables : { [string] : mixed },
        resolve : (*) => void,
        reject : (mixed) => void
    |}>;

    let batch : Batch = [];
    let accessToken;
    let clientMetadataID = req.get(HTTP_HEADER.CLIENT_METADATA_ID);
    let timer;
    let maxTimeout = 0;

    const batchedGraphQL = async ({ query, variables, accessToken: callerAccessToken, clientMetadataID: callerClientMetadataID, timeout }) => {
        return await new Promise((resolve, reject) => {
            if (timeout && timeout > maxTimeout) {
                maxTimeout = (env === ENV.PRODUCTION) ? timeout : timeout * 10;
            }

            if (callerAccessToken) {
                if (accessToken && callerAccessToken !== accessToken) {
                    throw new Error(`Access token for graphql call already set`);
                }

                accessToken = callerAccessToken;
            }

            if (callerClientMetadataID) {
                if (clientMetadataID && callerClientMetadataID !== clientMetadataID) {
                    throw new Error(`Client Metadata id for graphql call already set`);
                }

                clientMetadataID = callerClientMetadataID;
            }

            batch.push({ query, variables, resolve, reject });

            timer = setTimeout(() => {
                batchedGraphQL.flush();
            }, 0);
        });
    };

    batchedGraphQL.flush = async () => {
        clearTimeout(timer);

        if (!batch.length) {
            return;
        }

        const currentBatch = batch;
        batch = [];

        const payload = currentBatch.map(({ query, variables }) => {
            return { query, variables };
        });

        let response : $ReadOnlyArray<Object>;
        let gqlError;

        let gqlPromise = graphQL(req, payload, { accessToken, clientMetadataID });

        if (maxTimeout > 0) {
            gqlPromise = promiseTimeout(gqlPromise, maxTimeout);
        }

        try {
            response = await gqlPromise;
        } catch (err) {
            gqlError = err;
        }
        
        for (let i = 0; i < currentBatch.length; i++) {
            const { resolve, reject } = currentBatch[i];

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

export const graphqlTypes = {
    boolean: gqlTypes.boolean,
    string:  gqlTypes.string
};

function isGraphQLType(val : mixed) : boolean {
    for (const type of Object.values(graphqlTypes)) {
        if (val === type) {
            return true;
        }
    }

    return false;
}

type Query = {|
    [ string ] : Symbol | Query
|};

function assertQuery(value : Symbol | Query) : Query {
    if (typeof value === 'object' && value !== null) {
        // $FlowFixMe[class-object-subtyping]
        return value;
    }

    throw new Error(`Invalid query`);
}

function treeShakeQuery(query : Query) : Query {
    const result = {};

    for (const key of Object.keys(query)) {
        const value = query[key];

        if (!isDefined(value)) {
            continue;
        }

        if (isGraphQLType(value)) {
            result[key] = value;
            continue;
        }
  
        if (typeof value === 'object' && value !== null) {
            const treeShakedQuery = treeShakeQuery(assertQuery(value));
            if (!isEmpty(treeShakedQuery)) {
                result[key] = treeShakedQuery;
            }
            continue;
        }

        throw new Error(`Unrecognized type: ${ typeof value }`);
    }

    return result;
}

export function pruneQuery<T>(query : Query, existingData : T) : Query {
    const result = {};

    for (const key of Object.keys(query)) {
        const value = query[key];
        // $FlowFixMe
        const existingValue = existingData[key];

        if (!isDefined(existingValue)) {
            result[key] = value;
            continue;
        }

        if (!isDefined(value) || isGraphQLType(value)) {
            continue;
        }
            
        if (typeof value === 'object' && value !== null) {
            if (typeof existingValue !== 'object' || existingValue === null) {
                throw new Error(`Expected existing value to be object`);
            }

            result[key] = pruneQuery(assertQuery(value), existingValue);
            continue;
        }

        throw new Error(`Unrecognized type: ${ typeof value }`);
    }

    return result;
}

type BuildQueryOptions<I, V> = {|
    name : string,
    key : string,
    inputTypes : I,
    inputs : V,
    query : Query
|};

export function buildQuery<I, V>({ name, key, inputTypes, inputs, query } : BuildQueryOptions<I, V>) : ?string {
    const treeShakedQuery = treeShakeQuery(query);

    if (isEmpty(treeShakedQuery)) {
        return;
    }

    return gqlQuery(name, gqlParams(inputTypes, {
        [key]: gqlParams(inputs, treeShakedQuery)
    }));
}
