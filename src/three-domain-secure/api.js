/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request } from "@krakenjs/belter/src";
import { getSessionID, getPartnerAttributionID } from "@paypal/sdk-client/src";

import { callRestAPI } from "../lib";
import { HEADERS } from "../constants/api";

type HTTPRequestOptions = {|
  // eslint-disable-next-line flowtype/no-weak-types
  data: any,
  baseURL?: string,
  accessToken?: string,
  method?: string, // TODO do we have an available type for this in Flow?
|};

interface HTTPClientType {
  accessToken: ?string;
  baseURL: ?string;
}

type HTTPClientOptions = {|
  accessToken: ?string,
  baseURL: ?string,
|};

export class HTTPClient implements HTTPClientType {
  accessToken: ?string;
  baseURL: ?string;

  constructor(options?: $Shape<HTTPClientOptions> = {}) {
    this.accessToken = options.accessToken;
    this.baseURL = options.baseURL;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }
}

export class RestClient extends HTTPClient {
  request({ baseURL, ...rest }: HTTPRequestOptions): ZalgoPromise<{ ... }> {
    return callRestAPI({
      url: baseURL ?? this.baseURL ?? "",
      accessToken: this.accessToken,
      ...rest,
    });
  }
  authRequest({
    baseURL,
    accessToken,
    ...rest
  }: HTTPRequestOptions): ZalgoPromise<{ ... }> {
    return request({
      method: "post",
      url: baseURL ?? this.baseURL ?? "",
      headers: {
        // $FlowIssue
        Authorization: `Basic ${accessToken}`,
      },
      ...rest,
    }).then(({ body }) => {
      if (body && body.error === "invalid_client") {
        throw new Error(
          `Auth Api invalid client id: \n\n${JSON.stringify(body, null, 4)}`
        );
      }

      if (!body || !body.access_token) {
        throw new Error(
          `Auth Api response error:\n\n${JSON.stringify(body, null, 4)}`
        );
      }

      return body.access_token;
    });
  }
}

const GRAPHQL_URI = "/graphql";

type GQLQuery = {|
  query: string,
  variables: { ... },
|};

export function callGraphQLAPI({
  accessToken,
  baseURL,
  data: query,
  headers,
}: {|
  accessToken: ?string,
  baseURL: string,
  data: GQLQuery,
  headers: Object, // TODO fix
  // eslint-disable-next-line flowtype/no-weak-types
|}): ZalgoPromise<any> {
  if (!accessToken) {
    throw new Error(
      `No access token passed to GraphQL request ${baseURL}${GRAPHQL_URI}`
    );
  }

  const requestHeaders = {
    ...headers,
    [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
    [HEADERS.CONTENT_TYPE]: "application/json",
    [HEADERS.PARTNER_ATTRIBUTION_ID]: getPartnerAttributionID() ?? "",
    [HEADERS.CLIENT_METADATA_ID]: getSessionID(),
  };

  return request({
    method: "post",
    url: `${baseURL}${GRAPHQL_URI}`,
    headers: requestHeaders,
    json: query,
  }).then(({ status, body }) => {
    // TODO handle body.errors
    if (status !== 200) {
      throw new Error(`${baseURL}${GRAPHQL_URI} returned status ${status}`);
    }

    return body;
  });
}

export class GraphQLClient extends HTTPClient {
  request({
    baseURL,
    data,
    accessToken,
    headers,
  }: // eslint-disable-next-line flowtype/no-weak-types
  any): ZalgoPromise<any> {
    return callGraphQLAPI({
      accessToken: accessToken ?? this.accessToken,
      data,
      baseURL: baseURL ?? this.baseURL ?? "",
      headers,
    });
  }
}
