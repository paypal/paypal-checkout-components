/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise } from 'belter/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import { createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, mockProp } from '../common';

describe(`paypal standalone buttons`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
        it(`should render a standalone ${ fundingSource } button and succeed when eligible`, () => {
            return wrapPromise(({ expect }) => {
                if (fundingSource === FUNDING.VENMO) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

                return window.paypal.Buttons({
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

                }).render('#testContainer');
            });
        });

        it(`should render a standalone ${ fundingSource } button and error out when not eligible`, () => {
            return wrapPromise(({ expect }) => {
                if (fundingSource === FUNDING.VENMO) {
                    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
                }

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', false);

                return window.paypal.Buttons({
                    test: {},
                    fundingSource

                }).render('#testContainer').catch(expect('buttonRenderCatch')).then(() => {
                    mockEligibility.cancel();
                });
            });
        });
    }
});
