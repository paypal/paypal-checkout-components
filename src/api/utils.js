/* @flow */

import {
  getUserIDToken,
  getPartnerAttributionID,
} from "@paypal/sdk-client/src";
import { request } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { HEADERS } from "../constants/api";

// TODO: Consider centralizing to SDK client
function camelCaseToSnakeCase(key): string {
  return key
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1_$2")
    .toLowerCase();
}

// TODO: Consider centralizing to SDK client
function snakeCaseToCamelCase(key): string {
  /* eslint-disable-next-line no-useless-escape*/
  return key.toLowerCase().replace(/(\_\w)/g, (match) => {
    return match[1].toUpperCase();
  });
}

// TODO: Consider centralizing to SDK client
function formatPayload(bodyPayloadObject, caseKey): Object {
  if (
    typeof bodyPayloadObject === "function" ||
    bodyPayloadObject !== Object(bodyPayloadObject)
  ) {
    return bodyPayloadObject;
  }

  return Object.fromEntries(
    // $FlowFixMe
    Object.entries(bodyPayloadObject).map(([key, value]) => [
      caseKey(key),
      formatPayload(value, caseKey),
    ])
  );
}

type RestAPIParams = {|
  method?: string,
  url: string,
  data: Object,
|};

// TODO: Consider centralizing from SPB to SDK client or creating a new one
export function callRestAPI({
  method,
  url,
  data,
}: RestAPIParams): ZalgoPromise<Object> {
  // TODO: Update to SDK token
  const accessToken = getUserIDToken();
  const partnerAttributionID = getPartnerAttributionID() || "";

  if (!accessToken) {
    throw new Error(`SDK token not passed to SDK`);
  }

  const requestHeaders = {
    [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
    [HEADERS.CONTENT_TYPE]: `application/json`,
    [HEADERS.PARTNER_ATTRIBUTION_ID]: partnerAttributionID,
  };

  const snakeCasedPayload = formatPayload(data, camelCaseToSnakeCase);

  return request({
    method,
    url,
    headers: requestHeaders,
    json: snakeCasedPayload,
  }).then(({ status, body, headers: responseHeaders }) => {
    if (status >= 300) {
      const error = new Error(
        `${url} returned status ${status}\n\n${JSON.stringify(body)}`
      );

      // $FlowFixMe
      error.response = { status, headers: responseHeaders, body };

      throw error;
    }

    const camelCasedPayload = formatPayload(body, snakeCaseToCamelCase);
    return camelCasedPayload;
  });
}
