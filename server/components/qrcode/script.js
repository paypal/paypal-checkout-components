/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { QRCODE_CLIENT_JS, QRCODE_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG, SMART_BUTTONS_MODULE } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, resolveScript, dynamicRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

const ROOT = join(__dirname, '../../..');

type SmartQRCodeClientScript = {|
    script : string,
    version : string
|};

export async function compileLocalSmartQRCodeClientScript() : Promise<?SmartQRCodeClientScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_QRCODE_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_QRCODE_DEBUG, ROOT);
        return { script, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, QRCODE_CLIENT_JS));

    if (distScriptPath) {
        const script = dynamicRequire(distScriptPath);
        return { script, version: ENV.LOCAL };
    }
}

type GetSmartQRCodeClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getSmartQRCodeClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest() } : GetSmartQRCodeClientScriptOptions = {}) : Promise<SmartQRCodeClientScript> {
    if (useLocal) {
        const script = await compileLocalSmartQRCodeClientScript();

        if (script) {
            return script;
        }
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? QRCODE_CLIENT_JS : QRCODE_CLIENT_MIN_JS, ACTIVE_TAG);

    return { script, version };
}
