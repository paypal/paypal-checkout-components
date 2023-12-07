/* @flow */
import { loadAxo } from "@paypal/connect-loader-component";
import { stringifyError } from "@krakenjs/belter/src";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
  getLogger,
} from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants";

import { sendCountMetric } from "./sendCountMetric";

// $FlowFixMe
export const getConnectComponent = async (merchantProps) => {
  sendCountMetric({
    name: "pp.app.paypal_sdk.connect.init.count",
    dimensions: {},
  });

  const cmid = getClientMetadataID();
  const clientID = getClientID();
  const userIdToken = getUserIDToken();
  const { metadata } = merchantProps;

  let loadResult = {};
  try {
    loadResult = await loadAxo({
      platform: "PPCP",
      btSdkVersion: "3.97.3-connect-alpha.6.1",
      minified: true,
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
      .error("load_axo_error", { err: stringifyError(error) })
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
        clientMetadataID: cmid,
      },
    });
    getLogger()
      .track({
        [FPTI_KEY.CONTEXT_TYPE]: "CMID",
        [FPTI_KEY.CONTEXT_ID]: cmid,
        [FPTI_KEY.EVENT_NAME]: `ppcp_axo_success`,
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
        [FPTI_KEY.EVENT_NAME]: `ppcp_axo_failure`,
      })
      .error("init_axo_error", { err: stringifyError(error) })
      .flush();

    throw new Error(error);
  }
};
