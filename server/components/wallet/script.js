/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import type { CacheType } from '../../types';
import { WALLET_CLIENT_JS, WALLET_CLIENT_MIN_JS, WEBPACK_CONFIG } from '../../config';
import { isLocal, compileWebpack, babelRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';

export async function compileLocalSmartWalletClientScript() : Promise<{ script : string, version : string }> {
    const root = join(__dirname, '../../..');
    const { WEBPACK_CONFIG_WALLET_DEBUG } = babelRequire(join(root, WEBPACK_CONFIG));
    const script = await compileWebpack(WEBPACK_CONFIG_WALLET_DEBUG, root);
    return { script, version: ENV.LOCAL };
}

export async function getSmartWalletClientScript({ logBuffer, cache, debug = false } : { debug : boolean, logBuffer : ?LoggerBufferType, cache : ?CacheType } = {}) : Promise<{ script : string, version : string }> {
    if (isLocal()) {
        return await compileLocalSmartWalletClientScript();
    }
    
    const watcher = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
    const { version } = await watcher.get();
    const script = await watcher.read(debug ? WALLET_CLIENT_JS : WALLET_CLIENT_MIN_JS);
    
    return { script, version };
}
