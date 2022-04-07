/* @flow */

import { join } from 'path';
import { readFileSync } from 'fs';

import { noop } from '@krakenjs/belter';
import { ENV } from '@paypal/sdk-constants';

import type { CacheType, InstanceLocationInformation } from '../../types';
import { QRCODE_CLIENT_JS, QRCODE_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG, SMART_BUTTONS_MODULE } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, resolveScript, type LoggerBufferType } from '../../lib';
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
        const script = readFileSync(distScriptPath).toString();
        return { script, version: ENV.LOCAL };
    }
}

type GetSmartQRCodeClientScriptOptions = {|
    debug : boolean,
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean,
    locationInformation : InstanceLocationInformation
|};

export async function getSmartQRCodeClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest(), locationInformation } : GetSmartQRCodeClientScriptOptions = {}) : Promise<SmartQRCodeClientScript> {
    if (useLocal) {
        const script = await compileLocalSmartQRCodeClientScript();

        if (script) {
            return script;
        }
    }

    const { getTag, getDeployTag, read } = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache, locationInformation });
    const { version } = await getTag();
    const script = await read(debug ? QRCODE_CLIENT_JS : QRCODE_CLIENT_MIN_JS, ACTIVE_TAG);

    // non-blocking download of the DEPLOY_TAG
    getDeployTag().catch(noop);

    return { script, version };
}
