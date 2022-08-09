/* @flow */

import { join } from 'path';
import { readFileSync } from 'fs';

import { getFile } from '@krakenjs/grabthar';

import type { SDKVersionManager } from '../../types';
import { QRCODE_CLIENT_JS, QRCODE_CLIENT_MIN_JS, WEBPACK_CONFIG, SMART_BUTTONS_MODULE } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, resolveScript } from '../../lib';

const ROOT = join(__dirname, '../../..');

export async function compileLocalSmartQRCodeClientScript() : Promise<?string> {
    const webpackScriptPath = resolveScript(join(ROOT, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const { WEBPACK_CONFIG_QRCODE_DEBUG } = babelRequire(webpackScriptPath);
        const script = await compileWebpack(WEBPACK_CONFIG_QRCODE_DEBUG, ROOT);
        return script;
    }

    const distScriptPath = resolveScript(join(SMART_BUTTONS_MODULE, QRCODE_CLIENT_JS));

    if (distScriptPath) {
        const script = readFileSync(distScriptPath).toString();
        return script;
    }
}

type GetSmartQRCodeClientScriptOptions = {|
    debug : boolean,
    useLocal? : boolean,
    buttonsVersionManager : SDKVersionManager
|};

export async function getSmartQRCodeClientScript({ debug = false, useLocal = isLocalOrTest(), buttonsVersionManager } : GetSmartQRCodeClientScriptOptions = {}) : Promise<string> {
    if (useLocal) {
        const script = await compileLocalSmartQRCodeClientScript();

        if (script) {
            return script;
        }
    }

    const moduleDetails = await buttonsVersionManager.getOrInstallSDK()

    return getFile({
        moduleDetails,
        path: debug ? QRCODE_CLIENT_JS : QRCODE_CLIENT_MIN_JS
    })
}
