/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { testSetup } from './common';

function verifySetupOptions({ options, key, val, expected } : { options : Object, key : string, val : string, expected? : string }) : ZalgoPromise<void> {
    return testSetup({
        options,
        script: `
            var key      = '${ key }';
            var expected = '${ expected || val }';
            var actual   = window.paypal.config[key];

            if (actual === expected) {
                resolve();
            } else {
                reject(new Error('Expected ' + key + ' to be ' + expected + ', got ' + actual));
            }
        `
    });
}

describe('paypal initial setup', () => {

    it('should call setup for script tag', () => {

        const key = 'stage';
        const optKey = 'data-stage';
        const val = 'stage2qa1234';

        return verifySetupOptions({
            key,
            val,
            options: {
                [ optKey ]: val
            }
        }).toPromise();
    });

    it('should call setup and customize logLevel', () => {

        const key = 'logLevel';
        const optKey = 'data-log-level';
        const val = 'debug';

        return verifySetupOptions({
            key,
            val,
            options: {
                'data-paypal-checkout': '',
                [ optKey ]:             val
            }
        }).toPromise();
    });

    it('should call setup and customize env', () => {

        const key = 'env';
        const optKey = 'data-env';
        const val = 'stage';

        return verifySetupOptions({
            key,
            val,
            options: {
                'data-paypal-checkout': '',
                [ optKey ]:             val
            }
        }).toPromise();
    });

    it('should call setup and customize apiStage', () => {

        const key = 'apiStage';
        const optKey = 'data-api-stage';
        const val = 'stage2qa1234';

        return verifySetupOptions({
            key,
            val,
            options: {
                'data-paypal-checkout': '',
                [ optKey ]:             val
            }
        }).toPromise();
    });

    it('should call setup and customize state', () => {

        const key = 'state';
        const optKey = 'data-state';
        const val = 'abc123';

        return verifySetupOptions({
            key,
            val,
            options: {
                'data-paypal-checkout': '',
                [ optKey ]:             val
            }
        }).toPromise();
    });

    it('should call setup and customize state', () => {

        const key = 'state';
        const optKey = 'data-state';
        const val = 'abc123';

        return verifySetupOptions({
            key,
            val,
            options: {
                'data-paypal-checkout': '',
                [ optKey ]:             val
            }
        }).toPromise();
    });
});
