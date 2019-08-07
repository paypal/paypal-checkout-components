/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import { MENU_CLIENT_JS, MENU_CLIENT_MIN_JS, WEBPACK_CONFIG } from '../config';
import { isLocal, compileWebpack, babelRequire } from '../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../watchers';

export async function compileLocalSmartMenuClientScript() : Promise<{ script : string, version : string }> {
    const root = join(__dirname, '../..');
    const { WEBPACK_CONFIG_MENU_DEBUG } = babelRequire(join(root, WEBPACK_CONFIG));
    const script = await compileWebpack(WEBPACK_CONFIG_MENU_DEBUG, root);
    return { script, version: ENV.LOCAL };
}

export async function getSmartMenuClientScript({ debug = false } : { debug : boolean } = {}) : Promise<{ script : string, version : string }> {
    if (isLocal()) {
        return await compileLocalSmartMenuClientScript();
    }

    const watcher = getPayPalSmartPaymentButtonsWatcher();
    const { version } = await watcher.get();
    const script = await watcher.read(debug ? MENU_CLIENT_JS : MENU_CLIENT_MIN_JS);

    return { script, version };
}
