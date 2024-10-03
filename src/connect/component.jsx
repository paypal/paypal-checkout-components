/* @flow */
import { loadAxo } from "@paypal/accelerated-checkout-loader";
import { stringifyError } from "@krakenjs/belter/src";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
  getSDKToken,
  getLogger,
  getEnv,
  loadFraudnet,
  getCSPNonce,
  getDebug,
  getSessionID,
} from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants";

const MIN_MAJOR_VERSION = 3;
const MIN_MINOR_VERSION = 97;
const MIN_PATCH_VERSION = 3;
export const MIN_BT_VERSION = `${MIN_MAJOR_VERSION}.${MIN_MINOR_VERSION}.${MIN_PATCH_VERSION}-connect-alpha.6.1`; // Minimum for supporting AXO

export const DEFAULT_BT_VERSION = `3.107.1`;

export function getSdkVersion(version: string | null): string {
  if (!version) {
    return DEFAULT_BT_VERSION;
  }
  const versionSplit = version.split(".");
  // patch could have an alpha tag
  const patchSplit = versionSplit[2].split("-");

  const majorVersion = Number(versionSplit[0]);
  const minorVersion = Number(versionSplit[1]);
  const patchVersion = Number(patchSplit[0]);

  const isMajorVersionSmaller = majorVersion < MIN_MAJOR_VERSION;
  const isMajorVersionEqual = majorVersion === MIN_MAJOR_VERSION;

  const isMinorVersionSmaller = minorVersion < MIN_MINOR_VERSION;
  const isMinorVersionEqual = minorVersion === MIN_MINOR_VERSION;

  const isPatchVersionSmaller = patchVersion < MIN_PATCH_VERSION;

  if (
    isMajorVersionSmaller ||
    (isMajorVersionEqual && isMinorVersionSmaller) ||
    (isMajorVersionEqual && isMinorVersionEqual && isPatchVersionSmaller)
  ) {
    getLogger().metricCounter({
      namespace: "connect.init.count",
      event: "error",
      dimensions: {
        errorName: "braintree_version_not_supported_error",
      },
    });

    throw new Error(
      `The braintree version: ${version} does not support Connect. Please use version ${MIN_BT_VERSION} or above`
    );
  }

  return version;
}

// $FlowFixMe
export const getConnectComponent = async (merchantProps = {}) => {
  const cmid = getClientMetadataID() || getSessionID();
  const clientId = getClientID();
  const sdkToken = getSDKToken() || getUserIDToken();
  const env = getEnv();
  const cspNonce = getCSPNonce();

  const { collect } = loadFraudnet({
    env,
    clientMetadataID: cmid,
    cspNonce,
    appName: "ppcp-sdk-connect",
    // queryStringParams = {}, // TODO: what do we need here in this case?
  });

  getLogger().metricCounter({
    namespace: "connect.init.count",
    event: "init",
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
    getLogger()
      .error("load_connect_error", { err: stringifyError(error) })
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_axo_failure`,
      })
      .metricCounter({
        namespace: "connect.init.count",
        event: "error",
        dimensions: {
          errorName: "connect_load_error",
        },
      })
      .flush();

    throw new Error(error);
  }

  try {
    const connect = await window.braintree.connect.create({
      ...loadResult.metadata, // returns a localeURL for assets
      ...merchantProps, // AXO specific props
      platformOptions: {
        platform: "PPCP",
        userIdToken: sdkToken,
        clientId,
        fraudnet: collect,
        clientMetadataId: cmid,
        env,
      },
    });
    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_connect_success`,
      })
      .metricCounter({
        namespace: "connect.init.count",
        event: "success",
      })
      .flush();

    return connect;
  } catch (error) {
    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_connect_failure`,
      })
      .error("init_connect_error", { err: stringifyError(error) })
      .metricCounter({
        namespace: "connect.init.count",
        event: "error",
        dimensions: {
          errorName: "connect_init_error",
        },
      })
      .flush();

    throw new Error(error);
  }
};
