/* @flow */

import { PPTM_ID } from '../../../src/constants';

import { testSetup } from './common';

describe('paypal pptm script setup', () => {

    it('should load pptm script with async prop and correct url', () => {
        return testSetup({
            script: `
                var el = document.getElementById('${ PPTM_ID }');

                if (!el) {
                    return reject(new Error('Expected pptm script to be loaded'));
                }

                if (!el.async) {
                    return reject(new Error('Expected pptm script to be async'));
                }

                let expectedUrl = 'pptm.js?id=' + window.location.hostname + '&t=xo';

                if (el.src.indexOf(expectedUrl) === -1) {
                    return reject(new Error('Expected pptm script to contain ' + expectedUrl + ' but found ' + el.src));
                }

                return resolve()
            `
        }).toPromise();
    });

    it('should not download pptm.js file twice if `setup` is called more than once', () => {
        return testSetup({
            script: `
                window.paypal.setup({
                    env: 'test'
                });

                window.paypal.setup({
                    env: 'test'
                });

                const scripts = Array.prototype.slice.call(document.getElementsByTagName('script'), 0);

                const count = scripts.filter(function(script) {
                    return script.id === '${ PPTM_ID }';
                }).length;

                if (count !== 1) {
                    return reject(new Error('Expected pptm script to be loaded 1 time, was loaded ' + count + ' times'));
                }

                return resolve();
            `
        }).toPromise();
    });

    it('should not add pptm.js script tag when inside a PayPal domain', () => {
        return testSetup({
            preScript: `
                window.mockDomain = 'mock://www.paypal.com';
            `,

            script: `
                var el = document.getElementById('${ PPTM_ID }');

                if (el) {
                    return reject(new Error('Expected pptm script to not be loaded'));
                }

                return resolve();
            `
        }).toPromise();
    });
});
