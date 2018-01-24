/* @flow */

import { track, warn, error } from 'beaver-logger/client';

import { config } from '../config';
import { FPTI, PPTM_ID } from '../constants';
import { stringifyError, extendUrl, loadScript, getElement } from '../lib';

export function createPptmScript() {
    const id = window.location.hostname;

    if (!id) {
        return;
    }

    const alreadyDownloaded = Boolean(getElement(PPTM_ID));

    if (alreadyDownloaded) {
        warn(`pptm_tried_loading_twice`);
        return;
    }

    track({
        [ FPTI.KEY.STATE ]:      FPTI.STATE.PPTM,
        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOAD
    });

    // Works essentially as a NOOP until opt-in
    const fullUrl = extendUrl(config.pptmUrl, {
        t:    'xo',
        id:   window.location.hostname,
        mrid: config.merchantID
    });

    loadScript(fullUrl, 0, { async: true, id: PPTM_ID }).then(() => {

        track({
            [ FPTI.KEY.STATE ]:      FPTI.STATE.PPTM,
            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOADED
        });

    }).catch(err => {
        error('pptm_script_error', { error: stringifyError(err) });
    });
}
