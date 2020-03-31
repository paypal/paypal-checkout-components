/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { BUTTON_RENDER_JS, BUTTON_CLIENT_JS, BUTTON_CLIENT_MIN_JS, WEBPACK_CONFIG } from '../../config';
import { isLocal, compileWebpack, babelRequire, evalRequireScript, type LoggerBufferType } from '../../lib';
import { getPayPalCheckoutComponentsWatcher, getPayPalSmartPaymentButtonsWatcher } from '../../watchers';


export async function compileLocalSmartPaymentButtonRenderScript(dir : string) : Promise<{| button : Object, version : string |}> {
    const { WEBPACK_CONFIG_BUTTON_RENDER } = babelRequire(join(dir, WEBPACK_CONFIG));
    const button = evalRequireScript(await compileWebpack(WEBPACK_CONFIG_BUTTON_RENDER, dir));
    return { button, version: ENV.LOCAL };
}

export async function getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) : Promise<{| button : Object, version : string |}> {
    if (isLocal() && process.env.BUTTON_RENDER_DIR) {
        return await compileLocalSmartPaymentButtonRenderScript(process.env.BUTTON_RENDER_DIR);
    }

    const watcher = getPayPalCheckoutComponentsWatcher({ logBuffer, cache });
    const { version } = await watcher.get();
    const button = await watcher.import(BUTTON_RENDER_JS);
    return { button, version };
}


export async function compileLocalSmartButtonsClientScript() : Promise<{| script : string, version : string |}> {
    const root = join(__dirname, '../../..');
    const { WEBPACK_CONFIG_BUTTONS_DEBUG } = babelRequire(join(root, WEBPACK_CONFIG));
    const script = await compileWebpack(WEBPACK_CONFIG_BUTTONS_DEBUG, root);
    return { script, version: ENV.LOCAL };
}

export async function getSmartPaymentButtonsClientScript({ logBuffer, cache, debug = false } : {| debug : boolean, logBuffer : ?LoggerBufferType, cache : ?CacheType |} = {}) : Promise<{| script : string, version : string |}> {
    if (isLocal()) {
        return await compileLocalSmartButtonsClientScript();
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get();
    const script = await watcher.read(debug ? BUTTON_CLIENT_JS : BUTTON_CLIENT_MIN_JS);

    return { script, version };
}
