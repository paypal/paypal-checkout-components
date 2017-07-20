/* @flow */

import { config, FPTI, PPTM_ID } from '../config';
import { loadScript, getElement, stringifyError } from '../lib';
import * as $logger from 'beaver-logger/client';

export function createPptmScript() {
    const id = window.location.hostname;

    if (!id) {
        return;
    }

    const alreadyDownloaded = !!getElement(PPTM_ID);

    if (alreadyDownloaded) {
        $logger.warn(`pptm_tried_loading_twice`);
        return;
    }

    $logger.track({
        [ FPTI.KEY.STATE ]: FPTI.STATE.PPTM,
        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOAD
    });

    // Works essentially as a NOOP until opt-in
    const fullUrl = `${config.pptmUrl}?id=${window.location.hostname}&t=xo`;

    loadScript(fullUrl, 0, { async: true, id: PPTM_ID }).then(() => {

        $logger.track({
            [ FPTI.KEY.STATE ]: FPTI.STATE.PPTM,
            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOADED
        });

    }).catch(err => {
        $logger.error('pptm_script_error', { error: stringifyError(err) });
    });
}
