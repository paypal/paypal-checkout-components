/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise } from '@krakenjs/belter/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import { createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, WEBVIEW_USER_AGENT, mockProp } from '../common';

describe(`paypal standalone marks`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
        if (!window.__TEST_FUNDING_ELIGIBILITY__[fundingSource]) {
            continue;
        }

        it(`should render a standalone ${ fundingSource } mark and succeed when eligible`, () => {
            return wrapPromise(() => {
                if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                    window.ApplePaySession = {
                        canMakePayments: () => true,
                        supportsVersion: () => true
                    };
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

                const mark = window.paypal.Marks({
                    test: {},
                    fundingSource

                });

                if (!mark.isEligible()) {
                    throw new Error(`Expected mark to be eligible`);
                }

                return mark.render('#testContainer').then(() => {
                    mockEligibility.cancel();
                });
            });
        });

        it(`should not render a standalone ${ fundingSource } mark and error out when not eligible`, () => {
            return wrapPromise(({ expect }) => {
                if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

                const mark = window.paypal.Marks({
                    test: {},
                    fundingSource
                });

                if (mark.isEligible()) {
                    throw new Error(`Expected mark to not be eligible`);
                }

                return mark.render('#testContainer').catch(expect('markRenderCatch')).then(() => {
                    mockEligibility.cancel();
                });
            });
        });
    }

    it(`should render a standalone venmo mark and error out when not on mobile, even when venmo is eligible`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.VENMO;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

            const mark = window.paypal.Marks({
                test: {},
                fundingSource
            });

            if (mark.isEligible()) {
                throw new Error(`Expected mark to not be eligible`);
            }

            return mark.render('#testContainer').catch(expect('markRenderCatch')).then(() => {
                mockEligibility.cancel();
            });
        });
    });

    it(`should render a standalone venmo mark and error out for webviews`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.VENMO;
            window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

            const mark = window.paypal.Marks({
                test: {},
                fundingSource
            });

            if (mark.isEligible()) {
                throw new Error(`Expected mark to not be eligible`);
            }

            return mark.render('#testContainer').catch(expect('markRenderCatch')).then(() => {
                window.navigator.mockUserAgent = '';
            });
        });
    });

    it(`should render a standalone ideal mark and error out when onShippingChange is passed, even when ideal is eligible`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.IDEAL;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

            const mark = window.paypal.Marks({
                test: {},
                fundingSource
            });

            if (mark.isEligible()) {
                throw new Error(`Expected mark to not be eligible`);
            }

            return mark.render('#testContainer').catch(expect('markRenderCatch')).then(() => {
                mockEligibility.cancel();
            });
        });
    });
});
