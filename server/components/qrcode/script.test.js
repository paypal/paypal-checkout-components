/* @flow */

import { noop } from 'belter';

import { compileLocalSmartQRCodeClientScript, getSmartQRCodeClientScript } from './script';

// eslint-disable-next-line no-undef
jest.setTimeout(30000);

const cache = {
    // eslint-disable-next-line no-unused-vars
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(value)
};

const logBuffer = {
    debug: noop,
    info:  noop,
    flush: noop,
    warn:  noop,
    error: noop
};

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
    const script = await getSmartQRCodeClientScript({ logBuffer, cache, debug });

    if (!script) {
        throw new Error(`Expected a script from compileLocalSmartQRCodeClientScript`);
    }
});
