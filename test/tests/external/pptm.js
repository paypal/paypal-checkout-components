/* @flow */
/* eslint max-lines: 0 */
import { config } from '../../../src/config';
import { PPTM_ID } from '../../../src/constants';
import { createTestContainer, destroyTestContainer, destroyElement } from '../common';

describe(`external pptm`, () => {
    let oldMockDomain;
    let oldMerchantId;

    beforeEach(() => {
        // We're using these 2 values in the tests below, so we'll keep a hold
        // of them and reset them after each test run so we don't affect any other
        // test suites.
        oldMockDomain = window.mockDomain;
        oldMerchantId = config.merchantID;

        // `setup` in called in the main test index file, which creates the PPTM script.
        // However, before each test we'll go ahead and get rid of it (and then in the
        // `after` block, we'll re-create it in order to go back to our initial state so other
        // tests continue with the same expected state).
        destroyElement(PPTM_ID);
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();

        window.mockDomain = oldMockDomain;
        config.merchantID = oldMerchantId;
    });

    after(() => {
        const pptm = require('../../../src/external/pptm').pptm;
        // Go back to our initial state
        pptm.createPptmScript();
    });

    const checkPptmLoad = done => {
        const scripts = Array.prototype.slice.call(document.getElementsByTagName('script'), 0).filter(script => {
            return script.id === PPTM_ID;
        });

        if (scripts.length === 0) {
            return done(new Error('Expected pptm script to be loaded'));
        }

        if (scripts.length > 1) {
            return done(new Error(`Expected pptm script to be loaded only once, but it was loaded ${ scripts.length } times`));
        }

        const el = scripts[0];

        if (!el.async) {
            return done(new Error('Expected pptm script to be async'));
        }

        const expectedUrl = `pptm.js?client_id=foo&id=${ window.location.hostname }&source=checkoutjs&t=xo&v=test_minor`;

        if (el.src.indexOf(expectedUrl) === -1) {
            return done(new Error(`Expected pptm script to contain ${ expectedUrl } but found ${ el.src }`));
        }

        return done();
    };

    it('should push one and only one `paypalButtonRender` event to paypalDDL when button is rendered', done => {
        window.paypal.Button.render({
            env:    'test',
            client: {
                test: 'foo'
            },
            test: {
                onRender() : void {
                    const renderEventQueue = window.paypalDDL.filter(e => e.event === 'paypalButtonRender');
                    if (renderEventQueue.length === 0) {
                        return done(new Error('Expected `paypalButtonRender` event to be pushed to paypalDDL'));
                    }
                    if (renderEventQueue.length > 1) {
                        return done(new Error('Expected only one `paypalButtonRender` event to be pushed to paypalDDL'));
                    }
                    done();
                }
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            }
        }, '#testContainer');
    });

    it('should re-load the pptm script during button render with async prop and correct url when a client ID is present (render called *after* initial pptm is loaded)', done => {
        const pptm = require('../../../src/external/pptm').pptm;
        // Mock this side-effect from `setup` being called.
        pptm.createPptmScript();

        // Mock the serverside callback to retry creating the script.
        window[pptm.callback]();

        window.paypal.Button.render({
            env:    'test',
            client: {
                test: 'foo'
            },
            test: {
                onRender() : void {
                    return checkPptmLoad(done);
                }
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            }
        }, '#testContainer');
    });

    it('should re-load the pptm script during button render with async prop and correct url when a client ID is present (render called *before* initial pptm is loaded)', done => {
        const pptm = require('../../../src/external/pptm').pptm;
        // Mock this side-effect from `setup` being called.
        pptm.createPptmScript();

        window.paypal.Button.render({
            env:    'test',
            client: {
                test: 'foo'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            }
        }, '#testContainer');

        // Mock the serverside callback to retry creating the script.
        window[pptm.callback]();

        return checkPptmLoad(done);
    });

    it('should not load pptm.js script tag from button render when inside a PayPal domain', done => {
        const pptm = require('../../../src/external/pptm').pptm;
        window.mockDomain = 'mock://www.paypal.com';

        // Mock the serverside callback to retry creating the script.
        window[pptm.callback]();

        window.paypal.Button.render({
            test: {
                onRender() : void {
                    const el = document.getElementById(PPTM_ID);

                    if (el) {
                        return done(new Error(`Expected pptm script to not be loaded, window.location.hostname = ${ window.location.hostname }, window.mockDomain = ${ window.mockDomain }`));
                    }

                    return done();
                }
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            }
        }, '#testContainer');
    });

    it('should not re-load pptm.js script tag from button render if config.merchantID was already provided (since `setup` would have created pptm with the mrid param)', done => {
        const pptm = require('../../../src/external/pptm').pptm;
        config.merchantID = 'foo';

        // Mock the serverside callback to retry creating the script.
        window[pptm.callback]();

        window.paypal.Button.render({
            test: {
                onRender() : void {
                    const el = document.getElementById(PPTM_ID);

                    if (el) {
                        return done(new Error(`Expected pptm script to not be loaded, config.merchantID = ${ config.merchantID }`));
                    }

                    return done();
                }
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            }
        }, '#testContainer');
    });
});
