/* @flow */

import webpack from 'webpack';
import { webpackCompile } from 'webpack-mem-compile';
import { poll } from 'grabthar';
import { memoize } from 'belter';
import { ENV } from '@paypal/sdk-constants';

import { isLocal } from './util';
import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, BUTTON_RENDER_JS, BUTTON_CLIENT_JS, BUTTON_CLIENT_MIN_JS } from './config';

const getPayPalCheckoutComponentsWatcher = memoize(() => {
    return poll({
        name: BUTTON_RENDER_MODULE,
        flat: true
    });
});

const getSmartButtonWatcher = memoize(() => {
    return poll({
        name: BUTTON_CLIENT_MODULE,
        flat: true
    });
});

export async function getSmartButtonRenderScript() : Promise<{ button : Object, version : string }> {
    const watcher = getPayPalCheckoutComponentsWatcher();
    const { version } = await watcher.get();
    const button = await watcher.import(BUTTON_RENDER_JS);
    return { button, version };
}

export async function compileLocalSmartButtonClientScript() : Promise<{ script : string, version : string }> {
    const { WEBPACK_CONFIG_DEBUG } = require('../webpack.config');
    const script = await webpackCompile({ webpack, config: WEBPACK_CONFIG_DEBUG });
    return { script, version: ENV.LOCAL };
}

export async function getSmartButtonClientScript({ debug = false } : { debug : boolean } = {}) : Promise<{ script : string, version : string }> {
    if (isLocal()) {
        return await compileLocalSmartButtonClientScript();
    }
    
    const watcher = getSmartButtonWatcher();
    const { version } = await watcher.get();
    const script = await watcher.read(debug ? BUTTON_CLIENT_JS : BUTTON_CLIENT_MIN_JS);

    return { script, version };
}

export function startWatchers() {
    getPayPalCheckoutComponentsWatcher();
    getSmartButtonWatcher();
}

export function cancelWatchers() {
    getPayPalCheckoutComponentsWatcher().cancel();
    getSmartButtonWatcher().cancel();
}
