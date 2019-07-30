/* @flow */

import { join } from 'path';

import { poll } from 'grabthar';
import { memoize } from 'belter';
import { ENV } from '@paypal/sdk-constants';

import { isLocal, compileWebpack, requireScript } from '../lib';
import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, BUTTON_RENDER_JS, BUTTON_CLIENT_JS, BUTTON_CLIENT_MIN_JS } from '../config';

const WEBPACK_CONFIG = 'webpack.config';

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

export async function compileLocalSmartButtonRenderScript() : Promise<{ button : Object, version : string }> {
    const dir = process.env.BUTTON_RENDER_DIR;
    if (!dir) {
        throw new Error(`Can not find directory to render smart buttons script`);
    }
    const button = requireScript(await compileWebpack(join(dir, WEBPACK_CONFIG), 'WEBPACK_CONFIG_BUTTON_RENDER'));
    return { button, version: ENV.LOCAL };
}

export async function getSmartButtonRenderScript() : Promise<{ button : Object, version : string }> {
    if (isLocal() && process.env.BUTTON_RENDER_DIR) {
        return await compileLocalSmartButtonRenderScript();
    }

    const watcher = getPayPalCheckoutComponentsWatcher();
    const { version } = await watcher.get();
    const button = await watcher.import(BUTTON_RENDER_JS);
    return { button, version };
}

export async function compileLocalSmartButtonClientScript() : Promise<{ script : string, version : string }> {
    const script = await compileWebpack(join(__dirname, '../..', WEBPACK_CONFIG), 'WEBPACK_CONFIG_DEBUG');
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
