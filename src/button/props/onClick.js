/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';

import { getLogger } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION } from '../../constants';

import type { XProps } from './types';

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

export function buildXOnClickData({ fundingSource } : { fundingSource : $Values<typeof FUNDING> }) : XOnClickDataType {
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

export function getOnClick(xprops : XProps) : OnClick | void {
    const { onClick, buttonSessionID } = xprops;

    if (!onClick) {
        return;
    }

    return ({ fundingSource } : { fundingSource : $Values<typeof FUNDING> }) => {
        getLogger().info('button_click').track({
            [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.BUTTON_CLICK,
            [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
            [FPTI_KEY.CHOSEN_FUNDING]:     fundingSource
        }).flush();
        
        return onClick(buildXOnClickData({ fundingSource }), buildXOnClickActions()).then(valid => {
            return (valid !== CLICK_VALID.INVALID);
        });
    };
}
