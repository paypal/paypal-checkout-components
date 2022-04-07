/* @flow */

import { noop } from '@krakenjs/belter';

import { compileLocalSmartQRCodeClientScript, getSmartQRCodeClientScript } from './script';

// $FlowFixMe
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
    const locationInformation = {
        cdnHostName:  '',
        paypalDomain: ''
    };
    const script = await getSmartQRCodeClientScript({ logBuffer, cache, debug, locationInformation });

    if (!script) {
        throw new Error(`Expected a script from compileLocalSmartQRCodeClientScript`);
    }
});
