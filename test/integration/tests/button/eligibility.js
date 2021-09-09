/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

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

describe('paylater button experiment eligibility', () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
        window.localStorage.removeItem('disable_paylater');
    });

    it('should not render a paylater button when the experiment disables it', () => {

        return ZalgoPromise.try(() => {
            return wrapPromise(({ expect, avoid }) => {
                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__, 'paylater', {
                    eligible: true,
                    products: {
                        paylater: {
                            eligible: true,
                            variant:  'experimentable'
                        },
                        payIn4: {
                            eligible: false,
                            variant:  'experimentable'
                        }
                    }
                });

                window.localStorage.setItem('disable_paylater', true);

                let onRender = ({ xprops }) => {
                    const renderedButtons = xprops.renderedButtons;
                    const experiment = xprops.experiment;

                    if (!experiment.disablePaylater) {
                        throw new Error(`disablePaylater should be true. ${  JSON.stringify(experiment) }`);
                    }

                    if (JSON.stringify(renderedButtons).includes('paylater')) {
                        throw new Error(`paylater button is being rendered but it should not be. ${ renderedButtons }`);
                    }
                };

                const instance = window.paypal.Buttons({
                    test: {
                        action:   'checkout',
                        onRender: (...args) => onRender(...args)
                    },


                    onApprove: avoid('onApprove'),
                    onCancel:  avoid('onCancel')

                });


                if (instance.isEligible()) {
                    onRender = expect('onRender', onRender);
                    return instance.render('#testContainer').then(() => mockEligibility.cancel());
                }
            });
        });
    });

    it('should render a paylater button when the experiment does not disable it', () => {

        return ZalgoPromise.try(() => {
            return wrapPromise(({ expect, avoid }) => {
                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__, 'paylater', {
                    eligible: true,
                    products: {
                        paylater: {
                            eligible: true,
                            variant:  ''
                        },
                        payIn4: {
                            eligible: false,
                            variant:  ''
                        }
                    }
                });

                let onRender = ({ xprops }) => {
                    const renderedButtons = xprops.renderedButtons;
                    const experiment = xprops.experiment;

                    if (experiment.disablePaylater) {
                        throw new Error(`disablePaylater should be falsy ${ JSON.stringify(experiment) }`);
                    }

                    if (!JSON.stringify(renderedButtons).includes('paylater')) {
                        throw new Error(`paylater button is not being rendered but it should be. ${ renderedButtons }`);
                    }
                };

                const instance = window.paypal.Buttons({
                    test: {
                        action:   'checkout',
                        onRender: (...args) => onRender(...args)
                    },


                    onApprove: avoid('onApprove'),
                    onCancel:  avoid('onCancel')

                });


                if (instance.isEligible()) {
                    onRender = expect('onRender', onRender);
                    return instance.render('#testContainer').then(() => mockEligibility.cancel());
                }
            });
        });
    });

    it('should render a paylater button when the experiment when standalone integration', () => {

        return ZalgoPromise.try(() => {
            return wrapPromise(({ expect, avoid }) => {
                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__, 'paylater', {
                    eligible: true,
                    products: {
                        paylater: {
                            eligible: true,
                            variant:  'experimentable'
                        },
                        payIn4: {
                            eligible: false,
                            variant:  'experimentable'
                        }
                    }
                });

                window.localStorage.setItem('disable_paylater', true);

                let onRender = ({ xprops }) => {
                    const renderedButtons = xprops.renderedButtons;
                    const experiment = xprops.experiment;

                    if (experiment.disablePaylater) {
                        throw new Error(`disablePaylater should not exist ${ JSON.stringify(experiment) }`);
                    }

                    if (!JSON.stringify(renderedButtons).includes('paylater')) {
                        throw new Error(`paylater button is not being rendered but it should be. ${ renderedButtons }`);
                    }
                };

                const instance = window.paypal.Buttons({
                    test: {
                        action:   'checkout',
                        onRender: (...args) => onRender(...args)
                    },

                    fundingSource: 'paylater',


                    onApprove: avoid('onApprove'),
                    onCancel:  avoid('onCancel')

                });


                if (instance.isEligible()) {
                    onRender = expect('onRender', onRender);
                    return instance.render('#testContainer').then(() => mockEligibility.cancel());
                }
            });
        });
    });
});
