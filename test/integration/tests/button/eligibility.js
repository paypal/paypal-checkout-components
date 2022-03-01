/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

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

    it('should render venmo button for desktop when eligibility is true and the default label', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
            window.localStorage.setItem('enable_venmo_desktop', true);
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', true);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo, enableVenmoAppLabel } } = xprops;
                        if (!enableVenmo) {
                            throw new Error(`Expected venmo experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (enableVenmoAppLabel) {
                            throw new Error(`Expected enableVenmoAppLabel experiment to not be eligible: ${ JSON.stringify(xprops.experiment) }`);
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

    it('should render venmo button for desktop when eligibility is true and the app label', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
            window.localStorage.setItem('enable_venmo_desktop', true);
            window.localStorage.setItem('enable_venmo_app_label', true);
            const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO], 'eligible', true);

            const instance = window.paypal.Buttons({
                test: {
                    onRender: expect('onRender', ({ xprops, fundingSources }) => {
                        const { experiment: { enableVenmo, enableVenmoAppLabel } } = xprops;
                        if (!enableVenmo) {
                            throw new Error(`Expected venmo experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
                        }

                        if (!enableVenmoAppLabel) {
                            throw new Error(`Expected enableVenmoAppLabel experiment to be eligible: ${ JSON.stringify(xprops.experiment) }`);
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


    describe('noneligible mobile user agents', () => {
        const ineligibleUserAgents = [
            'Mozilla/5.0 (Android 4.4; Mobile; rv:70.0) Gecko/70.0 Firefox/70.0', // Firefox - Android mobile
            'Mozilla/5.0 (Android 4.4; Tablet; rv:70.0) Gecko/70.0 Firefox/70.0', // Firefox - Android tablet
            'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4', // Firefox - iPhone
            'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4', // Firefox - iPad
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 EdgiOS/44.5.0.10 Mobile/15E148 Safari/604.1', // Microsoft Edge - iPhone
            'Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM4.171019.021.D1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36 EdgA/42.0.0.2057', // Microsoft Edge - Android mobile
            'Opera/12.02 (Android 4.1; Linux; Opera Mobi/ADR-1111101157; U; en-US) Presto/2.9.201 Version/12.02', // Opera - Android mobile
            'Opera/9.80 (iPhone; Opera Mini/8.0.0/34.2336; U; en) Presto/2.8.119 Version/11.10', // Opera mini - iOS
            'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36', // Samsung 15
            'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.2 Chrome/71.0.3578.99 Mobile Safari/537.36', // Samsung 10.2
            'Mozilla/5.0 (Linux; Android 7.0; SAMSUNG SM-G610M Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.4 Chrome/59.0.3071.125 Mobile Safari/537.36', // Samsung 7.4
            'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36' // Samsung 15
        ];
        for (const userAgent of ineligibleUserAgents) {
            it(`should not render venmo button for mobile when user agent ist ${ userAgent } `, () => {
                return wrapPromise(({ expect, avoid }) => {
                    window.navigator.mockUserAgent = userAgent;

                    const instance = window.paypal.Buttons({
                        test: {
                            onRender: expect('onRender', ({ xprops, fundingSources }) => {
                                const { experiment: { enableVenmo } } = xprops;
                                if (enableVenmo) {
                                    throw new Error(`Expected venmo experiment to be ineligible: ${ JSON.stringify(xprops.experiment) }`);
                                }

                                if (fundingSources.includes(FUNDING.VENMO)) {
                                    throw new Error(`Venmo shound not be rendered`);
                                }

                            })
                        },

                        onApprove: avoid('onApprove'),
                        onCancel:  avoid('onCancel'),
                        onError:   avoid('onError')
                    });

                    return instance.render('#testContainer');
                });
            });
        }
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
