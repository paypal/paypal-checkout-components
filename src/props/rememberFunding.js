/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

export type RememberFunding = ($ReadOnlyArray<$Values<typeof FUNDING>>) => ZalgoPromise<void>;

export function getRememberFunding({ remember } : {| remember : RememberFunding |}) : RememberFunding {
    return remember;
}
