/* @flow */

import { join } from 'path';

import { readFile } from 'fs-extra';
import { poll } from 'grabthar';
import { memoize } from 'belter';

import { NPM_REGISTRY } from './config';

const BUTTON_RENDER_MODULE = 'paypal-checkout-components';
const BUTTON_CLIENT_MODULE = 'smart-payment-buttons';

const BUTTON_RENDER_JS = 'dist/button.js';
const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.min.js';

let getPayPalCheckoutComponentWatcher = memoize(() => {
    return poll({
        name: BUTTON_RENDER_MODULE
    });
});

let getSmartButtonWatcher = memoize(() => {
    return poll({
        name:       BUTTON_CLIENT_MODULE,
        npmOptions: {
            registry: NPM_REGISTRY
        }
    });
});

let fileRead = memoize(async (path : string) : Promise<string> => {
    return await readFile(path);
});

export async function getSmartButtonRenderScript() : Object {
    return await getPayPalCheckoutComponentWatcher().import(BUTTON_RENDER_JS);
}

export async function getSmartButtonClientScript() : Promise<string> {
    let { modulePath } = await getSmartButtonWatcher().get();
    return await fileRead(join(modulePath, BUTTON_CLIENT_JS));
}

export function cancelWatchers() {
    getPayPalCheckoutComponentWatcher().cancel();
    getSmartButtonWatcher().cancel();
}
