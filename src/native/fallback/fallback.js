/* @flow */

import { cleanup } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import { getPostRobot } from '../../lib';

import { MESSAGE } from './constants';

type SetupNativeFallbackOptions = {|
    parentDomain : string
|};

type NativeFallback = {|
    destroy : () => ZalgoPromise<void>
|};

export function setupNativeFallback({ parentDomain = window.location.origin } : SetupNativeFallbackOptions) : NativeFallback {
    if (!window.opener) {
        throw new Error(`Expected window to have opener`);
    }

    const clean = cleanup();
    const destroy = () => clean.all();

    const postRobot = getPostRobot();

    const sendToParent = (event, payload = {}) => {
        return postRobot.send(window.opener, event, payload, { domain: parentDomain })
            .then(({ data }) => data);
    };

    sendToParent(MESSAGE.DETECT_WEB_SWITCH);

    return {
        destroy
    };
}
