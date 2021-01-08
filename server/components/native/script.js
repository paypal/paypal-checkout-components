/* @flow */

import { join, dirname } from 'path';
import { readFileSync } from 'fs';

import { ENV, FUNDING } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { NATIVE_POPUP_CLIENT_JS, NATIVE_POPUP_CLIENT_MIN_JS, NATIVE_FALLBACK_CLIENT_JS,
    NATIVE_FALLBACK_CLIENT_MIN_JS, SMART_BUTTONS_MODULE, WEBPACK_CONFIG, ACTIVE_TAG } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, resolveScript, evalRequireScript, dynamicRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

const ROOT = join(__dirname, '../../..');

export type NativePopupClientScript = {|
    script : string,
    version : string
|};

export async function compileNativePopupClientScript() : Promise<?NativePopupClientScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_NATIVE_POPUP_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_NATIVE_POPUP_DEBUG, ROOT);
        return { script, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, NATIVE_POPUP_CLIENT_JS));

    if (distScriptPath) {
        const script = readFileSync(distScriptPath).toString();
        return { script, version: ENV.LOCAL };
    }
}

type GetNativePopupClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getNativePopupClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest() } : GetNativePopupClientScriptOptions = {}) : Promise<NativePopupClientScript> {
    if (useLocal) {
        const script = await compileNativePopupClientScript();
        if (script) {
            return script;
        }
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? NATIVE_POPUP_CLIENT_JS : NATIVE_POPUP_CLIENT_MIN_JS, ACTIVE_TAG);

    return { script, version };
}

export type NativePopupRenderScript = {|
    popup : {|
        // eslint-disable-next-line no-undef
        NativePopup : <T>({| fundingSource : $Values<typeof FUNDING>, cspNonce : string |}) => T
    |},
    version : string
|};


type GetNativePopupRenderScriptOptions = {|
    debug : boolean,
    logBuffer : LoggerBufferType,
    cache : CacheType,
    useLocal? : boolean
|};

async function getLocalNativePopupRenderScript() : Promise<?NativePopupRenderScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const dir = dirname(webpackScriptPath);
        const { WEBPACK_CONFIG_NATIVE_POPUP } = babelRequire(webpackScriptPath);
        const popup = evalRequireScript(await compileWebpack(WEBPACK_CONFIG_NATIVE_POPUP, dir));
        return { popup, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, NATIVE_POPUP_CLIENT_JS));

    if (distScriptPath) {
        const popup = dynamicRequire(distScriptPath);
        return { popup, version: ENV.LOCAL };
    }
}

export async function getNativePopupRenderScript({ logBuffer, cache, debug, useLocal = isLocalOrTest() } : GetNativePopupRenderScriptOptions = {}) : Promise<NativePopupRenderScript> {
    if (useLocal) {
        const script = await getLocalNativePopupRenderScript();
        if (script) {
            return script;
        }
    }
    
    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const popup = await watcher.import(debug ? NATIVE_POPUP_CLIENT_JS : NATIVE_POPUP_CLIENT_MIN_JS, ACTIVE_TAG);
    return { popup, version };
}

export type NativeFallbackClientScript = {|
    script : string,
    version : string
|};

export async function compileNativeFallbackClientScript() : Promise<?NativeFallbackClientScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_NATIVE_FALLBACK_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_NATIVE_FALLBACK_DEBUG, ROOT);
        return { script, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, NATIVE_FALLBACK_CLIENT_JS));

    if (distScriptPath) {
        const script = readFileSync(distScriptPath).toString();
        return { script, version: ENV.LOCAL };
    }
}

type GetNativeFallbackClientScriptOptions = {|
    debug : boolean,
    logBuffer : LoggerBufferType,
    cache : CacheType,
    useLocal? : boolean
|};

export async function getNativeFallbackClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest() } : GetNativeFallbackClientScriptOptions = {}) : Promise<NativeFallbackClientScript> {
    if (useLocal) {
        const script = await compileNativeFallbackClientScript();
        if (script) {
            return script;
        }
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? NATIVE_FALLBACK_CLIENT_JS : NATIVE_FALLBACK_CLIENT_MIN_JS, ACTIVE_TAG);

    return { script, version };
}

export type NativeFallbackRenderScript = {|
    fallback : {|
        // eslint-disable-next-line no-undef
        NativeFallback : <T>({| fundingSource : $Values<typeof FUNDING>, cspNonce : string |}) => T
    |},
    version : string
|};


type GetNativeFallbackRenderScriptOptions = {|
    debug : boolean,
    logBuffer : LoggerBufferType,
    cache : CacheType,
    useLocal? : boolean
|};

async function getLocalNativeFallbackRenderScript() : Promise<?NativeFallbackRenderScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const dir = dirname(webpackScriptPath);
        const { WEBPACK_CONFIG_NATIVE_FALLBACK } = babelRequire(webpackScriptPath);
        const fallback = evalRequireScript(await compileWebpack(WEBPACK_CONFIG_NATIVE_FALLBACK, dir));
        return { fallback, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, NATIVE_FALLBACK_CLIENT_JS));

    if (distScriptPath) {
        const fallback = dynamicRequire(distScriptPath);
        return { fallback, version: ENV.LOCAL };
    }
}

export async function getNativeFallbackRenderScript({ logBuffer, cache, debug, useLocal = isLocalOrTest() } : GetNativeFallbackRenderScriptOptions = {}) : Promise<NativeFallbackRenderScript> {
    if (useLocal) {
        const script = await getLocalNativeFallbackRenderScript();
        if (script) {
            return script;
        }
    }
    
    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const fallback = await watcher.import(debug ? NATIVE_FALLBACK_CLIENT_JS : NATIVE_FALLBACK_CLIENT_MIN_JS, ACTIVE_TAG);
    return { fallback, version };
}
