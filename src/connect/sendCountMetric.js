/* @flow */
import { getLogger } from "@paypal/sdk-client/src";

// TODO: This will be pulled in to a shared sdk-client util
export const sendCountMetric = ({
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
