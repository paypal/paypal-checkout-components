/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { LSAT_UPGRADE_FAILED } from '../../src/constants';

import { mockSetupButton, mockAsyncProp, createButtonHTML, getGetOrderApiMock, getCaptureOrderApiMock,
    DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton, MOCK_BUYER_ACCESS_TOKEN, getRestfulCapturedOrderApiMock,
    getRestfulGetOrderApiMock, getGraphQLApiMock } from './mocks';

describe('auth cases', () => {
    beforeEach(() => {
        window[LSAT_UPGRADE_FAILED] = false;
    });

    it('should render a button, call onAuth, and pass the access token to order get', async () => {
        return await wrapPromise(async ({ expect }) => {
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: expect('upgradeLSATGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        if (!data.variables.facilitatorAccessToken) {
                            throw new Error(`We haven't received the facilitatorAccessToken`);
                        }

                        if (!data.variables.buyerAccessToken) {
                            throw new Error(`We haven't received the buyer's access token`);
                        }

                        if (!data.variables.orderID) {
                            throw new Error(`We haven't received the orderID`);
                        }

                        return {
                            data: {
                                upgradeLowScopeAccessToken: false
                            }
                        };
                    }

                    return {};


                })
            }).expectCalls();
            
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getGetOrderApiMock({
                    handler: expect('getOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                const captureOrderApiMock = getCaptureOrderApiMock({
                    handler: expect('captureOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                captureOrderApiMock.expectCalls();
                await actions.order.capture();
                captureOrderApiMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                window[LSAT_UPGRADE_FAILED] = true;
                props.onAuth({ accessToken });
                return CheckoutOriginal(props);
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            upgradeLSATMock.done();
        });
    });

    it('should render a button, call onAuth, call restful auth/capture endpoints in onApprove cb if upgradeLSAT call is successful', async () => {
        return await wrapPromise(async ({ expect }) => {
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            let isUpgradeLSATCalled = false;

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: expect('upgradeLSATGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        if (!data.variables.facilitatorAccessToken) {
                            throw new Error(`We haven't received the facilitatorAccessToken`);
                        }

                        if (!data.variables.buyerAccessToken) {
                            throw new Error(`We haven't received the buyer's access token`);
                        }

                        if (!data.variables.orderID) {
                            throw new Error(`We haven't received the orderID`);
                        }

                        isUpgradeLSATCalled = true;

                        return {
                            data: {
                                upgradeLowScopeAccessToken: true
                            }
                        };
                    }

                    return {};


                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getRestfulGetOrderApiMock({
                    handler: expect('getOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                const captureOrderApiMock = getRestfulCapturedOrderApiMock({
                    handler: expect('captureOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                captureOrderApiMock.expectCalls();
                await actions.order.capture();
                captureOrderApiMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                return CheckoutOriginal(props);
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (!isUpgradeLSATCalled) {
                throw new Error('Failed Low Scope Access Token Upgrade');
            }

            upgradeLSATMock.done();

        });
    });

    it('should render a button, call onAuth, call smart auth/capture endpoints in onApprove cb if upgradeLSAT returns false', async () => {
        return await wrapPromise(async ({ expect }) => {
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: expect('upgradeLSATGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        if (!data.variables.facilitatorAccessToken) {
                            throw new Error(`We haven't received the facilitatorAccessToken`);
                        }

                        if (!data.variables.buyerAccessToken) {
                            throw new Error(`We haven't received the buyer's access token`);
                        }

                        if (!data.variables.orderID) {
                            throw new Error(`We haven't received the orderID`);
                        }

                        return {
                            data: {
                                upgradeLowScopeAccessToken: false
                            }
                        };
                    }

                    return {};


                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getGetOrderApiMock({
                    handler: expect('getOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                const captureOrderApiMock = getCaptureOrderApiMock({
                    handler: expect('captureOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                captureOrderApiMock.expectCalls();
                await actions.order.capture();
                captureOrderApiMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                window[LSAT_UPGRADE_FAILED] = true;
                props.onAuth({ accessToken });
                return CheckoutOriginal(props);
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            upgradeLSATMock.done();
        });
    });

    it('should render a button, call onAuth, call smart auth/capture endpoints in onApprove cb if upgradeLSAT errors', async () => {
        return await wrapPromise(async ({ expect }) => {
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: expect('upgradeLSATGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        if (!data.variables.facilitatorAccessToken) {
                            throw new Error(`We haven't received the facilitatorAccessToken`);
                        }

                        if (!data.variables.buyerAccessToken) {
                            throw new Error(`We haven't received the buyer's access token`);
                        }

                        if (!data.variables.orderID) {
                            throw new Error(`We haven't received the orderID`);
                        }

                        return {
                            data: {
                                upgradeLowScopeAccessToken: false
                            }
                        };
                    }

                    return {};


                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getGetOrderApiMock({
                    handler: expect('getOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                const captureOrderApiMock = getCaptureOrderApiMock({
                    handler: expect('captureOrder', () => {
                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                captureOrderApiMock.expectCalls();
                await actions.order.capture();
                captureOrderApiMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                window[LSAT_UPGRADE_FAILED] = true;
                props.onAuth({ accessToken });
                return CheckoutOriginal(props);
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            upgradeLSATMock.done();
        });
    });
});
