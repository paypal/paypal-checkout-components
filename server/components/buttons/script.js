/* @flow */

import { join, dirname } from 'path';
import { readFileSync } from 'fs';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { BUTTON_RENDER_JS, BUTTON_CLIENT_JS, SMART_BUTTONS_MODULE, CHECKOUT_COMPONENTS_MODULE,
    BUTTON_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, evalRequireScript, resolveScript, dynamicRequire, type LoggerBufferType } from '../../lib';
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

export async function getLocalSmartPaymentButtonRenderScript() : Promise<?SmartPaymentButtonsRenderScript> {
    const webpackScriptPath = resolveScript(join(CHECKOUT_COMPONENTS_MODULE, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const dir = dirname(webpackScriptPath);
        const { WEBPACK_CONFIG_BUTTON_RENDER } = babelRequire(webpackScriptPath);
        const button = evalRequireScript(await compileWebpack(WEBPACK_CONFIG_BUTTON_RENDER, dir));
        return { button, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(CHECKOUT_COMPONENTS_MODULE, BUTTON_RENDER_JS));

    if (distScriptPath) {
        const button = dynamicRequire(distScriptPath);
        return { button, version: ENV.LOCAL };
    }
}

type GetPayPalSmartPaymentButtonsRenderScriptOptions = {|
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache, useLocal = isLocalOrTest() } : GetPayPalSmartPaymentButtonsRenderScriptOptions) : Promise<SmartPaymentButtonsRenderScript> {
    if (useLocal) {
        const script = await getLocalSmartPaymentButtonRenderScript();
        if (script) {
            return script;
        }
    }
    
    const watcher = getPayPalSDKWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const button = await watcher.importDependency(CHECKOUT_COMPONENTS_MODULE, BUTTON_RENDER_JS, ACTIVE_TAG);
    return { button, version };
}

export type SmartPaymentButtonsClientScript = {|
    script : string,
    version : string
|};

export async function compileLocalSmartButtonsClientScript() : Promise<?SmartPaymentButtonsClientScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_BUTTONS_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_BUTTONS_DEBUG, ROOT);
        return { script, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, BUTTON_CLIENT_JS));

    if (distScriptPath) {
        const script = readFileSync(distScriptPath).toString();
        return { script, version: ENV.LOCAL };
    }
}

type GetSmartPaymentButtonsClientScriptOptions = {|
    debug : boolean,
    logBuffer : LoggerBufferType,
    cache : CacheType,
    useLocal? : boolean
|};

export async function getSmartPaymentButtonsClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest() } : GetSmartPaymentButtonsClientScriptOptions = {}) : Promise<SmartPaymentButtonsClientScript> {
    if (useLocal) {
        const script = await compileLocalSmartButtonsClientScript();
        if (script) {
            return script;
        }
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? BUTTON_CLIENT_JS : BUTTON_CLIENT_MIN_JS, ACTIVE_TAG);

    return { script, version };
}
