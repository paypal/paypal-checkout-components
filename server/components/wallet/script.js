/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';
import { memoize } from 'belter';

import type { CacheType, ExpressResponse } from '../../types';
import { WALLET_CLIENT_JS, WALLET_CLIENT_MIN_JS, WEBPACK_CONFIG } from '../../config';
import { isLocal, compileWebpack, babelRequire, type LoggerBufferType, evalRequireScript } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';
import { getWebpackDevScript } from '../../lib/webpack';

export async function compileLocalSmartWalletClientScript(res : ExpressResponse) : Promise<string> {
    const devScript = getWebpackDevScript(res);

    if (devScript) {
        return devScript;
    }

    const root = join(__dirname, '../../..');
    const { WEBPACK_CONFIG_WALLET_LOCAL_DEBUG } = babelRequire(join(root, WEBPACK_CONFIG));
    return await compileWebpack(WEBPACK_CONFIG_WALLET_LOCAL_DEBUG, root);
}

type WalletClientScript = {|
    // eslint-disable-next-line no-undef
    renderWallet : <T>(props : T) => 'string'
|};

type SmartWalletClientScript = {|
    getVersion : () => Promise<string>,
    getScript : () => Promise<string>,
    importScript : () => Promise<WalletClientScript>
|};

export function getSmartWalletClientScript({ res, logBuffer, cache, debug = false } : {res : ExpressResponse, debug : boolean, logBuffer : ?LoggerBufferType, cache : ?CacheType } = {}) : SmartWalletClientScript {
    const getWatcher = memoize(() => getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache }));
    
    const getVersion = async () => {
        if (isLocal()) {
            return ENV.LOCAL;
        }

        const { version } = await getWatcher().get();
        return version;
    };

    const getScript = async () => {
        if (isLocal()) {
            return await compileLocalSmartWalletClientScript(res);
        }

        return await getWatcher().read(debug ? WALLET_CLIENT_JS : WALLET_CLIENT_MIN_JS);
    };

    const importScript = async () => {
        if (isLocal()) {
            return evalRequireScript(await compileLocalSmartWalletClientScript(res));
        }

        return await getWatcher().import(debug ? WALLET_CLIENT_JS : WALLET_CLIENT_MIN_JS);
    };
    
    return { getVersion, getScript, importScript };
}
