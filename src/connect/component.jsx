/* @flow */
import { loadAxo } from "@paypal/connect-loader-component";
import { stringifyError } from "@krakenjs/belter/src";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
  getLogger,
  getEnv,
  loadFraudnet,
  getCSPNonce,
  getDebug,
  getSessionID,
} from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants";

import { sendCountMetric } from "./sendCountMetric";

const MIN_MAJOR_VERSION = 3;
const MIN_MINOR_VERSION = 97;
export const MIN_BT_VERSION = `${MIN_MAJOR_VERSION}.${MIN_MINOR_VERSION}.3-connect-alpha.6.1`; // Minimum for supporting AXO

export function getSdkVersion(version: string | null): string | null {
  if (!version) {
    return MIN_BT_VERSION;
  }
  const versionSplit = version.split(".");
  const majorVersion = Number(versionSplit[0]);
  const minorVersion = Number(versionSplit[1]);

  if (
    majorVersion < MIN_MAJOR_VERSION ||
    (majorVersion === MIN_MAJOR_VERSION && minorVersion < MIN_MINOR_VERSION)
  ) {
    sendCountMetric({
      name: "pp.app.paypal_sdk.connect.init.error.count",
      event: "error",
      dimensions: {
        errorName: "braintree_version_not_supported_error",
      },
    });

    throw new Error(
      `The braintree version used does not support Accelerated Checkout (AXO). Please use version ${MIN_BT_VERSION} or above`
    );
  }

  return version;
}

// $FlowFixMe
export const getConnectComponent = async (merchantProps = {}) => {
  const cmid = getClientMetadataID() || getSessionID();
  const clientID = getClientID();
  const userIdToken = getUserIDToken();
  const env = getEnv();
  const cspNonce = getCSPNonce();

  const { collect } = loadFraudnet({
    env,
    clientMetadataID: cmid,
    cspNonce,
    appName: "ppcp-sdk-connect",
    // queryStringParams = {}, // TODO: what do we need here in this case?
  });

  sendCountMetric({
    name: "pp.app.paypal_sdk.connect.init.count",
    dimensions: {},
  });

  const debugEnabled = getDebug() || false;
  const { metadata } = merchantProps;

  let loadResult = {};
  try {
    loadResult = await loadAxo({
      platform: "PPCP",
      btSdkVersion: getSdkVersion(window?.braintree?.version ?? null),
      minified: !debugEnabled,
      metadata,
    });
  } catch (error) {
    sendCountMetric({
      name: "pp.app.paypal_sdk.connect.init.error.count",
      event: "error",
      dimensions: {
        errorName: "connect_load_error",
      },
    });

    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_axo_failure`,
      })
      .error("load_connect_error", { err: stringifyError(error) })
      .flush();

    throw new Error(error);
  }

  try {
    const connect = await window.braintree.connect.create({
      ...loadResult.metadata, // returns a localeURL for assets
      ...merchantProps, // AXO specific props
      platformOptions: {
        platform: "PPCP",
        userIdToken,
        clientID,
        fraudnet: collect,
        clientMetadataId: cmid,
      },
    });
    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_connect_success`,
      })
      .flush();
    sendCountMetric({
      name: "pp.app.paypal_sdk.connect.init.success.count",
      event: "success",
      dimensions: {},
    });

    return connect;
  } catch (error) {
    sendCountMetric({
      name: "pp.app.paypal_sdk.connect.init.error.count",
      event: "error",
      dimensions: {
        errorName: "connect_init_error",
      },
    });

    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_connect_failure`,
      })
      .error("init_connect_error", { err: stringifyError(error) })
      .flush();

    throw new Error(error);
  }
};
