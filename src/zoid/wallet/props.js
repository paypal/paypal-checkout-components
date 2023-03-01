/* @flow */

import { FUNDING } from "@paypal/sdk-constants/src";

export type WalletProps = {|
  nonce: ?string,
  fundingSource: $Values<typeof FUNDING>,
  userIDToken: ?string,
|};
