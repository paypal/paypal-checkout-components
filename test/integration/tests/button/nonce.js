/* @flow */
/* eslint max-lines: 0 */

import { createTestContainer, destroyTestContainer, getElements, assert } from '../common';

describe('paypal button component with csp nonce', () => {
    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render style tags with nonce', () => {

        return window.paypal.Buttons().render('#testContainer').then(() => {
            getElements('#testContainer style').forEach(styleElement => {
                assert.ok(styleElement.getAttribute('nonce'));
            });

        });
    });

    it('should prioritize nonce prop', () => {
        const nonce = 'test-nonce-value';

        return window.paypal.Buttons({ nonce }).render('#testContainer').then(() => {
            getElements('#testContainer style').forEach(styleElement => {
                assert.equal(styleElement.getAttribute('nonce'), nonce);
            });

        });
    });
});
