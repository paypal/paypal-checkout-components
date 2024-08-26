/* @flow */

import { memoize } from "@krakenjs/belter/src";

import { getConnectComponent } from "./component";

type MerchantProps = {||};

type ConnectComponent = (merchantProps: MerchantProps) => ConnectComponent;
// $FlowFixMe
export const Connect: (merchantProps: MerchantProps) => ConnectComponent =
  memoize(async (merchantProps: MerchantProps): ConnectComponent => {
    // $FlowFixMe
    return await getConnectComponent(merchantProps);
  });

export const Fastlane: (merchantProps: MerchantProps) => ConnectComponent =
  memoize(async (merchantProps: MerchantProps): ConnectComponent => {
    // $FlowFixMe
    return await getConnectComponent(merchantProps);
  });
