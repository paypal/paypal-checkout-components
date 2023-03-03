/* @flow */

import { WEBVIEW_USER_AGENT } from './common';

describe('security cases', () => {

    it('should error out when not on paypal domain', () => {
        let error;

        try {
            window.paypal.allowIframe();
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should return false by default on paypal domain', () => {
        window.mockDomain = 'mock://www.paypal.com';

        const result = window.paypal.allowIframe();

        if (result) {
            throw new Error(`Expected iframes to not be allowed`);
        }
    });

    it('should return true when popups are not supported', () => {
        window.mockDomain = 'mock://www.paypal.com';
        window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

        const result = window.paypal.allowIframe();

        if (!result) {
            throw new Error(`Expected iframes to be allowed`);
        }
    });

    it('should return true when parent component is the same domain', () => {
        window.mockDomain = 'mock://www.paypal.com';
        window.xprops = {
            getParent: () => window
        };

        const result = window.paypal.allowIframe();

        if (!result) {
            throw new Error(`Expected iframes to be allowed`);
        }
    });
});
