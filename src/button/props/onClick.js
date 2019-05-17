/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants';

import { promiseNoop } from '../../lib';

import type { XProps } from './types';

export type XOnClickDataType = {|
    fundingSource : $Values<typeof FUNDING>
|};

export type XOnClickActionsType = {|
    resolve : () => ZalgoPromise<boolean>,
    reject : () => ZalgoPromise<boolean>
|};

export type XOnClick = (XOnClickDataType, XOnClickActionsType) => ZalgoPromise<boolean | void>;

export function buildXOnClickData({ fundingSource } : { fundingSource : $Values<typeof FUNDING> }) : XOnClickDataType {
    // $FlowFixMe
    return { fundingSource };
}

export function buildXOnClickActions() : XOnClickActionsType {
    return {
        resolve: () => ZalgoPromise.try(() => true),
        reject:  () => ZalgoPromise.try(() => false)
    };
}

export type OnClickDataType = {|
    fundingSource : $Values<typeof FUNDING>
|};

export type OnClick = (OnClickDataType) => ZalgoPromise<boolean>;

export function getOnClick(xprops : XProps) : OnClick {
    const { onClick = promiseNoop } = xprops;

    return ({ fundingSource } : { fundingSource : $Values<typeof FUNDING> }) => {
        return onClick(buildXOnClickData({ fundingSource }), buildXOnClickActions()).then(valid => {
            return (valid !== false);
        });
    };
}
