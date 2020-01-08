/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { XProps } from './types';

export type RememberFunding = ($ReadOnlyArray<$Values<typeof FUNDING>>) => ZalgoPromise<void>;

export function getRememberFunding(xprops : XProps) : RememberFunding {
    const { remember } = xprops;
    return remember;
}
