/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

export type XOnInitDataType = {|
    correlationID : string
|};

export type XOnInitActionsType = {|
    enable : () => ZalgoPromise<void>,
    disable : () => ZalgoPromise<void>
|};

export type XOnInit = (XOnInitDataType, XOnInitActionsType) => ZalgoPromise<void>;

export function buildXOnInitActions(set : (boolean) => void) : XOnInitActionsType {
    return {
        enable:  () => ZalgoPromise.try(() => set(true)),
        disable: () => ZalgoPromise.try(() => set(false))
    };
}

export type OnInitDataType = {|
    correlationID : string
|};

export type OnInit = (OnInitDataType) => {|
    initPromise : ZalgoPromise<void>,
    isEnabled : () => boolean
|};

export function getOnInit({ onInit } : {| onInit : ?XOnInit |}) : OnInit {
    return (data) => {
        let enabled = true;

        const initPromise = ZalgoPromise.try(() => {
            if (onInit) {
                return onInit(data, buildXOnInitActions(val => {
                    enabled = val;
                }));
            }
        });

        return {
            initPromise,
            isEnabled: () => enabled
        };
    };
}
