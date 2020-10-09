/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { MENU_CLIENT_JS, MENU_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG } from '../../config';
import { isLocal, compileWebpack, babelRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

const ROOT = join(__dirname, '../../..');

type SmartMenuClientScript = {|
    script : string,
    version : string
|};

export async function compileLocalSmartMenuClientScript() : Promise<SmartMenuClientScript> {
    const { WEBPACK_CONFIG_MENU_DEBUG } = babelRequire(join(ROOT, WEBPACK_CONFIG));
    const script = await compileWebpack(WEBPACK_CONFIG_MENU_DEBUG, ROOT);
    return { script, version: ENV.LOCAL };
}

type GetSmartMenuClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean
|};

export async function getSmartMenuClientScript({ logBuffer, cache, debug = false, useLocal = isLocal() } : GetSmartMenuClientScriptOptions = {}) : Promise<SmartMenuClientScript> {
    if (useLocal) {
        return await compileLocalSmartMenuClientScript();
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get(ACTIVE_TAG);
    const script = await watcher.read(debug ? MENU_CLIENT_JS : MENU_CLIENT_MIN_JS);

    return { script, version };
}
