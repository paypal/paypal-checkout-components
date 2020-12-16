/* @flow */
/* eslint max-nested-callbacks: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupNativeFallback } from '../../src/native/fallback';

describe('Native fallback cases', () => {

    beforeEach(() => {
        delete window.paypal;
        window.location.hash = '';
    });

    it('should open the native fallback and send a detect web switch message', () => {
        return wrapPromise(({ expect }) => {
            const opener = {};
            const parentDomain = 'foo.paypal.com';
            let detectedWebSwitch = false;

            window.opener = opener;

            window.paypal = {
                postRobot: {
                    send: expect('postRobotSend', (win, event, payload, opts) => {
                        if (win !== opener) {
                            throw new Error(`Expected message to be sent to parent`);
                        }

                        if (!opts || opts.domain !== parentDomain) {
                            throw new Error(`Expected message to be sent to ${ parentDomain }, got ${ opts ? opts.domain : 'undefined' }`);
                        }

                        if (!event) {
                            throw new Error(`Expected event to be passed`);
                        }

                        if (event === 'detectWebSwitch') {
                            detectedWebSwitch = true;

                            return ZalgoPromise.resolve({
                                source: window,
                                origin: window.location.origin,
                                data:   null
                            });
                        }

                        throw new Error(`Unrecognized event: ${ event }`);
                    })
                }
            };
            
            const nativeFallback = setupNativeFallback({ parentDomain });

            return ZalgoPromise.delay(50).then(() => {
                if (!detectedWebSwitch) {
                    throw new Error(`Expected web switch to be detected`);
                }

                return nativeFallback.destroy();
            });
        });
    });
});
