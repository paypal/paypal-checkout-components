/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, uniqueID } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING, INTENT, COUNTRY } from '@paypal/sdk-constants/src';

import {
    mockAsyncProp,
    createButtonHTML,
    getRestfulGetOrderApiMock,
    getRestfulCaptureOrderApiMock,
    getRestfulAuthorizeOrderApiMock,
    DEFAULT_FUNDING_ELIGIBILITY,
    MOCK_BUYER_ACCESS_TOKEN,
    mockFunction,
    clickButton,
    getGraphQLApiMock,
    mockSetupButton,
    generateOrderID,
    getRestfulPatchOrderApiMock,
    getGetOrderApiMock,
    getCaptureOrderApiMock,
    getAuthorizeOrderApiMock,
    getPatchOrderApiMock
} from './mocks';

describe('actions smart fallback cases', () => {
    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.get, fail with REST api and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getRestfulGetOrderApiMock({ status: 403 });
                getOrderMock.expectCalls();

                const getOrderSmartMock = getGetOrderApiMock({
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
                getOrderSmartMock.expectCalls();

                await actions.order.get();
                getOrderMock.done();
                getOrderSmartMock.expectCalls();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.get, fail to upgrade LSAT and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect  }) => {

            const accessToken = uniqueID();
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        throw new Error(`Not today`);
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderSmartMock = getGetOrderApiMock({
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
                getOrderSmartMock.expectCalls();

                await actions.order.get();
                getOrderSmartMock.expectCalls();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                upgradeLSATMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture, fail with REST api and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const captureOrderMock = getRestfulCaptureOrderApiMock({ status: 403 });
                captureOrderMock.expectCalls();

                const captureOrderSmartMock = getCaptureOrderApiMock({
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
                captureOrderSmartMock.expectCalls();

                await actions.order.capture();
                captureOrderSmartMock.done();
                captureOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture, fail to upgrade LSAT, and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = uniqueID();
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        throw new Error(`Not today`);
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const captureOrderSmartMock = getCaptureOrderApiMock({
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
                captureOrderSmartMock.expectCalls();

                await actions.order.capture();
                captureOrderSmartMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                upgradeLSATMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });
                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize, fail with REST api and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.intent = INTENT.AUTHORIZE;

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
                                upgradeLowScopeAccessToken: true
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock({ status: 403 });
                authorizeOrderMock.expectCalls();

                const authorizeOrderSmartMock = getAuthorizeOrderApiMock({
                    handler: expect('authorizeOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                authorizeOrderSmartMock.expectCalls();

                await actions.order.authorize();
                authorizeOrderMock.done();
                authorizeOrderSmartMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            upgradeLSATMock.done();
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize, fail to upgrade LSAT and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = uniqueID();
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
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
                        throw new Error(`Not today`);
                    }
                }
            }).expectCalls();

            window.xprops.intent = INTENT.AUTHORIZE;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderSmartMock = getAuthorizeOrderApiMock({
                    handler: expect('authorizeOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                authorizeOrderSmartMock.expectCalls();

                await actions.order.authorize();
                authorizeOrderSmartMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                upgradeLSATMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });
                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            upgradeLSATMock.done();
        });
    });

    it('should render a button, click the button, and render checkout, then pass onShippingChange callback to the parent with actions.order.patch, fail with REST api and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onShippingChange = mockAsyncProp(expect('onShippingChange', async (data, actions) => {
                const patchOrderRESTmock = getRestfulPatchOrderApiMock({ status: 403 });
                patchOrderRESTmock.expectCalls();

                const patchOrderSmartMock = getPatchOrderApiMock({
                    handler: expect('patchOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                patchOrderSmartMock.expectCalls();

                await actions.order.patch();
                patchOrderSmartMock.done();
                patchOrderRESTmock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args).then(() => {
                            return props.onShippingChange({ orderID }, { reject: avoid('reject') });
                        });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onShippingChange callback to the parent with actions.order.patch, fail to upgrade LSAT, and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const accessToken = uniqueID();

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        throw new Error(`Not today`);
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onShippingChange = mockAsyncProp(expect('onShippingChange', async (data, actions) => {
                const patchOrderSmartMock = getPatchOrderApiMock({
                    handler: expect('patchOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                patchOrderSmartMock.expectCalls();

                await actions.order.patch();
                patchOrderSmartMock.done();

                upgradeLSATMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });
                        return renderToOriginal(...args).then(() => {
                            return props.onShippingChange({ orderID }, { reject: avoid('reject') });
                        });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.patch, fail with REST api and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const patchOrderRESTmock = getRestfulPatchOrderApiMock({ status: 403 });
                patchOrderRESTmock.expectCalls();


                const patchOrderSmartMock = getPatchOrderApiMock({
                    handler: expect('patchOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                patchOrderSmartMock.expectCalls();

                await actions.order.patch();
                patchOrderSmartMock.done();
                patchOrderRESTmock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });
                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.patch, fail to upgrade LSAT, and fall back to smart api', async () => {
        return await wrapPromise(async ({ expect }) => {

            const accessToken = uniqueID();
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const upgradeLSATMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        throw new Error(`Not today`);
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const patchOrderSmartMock = getPatchOrderApiMock({
                    handler: expect('patchOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                patchOrderSmartMock.expectCalls();

                await actions.order.patch();
                patchOrderSmartMock.done();
                
                upgradeLSATMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        props.onAuth({ accessToken });
                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:                    [ 'XYZ12345' ],
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
