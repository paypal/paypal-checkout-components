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

        let key = 'stage';
        let optKey = 'data-stage';
        let val = 'stage2qa1234';

        return verifySetupOptions({
            key,
            val,
            options: {
                [ optKey ]: val
            }
        }).toPromise();
    });

    it('should call setup and customize logLevel', () => {

        let key = 'logLevel';
        let optKey = 'data-log-level';
        let val = 'debug';

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

        let key = 'env';
        let optKey = 'data-env';
        let val = 'stage';

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

        let key = 'apiStage';
        let optKey = 'data-api-stage';
        let val = 'stage2qa1234';

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

        let key = 'state';
        let optKey = 'data-state';
        let val = 'abc123';

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

        let key = 'state';
        let optKey = 'data-state';
        let val = 'abc123';

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
