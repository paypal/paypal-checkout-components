/* @flow */
import { getAllFramesInWindow, isSameDomain } from '@krakenjs/cross-domain-utils/src';

import type { SmartFields } from '../types';
import { FRAME_NAME } from '../constants';

export function getSmartFieldsByFundingSource(fundingSource : string) : ?SmartFields {

    try {
        for (const win of getAllFramesInWindow(window)) {

            if (
                isSameDomain(win) &&
                // $FlowFixMe
                win.exports &&
                win.exports.name === FRAME_NAME.SMART_FIELDS &&
                win.exports.fundingSource === fundingSource
            ) {
                return win.exports;
            }
        }
    } catch (err) {
        // pass
    }
}
