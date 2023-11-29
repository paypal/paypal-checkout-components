/* @flow */
import { loadAxo } from "@paypal/connect-loader-component";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
  getLogger,
} from "@paypal/sdk-client/src";

const sendCountMetric = ({
  dimensions,
  event = "unused",
  name,
  value = 1,
}: {|
  event?: string,
  name: string,
  value?: number,
  dimensions: {
    [string]: mixed,
  },
  // $FlowIssue return type
|}) =>
  getLogger().metric({
    dimensions,
    metricEventName: event,
    metricNamespace: name,
    metricValue: value,
    metricType: "counter",
  });

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
        clientMetadataId: cmid,
        fraudnet: () => {
          return "";
        },
      },
    });

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
    throw new Error(error);
  }
};
