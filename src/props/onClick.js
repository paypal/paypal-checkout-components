/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { memoize } from 'belter/src';

export type XOnClickDataType = {|
    fundingSource : $Values<typeof FUNDING>
|};

export type XOnClickActionsType = {|
    resolve : () => ZalgoPromise<boolean>,
    reject : () => ZalgoPromise<boolean>
|};

export type XOnClick = (XOnClickDataType, XOnClickActionsType) => ZalgoPromise<boolean | void>;

export const CLICK_VALID = {
    VALID:   (true : true),
    INVALID: (false : false)
};

export function buildXOnClickData({ fundingSource } : {| fundingSource : $Values<typeof FUNDING> |}) : XOnClickDataType {
    return { fundingSource };
}

export function buildXOnClickActions() : XOnClickActionsType {
    return {
        resolve: () => ZalgoPromise.try(() => CLICK_VALID.VALID),
        reject:  () => ZalgoPromise.try(() => CLICK_VALID.INVALID)
    };
}

export type OnClickDataType = {|
    fundingSource : $Values<typeof FUNDING>
|};

export type OnClick = (OnClickDataType) => ZalgoPromise<boolean>;

export function getOnClick({ onClick } : {| onClick : ?XOnClick |}) : OnClick | void {
    if (!onClick) {
        return;
    }

    return memoize(({ fundingSource } : {| fundingSource : $Values<typeof FUNDING> |}) => {
        return onClick(buildXOnClickData({ fundingSource }), buildXOnClickActions()).then(valid => {
            return (valid !== CLICK_VALID.INVALID);
        });
    });
}
