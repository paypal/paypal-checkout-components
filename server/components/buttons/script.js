/* @flow */

import { join, dirname } from 'path';
import { readFileSync } from 'fs';

import { importDependency } from '@krakenjs/grabthar'
import { noop } from '@krakenjs/belter';
import { ENV } from '@paypal/sdk-constants';

import type { CacheType, InstanceLocationInformation, SDKVersionManager } from '../../types';
import { BUTTON_RENDER_JS, BUTTON_CLIENT_JS, SMART_BUTTONS_MODULE, CHECKOUT_COMPONENTS_MODULE,
    BUTTON_CLIENT_MIN_JS, WEBPACK_CONFIG, ACTIVE_TAG } from '../../config';
import { isLocalOrTest, compileWebpack, babelRequire, evalRequireScript, resolveScript,
    dynamicRequire, type LoggerBufferType } from '../../lib';
import { getPayPalSmartPaymentButtonsWatcher } from '../../watchers';


const ROOT = join(__dirname, '../../..');

export type SmartPaymentButtonsRenderScript = {|
    Buttons : ({||}) => {|
        // eslint-disable-next-line no-undef
        render : <T>(() => T) => T
    |},
    validateButtonProps : ({||}) => void
|};

export async function getLocalSmartPaymentButtonRenderScript() : Promise<?SmartPaymentButtonsRenderScript> {
    const webpackScriptPath = resolveScript(join(CHECKOUT_COMPONENTS_MODULE, WEBPACK_CONFIG));

    if (webpackScriptPath && isLocalOrTest()) {
        const dir = dirname(webpackScriptPath);
        const { WEBPACK_CONFIG_BUTTON_RENDER } = babelRequire(webpackScriptPath);
        return evalRequireScript(await compileWebpack(WEBPACK_CONFIG_BUTTON_RENDER, dir));
    }

    const distScriptPath = resolveScript(join(CHECKOUT_COMPONENTS_MODULE, BUTTON_RENDER_JS));

    if (distScriptPath) {
        return Promise.resolve(dynamicRequire(distScriptPath));
    }

    return Promise.resolve()
}

type GetPayPalSmartPaymentButtonsRenderScriptOptions = {|
    logBuffer : ?LoggerBufferType,
    cache : ?CacheType,
    useLocal? : boolean,
    sdkCDNRegistry : ?string,
    sdkVersionManager : SDKVersionManager
|};

export async function getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache, useLocal = isLocalOrTest(), sdkCDNRegistry, sdkVersionManager } : GetPayPalSmartPaymentButtonsRenderScriptOptions) : Promise<SmartPaymentButtonsRenderScript> {
    if (useLocal) {
        const script = await getLocalSmartPaymentButtonRenderScript();
        if (script) {
            return script;
        }
    }

    const moduleDetails = await sdkVersionManager.getOrInstallSDK({
        cdnRegistry:  sdkCDNRegistry || '',
        childModules: [ CHECKOUT_COMPONENTS_MODULE ],
        flat:         true,
        dependencies: true,
        logger:       logBuffer,
        cache
    })

    return importDependency({
        moduleDetails,
        dependencyName: CHECKOUT_COMPONENTS_MODULE,
        path: BUTTON_RENDER_JS
    });
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
    useLocal? : boolean,
    locationInformation : InstanceLocationInformation
|};

export async function getSmartPaymentButtonsClientScript({ logBuffer, cache, debug = false, useLocal = isLocalOrTest(), locationInformation } : GetSmartPaymentButtonsClientScriptOptions = {}) : Promise<SmartPaymentButtonsClientScript> {
    if (useLocal) {
        const script = await compileLocalSmartButtonsClientScript();
        if (script) {
            return script;
        }
    }

    const { getTag, getDeployTag, read } = getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache, locationInformation });
    const { version } = await getTag();
    const script = await read(debug ? BUTTON_CLIENT_JS : BUTTON_CLIENT_MIN_JS, ACTIVE_TAG);

    // non-blocking download of the DEPLOY_TAG
    getDeployTag().catch(noop);

    return { script, version };
}
