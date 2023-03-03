/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise } from '@krakenjs/belter/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import { createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, WEBVIEW_USER_AGENT, mockProp } from '../common';

describe(`paypal standalone buttons`, () => {

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

        it(`should render a standalone ${ fundingSource } button and succeed when eligible`, () => {
            return wrapPromise(({ expect }) => {
                if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                    window.ApplePaySession = {
                        canMakePayments: () => true,
                        supportsVersion: () => true
                    };
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

                const button = window.paypal.Buttons({
                    test: {
                        onRender: expect('onRender', ({ fundingSources }) => {
                            if (fundingSources.length !== 1) {
                                throw new Error(`Expected only one funding source to be rendered, got ${ fundingSources.length }`);
                            }

                            if (fundingSources[0] !== fundingSource) {
                                throw new Error(`Expected rendered funding source to be ${ fundingSource }, got ${ fundingSources[0] }`);
                            }

                            mockEligibility.cancel();
                        })
                    },

                    fundingSource

                });

                if (!button.isEligible()) {
                    throw new Error(`Expected button to be eligible`);
                }

                return button.render('#testContainer');
            });
        });

        it(`should not render a standalone ${ fundingSource } button and error out when not eligible`, () => {
            return wrapPromise(({ expect }) => {
                if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

                const button = window.paypal.Buttons({
                    test: {},
                    fundingSource
                });

                if (button.isEligible()) {
                    throw new Error(`Expected button to not be eligible`);
                }

                return button.render('#testContainer').catch(expect('buttonRenderCatch')).then(() => {
                    mockEligibility.cancel();
                });
            });
        });
    }

    it(`should render a standalone venmo button and error out when not on mobile, even when venmo is eligible`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.VENMO;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

            const button = window.paypal.Buttons({
                test: {},
                fundingSource
            });

            if (button.isEligible()) {
                throw new Error(`Expected button to not be eligible`);
            }

            return button.render('#testContainer').catch(expect('buttonRenderCatch')).then(() => {
                mockEligibility.cancel();
            });
        });
    });

    it(`should render a standalone venmo button and error out for webviews`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.VENMO;
            window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

            const button = window.paypal.Buttons({
                test: {},
                fundingSource
            });

            if (button.isEligible()) {
                throw new Error(`Expected button to not be eligible`);
            }

            return button.render('#testContainer').catch(expect('buttonRenderCatch')).then(() => {
                window.navigator.mockUserAgent = '';
            });
        });
    });

    it(`should render a standalone ideal button and error out when onShippingChange is passed, even when ideal is eligible`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.IDEAL;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

            const button = window.paypal.Buttons({
                test: {},
                fundingSource
            });

            if (button.isEligible()) {
                throw new Error(`Expected button to not be eligible`);
            }

            return button.render('#testContainer').catch(expect('buttonRenderCatch')).then(() => {
                mockEligibility.cancel();
            });
        });
    });

    it(`should allow rendering a standalone verkkopankki button, but not render an automatic venkkopankki button`, () => {
        return wrapPromise(({ expect }) => {
            const fundingSource = FUNDING.VERKKOPANKKI;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

            const button = window.paypal.Buttons({
                fundingSource
            });

            if (!button.isEligible()) {
                throw new Error(`Expected button to be eligible`);
            }

            return button.render('#testContainer').then(() => {

                const buttons = window.paypal.Buttons({
                    test: {
                        onRender: expect('onRender', ({ fundingSources }) => {
                            if (fundingSources.indexOf(FUNDING.VERKKOPANKKI) !== -1) {
                                throw new Error(`Expected ${ FUNDING.VERKKOPANKKI } to not be rendered`);
                            }
                        })
                    },
                    style: {
                        layout: 'vertical'
                    }
                });

                if (!buttons.isEligible()) {
                    throw new Error(`Expected button to be eligible`);
                }

                return buttons.render('#testContainer').then(() => {
                    mockEligibility.cancel();
                });
            });
        });
    });
});
