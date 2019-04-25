/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { promiseNoop } from '../../lib';

import type { XProps } from './types';

export type XOnClickDataType = {|
    
|};

export type XOnClickActionsType = {|
    resolve : () => ZalgoPromise<boolean>,
    reject : () => ZalgoPromise<boolean>
|};

export type XOnClick = (XOnClickDataType, XOnClickActionsType) => ZalgoPromise<boolean | void>;

export function buildXOnClickData() : XOnClickDataType {
    // $FlowFixMe
    return {};
}

export function buildXOnClickActions() : XOnClickActionsType {
    return {
        resolve: () => ZalgoPromise.try(() => true),
        reject:  () => ZalgoPromise.try(() => false)
    };
}

export type OnClick = () => ZalgoPromise<boolean>;

export function getOnClick(xprops : XProps) : OnClick {
    const { onClick = promiseNoop } = xprops;

    return () => {
        return onClick(buildXOnClickData(), buildXOnClickActions()).then(valid => {
            return (valid !== false);
        });
    };
}
