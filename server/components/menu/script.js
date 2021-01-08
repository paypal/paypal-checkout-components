/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { MENU_CLIENT_JS, MENU_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG, SMART_BUTTONS_MODULE } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, resolveScript, dynamicRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

const ROOT = join(__dirname, '../../..');

type SmartMenuClientScript = {|
    script : string,
    version : string
|};

export async function compileLocalSmartMenuClientScript() : Promise<?SmartMenuClientScript> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_MENU_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_MENU_DEBUG, ROOT);
        return { script, version: ENV.LOCAL };
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, MENU_CLIENT_JS));

    if (distScriptPath) {
        const script = dynamicRequire(distScriptPath);
        return { script, version: ENV.LOCAL };
    }
}

type GetSmartMenuClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getSmartMenuClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest() } : GetSmartMenuClientScriptOptions = {}) : Promise<SmartMenuClientScript> {
    if (useLocal) {
        const script = await compileLocalSmartMenuClientScript();

        if (script) {
            return script;
        }
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? MENU_CLIENT_JS : MENU_CLIENT_MIN_JS, ACTIVE_TAG);

    return { script, version };
}
