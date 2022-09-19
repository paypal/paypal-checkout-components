/* @flow */

import { getNonce } from './dom';

describe('dom utils', () => {
    describe('getNonce', () => {
        it('returns the nonce value', () => {
            // $FlowIssue - we know body exists as this runs in jsdom
            document.body.setAttribute('data-nonce', 'abc123');
            expect(getNonce()).toBe('abc123');
        });
    });
});
