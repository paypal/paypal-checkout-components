/* global paypal */
/* @flow */

import { assert } from 'chai';

import { getElement, getElements } from './common';
import { PPTM_ID } from '../../src/config';

const destroyPptmScripts = () => {
    let scripts;

    try {
        scripts = [].slice.call(getElements('script'), 0);
    } catch (e) {
        scripts = [];
    }

    scripts
        .filter(s => s.id === PPTM_ID)
        .forEach(s => {
            s.parentNode.removeChild(s);
        });
};

describe('pptm script creation', () => {
    let oldMockDomain;

    beforeEach(() => {
        oldMockDomain = window.mockDomain;

        destroyPptmScripts();
    });

    afterEach(() => {
        window.mockDomain = oldMockDomain;

        destroyPptmScripts();
    });

    it('should download pptm.js file in an "async" script with as the "?id=`window.location.hostname`&t=xo"', () => {
        // $FlowFixMe
        paypal.setup({
            env: 'test'
        });

        let el = getElement(`#${PPTM_ID}`);

        // $FlowFixMe
        assert.equal(el.async, true);
        // $FlowFixMe
        assert.include(el.src, `pptm.js?id=${window.location.hostname}&t=xo`);
    });

    it('should not download pptm.js file twice if `setup` is called more than once', () => {
        // $FlowFixMe
        paypal.setup({
            env: 'test'
        });

        paypal.setup({
            env: 'test'
        });

        const scripts = [].slice.call(getElements('script'), 0);

        const count = scripts.reduce((prev, curr) => {
            return (curr.id === PPTM_ID) ? prev + 1 : prev;
        }, 0);

        assert.equal(count, 1);
    });

    it('should not add pptm.js script tag when inside a PayPal domain', () => {
        window.mockDomain = 'mock://www.paypal.com';

        // $FlowFixMe
        paypal.setup({
            env: 'test'
        });

        try {
            getElement(`#${PPTM_ID}`);
        } catch (e) {
            // `getElement` throws when it doesn't find something
            // so returning here is the success case
            return;
        }

        assert.fail('pptm script should not exist');
    });
});
