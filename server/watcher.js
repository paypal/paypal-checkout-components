/* @flow */

import { join } from 'path';

import webpack from 'webpack';
import { webpackCompile } from 'webpack-mem-compile';
import { readFile } from 'fs-extra';
import { poll } from 'grabthar';
import { memoize } from 'belter';
import { ENV } from '@paypal/sdk-constants';

import { isLocal } from './util';

const BUTTON_RENDER_MODULE = '@paypal/checkout-components';
const BUTTON_CLIENT_MODULE = require('../package.json').name;

const BUTTON_RENDER_JS = 'dist/button.js';
const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.min.js';

const getPayPalCheckoutComponentWatcher = memoize(() => {
    return poll({
        name: BUTTON_RENDER_MODULE,
        flat: true
    });
});

const getSmartButtonWatcher = memoize(() => {
    return poll({
        name:       BUTTON_CLIENT_MODULE,
        flat: true
    });
});

const fileRead = memoize(async (path : string) : Promise<string> => {
    return await readFile(path);
});

export async function getSmartButtonRenderScript() : Promise<{ button : Object, version : string }> {
    const watcher = getPayPalCheckoutComponentWatcher();
    const { version } = await watcher.get();
    const button = await watcher.import(BUTTON_RENDER_JS);
    return { button, version };
}

export async function getSmartButtonClientScript() : Promise<{ script : string, version : string }> {
    if (isLocal()) {
        const { WEBPACK_CONFIG } = require('../webpack.config');
        const script = await webpackCompile({ webpack, config: WEBPACK_CONFIG });
        return { script, version: ENV.LOCAL };
    }
    
    const watcher = getSmartButtonWatcher();
    const { modulePath, version } = await watcher.get();
    const script = await fileRead(join(modulePath, BUTTON_CLIENT_JS));
    return { script, version };
}

export function startWatchers() {
    getPayPalCheckoutComponentWatcher();
    getSmartButtonWatcher();
}

export function cancelWatchers() {
    getPayPalCheckoutComponentWatcher().cancel();
    getSmartButtonWatcher().cancel();
}
