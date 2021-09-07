/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import {
    createTestContainer,
    destroyTestContainer,
    mockProp,
    IPHONE6_USER_AGENT,
    COMMON_DESKTOP_USER_AGENT
} from '../common';

describe('venmo button eligibility', () => {
    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        window.localStorage.removeItem('enable_venmo_desktop');
        window.localStorage.removeItem('enable_venmo_ios');
    });

    it('should render venmo button for desktop when eligibility is true', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
            window.localStorage.setItem('enable_venmo_desktop', true);
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', true);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo } } = xprops;
                        if (!enableVenmo) {
                            throw new Error(`Expected venmo experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (!fundingSources.includes(FUNDING.VENMO)) {
                            throw new Error(`Venmo is missing from the list of funding sources: ${ fundingSources }`);
                        }

                        mockEligibility.cancel();
                    })
                },

                onApprove: avoid('onApprove'),
                onCancel:  avoid('onCancel'),
                onError:   avoid('onError')
            });

            return instance.render('#testContainer');
        });
    });

    it('should not render venmo button for desktop when eligibility is false', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', false);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo } } = xprops;
                        if (enableVenmo) {
                            throw new Error(`Expected venmo experiment to be ineligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (fundingSources.includes(FUNDING.VENMO)) {
                            throw new Error(`Venmo shound not be rendered: ${ fundingSources }`);
                        }

                        mockEligibility.cancel();
                    })
                },

                onApprove: avoid('onApprove'),
                onCancel:  avoid('onCancel'),
                onError:   avoid('onError')
            });

            return instance.render('#testContainer');
        });
    });

    it('should render venmo button for mobile when eligibility is true', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
            window.localStorage.setItem('enable_venmo_ios', true);
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', true);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo } } = xprops;
                        if (!enableVenmo) {
                            throw new Error(`Expected venmo experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (!fundingSources.includes(FUNDING.VENMO)) {
                            throw new Error(`Venmo is missing from the list of funding sources: ${ fundingSources }`);
                        }

                        mockEligibility.cancel();
                    })
                },

                onApprove: avoid('onApprove'),
                onCancel:  avoid('onCancel'),
                onError:   avoid('onError')
            });

            return instance.render('#testContainer');
        });
    });

    it('should not render venmo button for mobile when eligibility is false', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', true);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo } } = xprops;
                        if (!enableVenmo) {
                            throw new Error(`Expected venmo experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (!fundingSources.includes(FUNDING.VENMO)) {
                            throw new Error(`Venmo is missing from the list of funding sources: ${ fundingSources }`);
                        }

                        mockEligibility.cancel();
                    })
                },

                onApprove: avoid('onApprove'),
                onCancel:  avoid('onCancel'),
                onError:   avoid('onError')
            });

            return instance.render('#testContainer');
        });
    });
});
