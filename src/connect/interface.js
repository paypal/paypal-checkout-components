/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */

import { memoize, type Memoized } from "@krakenjs/belter/src";

import { getConnectComponent } from "./component";

type MerchantProps = {||};
// This needs to be typed, this is coming from the fastlane team i believe
type FastlaneExternalComponent = {||};

type ConnectComponent = (merchantProps: MerchantProps) => ConnectComponent;
// $FlowFixMe
export const Connect: (merchantProps: MerchantProps) => ConnectComponent =
  memoize(async (merchantProps: MerchantProps): ConnectComponent => {
    // $FlowFixMe
    return await getConnectComponent(merchantProps);
  });

export const Fastlane = (
  merchantProps: MerchantProps
): Memoized<() => Promise<FastlaneExternalComponent>> =>
  memoize(() => getConnectComponent(merchantProps));
