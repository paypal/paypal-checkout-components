/* @flow */

import { getVersionFromNodeModules } from '@krakenjs/grabthar'

import { type SDKVersionManager } from "../../types"

import { compileLocalSmartQRCodeClientScript, getSmartQRCodeClientScript } from './script';

// $FlowFixMe
jest.setTimeout(30000);

// $FlowFixMe testing impl
const buttonsVersionManager: SDKVersionManager = {
    getLiveVersion: () => '5.0.100',
    getOrInstallSDK: async (...args) => await getVersionFromNodeModules(args),
}

test('compileLocalSmartQRCodeClientScript', async () => {
    const script = await compileLocalSmartQRCodeClientScript();

    if (!script) {
        throw new Error(`Expected a script from compileLocalSmartQRCodeClientScript`);
    }
});

test('getSmartQRCodeClientScript - base', async () => {
    const script = await getSmartQRCodeClientScript();

    if (!script) {
        throw new Error(`Expected a script from compileLocalSmartQRCodeClientScript`);
    }
});

test('getSmartQRCodeClientScript - debug', async () => {
    const debug = true;

    const script = await getSmartQRCodeClientScript({ debug, buttonsVersionManager });

    if (!script) {
        throw new Error(`Expected a script from compileLocalSmartQRCodeClientScript`);
    }
});
