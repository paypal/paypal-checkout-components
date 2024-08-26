/* @flow */

import { getPartnerAttributionID, getSessionID } from "@paypal/sdk-client/src";
import { inlineMemoize, request } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { HEADERS } from "../constants/api";

type RestAPIParams = {|
  method?: string,
  url: string,
  data: Object,
  accessToken: ?string,
|};

export function callRestAPI({
  accessToken,
  method,
  url,
  data,
}: RestAPIParams): ZalgoPromise<Object> {
  const partnerAttributionID = getPartnerAttributionID() || "";

  if (!accessToken) {
    throw new Error(`No access token passed to API request ${url}`);
  }

  const requestHeaders = {
    [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
    [HEADERS.CONTENT_TYPE]: `application/json`,
    [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID,
    [HEADERS.CLIENT_METADATA_ID]: getSessionID(),
  };

  return request({
    method,
    url,
    headers: requestHeaders,
    json: data,
  }).then(({ status, body, headers: responseHeaders }) => {
    if (status >= 300) {
      const error = new Error(
        `${url} returned status ${status}\n\n${JSON.stringify(body)}`
      );

      // $FlowFixMe
      error.response = { status, headers: responseHeaders, body };

      throw error;
    }

    return body;
  });
}

export function callMemoizedRestAPI({
  accessToken,
  method,
  url,
  data,
}: RestAPIParams): ZalgoPromise<Object> {
  return inlineMemoize(
    callMemoizedRestAPI,
    () => callRestAPI({ accessToken, method, url, data }),
    [accessToken, method, url, JSON.stringify(data)]
  );
}
