/* @flow */

import { config } from '../config';
import { loadScript } from '../lib/dom';

export function createPptmScript() {
    const id = window.location.hostname;

    if (!id) {
        return;
    }

    // Works essentially as a NOOP until opt-in
    const fullUrl = `${config.pptmUrl}?id=${window.location.hostname}&t=xo`;

    loadScript(fullUrl, 0, { async: true, id: 'xo--pptm' });
}
