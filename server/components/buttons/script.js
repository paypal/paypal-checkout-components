/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { BUTTON_RENDER_JS, BUTTON_CLIENT_JS, BUTTON_RENDER_CHILD_MODULE, BUTTON_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG } from '../../config';
import { isLocal, compileWebpack, babelRequire, evalRequireScript, type LoggerBufferType } from '../../lib';
import { getPayPalSDKWatcher, getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

const ROOT = join(__dirname, '../../..');

export type SmartPaymentButtonsRenderScript = {|
    button : {|
        Buttons : ({||}) => {|
            // eslint-disable-next-line no-undef
            render : <T>(() => T) => T
        |},
        validateButtonProps : ({||}) => void
    |},
    version : string
|};

export async function compileLocalSmartPaymentButtonRenderScript(dir : string) : Promise<SmartPaymentButtonsRenderScript> {
    const { WEBPACK_CONFIG_BUTTON_RENDER } = babelRequire(join(dir, WEBPACK_CONFIG));
    const button = evalRequireScript(await compileWebpack(WEBPACK_CONFIG_BUTTON_RENDER, dir));
    return { button, version: ENV.LOCAL };
}

type GetPayPalSmartPaymentButtonsRenderScriptOptions = {|
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache, useLocal = isLocal() } : GetPayPalSmartPaymentButtonsRenderScriptOptions) : Promise<SmartPaymentButtonsRenderScript> {
    if (useLocal && process.env.BUTTON_RENDER_DIR) {
        return await compileLocalSmartPaymentButtonRenderScript(process.env.BUTTON_RENDER_DIR);
    }
    
    const watcher = getPayPalSDKWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const button = await watcher.importDependency(BUTTON_RENDER_CHILD_MODULE, BUTTON_RENDER_JS);
    return { button, version };
}

export type SmartPaymentButtonsClientScript = {|
    script : string,
    version : string
|};

export async function compileLocalSmartButtonsClientScript() : Promise<SmartPaymentButtonsClientScript> {
    const { WEBPACK_CONFIG_BUTTONS_DEBUG } = babelRequire(join(ROOT, WEBPACK_CONFIG));
    const script = await compileWebpack(WEBPACK_CONFIG_BUTTONS_DEBUG, ROOT);
    return { script, version: ENV.LOCAL };
}

type GetSmartPaymentButtonsClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getSmartPaymentButtonsClientScript({ logBuffer, cache, debug = false, useLocal = isLocal() } : GetSmartPaymentButtonsClientScriptOptions = {}) : Promise<SmartPaymentButtonsClientScript> {
    if (useLocal) {
        return await compileLocalSmartButtonsClientScript();
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? BUTTON_CLIENT_JS : BUTTON_CLIENT_MIN_JS);

    return { script, version };
}
