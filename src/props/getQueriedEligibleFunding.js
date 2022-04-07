/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

export type GetQueriedEligibleFunding = () => ZalgoPromise<$ReadOnlyArray<typeof FUNDING>>;
