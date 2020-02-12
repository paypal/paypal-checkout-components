/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

export type WalletProps = {|
    fundingSource : $Values<typeof FUNDING>
|};
